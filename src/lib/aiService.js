/**
 * Mock AI Service for SQL Learning Platform.
 * Simulates LLM responses for SQL generation and debugging.
 */

const KNOWLEDGE_BASE = {
    "select": "The SELECT statement is used to fetch data from a database. You can specify columns or use * for all columns.",
    "join": "JOINs are used to combine rows from two or more tables based on a related column between them.",
    "index": "An index is a pointer to data in a table, similar to an index in a book. It makes searching faster.",
    "where": "The WHERE clause is used to filter records that fulfill a specific condition.",
    "group by": "GROUP BY groups rows that have the same values into summary rows, like 'find the number of customers in each country'."
};

export const getAiResponse = async (query) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const q = query.toLowerCase();

    // Check for keywords
    for (const [key, value] of Object.entries(KNOWLEDGE_BASE)) {
        if (q.includes(key)) {
            return `Tutor: \${value} Would you like to see a code example?`;
        }
    }

    if (q.includes("hi") || q.includes("hello")) {
        return "Hello! I'm your AI SQL Tutor. Ask me anything about SQL syntax or database performance!";
    }

    if (q.includes("generate") || q.includes("show")) {
        return "Tutor: To generate that query, I'd suggest starting with SELECT * FROM table_name WHERE condition. Does that help?";
    }

    return "Tutor: I'm not quite sure about that specific topic yet, but try asking about SELECT, JOINs, or Indexes!";
};

export const debugSqlError = (errorMessage, sqlCode) => {
    if (errorMessage.includes("no such table")) {
        return "AI Debugger: It looks like table name is misspelled or doesn't exist in the current schema. Check the schema browser!";
    }
    if (errorMessage.includes("syntax error")) {
        return "AI Debugger: There's a typo in your SQL syntax. Check for missing commas or unmatched parentheses.";
    }
    return "AI Debugger: {errorMessage}. Try checking the documentation for the correct syntax.";
};
