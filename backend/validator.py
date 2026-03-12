import re
import sqlglot

# Security list for the sandbox.
# Even though the SQLite DB is ephemeral, we prevent file-system level SQLite escapes.
FORBIDDEN_KEYWORDS = [
    r"\bPRAGMA\b",
    r"\bATTACH\s+DATABASE\b",
    r"\bDETACH\s+DATABASE\b",
]

def validate_query(query: str) -> bool:
    """
    Validates a SQL query for safety. 
    Returns True if safe, False if malicious/forbidden.
    """
    # 1. Regex check for dangerous SQLite operations
    upper_query = query.upper()
    for pattern in FORBIDDEN_KEYWORDS:
        if re.search(pattern, upper_query):
            return False, "Query contains forbidden system-level operations."
    
    # 2. Syntax validation and command detection via sqlglot
    try:
        # Parse multiple statements if separated by semicolon
        statements = sqlglot.parse(query, read="sqlite")
        for stmt in statements:
            if not stmt:
                continue
            
            # If we wanted to block DROP entirely, we could do:
            # if isinstance(stmt, sqlglot.exp.Drop): return False
            pass
            
    except sqlglot.errors.ParseError as e:
        return False, f"SQL Syntax Error: {str(e)}"
        
    return True, "Valid"
