/**
 * Deep-dive educational content for SQL Mastery.
 * Each entry is keyed by topicPathId: "levelId-moduleId-topicIndex"
 * Contains comprehensive theory (Markdown) and hands-on lab missions.
 */

export const lessonContent = {
    // ═══════════════════════════════════════════════
    // LEVEL 0: Foundations — Module 1: Introduction to Data
    // ═══════════════════════════════════════════════
    "level-0-m1-0": {
        theory: `
# 1.1 What is Data?

Data is the lifeblood of modern technology. Every app, service, and business decision is powered by data.

### 🧩 The Two Primary Types
1. **Unstructured Data**: Messy things like PDFs, images, emails, video files, and social media posts.
2. **Structured Data**: Organized information that fits into rows and columns — spreadsheets, databases, CSV files.

**SQL is the universal language for querying Structured Data.**

> Think of data as "raw facts." Information is what you get when you organize, filter, and analyze those facts.

### 📊 Real-World Examples

| Raw Data | Information |
|:---|:---|
| \`"John", 28, "$55,000"\` | Employee John earns $55K |
| \`"2024-03-15", "AAPL", 172.50\` | Apple stock price on March 15 |
| Billions of click events | "Users spend 3.2 min on homepage" |

### 🏢 Why Companies Care About Data

**Netflix** uses viewing data to decide which shows to produce. **Amazon** uses purchase data to recommend products. **Uber** uses location data to optimize driver routes.

> **Key Insight**: The companies that leverage data best are the ones that dominate their markets. Learning SQL gives you the superpower to extract insights from any dataset.

### 💡 Data vs Information vs Knowledge

\`\`\`
Data → Raw facts           (e.g., 72°F)
Information → Context      (e.g., "It's 72°F in NYC today")
Knowledge → Decisions      (e.g., "Wear light clothes")
Wisdom → Strategy          (e.g., "Always check weather before packing")
\`\`\`
        `,
        lab: {
            mission: "Analyze a User Profile database and classify data types.",
            tasks: [
                "Identify which field is 'Structured': an email address or a selfie image?",
                "Explain why you can't easily search inside a random voice note using SQL.",
                "List 3 examples of structured data you interact with daily (e.g., bank transactions).",
                "Name a company and describe one decision they make using structured data."
            ]
        }
    },

    "level-0-m1-1": {
        theory: `
# 1.2 SQL Data Types — The Building Blocks

Every column in a SQL table has a **data type** that tells the database how to store and process values. Choosing the right type affects performance, storage, and data integrity.

### 📋 Core SQL Data Types

| Type | Example | Storage | Use Case |
|:---|:---|:---|:---|
| **INTEGER** | \`25\` | 4 bytes | Ages, counts, IDs |
| **BIGINT** | \`9223372036854775807\` | 8 bytes | Large counters, Twitter IDs |
| **VARCHAR(n)** | \`"John Doe"\` | Variable | Names, emails (max n chars) |
| **TEXT** | \`"Long description..."\` | Variable | Articles, comments |
| **DECIMAL(p,s)** | \`99.99\` | Variable | Money, precise calculations |
| **FLOAT/REAL** | \`3.14159\` | 4-8 bytes | Scientific measurements |
| **BOOLEAN** | \`TRUE/FALSE\` | 1 byte | Flags, toggles |
| **DATE** | \`'2024-03-15'\` | 3 bytes | Birthdays, deadlines |
| **TIMESTAMP** | \`'2024-03-15 14:30:00'\` | 8 bytes | Audit logs, event tracking |

### ⚠️ Common Mistakes

1. **Never use FLOAT for money** — use DECIMAL(10,2) instead. Floating-point math causes rounding errors:
\`\`\`sql
-- This can give 0.30000000000000004 instead of 0.3
SELECT 0.1 + 0.2;  -- Use DECIMAL for money!
\`\`\`

2. **Don't over-size VARCHAR** — \`VARCHAR(255)\` for a country code wastes resources. Use \`CHAR(2)\` instead.

3. **Store dates as DATE, not TEXT** — \`'2024-03-15'\` as TEXT can't be sorted or compared correctly.

### 🔑 Type Casting
Sometimes you need to convert between types:
\`\`\`sql
SELECT CAST('42' AS INTEGER);        -- Text → Number
SELECT CAST(price AS TEXT);           -- Number → Text  
SELECT CAST('2024-03-15' AS DATE);    -- Text → Date
\`\`\`
        `,
        lab: {
            mission: "Categorize real-world items into correct SQL types.",
            tasks: [
                "What type would you use for a user's age? Why not BIGINT?",
                "What type for a product description that could be 5,000 characters?",
                "What type for a user's account balance? Explain why not FLOAT.",
                "Run: SELECT typeof(42), typeof('hello'), typeof(3.14); — What does it return?",
                "Create a table with at least 4 different data types using the SQL Playground."
            ]
        }
    },

    "level-0-m1-2": {
        theory: `
# 1.3 Structured vs Unstructured Data

Understanding this distinction is fundamental to knowing when to use SQL vs other tools.

### ✅ Structured Data (SQL Territory)
Data that follows a **predefined schema** — every row has the same columns.

| Source | Example |
|:---|:---|
| Relational Databases | PostgreSQL, MySQL, SQLite |
| Spreadsheets | Excel, Google Sheets |
| CSV/TSV Files | Exported data, log files |
| Data Warehouses | Snowflake, BigQuery, Redshift |

### ❌ Unstructured Data (NoSQL / Blob Territory)

| Source | Example |
|:---|:---|
| Media Files | MP3s, videos, images |
| Documents | PDFs, Word docs |
| Emails | Freeform text with attachments |
| Social Media | Tweets, comments, posts |

### 🔀 Semi-Structured Data (The Gray Area)
JSON, XML, and YAML are "semi-structured" — they have some organization but don't fit neatly into rows:

\`\`\`json
{
  "user": "Alice",
  "orders": [
    {"product": "Laptop", "qty": 1},
    {"product": "Mouse", "qty": 2}
  ]
}
\`\`\`

> **Industry Insight**: Over 80% of enterprise data is unstructured, but the most *valuable* decision-making data is almost always structured. Modern databases like PostgreSQL now support JSON columns, bridging both worlds.

### 🏗️ The Architecture Decision

| Need | Use |
|:---|:---|
| Financial records | SQL (structured) |
| User profiles | SQL (structured) |
| Chat messages | SQL or NoSQL |
| Image storage | Object storage (S3) |
| Real-time analytics | SQL + streaming |
        `,
        lab: {
            mission: "Design a data storage strategy for a startup.",
            tasks: [
                "Would you store a user's password hash in a SQL table? Why or why not?",
                "Where would you store a 2GB raw video file? (Hint: Think about performance)",
                "A social media app has: user profiles, posts, images, and likes. Which parts go in SQL?",
                "Run this in the playground: SELECT json('{\"name\": \"Alice\", \"age\": 30}');"
            ]
        }
    },

    "level-0-m1-3": {
        theory: `
# 1.4 Evolution of Databases — A Historical Journey

Understanding database history helps you appreciate why SQL became the universal standard.

### 📜 Timeline of Database Evolution

**1960s — File Systems**
Data stored in flat text files. No relationships, no queries, no integrity.
\`\`\`
John,28,Engineering
Alice,32,Marketing
\`\`\`
*Problem*: No way to link related data. No search beyond line-by-line.

**1970s — The Relational Revolution**
Edgar F. Codd published "A Relational Model of Data for Large Shared Data Banks" at IBM. This paper changed everything.

Key innovations:
- Data organized into **tables** (relations)
- **SQL** became the query language  
- **ACID** transactions guarantee reliability

**1980s-90s — Commercial Databases**
Oracle, IBM DB2, Microsoft SQL Server, and MySQL emerged. SQL became the industry standard.

**2000s — NoSQL Movement**
Google's Bigtable, Amazon's DynamoDB, MongoDB. Designed for:
- Horizontal scaling (petabytes)
- Flexible schemas
- High write throughput

**2010s-Now — NewSQL & Cloud**
The best of both worlds: SQL syntax + NoSQL scalability.
- **Google Spanner**: Global ACID transactions
- **CockroachDB**: Distributed PostgreSQL
- **Snowflake**: Cloud data warehouse with SQL

### 🎯 Why SQL Won

| Feature | SQL | NoSQL |
|:---|:---|:---|
| Query Language | Standardized | Different per DB |
| Data Integrity | ACID guaranteed | Eventually consistent |
| Learning Curve | Universal | Varies wildly |
| Ecosystem | 50+ years mature | 15-20 years |
| Job Market | Required everywhere | Niche roles |

> **Career Insight**: SQL is the #1 most-requested skill in data-related job postings. Learning SQL isn't just about databases — it's about career-proofing yourself.
        `,
        lab: {
            mission: "Research and compare database systems.",
            tasks: [
                "Why did the Relational model (SQL) win over the Hierarchical model?",
                "Name one NoSQL database and explain its primary use case.",
                "What does ACID stand for? Why is it important for banks?",
                "Look up: What database does Netflix use? What about Instagram?"
            ]
        }
    },

    // ═══════════════════════════════════════════════
    // LEVEL 1: SQL Basics — Module 4: SQL Syntax & Schema
    // ═══════════════════════════════════════════════
    "level-1-m4-0": {
        theory: `
# 4.1 SQL Syntax Fundamentals

SQL is a **declarative** language. You describe *what* data you want, and the database engine figures out *how* to retrieve it efficiently.

### 🧬 The Anatomy of a SQL Statement

\`\`\`sql
SELECT column_name          -- What columns to show
FROM table_name             -- Which table to query
WHERE condition             -- Filter rows
ORDER BY column_name;       -- Sort results
\`\`\`

### 📏 Syntax Rules

| Rule | Correct | Wrong |
|:---|:---|:---|
| End with semicolon | \`SELECT * FROM users;\` | \`SELECT * FROM users\` |
| Keywords UPPERCASE | \`SELECT name FROM...\` | \`select name from...\` |
| Identifiers snake_case | \`first_name\` | \`FirstName\` |
| Strings in single quotes | \`WHERE name = 'Alice'\` | \`WHERE name = "Alice"\` |

### 🔤 SQL Statement Categories

| Category | Commands | Purpose |
|:---|:---|:---|
| **DDL** (Data Definition) | \`CREATE, ALTER, DROP\` | Define structure |
| **DML** (Data Manipulation) | \`SELECT, INSERT, UPDATE, DELETE\` | Manage data |
| **DCL** (Data Control) | \`GRANT, REVOKE\` | Permissions |
| **TCL** (Transaction Control) | \`COMMIT, ROLLBACK\` | Transaction management |

### 💡 Comments in SQL
\`\`\`sql
-- This is a single-line comment

/* This is a
   multi-line comment */
   
SELECT name  -- Get user names
FROM users;  /* main query */
\`\`\`

### ⚡ Execution Order (Not What You'd Expect!)
SQL doesn't execute top-to-bottom. The actual order is:

1. \`FROM\` → Find the table  
2. \`WHERE\` → Filter rows  
3. \`GROUP BY\` → Group matching rows  
4. \`HAVING\` → Filter groups  
5. \`SELECT\` → Choose columns  
6. \`ORDER BY\` → Sort results  
7. \`LIMIT\` → Cap output  

> **Pro Tip**: Understanding execution order is the key to writing efficient queries and debugging unexpected results.
        `,
        lab: {
            mission: "Master SQL syntax through hands-on practice.",
            tasks: [
                "Fix the broken query: SELECT * products; (Hint: missing keyword)",
                "Write a query to select only name and price from the products table.",
                "Add a comment to your query explaining what it does.",
                "Run: SELECT 1 + 1 AS result; — SQL can do math!",
                "Run: SELECT 'Hello' || ' ' || 'World' AS greeting; — String concatenation!"
            ]
        }
    },

    "level-1-m4-1": {
        theory: `
# 4.2 Understanding Tables & Schemas

A **table** is a collection of related data organized into rows and columns. A **schema** is the blueprint that defines the structure of your tables.

### 🏗️ Table Structure

\`\`\`
┌──────────────────────────────────────────┐
│              employees                    │
├────┬──────────┬────────┬─────────────────┤
│ id │   name   │  dept  │    salary       │
├────┼──────────┼────────┼─────────────────┤
│ 1  │ Alice    │ Eng    │ 95,000          │
│ 2  │ Bob      │ Sales  │ 72,000          │
│ 3  │ Carol    │ Eng    │ 88,000          │
└────┴──────────┴────────┴─────────────────┘
  ↑        ↑         ↑          ↑
Column  Column   Column    Column
  (PK)
\`\`\`

### 📝 Key Terminology

| Term | Definition | Example |
|:---|:---|:---|
| **Table** | A collection of related rows | \`employees\` |
| **Row (Record)** | A single data entry | Alice's full record |
| **Column (Field)** | A specific attribute | \`salary\` |
| **Schema** | Table structure definition | Column names + types |
| **Primary Key** | Unique row identifier | \`id\` |

### 🔍 Inspecting Schema in SQLite
\`\`\`sql
-- See all tables in the database
SELECT name FROM sqlite_master WHERE type='table';

-- See the structure of a specific table
PRAGMA table_info(employees);

-- See the full CREATE TABLE statement
SELECT sql FROM sqlite_master WHERE name='employees';
\`\`\`

### 🎯 Creating Your First Table
\`\`\`sql
CREATE TABLE students (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    gpa REAL CHECK(gpa >= 0 AND gpa <= 4.0),
    enrolled_date TEXT DEFAULT CURRENT_DATE
);
\`\`\`

**Constraints** protect your data:
- \`NOT NULL\` — Column can't be empty
- \`UNIQUE\` — No duplicate values allowed
- \`CHECK\` — Custom validation rule
- \`DEFAULT\` — Auto-fill value if not provided
        `,
        lab: {
            mission: "Explore and create database schemas.",
            tasks: [
                "Run: SELECT name FROM sqlite_master WHERE type='table'; — List all tables.",
                "Run: PRAGMA table_info(employees); — Inspect the employees structure.",
                "Create a 'students' table with: id, name, email, gpa, and enrolled_date.",
                "Insert 3 students into your new table and then SELECT them.",
                "Try inserting a student with a duplicate email — what happens?"
            ]
        }
    },

    // LEVEL 1: Module 6 - SQL Query Mastery
    "level-1-m6-0": {
        theory: `
# 6.1 The SELECT Statement — Your Swiss Army Knife

The \`SELECT\` statement is by far the most-used SQL command. It retrieves data from one or more tables.

### 📖 Basic Syntax Variations

\`\`\`sql
-- Select ALL columns
SELECT * FROM employees;

-- Select SPECIFIC columns
SELECT name, salary FROM employees;

-- Use ALIASES for readability
SELECT name AS employee_name, 
       salary AS annual_salary 
FROM employees;

-- Add COMPUTED columns
SELECT name, 
       salary, 
       salary * 0.2 AS tax,
       salary * 0.8 AS take_home
FROM employees;
\`\`\`

### 🔢 Built-in Functions

| Function | Example | Result |
|:---|:---|:---|
| \`COUNT(*)\` | \`SELECT COUNT(*) FROM employees;\` | Total rows |
| \`SUM(col)\` | \`SELECT SUM(salary) FROM employees;\` | Total salary |
| \`AVG(col)\` | \`SELECT AVG(salary) FROM employees;\` | Average salary |
| \`MIN(col)\` | \`SELECT MIN(salary) FROM employees;\` | Lowest salary |
| \`MAX(col)\` | \`SELECT MAX(salary) FROM employees;\` | Highest salary |
| \`UPPER(col)\` | \`SELECT UPPER(name) FROM employees;\` | UPPERCASE text |
| \`LENGTH(col)\` | \`SELECT LENGTH(name) FROM employees;\` | String length |

### 🎯 DISTINCT — Remove Duplicates
\`\`\`sql
-- See all unique departments
SELECT DISTINCT department FROM employees;

-- Count unique departments
SELECT COUNT(DISTINCT department) AS dept_count FROM employees;
\`\`\`

### 📊 LIMIT & OFFSET — Pagination
\`\`\`sql
-- Get first 10 rows
SELECT * FROM employees LIMIT 10;

-- Get rows 11-20 (page 2)
SELECT * FROM employees LIMIT 10 OFFSET 10;
\`\`\`

> **Performance Tip**: Always use \`LIMIT\` during exploration. Running \`SELECT *\` on a million-row table without LIMIT will freeze your session.
        `,
        lab: {
            mission: "Master the SELECT statement with real data.",
            tasks: [
                "Select all employees and their salaries.",
                "Create a computed column showing each employee's monthly salary (annual / 12).",
                "Use COUNT, AVG, MIN, and MAX on the salary column in separate queries.",
                "Find all DISTINCT departments in the employees table.",
                "Write a paginated query: first 3 employees, then next 3 using OFFSET."
            ]
        }
    },

    "level-1-m6-3": {
        theory: `
# 6.4 Advanced SELECT Techniques

Going beyond basic queries with powerful selection patterns.

### 🔀 ORDER BY — Sorting Results
\`\`\`sql
-- Sort by salary (ascending - default)
SELECT name, salary FROM employees ORDER BY salary;

-- Sort descending (highest first)
SELECT name, salary FROM employees ORDER BY salary DESC;

-- Multi-column sort
SELECT department, name, salary 
FROM employees 
ORDER BY department ASC, salary DESC;
\`\`\`

### 🏷️ CASE Expressions — Conditional Logic
\`\`\`sql
SELECT name, salary,
  CASE 
    WHEN salary > 90000 THEN 'Senior'
    WHEN salary > 60000 THEN 'Mid-Level'
    ELSE 'Junior'
  END AS level
FROM employees
ORDER BY salary DESC;
\`\`\`

### 🔗 String Operations
\`\`\`sql
-- Concatenation
SELECT name || ' works in ' || department AS info
FROM employees;

-- Substring
SELECT SUBSTR(name, 1, 3) AS short_name FROM employees;

-- Replace
SELECT REPLACE(name, 'John', 'Jonathan') FROM employees;
\`\`\`

### 📐 NULL Handling
\`\`\`sql
-- Check for NULL
SELECT * FROM employees WHERE department IS NULL;

-- Replace NULL with a default
SELECT name, COALESCE(department, 'Unassigned') AS dept
FROM employees;

-- IFNULL (SQLite shorthand)
SELECT name, IFNULL(phone, 'N/A') AS phone FROM employees;
\`\`\`

> **Interview Tip**: NULL is not zero. NULL is not an empty string. NULL means "unknown." \`NULL = NULL\` returns NULL (not TRUE)!
        `,
        lab: {
            mission: "Apply advanced SELECT patterns.",
            tasks: [
                "Sort employees by salary descending and display the top 5.",
                "Write a CASE expression that labels salaries as High/Medium/Low.",
                "Create a computed column that concatenates name and department.",
                "Use COALESCE to handle any NULL values in your queries.",
                "Run: SELECT NULL = NULL; — What does it return? Why?"
            ]
        }
    },

    // LEVEL 1: Module 7: Basic Filtering
    "level-1-m7-0": {
        theory: `
# 7.1 The WHERE Clause — Precision Filtering

The \`WHERE\` clause is your most powerful tool for extracting exactly the data you need.

### 🔍 Comparison Operators

| Operator | Meaning | Example |
|:---|:---|:---|
| \`=\` | Equals | \`WHERE age = 25\` |
| \`<>\` or \`!=\` | Not equals | \`WHERE status <> 'inactive'\` |
| \`>\` | Greater than | \`WHERE salary > 50000\` |
| \`<\` | Less than | \`WHERE age < 30\` |
| \`>=\` | Greater or equal | \`WHERE price >= 9.99\` |
| \`<=\` | Less or equal | \`WHERE stock <= 0\` |

### 🔗 Logical Operators — Combine Conditions
\`\`\`sql
-- AND: Both conditions must be true
SELECT * FROM employees 
WHERE department = 'Engineering' AND salary > 80000;

-- OR: At least one condition must be true
SELECT * FROM employees 
WHERE department = 'Sales' OR department = 'Marketing';

-- NOT: Negate a condition
SELECT * FROM employees WHERE NOT department = 'HR';

-- Complex combinations (use parentheses!)
SELECT * FROM employees
WHERE (department = 'Engineering' OR department = 'Product')
  AND salary > 70000;
\`\`\`

### 📋 IN, BETWEEN, LIKE

\`\`\`sql
-- IN: Match any value in a list
SELECT * FROM employees 
WHERE department IN ('Engineering', 'Product', 'Design');

-- BETWEEN: Range filter (inclusive)
SELECT * FROM products WHERE price BETWEEN 10 AND 50;

-- LIKE: Pattern matching
SELECT * FROM employees WHERE name LIKE 'A%';    -- Starts with A
SELECT * FROM employees WHERE name LIKE '%son';   -- Ends with 'son'
SELECT * FROM employees WHERE email LIKE '%@gmail%'; -- Contains '@gmail'
\`\`\`

### 🎯 IS NULL / IS NOT NULL
\`\`\`sql
-- Find rows where department is missing
SELECT * FROM employees WHERE department IS NULL;

-- Find rows where email exists
SELECT * FROM employees WHERE email IS NOT NULL;
\`\`\`

> **Critical Mistake**: Never use \`= NULL\`. Always use \`IS NULL\`. The expression \`column = NULL\` always evaluates to NULL (not TRUE or FALSE).
        `,
        lab: {
            mission: "Filter the products and employees tables precisely.",
            tasks: [
                "Find all products in the 'Electronics' category.",
                "Find employees earning between $60,000 and $90,000.",
                "Find products whose name starts with 'M' using LIKE.",
                "Write a query using AND and OR to find specific employees.",
                "Find all products where the stock is NOT zero and price is under $100."
            ]
        }
    },

    "level-1-m7-2": {
        theory: `
# 7.3 Advanced Filtering with GROUP BY & HAVING

Grouping lets you analyze data in categories and compute aggregate statistics.

### 📊 GROUP BY — Categorize and Aggregate
\`\`\`sql
-- Count employees per department
SELECT department, COUNT(*) AS headcount
FROM employees
GROUP BY department;

-- Average salary per department
SELECT department, 
       AVG(salary) AS avg_salary,
       MIN(salary) AS min_salary,
       MAX(salary) AS max_salary
FROM employees
GROUP BY department;
\`\`\`

### 🎯 HAVING — Filter Groups (Not Rows!)

\`WHERE\` filters individual rows. \`HAVING\` filters groups after aggregation.

\`\`\`sql
-- Departments with more than 5 employees
SELECT department, COUNT(*) AS headcount
FROM employees
GROUP BY department
HAVING COUNT(*) > 5;

-- Departments where average salary exceeds 80K
SELECT department, AVG(salary) AS avg_sal
FROM employees
GROUP BY department
HAVING AVG(salary) > 80000
ORDER BY avg_sal DESC;
\`\`\`

### ⚠️ WHERE vs HAVING

| WHERE | HAVING |
|:---|:---|
| Filters **rows** | Filters **groups** |
| Before GROUP BY | After GROUP BY |
| Can't use aggregates | Uses aggregates |
| \`WHERE salary > 50000\` | \`HAVING AVG(salary) > 50000\` |

### 📐 Complete Query Pattern
\`\`\`sql
SELECT department, 
       COUNT(*) AS headcount,
       AVG(salary) AS avg_salary
FROM employees
WHERE salary > 30000           -- 1. Filter rows first  
GROUP BY department             -- 2. Then group
HAVING COUNT(*) >= 2            -- 3. Then filter groups
ORDER BY avg_salary DESC        -- 4. Then sort
LIMIT 5;                        -- 5. Then limit
\`\`\`

> **Interview Question**: "What's the difference between WHERE and HAVING?" This is asked in nearly every SQL interview. Know it cold.
        `,
        lab: {
            mission: "Analyze employee data with aggregations.",
            tasks: [
                "Count employees in each department.",
                "Find the average salary per department.",
                "Use HAVING to find departments with avg salary > $70,000.",
                "Write the full pattern: WHERE → GROUP BY → HAVING → ORDER BY.",
                "Challenge: Find departments where the salary range (MAX - MIN) exceeds $20,000."
            ]
        }
    },

    // ═══════════════════════════════════════════════
    // LEVEL 2: Data Manipulation — Module 9: CRUD Operations
    // ═══════════════════════════════════════════════
    "level-2-m9-0": {
        theory: `
# 9.1 INSERT — Adding Data

The \`INSERT\` statement adds new rows to a table. It's the "C" in CRUD (Create, Read, Update, Delete).

### 📝 Single Row Insert
\`\`\`sql
INSERT INTO employees (name, department, salary)
VALUES ('Alice Johnson', 'Engineering', 95000);
\`\`\`

### 📦 Multi-Row Insert (Batch)
\`\`\`sql
INSERT INTO employees (name, department, salary) VALUES
  ('Bob Smith', 'Sales', 72000),
  ('Carol White', 'Engineering', 88000),
  ('David Brown', 'Marketing', 65000);
\`\`\`

### 🔄 INSERT ... SELECT (Copy from another table)
\`\`\`sql
-- Create a backup of high earners
INSERT INTO senior_staff (name, salary)
SELECT name, salary FROM employees WHERE salary > 100000;
\`\`\`

### ⚠️ Common INSERT Errors

| Error | Cause | Fix |
|:---|:---|:---|
| \`NOT NULL constraint\` | Missing required column | Include all NOT NULL columns |
| \`UNIQUE constraint\` | Duplicate value in unique column | Use different value or UPSERT |
| \`CHECK constraint\` | Value violates CHECK rule | Ensure value is within bounds |
| \`Type mismatch\` | Wrong data type | Cast or correct the value |

### 💡 INSERT OR REPLACE (Upsert in SQLite)
\`\`\`sql
-- If id 1 exists, replace it; otherwise insert
INSERT OR REPLACE INTO employees (id, name, department, salary)
VALUES (1, 'Alice Updated', 'Engineering', 98000);
\`\`\`

> **Production Tip**: Always use explicit column names in INSERT statements. \`INSERT INTO table VALUES (...)\` breaks when columns are added later.
        `,
        lab: {
            mission: "Practice all INSERT variations in the SQL Playground.",
            tasks: [
                "Create a table called 'customers' with: id, name, email, city, signup_date.",
                "Insert 5 customers using multi-row INSERT.",
                "Try inserting a customer with a duplicate email — observe the error.",
                "Use INSERT OR REPLACE to update an existing customer.",
                "Use INSERT ... SELECT to copy customers from one city into a new table."
            ]
        }
    },

    "level-2-m9-1": {
        theory: `
# 9.2 UPDATE — Modifying Existing Data

The \`UPDATE\` statement changes existing rows. It's the "U" in CRUD.

> **⚡ CRITICAL WARNING**: Always use a \`WHERE\` clause with \`UPDATE\`. Forgetting it updates **every single row** in the table!

### 🔧 Basic UPDATE
\`\`\`sql
UPDATE employees
SET salary = 95000
WHERE id = 5;
\`\`\`

### 📊 Update Multiple Columns
\`\`\`sql
UPDATE employees
SET salary = 95000,
    department = 'Senior Engineering'
WHERE id = 5;
\`\`\`

### 🔢 Computed Updates
\`\`\`sql
-- Give everyone a 10% raise
UPDATE employees SET salary = salary * 1.1;

-- Give Engineering a 15% raise specifically
UPDATE employees 
SET salary = salary * 1.15
WHERE department = 'Engineering';

-- Cap salary at 150,000
UPDATE employees
SET salary = 150000
WHERE salary > 150000;
\`\`\`

### 🛡️ Safe UPDATE Practices

1. **Always preview first**: Run a \`SELECT\` with the same \`WHERE\` clause before updating.
\`\`\`sql
-- Step 1: Preview (see who will be affected)
SELECT * FROM employees WHERE department = 'Sales';

-- Step 2: Update (only after verifying!)
UPDATE employees SET salary = salary * 1.1 WHERE department = 'Sales';
\`\`\`

2. **Check affected rows**: After an UPDATE, verify the count matches your expectation.

3. **Use transactions** for critical updates:
\`\`\`sql
BEGIN TRANSACTION;
UPDATE employees SET salary = 0 WHERE id = 99;
-- Oops, made a mistake?
ROLLBACK;  -- Undo everything!
\`\`\`
        `,
        lab: {
            mission: "Safely modify data with UPDATE statements.",
            tasks: [
                "Update the salary of an employee with a specific ID.",
                "Give all employees in 'Engineering' a 15% raise using computed update.",
                "Preview (SELECT) before updating — then perform the update.",
                "Use a transaction: BEGIN → UPDATE → ROLLBACK to practice undoing changes.",
                "Challenge: Update multiple columns simultaneously for one employee."
            ]
        }
    },

    "level-2-m9-2": {
        theory: `
# 9.3 DELETE — Removing Data

The \`DELETE\` statement removes rows from a table. It's the "D" in CRUD.

> **⚡ DANGER**: \`DELETE FROM employees;\` with NO WHERE clause deletes **all rows**! The table structure remains, but all data is gone.

### 🗑️ Basic DELETE
\`\`\`sql
DELETE FROM employees WHERE id = 5;
\`\`\`

### 🎯 Conditional DELETE
\`\`\`sql
-- Delete all inactive accounts
DELETE FROM users WHERE status = 'inactive';

-- Delete old logs (older than 30 days)
DELETE FROM logs 
WHERE created_at < date('now', '-30 days');

-- Delete employees with no department
DELETE FROM employees WHERE department IS NULL;
\`\`\`

### 🔒 Safe DELETE Workflow
\`\`\`sql
-- Step 1: Count what will be deleted
SELECT COUNT(*) FROM employees WHERE salary < 30000;

-- Step 2: Preview the rows
SELECT * FROM employees WHERE salary < 30000;

-- Step 3: Delete with confidence
DELETE FROM employees WHERE salary < 30000;
\`\`\`

### 🆚 DELETE vs TRUNCATE vs DROP

| Command | Effect | Can Undo? | Speed |
|:---|:---|:---|:---|
| \`DELETE\` | Remove specific rows | Yes (with transaction) | Slow for large |
| \`TRUNCATE TABLE\` | Remove ALL rows | No | Very fast |
| \`DROP TABLE\` | Remove entire table | No | Instant |

### 💡 Soft Delete Pattern (Production)
In production, you rarely hard-delete data. Instead, mark it as deleted:
\`\`\`sql
-- Add a deleted_at column
ALTER TABLE employees ADD COLUMN deleted_at TEXT;

-- "Delete" by setting timestamp
UPDATE employees SET deleted_at = datetime('now') WHERE id = 5;

-- Query only "active" employees
SELECT * FROM employees WHERE deleted_at IS NULL;
\`\`\`

> **Industry Standard**: Most SaaS companies use soft deletes. It enables audit trails, data recovery, and compliance with regulations like GDPR.
        `,
        lab: {
            mission: "Practice safe deletion patterns.",
            tasks: [
                "Delete a specific row by ID from a test table.",
                "Practice the 3-step workflow: COUNT → PREVIEW → DELETE.",
                "Implement a soft delete: add deleted_at column, then 'delete' by updating it.",
                "Query only non-deleted records using WHERE deleted_at IS NULL.",
                "Use a transaction to DELETE, verify the result, then ROLLBACK."
            ]
        }
    },

    // LEVEL 2: Module 10 — ALTER TABLE & Schema Management
    "level-2-m10-0": {
        theory: `
# 10.1 ALTER TABLE — Evolving Your Schema

Databases evolve over time. \`ALTER TABLE\` lets you modify table structures without losing data.

### ➕ Add a Column
\`\`\`sql
ALTER TABLE employees ADD COLUMN phone TEXT;
ALTER TABLE employees ADD COLUMN is_active INTEGER DEFAULT 1;
\`\`\`

### ✏️ Rename a Table
\`\`\`sql
ALTER TABLE employees RENAME TO staff;
\`\`\`

### ✏️ Rename a Column (SQLite 3.25+)
\`\`\`sql
ALTER TABLE employees RENAME COLUMN dept TO department;
\`\`\`

### 🗑️ Drop a Column (SQLite 3.35+)
\`\`\`sql
ALTER TABLE employees DROP COLUMN phone;
\`\`\`

### 🔑 DROP TABLE
\`\`\`sql
-- Permanently removes the table and all its data
DROP TABLE IF EXISTS temp_data;
\`\`\`

### 🏗️ Schema Migration Pattern
When you need complex changes, create a new table and migrate:
\`\`\`sql
-- 1. Create new structure
CREATE TABLE employees_v2 (
    id INTEGER PRIMARY KEY,
    full_name TEXT NOT NULL,
    department TEXT,
    salary REAL
);

-- 2. Migrate data
INSERT INTO employees_v2 (id, full_name, department, salary)
SELECT id, name, department, salary FROM employees;

-- 3. Swap tables
DROP TABLE employees;
ALTER TABLE employees_v2 RENAME TO employees;
\`\`\`

> **Production Tip**: In real apps, use schema migration tools (like Flyway or Alembic) that version-control your database changes.
        `,
        lab: {
            mission: "Practice schema evolution in the SQL Playground.",
            tasks: [
                "Add a 'phone' column to the employees table.",
                "Add an 'is_active' column with a DEFAULT value of 1.",
                "Rename the employees table to 'staff', then rename it back.",
                "Create a v2 of a table, migrate data, swap, and verify.",
                "Drop a test table using DROP TABLE IF EXISTS."
            ]
        }
    },

    // LEVEL 2: Module 11: Keys & Constraints
    "level-2-m11-0": {
        theory: `
# 11.1 Primary Keys & Constraints — Data Integrity

Constraints are the rules that keep your data clean and reliable. They prevent bad data from entering the database.

### 🔑 Primary Key (PK)
Uniquely identifies each row. **Must be unique and NOT NULL.**
\`\`\`sql
CREATE TABLE users (
    user_id INTEGER PRIMARY KEY,      -- Auto-increments in SQLite
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE
);
\`\`\`

### 🔗 Foreign Key (FK)
Links rows between tables. Ensures referential integrity.
\`\`\`sql
CREATE TABLE orders (
    order_id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    product TEXT NOT NULL,
    quantity INTEGER DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
\`\`\`

### 📋 All Constraint Types

| Constraint | Purpose | Example |
|:---|:---|:---|
| \`PRIMARY KEY\` | Unique row ID | \`id INTEGER PRIMARY KEY\` |
| \`NOT NULL\` | Prevent empty values | \`name TEXT NOT NULL\` |
| \`UNIQUE\` | No duplicates | \`email TEXT UNIQUE\` |
| \`CHECK\` | Custom validation | \`CHECK(age >= 0)\` |
| \`DEFAULT\` | Auto-fill values | \`DEFAULT 'active'\` |
| \`FOREIGN KEY\` | Link tables | \`REFERENCES users(id)\` |

### ⚠️ Why Bad PKs Are Bad

| PK Choice | Problem |
|:---|:---|
| Full name | People share names |
| Email | Users change emails |
| Phone | Numbers can change |
| Auto-increment INT | ✅ Best for most cases |
| UUID | ✅ Best for distributed systems |

### 🏗️ Complete Example
\`\`\`sql
CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    price REAL NOT NULL CHECK(price > 0),
    category TEXT NOT NULL DEFAULT 'General',
    sku TEXT UNIQUE,
    created_at TEXT DEFAULT (datetime('now'))
);
\`\`\`

> **Interview Question**: "What's the difference between a PRIMARY KEY and a UNIQUE constraint?" Answer: PK implies NOT NULL + UNIQUE and there can be only one per table. UNIQUE allows NULLs and you can have multiple.
        `,
        lab: {
            mission: "Design tables with proper constraints.",
            tasks: [
                "Create a 'users' table with user_id as PRIMARY KEY.",
                "Create an 'orders' table with a FOREIGN KEY referencing users.",
                "Add a CHECK constraint to ensure price > 0.",
                "Try inserting a row that violates a constraint — observe the error.",
                "Create a table with 5 different constraint types.",
                "Explain why 'Full Name' is a bad Primary Key choice."
            ]
        }
    }
};

export const getLessonBody = (topicId) => {
    return lessonContent[topicId] || {
        theory: `# Content In Development\nWe are drafting the professional deep-dive for this topic.\n\n### While You Wait:\n- **Practice in the SQL Playground** — try CREATE, INSERT, SELECT, UPDATE, DELETE\n- **Explore the Schema Browser** — click table names to auto-generate queries\n- **Use Templates** — click the Templates button for ready-made SQL snippets\n\n> Check back soon for the comprehensive guide!`,
        lab: {
            mission: "Free-form practice in the SQL Playground!",
            tasks: [
                "Create your own table with at least 3 columns.",
                "Insert 5 rows of data into your table.",
                "Write a SELECT query with WHERE and ORDER BY.",
                "Update a row and verify the change.",
                "Practice DELETE with the safe 3-step workflow: COUNT → PREVIEW → DELETE."
            ]
        }
    };
};
