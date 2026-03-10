// Auto-generated SQL Challenge Bank — 400+ problems across 10 categories
// Each challenge has: id, category, title, difficulty, tags, description, setupSQL, solution, hints

const basic = [];
const filtering = [];
const aggregation = [];
const joins = [];
const subqueries = [];
const windowFn = [];
const design = [];
const optimization = [];
const transactions = [];
const business = [];

// ═══════════════════════════════════════
// CATEGORY 1: BASIC QUERIES (50)
// ═══════════════════════════════════════
const basicSetup = `CREATE TABLE IF NOT EXISTS employees(id INTEGER PRIMARY KEY,name TEXT,department TEXT,salary INTEGER,hire_date TEXT);
INSERT OR IGNORE INTO employees VALUES(1,'Alice','Engineering',95000,'2020-01-15'),(2,'Bob','Sales',72000,'2019-06-01'),(3,'Carol','Engineering',88000,'2021-03-20'),(4,'David','Marketing',65000,'2018-11-10'),(5,'Eve','HR',70000,'2022-02-28'),(6,'Frank','Engineering',92000,'2020-07-14'),(7,'Grace','Sales',68000,'2021-09-05'),(8,'Hank','Marketing',71000,'2019-04-22'),(9,'Ivy','HR',73000,'2020-12-01'),(10,'Jack','Engineering',105000,'2017-08-30');`;

for (let i = 1; i <= 50; i++) {
    const problems = [
        { t: 'Select All Employees', d: 'Retrieve all columns from the employees table.', s: 'SELECT * FROM employees;', h: ['Use * wildcard'], tg: ['SELECT'] },
        { t: 'Select Names Only', d: 'Get only the name column from employees.', s: 'SELECT name FROM employees;', h: ['Specify column name after SELECT'], tg: ['SELECT'] },
        { t: 'Select Name and Salary', d: 'Get name and salary of all employees.', s: 'SELECT name, salary FROM employees;', h: ['Separate columns with commas'], tg: ['SELECT'] },
        { t: 'Count All Employees', d: 'How many total employees are there?', s: 'SELECT COUNT(*) AS total FROM employees;', h: ['Use COUNT(*)'], tg: ['COUNT'] },
        { t: 'Find Maximum Salary', d: 'What is the highest salary?', s: 'SELECT MAX(salary) AS max_salary FROM employees;', h: ['Use MAX()'], tg: ['MAX'] },
        { t: 'Find Minimum Salary', d: 'What is the lowest salary?', s: 'SELECT MIN(salary) AS min_salary FROM employees;', h: ['Use MIN()'], tg: ['MIN'] },
        { t: 'Calculate Average Salary', d: 'Find the average salary of all employees.', s: 'SELECT AVG(salary) AS avg_salary FROM employees;', h: ['Use AVG()'], tg: ['AVG'] },
        { t: 'Sum of All Salaries', d: 'Calculate total payroll (sum of all salaries).', s: 'SELECT SUM(salary) AS total_payroll FROM employees;', h: ['Use SUM()'], tg: ['SUM'] },
        { t: 'Distinct Departments', d: 'List all unique departments.', s: 'SELECT DISTINCT department FROM employees;', h: ['Use DISTINCT'], tg: ['DISTINCT'] },
        { t: 'Count Departments', d: 'How many distinct departments exist?', s: 'SELECT COUNT(DISTINCT department) FROM employees;', h: ['Combine COUNT with DISTINCT'], tg: ['COUNT', 'DISTINCT'] },
        { t: 'First 3 Employees', d: 'Show only the first 3 employees.', s: 'SELECT * FROM employees LIMIT 3;', h: ['Use LIMIT'], tg: ['LIMIT'] },
        { t: 'Employees Sorted by Name', d: 'List employees alphabetically by name.', s: 'SELECT * FROM employees ORDER BY name;', h: ['Use ORDER BY'], tg: ['ORDER BY'] },
        { t: 'Highest Paid First', d: 'List employees from highest to lowest salary.', s: 'SELECT * FROM employees ORDER BY salary DESC;', h: ['Use DESC for descending'], tg: ['ORDER BY'] },
        { t: 'Employee Alias', d: 'Show name as "Employee Name" and salary as "Annual Pay".', s: 'SELECT name AS "Employee Name", salary AS "Annual Pay" FROM employees;', h: ['Use AS for aliases'], tg: ['AS'] },
        { t: 'Monthly Salary', d: 'Calculate monthly salary (annual / 12) for each employee.', s: 'SELECT name, salary / 12 AS monthly FROM employees;', h: ['Divide salary by 12'], tg: ['Arithmetic'] },
        { t: 'Tax Calculation', d: 'Show each employee\'s name, salary, and 20% tax amount.', s: 'SELECT name, salary, salary * 0.2 AS tax FROM employees;', h: ['Multiply by 0.2'], tg: ['Arithmetic'] },
        { t: 'Take-Home Pay', d: 'Calculate take-home pay (salary minus 25% tax).', s: 'SELECT name, salary, salary * 0.75 AS take_home FROM employees;', h: ['Multiply by 0.75'], tg: ['Arithmetic'] },
        { t: 'Concatenate Info', d: 'Create a column showing "Name works in Department".', s: "SELECT name || ' works in ' || department AS info FROM employees;", h: ['Use || for concatenation'], tg: ['String'] },
        { t: 'Uppercase Names', d: 'Show all employee names in uppercase.', s: 'SELECT UPPER(name) AS upper_name FROM employees;', h: ['Use UPPER()'], tg: ['String'] },
        { t: 'Name Length', d: 'Show each employee\'s name and the length of their name.', s: 'SELECT name, LENGTH(name) AS name_length FROM employees;', h: ['Use LENGTH()'], tg: ['String'] },
        { t: 'Skip First 5', d: 'Show employees starting from the 6th one.', s: 'SELECT * FROM employees LIMIT 5 OFFSET 5;', h: ['Use OFFSET'], tg: ['LIMIT', 'OFFSET'] },
        { t: 'Page 2 Results', d: 'Show rows 4-6 (page 2, 3 per page).', s: 'SELECT * FROM employees LIMIT 3 OFFSET 3;', h: ['Page 2 = OFFSET 3'], tg: ['LIMIT', 'OFFSET'] },
        { t: 'Sort by Hire Date', d: 'Show employees sorted by hire date (newest first).', s: 'SELECT * FROM employees ORDER BY hire_date DESC;', h: ['Sort by hire_date DESC'], tg: ['ORDER BY'] },
        { t: 'Multi-Column Sort', d: 'Sort by department (A-Z), then salary (high to low).', s: 'SELECT * FROM employees ORDER BY department ASC, salary DESC;', h: ['Multiple ORDER BY columns'], tg: ['ORDER BY'] },
        { t: 'Department and Count', d: 'Show each department with its employee count.', s: 'SELECT department, COUNT(*) AS cnt FROM employees GROUP BY department;', h: ['Use GROUP BY'], tg: ['GROUP BY'] },
        { t: 'Salary Range', d: 'Find the difference between highest and lowest salary.', s: 'SELECT MAX(salary) - MIN(salary) AS salary_range FROM employees;', h: ['Subtract MIN from MAX'], tg: ['MAX', 'MIN'] },
        { t: 'Simple Math', d: 'Use SQL as a calculator: what is 15 * 23 + 7?', s: 'SELECT 15 * 23 + 7 AS result;', h: ['SQL can do math without tables'], tg: ['Arithmetic'] },
        { t: 'Current Date', d: 'Show today\'s date using SQL.', s: "SELECT date('now') AS today;", h: ['Use date function'], tg: ['Date'] },
        { t: 'Boolean Check', d: 'Show each employee and whether salary > 80000.', s: "SELECT name, CASE WHEN salary > 80000 THEN 'Yes' ELSE 'No' END AS high_earner FROM employees;", h: ['Use CASE WHEN'], tg: ['CASE'] },
        { t: 'Salary Level Labels', d: 'Label salaries as Senior(>90K), Mid(>60K), or Junior.', s: "SELECT name, salary, CASE WHEN salary > 90000 THEN 'Senior' WHEN salary > 60000 THEN 'Mid' ELSE 'Junior' END AS level FROM employees;", h: ['Use nested CASE WHEN'], tg: ['CASE'] },
        { t: 'Substr Names', d: 'Show first 3 characters of each name.', s: 'SELECT SUBSTR(name, 1, 3) AS short FROM employees;', h: ['Use SUBSTR()'], tg: ['String'] },
        { t: 'Replace Text', d: 'Replace "Engineering" with "Eng" in department names.', s: "SELECT name, REPLACE(department, 'Engineering', 'Eng') AS dept FROM employees;", h: ['Use REPLACE()'], tg: ['String'] },
        { t: 'Round Average', d: 'Show the average salary rounded to 2 decimal places.', s: 'SELECT ROUND(AVG(salary), 2) AS avg_sal FROM employees;', h: ['Use ROUND()'], tg: ['ROUND'] },
        { t: 'Absolute Difference', d: 'Show salary difference from average for each employee.', s: 'SELECT name, salary, salary - (SELECT AVG(salary) FROM employees) AS diff FROM employees;', h: ['Use subquery for AVG'], tg: ['Subquery'] },
        { t: 'Type Check', d: 'Check the data type of different values.', s: "SELECT typeof(42), typeof('hello'), typeof(3.14), typeof(NULL);", h: ['Use typeof()'], tg: ['typeof'] },
        { t: 'Coalesce NULL', d: 'Replace NULL department with "Unassigned".', s: "SELECT name, COALESCE(department, 'Unassigned') AS dept FROM employees;", h: ['Use COALESCE()'], tg: ['COALESCE'] },
        { t: 'IIF Shorthand', d: 'Use IIF to label salary > 80K as "High" else "Standard".', s: "SELECT name, IIF(salary > 80000, 'High', 'Standard') AS tier FROM employees;", h: ['IIF is a shorthand CASE'], tg: ['IIF'] },
        { t: 'Count by Department', d: 'Count employees grouped by department, sorted by count descending.', s: 'SELECT department, COUNT(*) AS cnt FROM employees GROUP BY department ORDER BY cnt DESC;', h: ['Combine GROUP BY and ORDER BY'], tg: ['GROUP BY', 'ORDER BY'] },
        { t: 'Average by Department', d: 'Show average salary per department.', s: 'SELECT department, ROUND(AVG(salary)) AS avg_sal FROM employees GROUP BY department;', h: ['GROUP BY department'], tg: ['GROUP BY', 'AVG'] },
        { t: 'Max Salary Per Dept', d: 'Find the highest salary in each department.', s: 'SELECT department, MAX(salary) AS top_salary FROM employees GROUP BY department;', h: ['Use MAX with GROUP BY'], tg: ['GROUP BY', 'MAX'] },
        { t: 'Newest Employee', d: 'Find the most recently hired employee.', s: 'SELECT * FROM employees ORDER BY hire_date DESC LIMIT 1;', h: ['Sort by hire_date DESC, LIMIT 1'], tg: ['ORDER BY', 'LIMIT'] },
        { t: 'Oldest Employee', d: 'Find the employee who was hired first.', s: 'SELECT * FROM employees ORDER BY hire_date ASC LIMIT 1;', h: ['Sort ascending, LIMIT 1'], tg: ['ORDER BY', 'LIMIT'] },
        { t: 'Total by Department', d: 'Show total salary cost per department.', s: 'SELECT department, SUM(salary) AS total FROM employees GROUP BY department;', h: ['SUM with GROUP BY'], tg: ['SUM', 'GROUP BY'] },
        { t: 'Percentage of Total', d: 'Show each employee salary as % of total payroll.', s: 'SELECT name, salary, ROUND(salary * 100.0 / (SELECT SUM(salary) FROM employees), 1) AS pct FROM employees;', h: ['Divide by subquery SUM'], tg: ['Subquery', 'Arithmetic'] },
        { t: 'Above Average', d: 'Find employees earning above average.', s: 'SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);', h: ['Use subquery in WHERE'], tg: ['Subquery'] },
        { t: 'Below Average', d: 'Find employees earning below average.', s: 'SELECT * FROM employees WHERE salary < (SELECT AVG(salary) FROM employees);', h: ['Use < with subquery'], tg: ['Subquery'] },
        { t: 'Hire Year', d: 'Extract the year from hire_date.', s: "SELECT name, SUBSTR(hire_date, 1, 4) AS hire_year FROM employees;", h: ['SUBSTR first 4 chars'], tg: ['String', 'Date'] },
        { t: 'Years Employed', d: 'Approximate years each employee has worked.', s: "SELECT name, (strftime('%Y','now') - SUBSTR(hire_date,1,4)) AS years FROM employees;", h: ['Subtract year'], tg: ['Date'] },
        { t: 'Salary Double', d: 'Show what each salary would be if doubled.', s: 'SELECT name, salary, salary * 2 AS doubled FROM employees;', h: ['Multiply by 2'], tg: ['Arithmetic'] },
        { t: 'Department Summary', d: 'Show department, count, min, max, avg salary in one query.', s: 'SELECT department, COUNT(*) AS cnt, MIN(salary) AS min_s, MAX(salary) AS max_s, ROUND(AVG(salary)) AS avg_s FROM employees GROUP BY department;', h: ['Multiple aggregates in one query'], tg: ['GROUP BY', 'Aggregates'] },
    ];
    if (i <= problems.length) {
        const p = problems[i - 1];
        basic.push({
            id: `basic-${i}`, category: 'basic', title: p.t, difficulty: i <= 20 ? 'Beginner' : i <= 35 ? 'Easy' : 'Medium',
            tags: p.tg, description: p.d, setupSQL: basicSetup, solution: p.s, hints: p.h
        });
    }
}

export { basic };
