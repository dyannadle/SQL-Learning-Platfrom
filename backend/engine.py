import sqlite3
import shutil
import os
import uuid
import time
from typing import Dict, Any

DATASETS_DIR = "datasets"
SESSIONS_DIR = "sessions"

# Ensure directories exist
os.makedirs(DATASETS_DIR, exist_ok=True)
os.makedirs(SESSIONS_DIR, exist_ok=True)

class SQLEngine:
    @staticmethod
    def execute_query(query: str, dataset_name: str, session_id: str = None) -> Dict[str, Any]:
        """
        Executes a query in an isolated SQLite database.
        If session_id is provided, state is persisted between calls.
        """
        is_new_session = False
        if not session_id:
            session_id = str(uuid.uuid4())
            is_new_session = True
            
        session_db_path = os.path.join(SESSIONS_DIR, f"{session_id}.db")
        
        # If it's a new session or the file doesn't exist, seed it from template
        if not os.path.exists(session_db_path):
            template_db_path = os.path.join(DATASETS_DIR, f"{dataset_name}.db")
            if os.path.exists(template_db_path):
                shutil.copy2(template_db_path, session_db_path)
            else:
                # Create empty if template missing
                conn = sqlite3.connect(session_db_path)
                conn.close()
            
        start_time = time.time()
        conn = None
        
        try:
            conn = sqlite3.connect(session_db_path, timeout=5.0)
            cursor = conn.cursor()
            
            # Split by semicolon but preserve strings (simplified split for now)
            statements = [s.strip() for s in query.split(';') if s.strip()]
            
            results = {"columns": [], "rows": [], "affected_rows": 0, "session_id": session_id}
            
            for i, stmt in enumerate(statements):
                cursor.execute(stmt)
                
                if i == len(statements) - 1:
                    if cursor.description:
                        results["columns"] = [desc[0] for desc in cursor.description]
                        results["rows"] = cursor.fetchall()
                    else:
                        results["affected_rows"] = cursor.rowcount
                        
            conn.commit()
            
            execution_time = round((time.time() - start_time) * 1000, 2)
            results["execution_time_ms"] = execution_time
            
            return results
            
        except sqlite3.Error as e:
            raise ValueError(f"Database Error: {e}")
        finally:
            if conn:
                conn.close()
            # ONLY delete if it was a one-off query (no session_id provided by user)
            if is_new_session and os.path.exists(session_db_path):
                try:
                    os.remove(session_db_path)
                except Exception:
                    pass

    @staticmethod
    def cleanup_session(session_id: str):
        if not session_id: return
        session_db_path = os.path.join(SESSIONS_DIR, f"{session_id}.db")
        if os.path.exists(session_db_path):
            try:
                os.remove(session_db_path)
                return True
            except Exception:
                return False
        return False

    @staticmethod
    def get_query_plan(query: str, dataset_name: str, session_id: str = None) -> Dict[str, Any]:
        """Runs EXPLAIN QUERY PLAN to visualize execution tree"""
        statements = [s.strip() for s in query.split(';') if s.strip()]
        target_query = statements[-1] if statements else ""
        
        if not target_query.upper().startswith("SELECT"):
            return {"plan_rows": []}
            
        explain_query = f"EXPLAIN QUERY PLAN {target_query}"
        
        try:
            # We use the same session if available so we explain against the current schema state
            res = SQLEngine.execute_query(explain_query, dataset_name, session_id)
            return {"plan_rows": res["rows"]}
        except Exception as e:
            return {"error": str(e)}

