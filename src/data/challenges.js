export const challengeCategories = [
  { id: 'basic', title: 'Basic Queries', count: 50 },
  { id: 'filtering', title: 'Filtering & Conditions', count: 50 },
  { id: 'aggregation', title: 'Aggregation', count: 50 },
  { id: 'joins', title: 'Joins', count: 80 },
  { id: 'subqueries', title: 'Subqueries', count: 50 },
  { id: 'window', title: 'Window Functions', count: 60 },
  { id: 'design', title: 'Database Design', count: 40 },
  { id: 'optimization', title: 'Query Optimization', count: 40 },
  { id: 'transactions', title: 'Transactions', count: 30 },
  { id: 'business', title: 'Real Business Problems', count: 50 }
];

export const challenges = [
  // --- CATEGORY 1: BASIC QUERIES ---
  {
    id: 'basic-1',
    category: 'basic',
    title: 'Retrieve All Employees',
    difficulty: 'Beginner',
    tags: ['SELECT'],
    description: 'Select all columns and all rows from the `employees` table.',
    setupSQL: `
            CREATE TABLE employees (id INTEGER, name TEXT, salary INTEGER);
            INSERT INTO employees VALUES (1, 'John', 75000), (2, 'Jane', 90000);
        `,
    solution: 'SELECT * FROM employees;',
    hints: ['Use the * wildcard to select all columns.', 'Remember the semicolon.']
  },
  // --- COMPANY INTERVIEW PROBLEMS ---
  {
    id: 'amazon-1',
    category: 'business',
    company: 'Amazon',
    title: 'Top 3 Spenders',
    difficulty: 'Medium',
    tags: ['GROUP BY', 'ORDER BY', 'LIMIT'],
    description: `
**Amazon Interview Question**
Find the top 3 customers by total spending.
Return \`customer_id\` and \`total_spent\`.
        `,
    setupSQL: `
            CREATE TABLE orders (order_id INTEGER, customer_id INTEGER, amount DECIMAL);
            INSERT INTO orders VALUES 
                (1, 101, 250.00), (2, 102, 150.00), (3, 101, 300.00),
                (4, 103, 800.00), (5, 102, 50.00), (6, 104, 100.00);
        `,
    solution: 'SELECT customer_id, SUM(amount) as total_spent FROM orders GROUP BY customer_id ORDER BY total_spent DESC LIMIT 3;',
    hints: ['Use SUM() to calculate total spending.', 'GROUP BY the customer_id.']
  },
  {
    id: 'google-1',
    category: 'window',
    company: 'Google',
    title: 'Most Searched per Day',
    difficulty: 'Hard',
    tags: ['WINDOW FUNCTIONS', 'RANKING'],
    description: `
**Google Interview Question**
Find the most searched query per day.
Return \`search_date\`, \`search_query\`, and \`search_count\`.
        `,
    setupSQL: `
            CREATE TABLE search_logs (user_id INTEGER, search_query TEXT, search_date DATE);
            INSERT INTO search_logs VALUES 
                (1, 'sql join', '2023-10-01'), (2, 'sql join', '2023-10-01'),
                (3, 'window functions', '2023-10-01'), (1, 'postgres vs mysql', '2023-10-02'),
                (2, 'postgres vs mysql', '2023-10-02'), (3, 'sql join', '2023-10-02');
        `,
    solution: `
            WITH Counts AS (
                SELECT search_date, search_query, COUNT(*) as search_count
                FROM search_logs
                GROUP BY search_date, search_query
            ),
            Ranked AS (
                SELECT search_date, search_query, search_count,
                       RANK() OVER(PARTITION BY search_date ORDER BY search_count DESC) as rnk
                FROM Counts
            )
            SELECT search_date, search_query, search_count
            FROM Ranked
            WHERE rnk = 1;
        `,
    hints: ['Use a CTE to first count queries per day.', 'Use RANK() over partitioned dates.']
  },
  {
    id: 'netflix-1',
    category: 'business',
    company: 'Netflix',
    title: 'Binge Watchers',
    difficulty: 'Medium',
    tags: ['HAVING', 'GROUP BY'],
    description: `
**Netflix Interview Question**
Find users who watched more than 5 movies in a single day.
Return \`user_id\` and \`watch_date\`.
        `,
    setupSQL: `
            CREATE TABLE watch_history (user_id INTEGER, movie_id INTEGER, watch_date DATE);
            INSERT INTO watch_history VALUES 
                (1, 101, '2023-10-01'), (1, 102, '2023-10-01'), (1, 103, '2023-10-01'),
                (1, 104, '2023-10-01'), (1, 105, '2023-10-01'), (1, 106, '2023-10-01'),
                (2, 201, '2023-10-01'), (2, 202, '2023-10-01');
        `,
    solution: 'SELECT user_id, watch_date FROM watch_history GROUP BY user_id, watch_date HAVING COUNT(movie_id) > 5;',
    hints: ['Group by both user and date.', 'Use HAVING to filter after aggregating.']
  }
];
