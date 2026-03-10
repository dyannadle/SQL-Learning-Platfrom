/**
 * Real educational content for SQL Mastery.
 * Keyed by topicPathId (levelId-moduleId-tIdx).
 * moduleId follows 'm1', 'm2' format from curriculum.js.
 * Uses real Markdown formatting for ReactMarkdown rendering with GFM and Highlighting.
 */

export const lessonContent = {
    // LEVEL 0: Foundations - Module 1
    "level-0-m1-0": {
        theory: `
# 1.1 What is Data?

Data is the lifeblood of modern technology. From your Instagram likes to your Uber route, everything is powered by data.

### 🧩 The Two Primary Types
1. **Unstructured Data**: Messy things like PDFs, images, and long emails.
2. **Structured Data**: Organized info that fits into rows and columns (like a spreadsheet).

**SQL is the language we use to talk to Structured Data.**

> **Note**: Think of data as "raw facts". Information is what we get when we organize those facts.
        `,
        lab: {
            mission: "Analyze a User Profile database.",
            tasks: [
                "Identify which field is 'Structured': (Email address or a random selfie image?)",
                "Explain why we can't easily search inside a random voice note using SQL."
            ]
        }
    },
    "level-0-m1-1": {
        theory: `
# 1.2 Types of Data

Computers handle different types of data in different ways. In SQL, we call these **Data Types**.

| Type | Example | Use Case |
| :--- | :--- | :--- |
| **INT** | 25 | Ages, Counts |
| **VARCHAR** | "John" | Names, Emails |
| **DECIMAL** | 99.99 | Prices, Ratings |
| **DATE** | 2023-05-01 | Birthdays, Logs |

Understanding types is crucial because you can't subtract a "Name" from a "Price"!
        `,
        lab: {
            mission: "Categorize real-world items into SQL types.",
            tasks: [
                "Age of a user -> ?",
                "Description of a product -> ?",
                "Account balance -> ?"
            ]
        }
    },
    "level-0-m1-2": {
        theory: `
# 1.3 Structured vs Unstructured Data

SQL works best with **Structured Data**. This means the data has a strict schema (a defined layout).

### Structured (SQL Friendly)
- Databases (Postgres, MySQL)
- Excel Spreadsheets
- CSV Files

### Unstructured (NoSQL/Blob Friendly)
- MP3 files
- JPG images
- YouTube videos

**Deep Insight**: Over 80% of enterprise data is actually unstructured, but the most *valuable* decision-making data is almost always structured!
        `,
        lab: {
            mission: "Decide where to store data.",
            tasks: [
                "Would you store a user's password in a SQL table?",
                "Would you store a 2GB raw video file in a SQL table? (Hint: Think about performance)"
            ]
        }
    },
    "level-0-m1-3": {
        theory: `
# 1.4 Evolution of Databases

How did we get here? From punch cards to the cloud.

1. **Flat Files**: Saving data in simple text files.
2. **Hierarchical Models**: Data like a family tree (rigid).
3. **Relational Model (SQL)**: Data in tables that "relate" to each other. (The Modern Standard).
4. **NoSQL**: Flexible, schemaless documents for massive scale.
        `,
        lab: {
            mission: "Historical Context.",
            tasks: [
                "Why did the Relational model (SQL) win over the Hierarchical model?",
                "Name one company that might use a NoSQL database for its speed."
            ]
        }
    },

    // LEVEL 1: SQL Basics - Module 4: SQL Syntax & Schema
    "level-1-m4-0": {
        theory: `
# 4.1 SQL Syntax Basics

SQL is a **declarative** language. Unlike Python or Java where you tell the computer *how* to do things, in SQL you tell the database *what* you want.

### The Standard Pattern
\`\`\`sql
SELECT column_name
FROM table_name
WHERE condition;
\`\`\`

### 💡 Key Rules:
1. **Case Insensitivity**: \`SELECT\` is the same as \`select\`. However, by convention, we capitalize keywords.
2. **Semicolons**: Use them to terminate statements.
3. **Identifiers**: Table and column names should be lowercase and use underscores (snake_case).
        `,
        lab: {
            mission: "Validate the syntax of an ecommerce query.",
            tasks: [
                "Fix the missing keyword in: \`* FROM employees;\`",
                "Ensure the query \`SELECT name FROM products\` ends with a semicolon."
            ]
        }
    },

    // LEVEL 1: SQL Basics - Module 6
    "level-1-m6-0": {
        theory: `
# 6.1 SQL Syntax Basics

SQL is designed to read like English sentences. It is **Declarative**, meaning you tell the DB *what* you want, not *how* to get it.

### The 4 Rules of Syntax:
1. **Keywords**: Words like ` + "`SELECT`" + ` or ` + "`FROM`" + ` are reserved.
2. **Semicolons**: Used to end a statement (though some systems allow skipping).
3. **Case Sensitivity**: SQL keywords are usually case-insensitive (` + "`select`" + ` = ` + "`SELECT`" + `), but data inside rows is often case-sensitive.
4. **Spacing**: Extra spaces and tabs don't matter to the engine.

` + "```sql\nSELECT * FROM users; -- This is a valid query!\n```" + `
        `,
        lab: {
            mission: "Analyze the anatomy of a query.",
            tasks: [
                "Find the Keyword in: SELECT name FROM employees;",
                "Fix this query: SELECT name FROM employees (Hint: Missing semicolon?)"
            ]
        }
    },
    "level-1-m6-3": {
        theory: `
# 6.4 The SELECT Statement

The ` + "`SELECT`" + ` statement is the foundation of SQL. It's how you ask the database to show you specific data.

### Syntax Anatomy
` + "```sql\nSELECT column_name\nFROM table_name;\n```" + `

### 🌟 Practice Example
` + "```sql\n-- Selecting only user names\nSELECT name FROM users;\n```" + `

**Watch how the engine retrieves only the relevant columns in the sandbox!**
        `,
        lab: {
            mission: "Interact with the E-commerce dataset.",
            tasks: [
                "Select all columns from the 'products' table.",
                "Try selecting only the 'name' and 'price' of items."
            ]
        }
    },

    // LEVEL 1: Module 7: Basic Filtering
    "level-1-m7-2": {
        theory: `
# 7.3 The WHERE Clause

The \`WHERE\` clause is the most powerful filter in your SQL toolkit. It allows you to select only the rows that meet specific criteria.

### Comparison Operators:
- \`=\` : Equals
- \`<>\` or \`!=\` : Not Equals
- \`>\` : Greater Than
- \`<\` : Less Than
- \`>=\` : Greater or Equal

\`\`\`sql
-- Get products more expensive than $50
SELECT * FROM products WHERE price > 50;
\`\`\`
        `,
        lab: {
            mission: "Filter the products table.",
            tasks: [
                "Find all products in the 'Electronics' category.",
                "Find products with a price exactly equal to 19.99."
            ]
        }
    },

    // LEVEL 2: Data Manipulation - Module 9: CRUD
    "level-2-m9-0": {
        theory: `
# 9.1 The UPDATE Statement

Data changes. When it does, we use the \`UPDATE\` statement. 

> **⚡ WARNING**: Always use a \`WHERE\` clause with \`UPDATE\`. If you forget it, you will update **EVERY SINGLE ROW** in the table!

### Syntax:
\`\`\`sql
UPDATE employees
SET salary = 85000
WHERE id = 5;
\`\`\`
        `,
        lab: {
            mission: "Adjust employee salaries.",
            tasks: [
                "Update the city of a customer with ID 10 to 'New York'.",
                "Increase the price of a product by 10% (Hint: SET price = price * 1.1)."
            ]
        }
    },

    // LEVEL 2: Module 11: Keys & Constraints
    "level-2-m11-0": {
        theory: `
# 11.1 Primary Keys

A **Primary Key (PK)** is a column (or set of columns) that uniquely identifies each row in a table.

### Rules for PKs:
1. **Uniqueness**: No two rows can have the same PK.
2. **Not Null**: A PK cannot be empty.
3. **Stability**: PKs should rarely change.

\`\`\`sql
CREATE TABLE users (
    user_id INT PRIMARY KEY,
    username VARCHAR(50)
);
\`\`\`
        `,
        lab: {
            mission: "Design a unique identifier system.",
            tasks: [
                "Explain why 'Full Name' is a bad Primary Key.",
                "Create a small table for 'Books' with an integer Primary Key."
            ]
        }
    }
};

export const getLessonBody = (topicId) => {
    return lessonContent[topicId] || {
        theory: `# Content coming soon!\nWe are still drafting the professional guide for this topic.\n\nCheck back soon for the deep-dive!`,
        lab: {
            mission: "Explore the SQL Sandbox!",
            tasks: [
                "Practice basic SELECT queries.",
                "Use the schema browser to find table names.",
                "Experiment with WHERE clauses."
            ]
        }
    };
};
