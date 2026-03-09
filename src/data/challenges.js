export const challenges = [
    {
        id: 'c1',
        title: 'Top Earning Employees',
        difficulty: 'Easy',
        tags: ['SELECT', 'ORDER BY', 'LIMIT'],
        description: `
Write a query to find the top 3 highest paid employees.
Return their \`first_name\`, \`last_name\`, and \`salary\`.
Sort the results by \`salary\` in descending order.
    `,
        setupSQL: `
      CREATE TABLE employees (id INTEGER, first_name TEXT, last_name TEXT, salary INTEGER);
      INSERT INTO employees VALUES
        (1, 'John', 'Doe', 75000),
        (2, 'Jane', 'Smith', 90000),
        (3, 'Michael', 'Johnson', 105000),
        (4, 'Emily', 'Davis', 82000),
        (5, 'David', 'Wilson', 115000),
        (6, 'Sarah', 'Brown', 68000);
    `,
        solution: `SELECT first_name, last_name, salary FROM employees ORDER BY salary DESC LIMIT 3;`
    },
    {
        id: 'c2',
        title: 'Department Average Salary',
        difficulty: 'Medium',
        tags: ['GROUP BY', 'JOIN', 'AGGREGATION'],
        description: `
Write a query to find the average salary for each department.
Return the \`department_name\` and the \`avg_salary\`.
Round the average salary to 0 decimal places if possible, or just the whole number.
Sort the results by the average salary in descending order.
    `,
        setupSQL: `
      CREATE TABLE departments (id INTEGER PRIMARY KEY, name TEXT);
      INSERT INTO departments VALUES (1, 'Engineering'), (2, 'Sales'), (3, 'HR');
      
      CREATE TABLE employees (id INTEGER, name TEXT, salary INTEGER, dept_id INTEGER);
      INSERT INTO employees VALUES
        (1, 'Alice', 95000, 1),
        (2, 'Bob', 110000, 1),
        (3, 'Charlie', 60000, 2),
        (4, 'Diana', 80000, 2),
        (5, 'Eve', 75000, 3);
    `,
        solution: `
      SELECT d.name as department_name, ROUND(AVG(e.salary), 0) as avg_salary
      FROM departments d
      JOIN employees e ON d.id = e.dept_id
      GROUP BY d.id, d.name
      ORDER BY avg_salary DESC;
    `
    },
    {
        id: 'c3',
        title: 'Consecutive Active Users',
        difficulty: 'Hard',
        tags: ['WINDOW FUNCTIONS', 'DATES', 'LEAD/LAG'],
        description: `
Write a query to find users who logged in for 3 or more consecutive days.
Return the \`user_id\`.
Ensure the results are unique and ordered by \`user_id\` ascending.
    `,
        setupSQL: `
      CREATE TABLE logins (user_id INTEGER, login_date DATE);
      INSERT INTO logins VALUES
        (1, '2023-10-01'), (1, '2023-10-02'), (1, '2023-10-03'), (1, '2023-10-06'),
        (2, '2023-10-01'), (2, '2023-10-02'), (2, '2023-10-04'),
        (3, '2023-10-05'), (3, '2023-10-06'), (3, '2023-10-07'), (3, '2023-10-08');
    `,
        solution: `
      WITH CTE AS (
        SELECT user_id, login_date,
               LEAD(login_date, 1) OVER(PARTITION BY user_id ORDER BY login_date) as next_1,
               LEAD(login_date, 2) OVER(PARTITION BY user_id ORDER BY login_date) as next_2
        FROM logins
      )
      SELECT DISTINCT user_id 
      FROM CTE 
      WHERE strftime('%J', next_1) - strftime('%J', login_date) = 1
        AND strftime('%J', next_2) - strftime('%J', login_date) = 2
      ORDER BY user_id;
    `
    }
];
