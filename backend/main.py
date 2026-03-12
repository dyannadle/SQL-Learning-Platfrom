from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import uvicorn
import time
from typing import Optional, List, Any, Dict

from engine import SQLEngine
from validator import validate_query

app = FastAPI(title="SQL Playground Execution API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Since this runs locally with the React app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    query: str = Field(..., description="The SQL query to execute")
    dataset: str = Field(default="empty", description="Name of the dataset template to load (e.g., 'ecommerce')")
    include_plan: bool = Field(default=False, description="Whether to include EXPLAIN QUERY PLAN results")
    session_id: Optional[str] = Field(default=None, description="Optional persistent session ID")

class ValidationResponse(BaseModel):
    is_valid: bool
    message: str

class QueryResponse(BaseModel):
    columns: List[str]
    rows: List[List[Any]]
    affected_rows: int
    execution_time_ms: float
    session_id: str
    error: Optional[str] = None
    query_plan: Optional[Dict[str, Any]] = None

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "sql-playground-executor"}

@app.post("/validate", response_model=ValidationResponse)
async def validate(request: QueryRequest):
    """Checks if a query is safe to run without actually running it."""
    is_valid, msg = validate_query(request.query)
    return ValidationResponse(is_valid=is_valid, message=msg)

@app.post("/execute", response_model=QueryResponse)
async def execute_sql(request: QueryRequest):
    """
    Executes a SQL query in an isolated environment.
    If the query is unsafe, it returns a 400 error.
    """
    # 1. Validation First
    is_valid, msg = validate_query(request.query)
    if not is_valid:
        raise HTTPException(status_code=400, detail=f"Query blocked by validator: {msg}")
        
    # 2. Execution
    try:
        # Get query plan first if requested
        plan = None
        if request.include_plan:
            plan = SQLEngine.get_query_plan(request.query, request.dataset, request.session_id)
            
        # Run core query
        results = SQLEngine.execute_query(request.query, request.dataset, request.session_id)
        
        return QueryResponse(
            columns=results.get("columns", []),
            rows=results.get("rows", []),
            affected_rows=results.get("affected_rows", 0),
            execution_time_ms=results.get("execution_time_ms", 0.0),
            session_id=results.get("session_id"),
            query_plan=plan
        )
    except ValueError as ve:
        return QueryResponse(
            columns=[], rows=[], affected_rows=0, 
            execution_time_ms=0.0, session_id=request.session_id or "error", 
            error=str(ve)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Execution Engine Error: {str(e)}")

@app.post("/cleanup/{session_id}")
async def cleanup(session_id: str):
    success = SQLEngine.cleanup_session(session_id)
    return {"success": success}


# Test dataset endpoint
@app.get("/datasets")
async def get_datasets():
    import os
    if not os.path.exists("datasets"):
        return {"datasets": []}
    files = os.listdir("datasets")
    return {"datasets": [f.replace(".db", "") for f in files if f.endswith(".db")]}

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
