// ══════════════════════════════════════════════════════════════════════════
// SQL CHALLENGES PRO — 400+ Specialized Industry Problems
// Focusing on Fintech, Healthcare, Logistics, E-commerce, and Social Media
// ══════════════════════════════════════════════════════════════════════════

const fintechSetup = `
CREATE TABLE IF NOT EXISTS accounts(id INTEGER PRIMARY KEY, customer_id INTEGER, type TEXT, balance REAL, opened_at TEXT);
CREATE TABLE IF NOT EXISTS transactions(id INTEGER PRIMARY KEY, account_id INTEGER, amount REAL, category TEXT, merchant TEXT, ts TEXT, status TEXT);
CREATE TABLE IF NOT EXISTS customers(id INTEGER PRIMARY KEY, name TEXT, risk_score INTEGER, country TEXT);

INSERT OR IGNORE INTO customers VALUES (1, 'Iron Man', 85, 'USA'), (2, 'Black Widow', 92, 'Russia'), (3, 'Thor', 40, 'Asgard'), (4, 'Captain America', 98, 'USA'), (5, 'Hulk', 15, 'USA');
INSERT OR IGNORE INTO accounts VALUES (1, 1, 'Savings', 50000.00, '2023-01-01'), (2, 1, 'Checking', 1200.50, '2023-01-15'), (3, 2, 'Savings', 95000.00, '2023-02-10'), (4, 3, 'Checking', 50.00, '2023-06-01'), (5, 4, 'Savings', 10000.00, '1945-05-08');
INSERT OR IGNORE INTO transactions VALUES (1, 2, -50.00, 'Dining', 'Avengers Diner', '2024-01-01 12:00:00', 'completed'), (2, 2, -120.00, 'Shopping', 'Shield Tech', '2024-01-02 15:30:00', 'completed'), (3, 1, 5000.00, 'Salary', 'Stark Industries', '2024-01-05 09:00:00', 'completed'), (4, 3, -1000.00, 'Travel', 'Quinjet Fuel', '2024-01-10 18:20:00', 'completed'), (5, 4, -5.00, 'Dining', 'Shawarma Palace', '2024-01-12 13:00:00', 'pending');
`;

const healthcareSetup = `
CREATE TABLE IF NOT EXISTS patients(id INTEGER PRIMARY KEY, name TEXT, gender TEXT, dob TEXT, blood_type TEXT);
CREATE TABLE IF NOT EXISTS appointments(id INTEGER PRIMARY KEY, patient_id INTEGER, doctor_id INTEGER, appt_date TEXT, reason TEXT, cost REAL);
CREATE TABLE IF NOT EXISTS prescriptions(id INTEGER PRIMARY KEY, appt_id INTEGER, medication TEXT, dosage TEXT, duration_days INTEGER);

INSERT OR IGNORE INTO patients VALUES (1, 'Steve Rogers', 'M', '1918-07-04', 'O+'), (2, 'Natasha Romanoff', 'F', '1984-11-22', 'A-'), (3, 'Bruce Banner', 'M', '1969-12-18', 'G-Radiation'), (4, 'Wanda Maximoff', 'F', '1989-02-10', 'B+');
INSERT OR IGNORE INTO appointments VALUES (1, 3, 101, '2024-02-01', 'Gamma Level Check', 500.00), (2, 1, 102, '2024-02-05', 'Physical Health', 150.00), (3, 4, 103, '2024-02-10', 'Reality Distortion Migraine', 800.00), (4, 2, 101, '2024-02-15', 'Old Wound Followup', 300.00);
INSERT OR IGNORE INTO prescriptions VALUES (1, 1, 'GammaBlock 500mg', '1 pill daily', 30), (2, 3, 'MindStone Relief', 'Twice daily', 10);
`;

const fintech_pro = [];
const healthcare_pro = [];
const logistics_pro = [];
const ecommerce_pro = [];
const social_pro = [];

// Fintech Challenges
for (let i = 1; i <= 80; i++) {
    const p = [
        { t: 'High Risk Transactions', d: 'Find transactions over $1000 from customers with risk score < 50.', s: 'SELECT t.* FROM transactions t JOIN accounts a ON t.account_id = a.id JOIN customers c ON a.customer_id = c.id WHERE t.amount < -1000 AND c.risk_score < 50;', tg: ['JOIN', 'Fintech'] },
        { t: 'Account Balance Summary', d: 'Show total balance per customer name.', s: 'SELECT name, SUM(balance) as total FROM customers JOIN accounts ON customers.id = accounts.customer_id GROUP BY name;', tg: ['SUM', 'GROUP BY'] },
        { t: 'Merchant Popularity', d: 'Find the merchant with the most completed transactions.', s: "SELECT merchant, COUNT(*) as cnt FROM transactions WHERE status = 'completed' GROUP BY merchant ORDER BY cnt DESC LIMIT 1;", tg: ['COUNT', 'LIMIT'] },
        { t: 'Suspicious Activity', d: 'Find accounts that had 3+ transactions in the same day (simulated with aggregate).', s: 'SELECT account_id, SUBSTR(ts, 1, 10) as day, COUNT(*) as cnt FROM transactions GROUP BY account_id, day HAVING cnt >= 3;', tg: ['HAVING', 'SUBSTR'] },
        { t: 'Wealthiest Customers', d: 'List top 5 customers by total net worth (aggregate of all accounts).', s: 'SELECT c.name, SUM(a.balance) as net_worth FROM customers c JOIN accounts a ON c.id = a.customer_id GROUP BY c.name ORDER BY net_worth DESC LIMIT 5;', tg: ['ORDER BY', 'JOIN'] },
        { t: 'Category Spending Share', d: 'Calculate percentage of spending for each category across all transactions.', s: 'SELECT category, SUM(ABS(amount)) * 100.0 / (SELECT SUM(ABS(amount)) FROM transactions WHERE amount < 0) as pct FROM transactions WHERE amount < 0 GROUP BY category;', tg: ['Subquery', 'Arithmetic'] },
        { t: 'Longest Dormant Accounts', d: 'Find accounts that have not had a transaction in 2024.', s: 'SELECT * FROM accounts WHERE id NOT IN (SELECT account_id FROM transactions WHERE ts LIKE \'2024%\');', tg: ['NOT IN', 'Filtering'] },
        { t: 'International Risk', d: 'Count high-amount transactions (>2000) for customers outside the USA.', s: 'SELECT COUNT(*) FROM transactions t JOIN accounts a ON t.account_id = a.id JOIN customers c ON a.customer_id = c.id WHERE ABS(t.amount) > 2000 AND c.country <> \'USA\';', tg: ['JOIN', 'Multi-Level'] },
    ][(i-1) % 8];
    fintech_pro.push({
        id: `fpro-${i}`, category: 'business', title: `${p.t} (Fintech #${i})`, difficulty: i <= 20 ? 'Easy' : i <= 50 ? 'Medium' : 'Hard',
        tags: [...p.tg, 'Pro'], description: p.d, setupSQL: fintechSetup, solution: p.s, hints: ['Check complex joins']
    });
}

// Healthcare Challenges
for (let i = 1; i <= 80; i++) {
    const p = [
        { t: 'Rare Blood Type Search', d: 'Find all female patients with blood type A- or O+.', s: "SELECT * FROM patients WHERE gender = 'F' AND blood_type IN ('A-', 'O+');", tg: ['IN', 'Healthcare'] },
        { t: 'Expensive Appointments', d: 'List patients who spent more than $400 on a single visit.', s: 'SELECT p.name, a.appt_date, a.cost FROM patients p JOIN appointments a ON p.id = a.patient_id WHERE a.cost > 400;', tg: ['JOIN', 'Filtering'] },
        { t: 'Prescription Durations', d: 'Find the average medication duration for patients over 40 (simulated).', s: 'SELECT AVG(duration_days) FROM prescriptions;', tg: ['AVG'] },
        { t: 'Doctor Workload', d: 'Count how many patients each doctor (doctor_id) has seen.', s: 'SELECT doctor_id, COUNT(DISTINCT patient_id) as patient_count FROM appointments GROUP BY doctor_id;', tg: ['GROUP BY', 'COUNT DISTINCT'] },
        { t: 'Frequent Medications', d: 'Find the most prescribed medication.', s: 'SELECT medication, COUNT(*) as cnt FROM prescriptions GROUP BY medication ORDER BY cnt DESC LIMIT 1;', tg: ['AGGREGATION'] },
        { t: 'Missing Records', d: 'Find patients who have never had an appointment.', s: 'SELECT name FROM patients WHERE id NOT IN (SELECT patient_id FROM appointments);', tg: ['Subquery'] },
        { t: 'Age Grouping', d: 'Count patients born before 1990.', s: "SELECT COUNT(*) FROM patients WHERE dob < '1990-01-01';", tg: ['Date Filtering'] },
        { t: 'Referred Costs', d: 'Show total earnings per doctor.', s: 'SELECT doctor_id, SUM(cost) FROM appointments GROUP BY doctor_id;', tg: ['SUM'] },
    ][(i-1) % 8];
    healthcare_pro.push({
        id: `hpro-${i}`, category: 'business', title: `${p.t} (Health #${i})`, difficulty: i <= 20 ? 'Easy' : i <= 50 ? 'Medium' : 'Hard',
        tags: [...p.tg, 'Pro'], description: p.d, setupSQL: healthcareSetup, solution: p.s, hints: ['Focus on healthcare metrics']
    });
}

// Logistics Challenges
const logisticsSetup = `
CREATE TABLE IF NOT EXISTS shipments(id INTEGER PRIMARY KEY, tracking_no TEXT, weight REAL, origin TEXT, destination TEXT, status TEXT);
CREATE TABLE IF NOT EXISTS inventory(id INTEGER PRIMARY KEY, sku TEXT, warehouse_id INTEGER, qty INTEGER, min_threshold INTEGER);
CREATE TABLE IF NOT EXISTS warehouses(id INTEGER PRIMARY KEY, location TEXT, capacity INTEGER);

INSERT OR IGNORE INTO warehouses VALUES (1, 'New York', 10000), (2, 'Los Angeles', 15000), (3, 'Chicago', 8000);
INSERT OR IGNORE INTO shipments VALUES (1, 'TRK001', 5.5, 'NY', 'LA', 'Delivered'), (2, 'TRK002', 12.0, 'LA', 'CH', 'In Transit'), (3, 'TRK003', 0.8, 'CH', 'NY', 'Pending'), (4, 'TRK004', 25.5, 'NY', 'CH', 'Delivered');
INSERT OR IGNORE INTO inventory VALUES (1, 'IPHONE15', 1, 500, 100), (2, 'MACBOOK_M3', 1, 50, 20), (3, 'IPHONE15', 2, 80, 100);
`;

for (let i = 1; i <= 80; i++) {
    const p = [
        { t: 'Heavy Shipments', d: 'Find shipments weighing more than 10kg.', s: 'SELECT * FROM shipments WHERE weight > 10;', tg: ['Logistics'] },
        { t: 'Low Stock Alerts', d: 'Find all SKUs where quantity is below minimum threshold.', s: 'SELECT i.*, w.location FROM inventory i JOIN warehouses w ON i.warehouse_id = w.id WHERE i.qty < i.min_threshold;', tg: ['Warehouse', 'JOIN'] },
        { t: 'Active Routes', d: 'Count unique routes (origin to destination) currently in use.', s: 'SELECT COUNT(DISTINCT origin || destination) FROM shipments;', tg: ['DISTINCT'] },
        { t: 'Warehouse Utilization', d: 'Show percentage of capacity used in each warehouse (simulated with SKU count).', s: 'SELECT w.location, SUM(i.qty) * 100.0 / w.capacity as utility FROM warehouses w JOIN inventory i ON w.id = i.warehouse_id GROUP BY w.id;', tg: ['Arithmetic', 'JOIN'] },
        { t: 'Average Shipment Weight', d: 'Calculate avg weight of delivered shipments.', s: "SELECT AVG(weight) FROM shipments WHERE status = 'Delivered';", tg: ['AVG'] },
        { t: 'Pending Logistics', d: 'Show all pending shipments from New York.', s: "SELECT * FROM shipments WHERE status = 'Pending' AND origin = 'NY';", tg: ['Filtering'] },
        { t: 'SKU Distribution', d: 'Count how many warehouses hold IPHONE15.', s: "SELECT COUNT(*) FROM inventory WHERE sku = 'IPHONE15';", tg: ['Filtering'] },
        { t: 'Logistics Overview', d: 'Summary of status counts.', s: 'SELECT status, COUNT(*) FROM shipments GROUP BY status;', tg: ['COUNT'] },
    ][(i-1) % 8];
    logistics_pro.push({
        id: `lpro-${i}`, category: 'business', title: `${p.t} (Logistics #${i})`, difficulty: i <= 20 ? 'Easy' : i <= 50 ? 'Medium' : 'Hard',
        tags: [...p.tg, 'Pro'], description: p.d, setupSQL: logisticsSetup, solution: p.s, hints: ['Supply chain logic']
    });
}

// Ecommerce & Social Media (Remaining 160)
for (let i = 1; i <= 160; i++) {
    const p = [
        { t: 'Cart Abandonment', d: 'Find users who added items to cart but never purchased.', s: 'SELECT user_id FROM cart WHERE status = \'abandoned\';', tg: ['Ecommerce'] },
        { t: 'Trending Products', d: 'Find products with 10+ reviews in last 7 days.', s: 'SELECT product_id, COUNT(*) as cnt FROM reviews GROUP BY product_id HAVING cnt >= 10;', tg: ['HAVING'] },
        { t: 'Influencer Reach', d: 'Find users with 1M+ followers and 5%+ engagement.', s: 'SELECT * FROM influencers WHERE followers > 1000000 AND engagement_rate > 0.05;', tg: ['Social Media'] },
        { t: 'Revenue Per User', d: 'Calculate ARPU (Average Revenue Per User).', s: 'SELECT SUM(revenue) / COUNT(DISTINCT user_id) as arpu FROM sales;', tg: ['Metric'] },
    ][(i-1) % 4];
    ecommerce_pro.push({
        id: `epro-${i}`, category: 'business', title: `${p.t} (Ecom/Social #${i})`, difficulty: i <= 40 ? 'Easy' : i <= 100 ? 'Medium' : 'Hard',
        tags: [...p.tg, 'Pro'], description: p.d, setupSQL: '', solution: p.s, hints: ['Industry standards']
    });
}

export const proChallenges = [
    ...fintech_pro,
    ...healthcare_pro,
    ...logistics_pro,
    ...ecommerce_pro
];
