// Challenges: Database Design, Query Optimization, Transactions, Real Business Problems

const designSetup = `CREATE TABLE IF NOT EXISTS employees(id INTEGER PRIMARY KEY,name TEXT,department TEXT,salary INTEGER,hire_date TEXT);
INSERT OR IGNORE INTO employees VALUES(1,'Alice','Engineering',95000,'2020-01-15'),(2,'Bob','Sales',72000,'2019-06-01'),(3,'Carol','Engineering',88000,'2021-03-20'),(4,'David','Marketing',65000,'2018-11-10'),(5,'Eve','HR',70000,'2022-02-28');`;

export const design = Array.from({ length: 40 }, (_, i) => {
    const idx = i + 1;
    const templates = [
        { t: 'Create Users Table', d: 'Create a users table with id, username (unique), email (unique, not null), created_at (default now).', s: "CREATE TABLE users(id INTEGER PRIMARY KEY, username TEXT UNIQUE, email TEXT NOT NULL UNIQUE, created_at TEXT DEFAULT(datetime('now')));", tg: ['CREATE TABLE', 'Constraints'] },
        { t: 'Add Column', d: 'Add a phone column to the employees table.', s: 'ALTER TABLE employees ADD COLUMN phone TEXT;', tg: ['ALTER TABLE'] },
        { t: 'Create Orders Table with FK', d: 'Create an orders table with a foreign key to customers.', s: 'CREATE TABLE orders(id INTEGER PRIMARY KEY, customer_id INTEGER NOT NULL, total REAL, FOREIGN KEY(customer_id) REFERENCES customers(id));', tg: ['FOREIGN KEY'] },
        { t: 'Check Constraint', d: 'Create a products table where price must be positive.', s: 'CREATE TABLE products(id INTEGER PRIMARY KEY, name TEXT NOT NULL, price REAL CHECK(price > 0));', tg: ['CHECK'] },
        { t: 'Default Values', d: 'Create a table with sensible defaults for status and created_at.', s: "CREATE TABLE tasks(id INTEGER PRIMARY KEY, title TEXT NOT NULL, status TEXT DEFAULT 'pending', created_at TEXT DEFAULT(datetime('now')));", tg: ['DEFAULT'] },
        { t: 'Composite Primary Key', d: 'Create a enrollment table with composite PK (student_id, course_id).', s: 'CREATE TABLE enrollment(student_id INTEGER, course_id INTEGER, grade TEXT, PRIMARY KEY(student_id, course_id));', tg: ['Composite PK'] },
        { t: 'Drop Table Safely', d: 'Drop a table only if it exists.', s: 'DROP TABLE IF EXISTS temp_data;', tg: ['DROP TABLE'] },
        { t: 'Rename Table', d: 'Rename employees to staff.', s: 'ALTER TABLE employees RENAME TO staff;', tg: ['ALTER TABLE'] },
        { t: 'Create Index', d: 'Create an index on the salary column.', s: 'CREATE INDEX idx_salary ON employees(salary);', tg: ['CREATE INDEX'] },
        { t: 'Unique Index', d: 'Create a unique index on email.', s: 'CREATE UNIQUE INDEX idx_email ON users(email);', tg: ['UNIQUE INDEX'] },
    ];
    const p = templates[i % templates.length];
    return { id: `d-${idx}`, category: 'design', title: `${p.t} (${idx})`, difficulty: idx <= 15 ? 'Easy' : idx <= 30 ? 'Medium' : 'Hard', tags: p.tg, description: p.d, setupSQL: designSetup, solution: p.s, hints: ['Think about table structure and constraints'] };
});

export const optimization = Array.from({ length: 40 }, (_, i) => {
    const idx = i + 1;
    const optSetup = `CREATE TABLE IF NOT EXISTS logs(id INTEGER PRIMARY KEY,user_id INTEGER,action TEXT,ts TEXT);
INSERT OR IGNORE INTO logs VALUES(1,1,'login','2024-01-01'),(2,1,'view','2024-01-01'),(3,2,'login','2024-01-02'),(4,1,'purchase','2024-01-02'),(5,3,'login','2024-01-03'),(6,2,'view','2024-01-03'),(7,3,'purchase','2024-01-04'),(8,1,'login','2024-01-04');`;
    const templates = [
        { t: 'Explain Query Plan', d: 'Use EXPLAIN QUERY PLAN to analyze a SELECT query.', s: 'EXPLAIN QUERY PLAN SELECT * FROM logs WHERE user_id = 1;', tg: ['EXPLAIN'] },
        { t: 'Create Index for Filter', d: 'Create an index to speed up filtering by user_id.', s: 'CREATE INDEX idx_user ON logs(user_id);', tg: ['INDEX'] },
        { t: 'Covering Index', d: 'Create an index that covers both user_id and action.', s: 'CREATE INDEX idx_user_action ON logs(user_id, action);', tg: ['Covering Index'] },
        { t: 'Avoid SELECT *', d: 'Rewrite SELECT * FROM logs to select only needed columns.', s: 'SELECT user_id, action, ts FROM logs WHERE user_id = 1;', tg: ['SELECT optimization'] },
        { t: 'Use EXISTS vs IN', d: 'Rewrite a query using EXISTS instead of IN for better performance.', s: 'SELECT DISTINCT user_id FROM logs l WHERE EXISTS (SELECT 1 FROM logs WHERE user_id = l.user_id AND action = \'purchase\');', tg: ['EXISTS'] },
        { t: 'LIMIT for Sampling', d: 'Get a quick sample of 5 rows instead of full scan.', s: 'SELECT * FROM logs LIMIT 5;', tg: ['LIMIT'] },
        { t: 'Count with Index', d: 'Count logins efficiently.', s: "SELECT COUNT(*) FROM logs WHERE action = 'login';", tg: ['COUNT', 'INDEX'] },
        { t: 'Composite Index Order', d: 'Create optimal index for WHERE user_id=? AND action=?.', s: 'CREATE INDEX idx_opt ON logs(user_id, action);', tg: ['Composite Index'] },
    ];
    const p = templates[i % templates.length];
    return { id: `o-${idx}`, category: 'optimization', title: `${p.t} (${idx})`, difficulty: idx <= 15 ? 'Medium' : 'Hard', tags: p.tg, description: p.d, setupSQL: optSetup, solution: p.s, hints: ['Think about index usage and query plans'] };
});

export const transactions = Array.from({ length: 30 }, (_, i) => {
    const idx = i + 1;
    const txSetup = `CREATE TABLE IF NOT EXISTS accounts(id INTEGER PRIMARY KEY,name TEXT,balance REAL);
INSERT OR IGNORE INTO accounts VALUES(1,'Alice',5000),(2,'Bob',3000),(3,'Carol',7500);`;
    const templates = [
        { t: 'Basic Transaction', d: 'Transfer $500 from Alice to Bob using a transaction.', s: 'BEGIN TRANSACTION; UPDATE accounts SET balance = balance - 500 WHERE name = \'Alice\'; UPDATE accounts SET balance = balance + 500 WHERE name = \'Bob\'; COMMIT;', tg: ['BEGIN', 'COMMIT'] },
        { t: 'Rollback Demo', d: 'Start a transaction, make a change, then rollback.', s: 'BEGIN; UPDATE accounts SET balance = 0 WHERE id = 1; ROLLBACK;', tg: ['ROLLBACK'] },
        { t: 'Check Balance After', d: 'Verify balances after a transaction.', s: 'SELECT * FROM accounts;', tg: ['SELECT'] },
        { t: 'Savepoint', d: 'Create a savepoint within a transaction.', s: 'BEGIN; SAVEPOINT sp1; UPDATE accounts SET balance = balance + 1000 WHERE id = 1; ROLLBACK TO sp1; COMMIT;', tg: ['SAVEPOINT'] },
        { t: 'Atomic Insert', d: 'Insert multiple rows atomically.', s: "BEGIN; INSERT INTO accounts VALUES(4,'David',2000); INSERT INTO accounts VALUES(5,'Eve',4000); COMMIT;", tg: ['BEGIN', 'INSERT'] },
        { t: 'Conditional Update', d: 'Only update if balance is sufficient (simulate check).', s: "UPDATE accounts SET balance = balance - 1000 WHERE name = 'Alice' AND balance >= 1000;", tg: ['Conditional UPDATE'] },
    ];
    const p = templates[i % templates.length];
    return { id: `t-${idx}`, category: 'transactions', title: `${p.t} (${idx})`, difficulty: idx <= 10 ? 'Medium' : 'Hard', tags: p.tg, description: p.d, setupSQL: txSetup, solution: p.s, hints: ['Use BEGIN/COMMIT/ROLLBACK'] };
});

export const business = Array.from({ length: 50 }, (_, i) => {
    const idx = i + 1;
    const bizSetup = `CREATE TABLE IF NOT EXISTS orders(id INTEGER PRIMARY KEY,customer_id INTEGER,product TEXT,amount REAL,order_date TEXT,status TEXT);
CREATE TABLE IF NOT EXISTS customers(id INTEGER PRIMARY KEY,name TEXT,city TEXT,signup_date TEXT);
INSERT OR IGNORE INTO customers VALUES(1,'Alice','NYC','2023-01-10'),(2,'Bob','LA','2023-03-15'),(3,'Carol','Chicago','2023-06-20'),(4,'David','NYC','2023-09-01'),(5,'Eve','LA','2024-01-05');
INSERT OR IGNORE INTO orders VALUES(1,1,'Laptop',1200,'2024-01-15','completed'),(2,1,'Mouse',50,'2024-02-01','completed'),(3,2,'Keyboard',150,'2024-01-20','completed'),(4,3,'Monitor',400,'2024-03-10','completed'),(5,3,'Webcam',70,'2024-03-10','returned'),(6,5,'Laptop',1100,'2024-04-01','completed'),(7,1,'Headphones',80,'2024-04-15','completed'),(8,4,'Mouse',45,'2024-05-01','pending'),(9,2,'Tablet',350,'2024-05-15','completed'),(10,1,'SSD',120,'2024-06-01','completed');`;
    const templates = [
        { t: 'Top 3 Spenders', d: '**Amazon-style**: Find top 3 customers by total spending.', s: 'SELECT c.name, SUM(o.amount) AS total FROM customers c JOIN orders o ON c.id=o.customer_id WHERE o.status=\'completed\' GROUP BY c.name ORDER BY total DESC LIMIT 3;', tg: ['JOIN', 'GROUP BY'], company: 'Amazon' },
        { t: 'Monthly Revenue', d: '**Stripe-style**: Calculate monthly revenue trends.', s: "SELECT SUBSTR(order_date,1,7) AS month, SUM(amount) AS revenue FROM orders WHERE status='completed' GROUP BY month ORDER BY month;", tg: ['GROUP BY', 'Date'], company: 'Stripe' },
        { t: 'Customer Retention', d: '**Netflix-style**: Find customers who ordered in both Q1 and Q2 2024.', s: "SELECT DISTINCT c.name FROM customers c JOIN orders o ON c.id=o.customer_id WHERE o.order_date BETWEEN '2024-01-01' AND '2024-03-31' AND c.id IN (SELECT customer_id FROM orders WHERE order_date BETWEEN '2024-04-01' AND '2024-06-30');", tg: ['Subquery', 'BETWEEN'], company: 'Netflix' },
        { t: 'Return Rate', d: '**Shopify-style**: Calculate the return rate (returned / total * 100).', s: "SELECT ROUND(COUNT(CASE WHEN status='returned' THEN 1 END)*100.0/COUNT(*),1) AS return_rate FROM orders;", tg: ['CASE', 'Arithmetic'], company: 'Shopify' },
        { t: 'City Revenue Ranking', d: '**Uber-style**: Rank cities by total revenue.', s: "SELECT c.city, SUM(o.amount) AS revenue, RANK() OVER (ORDER BY SUM(o.amount) DESC) AS city_rank FROM customers c JOIN orders o ON c.id=o.customer_id WHERE o.status='completed' GROUP BY c.city;", tg: ['RANK', 'JOIN'], company: 'Uber' },
        { t: 'New vs Returning', d: '**Google-style**: Categorize customers as new (<6 months) or returning.', s: "SELECT c.name, CASE WHEN c.signup_date >= '2023-07-01' THEN 'New' ELSE 'Returning' END AS type, COUNT(o.id) AS orders FROM customers c LEFT JOIN orders o ON c.id=o.customer_id GROUP BY c.name, type;", tg: ['CASE', 'JOIN'], company: 'Google' },
        { t: 'Average Order Value', d: '**Meta-style**: Calculate AOV per city.', s: "SELECT c.city, ROUND(AVG(o.amount),2) AS aov FROM customers c JOIN orders o ON c.id=o.customer_id WHERE o.status='completed' GROUP BY c.city;", tg: ['AVG', 'JOIN'], company: 'Meta' },
        { t: 'Cohort Analysis', d: '**Spotify-style**: Group customers by signup month and count orders.', s: "SELECT SUBSTR(c.signup_date,1,7) AS cohort, COUNT(DISTINCT c.id) AS users, COUNT(o.id) AS orders FROM customers c LEFT JOIN orders o ON c.id=o.customer_id GROUP BY cohort;", tg: ['GROUP BY', 'JOIN'], company: 'Spotify' },
        { t: 'Product Performance', d: '**Apple-style**: Find best and worst selling products.', s: "SELECT product, SUM(amount) AS revenue, COUNT(*) AS orders FROM orders WHERE status='completed' GROUP BY product ORDER BY revenue DESC;", tg: ['GROUP BY', 'ORDER BY'], company: 'Apple' },
        { t: 'Churn Detection', d: '**Twitter-style**: Find customers who haven\'t ordered in 60+ days.', s: "SELECT c.name, MAX(o.order_date) AS last_order FROM customers c LEFT JOIN orders o ON c.id=o.customer_id GROUP BY c.name HAVING MAX(o.order_date) < date('now','-60 days') OR MAX(o.order_date) IS NULL;", tg: ['HAVING', 'Date'], company: 'Twitter' },
    ];
    const p = templates[i % templates.length];
    return { id: `b-${idx}`, category: 'business', title: `${p.t} (${idx})`, difficulty: idx <= 15 ? 'Medium' : 'Hard', tags: p.tg, description: p.d, setupSQL: bizSetup, solution: p.s, hints: ['Think about real business metrics'], company: p.company };
});
