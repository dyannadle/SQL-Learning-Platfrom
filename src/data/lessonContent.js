/**
 * Real educational content for SQL Mastery.
 * Keyed by topicPathId (levelId-moduleId-tIdx).
 */

export const lessonContent = {
    "level-0-module-1-0": {
        theory: `
# What is Data?
Data is a collection of facts, such as numbers, words, measurements, observations or just descriptions of things. In our digital age, data is the "new oil" that powers decisions for apps like Instagram, Uber, and Amazon.

### Types of Data
1. **Qualitative**: Descriptive (e.g., 'The car is red')
2. **Quantitative**: Numerical (e.g., 'The car has 4 wheels')

In databases, we care most about **Structured Data** - information that is highly organized and easily searchable.
        `,
        lab: {
            mission: "Identify the structured data in a typical user profile.",
            tasks: ["List 3 data points for a user", "Determine if 'Name' is qualitative or quantitative"]
        }
    },
    "level-0-module-1-1": {
        theory: `
# Types of Data
When we talk about data in SQL, we specifically look at how computers store different types of info.

### Common SQL Data Types
- **String (VARCHAR)**: Text like names or addresses.
- **Integer (INT)**: Whole numbers like age or count.
- **Decimal (FLOAT/DECIMAL)**: Numbers with points like prices ($9.99).
- **Boolean**: Yes/No or True/False.

Choosing the right type is the first step to becoming a Data Engineer!
        `,
        lab: {
            mission: "Can you map these real-world items to SQL types?",
            tasks: ["Product Price -> ?", "Account Active -> ?", "Username -> ?"]
        }
    }
};

export const getLessonBody = (topicId) => {
    return lessonContent[topicId] || {
        theory: "# Content coming soon!",
        lab: { mission: "Explore the editor!", tasks: ["Run a query", "Check results"] }
    };
};
