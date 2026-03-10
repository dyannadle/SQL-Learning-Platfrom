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
