// Challenges: Filtering, Aggregation, Joins, Subqueries, Window Functions
// Each category: 40-80 problems

const filterSetup = `CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY,name TEXT,category TEXT,price REAL,stock INTEGER,rating REAL);
INSERT OR IGNORE INTO products VALUES(1,'Laptop Pro','Electronics',1299.99,45,4.5),(2,'Wireless Mouse','Electronics',49.99,120,4.2),(3,'Coffee Maker','Home',89.50,30,4.7),(4,'Desk Chair','Furniture',199.00,15,3.9),(5,'Keyboard','Electronics',145.00,60,4.6),(6,'Blender','Home',65.00,40,4.1),(7,'Monitor','Electronics',399.99,25,4.8),(8,'Bookshelf','Furniture',159.00,20,3.5),(9,'Headphones','Electronics',79.99,90,4.4),(10,'Lamp','Home',35.00,55,3.8),(11,'Standing Desk','Furniture',549.99,10,4.9),(12,'Webcam','Electronics',69.99,75,4.0),(13,'Toaster','Home',29.99,80,3.6),(14,'Mouse Pad','Electronics',12.99,200,4.1),(15,'Couch','Furniture',899.00,5,4.3);`;

const aggSetup = `CREATE TABLE IF NOT EXISTS sales(id INTEGER PRIMARY KEY,product TEXT,category TEXT,amount REAL,quantity INTEGER,sale_date TEXT,region TEXT);
INSERT OR IGNORE INTO sales VALUES(1,'Widget A','Electronics',150,3,'2024-01-15','East'),(2,'Widget B','Home',80,1,'2024-01-20','West'),(3,'Widget A','Electronics',450,9,'2024-02-10','East'),(4,'Gadget X','Electronics',200,2,'2024-02-14','South'),(5,'Widget B','Home',160,2,'2024-03-01','East'),(6,'Gadget Y','Home',95,1,'2024-03-15','North'),(7,'Widget A','Electronics',300,6,'2024-04-01','West'),(8,'Gadget X','Electronics',500,5,'2024-04-20','East'),(9,'Widget C','Furniture',350,7,'2024-05-10','South'),(10,'Gadget Y','Home',190,2,'2024-05-25','North'),(11,'Widget A','Electronics',750,15,'2024-06-01','East'),(12,'Widget C','Furniture',700,14,'2024-06-15','West');`;

const joinSetup = `CREATE TABLE IF NOT EXISTS customers(id INTEGER PRIMARY KEY,name TEXT,city TEXT,tier TEXT);
CREATE TABLE IF NOT EXISTS orders(id INTEGER PRIMARY KEY,customer_id INTEGER,product TEXT,amount REAL,order_date TEXT);
INSERT OR IGNORE INTO customers VALUES(1,'Alice','NYC','Gold'),(2,'Bob','LA','Silver'),(3,'Carol','Chicago','Gold'),(4,'David','NYC','Bronze'),(5,'Eve','LA','Gold'),(6,'Frank','Miami','Silver'),(7,'Grace','Seattle','Bronze');
INSERT OR IGNORE INTO orders VALUES(1,1,'Laptop',1200,'2024-01-15'),(2,1,'Mouse',50,'2024-02-01'),(3,2,'Keyboard',150,'2024-01-20'),(4,3,'Monitor',400,'2024-03-10'),(5,3,'Webcam',70,'2024-03-10'),(6,5,'Laptop',1100,'2024-04-01'),(7,1,'Headphones',80,'2024-04-15'),(8,4,'Mouse',45,'2024-05-01');`;

export const filtering = [
    { id: 'f-1', category: 'filtering', title: 'Price Above 100', difficulty: 'Beginner', tags: ['WHERE', '>'], description: 'Find all products with price greater than $100.', setupSQL: filterSetup, solution: 'SELECT * FROM products WHERE price > 100;', hints: ['Use WHERE with >'] },
    { id: 'f-2', category: 'filtering', title: 'Electronics Only', difficulty: 'Beginner', tags: ['WHERE', '='], description: 'Find all products in the Electronics category.', setupSQL: filterSetup, solution: "SELECT * FROM products WHERE category = 'Electronics';", hints: ['Use = with string value'] },
    { id: 'f-3', category: 'filtering', title: 'Low Stock Alert', difficulty: 'Beginner', tags: ['WHERE', '<='], description: 'Find products with stock of 20 or less.', setupSQL: filterSetup, solution: 'SELECT * FROM products WHERE stock <= 20;', hints: ['Use <='] },
    { id: 'f-4', category: 'filtering', title: 'Price Range', difficulty: 'Beginner', tags: ['BETWEEN'], description: 'Find products priced between $50 and $200.', setupSQL: filterSetup, solution: 'SELECT * FROM products WHERE price BETWEEN 50 AND 200;', hints: ['Use BETWEEN'] },
    { id: 'f-5', category: 'filtering', title: 'Name Starts With', difficulty: 'Beginner', tags: ['LIKE'], description: 'Find products whose name starts with "W".', setupSQL: filterSetup, solution: "SELECT * FROM products WHERE name LIKE 'W%';", hints: ['Use LIKE with W%'] },
    { id: 'f-6', category: 'filtering', title: 'Multiple Categories', difficulty: 'Easy', tags: ['IN'], description: 'Find products in Electronics or Home categories.', setupSQL: filterSetup, solution: "SELECT * FROM products WHERE category IN ('Electronics', 'Home');", hints: ['Use IN with list'] },
    { id: 'f-7', category: 'filtering', title: 'Not Electronics', difficulty: 'Easy', tags: ['NOT', '<>'], description: 'Find all products NOT in Electronics.', setupSQL: filterSetup, solution: "SELECT * FROM products WHERE category <> 'Electronics';", hints: ['Use <> or NOT'] },
    { id: 'f-8', category: 'filtering', title: 'High Rating Electronics', difficulty: 'Easy', tags: ['AND'], description: 'Find Electronics products rated above 4.3.', setupSQL: filterSetup, solution: "SELECT * FROM products WHERE category = 'Electronics' AND rating > 4.3;", hints: ['Combine conditions with AND'] },
    { id: 'f-9', category: 'filtering', title: 'Cheap or High Rating', difficulty: 'Easy', tags: ['OR'], description: 'Find products under $50 OR rated above 4.5.', setupSQL: filterSetup, solution: 'SELECT * FROM products WHERE price < 50 OR rating > 4.5;', hints: ['Use OR'] },
    { id: 'f-10', category: 'filtering', title: 'Name Contains', difficulty: 'Easy', tags: ['LIKE'], description: 'Find products with "ouse" anywhere in the name.', setupSQL: filterSetup, solution: "SELECT * FROM products WHERE name LIKE '%ouse%';", hints: ['Use %pattern%'] },
    { id: 'f-11', category: 'filtering', title: 'Exact Price Match', difficulty: 'Beginner', tags: ['WHERE', '='], description: 'Find the product priced at exactly $49.99.', setupSQL: filterSetup, solution: 'SELECT * FROM products WHERE price = 49.99;', hints: ['Use = for exact match'] },
    { id: 'f-12', category: 'filtering', title: 'Name Ends With', difficulty: 'Easy', tags: ['LIKE'], description: 'Find products whose name ends with "er".', setupSQL: filterSetup, solution: "SELECT * FROM products WHERE name LIKE '%er';", hints: ['Use %er'] },
    { id: 'f-13', category: 'filtering', title: 'Rating IS NOT NULL', difficulty: 'Easy', tags: ['IS NOT NULL'], description: 'Find products that have a rating.', setupSQL: filterSetup, solution: 'SELECT * FROM products WHERE rating IS NOT NULL;', hints: ['Use IS NOT NULL'] },
    { id: 'f-14', category: 'filtering', title: 'Complex AND/OR', difficulty: 'Medium', tags: ['AND', 'OR'], description: 'Find Electronics over $100 OR Furniture under $200.', setupSQL: filterSetup, solution: "SELECT * FROM products WHERE (category='Electronics' AND price>100) OR (category='Furniture' AND price<200);", hints: ['Use parentheses for grouping'] },
    { id: 'f-15', category: 'filtering', title: 'Not In List', difficulty: 'Medium', tags: ['NOT IN'], description: 'Find products NOT in Electronics or Furniture.', setupSQL: filterSetup, solution: "SELECT * FROM products WHERE category NOT IN ('Electronics','Furniture');", hints: ['Use NOT IN'] },
    { id: 'f-16', category: 'filtering', title: 'Price Not Between', difficulty: 'Medium', tags: ['NOT BETWEEN'], description: 'Find products NOT priced between $50 and $200.', setupSQL: filterSetup, solution: 'SELECT * FROM products WHERE price NOT BETWEEN 50 AND 200;', hints: ['Use NOT BETWEEN'] },
    { id: 'f-17', category: 'filtering', title: 'Name Length Filter', difficulty: 'Medium', tags: ['LENGTH'], description: 'Find products with names longer than 8 characters.', setupSQL: filterSetup, solution: 'SELECT * FROM products WHERE LENGTH(name) > 8;', hints: ['Use LENGTH() in WHERE'] },
    { id: 'f-18', category: 'filtering', title: 'Stock vs Price Ratio', difficulty: 'Medium', tags: ['Arithmetic'], description: 'Find products where stock * price > 5000 (high inventory value).', setupSQL: filterSetup, solution: 'SELECT *, stock * price AS inv_value FROM products WHERE stock * price > 5000;', hints: ['Multiply stock by price'] },
    { id: 'f-19', category: 'filtering', title: 'Top Rated Per Category', difficulty: 'Medium', tags: ['Subquery'], description: 'Find the highest-rated product in each category.', setupSQL: filterSetup, solution: 'SELECT * FROM products p WHERE rating = (SELECT MAX(rating) FROM products WHERE category = p.category);', hints: ['Correlated subquery'] },
    { id: 'f-20', category: 'filtering', title: 'Above Average Price', difficulty: 'Medium', tags: ['Subquery'], description: 'Find products priced above the average.', setupSQL: filterSetup, solution: 'SELECT * FROM products WHERE price > (SELECT AVG(price) FROM products);', hints: ['Use subquery for AVG'] },
    ...Array.from({ length: 30 }, (_, i) => {
        const idx = i + 21;
        const templates = [
            { t: `Filter Challenge ${idx}: CASE Labels`, d: `Label products by price tier: Premium(>500), Standard(>100), Budget.`, s: "SELECT name,price,CASE WHEN price>500 THEN 'Premium' WHEN price>100 THEN 'Standard' ELSE 'Budget' END AS tier FROM products;", tg: ['CASE'] },
            { t: `Filter Challenge ${idx}: Sort & Limit`, d: `Find the 3 most expensive products.`, s: 'SELECT * FROM products ORDER BY price DESC LIMIT 3;', tg: ['ORDER BY', 'LIMIT'] },
            { t: `Filter Challenge ${idx}: Multi-Sort`, d: `Sort by category ASC, then rating DESC.`, s: 'SELECT * FROM products ORDER BY category, rating DESC;', tg: ['ORDER BY'] },
            { t: `Filter Challenge ${idx}: GLOB Pattern`, d: `Find products with names that have exactly 4-letter words.`, s: "SELECT * FROM products WHERE name GLOB '????';", tg: ['GLOB'] },
        ];
        const p = templates[i % templates.length];
        return { id: `f-${idx}`, category: 'filtering', title: p.t, difficulty: idx <= 35 ? 'Easy' : 'Medium', tags: p.tg, description: p.d, setupSQL: filterSetup, solution: p.s, hints: ['Think about filter patterns'] };
    })
];

export const aggregation = [
    { id: 'a-1', category: 'aggregation', title: 'Total Sales', difficulty: 'Beginner', tags: ['SUM'], description: 'Calculate total sales amount.', setupSQL: aggSetup, solution: 'SELECT SUM(amount) AS total FROM sales;', hints: ['Use SUM()'] },
    { id: 'a-2', category: 'aggregation', title: 'Sales Per Category', difficulty: 'Beginner', tags: ['GROUP BY'], description: 'Show total sales by category.', setupSQL: aggSetup, solution: 'SELECT category, SUM(amount) AS total FROM sales GROUP BY category;', hints: ['GROUP BY category'] },
    { id: 'a-3', category: 'aggregation', title: 'Average by Region', difficulty: 'Easy', tags: ['AVG', 'GROUP BY'], description: 'Find average sale amount per region.', setupSQL: aggSetup, solution: 'SELECT region, ROUND(AVG(amount),2) AS avg FROM sales GROUP BY region;', hints: ['AVG with GROUP BY'] },
    { id: 'a-4', category: 'aggregation', title: 'Count Per Month', difficulty: 'Easy', tags: ['COUNT', 'SUBSTR'], description: 'Count sales per month.', setupSQL: aggSetup, solution: "SELECT SUBSTR(sale_date,1,7) AS month, COUNT(*) AS cnt FROM sales GROUP BY SUBSTR(sale_date,1,7);", hints: ['SUBSTR for month'] },
    { id: 'a-5', category: 'aggregation', title: 'Highest Single Sale', difficulty: 'Beginner', tags: ['MAX'], description: 'Find the highest single sale amount.', setupSQL: aggSetup, solution: 'SELECT MAX(amount) AS highest FROM sales;', hints: ['Use MAX()'] },
    { id: 'a-6', category: 'aggregation', title: 'HAVING Filter', difficulty: 'Medium', tags: ['HAVING'], description: 'Find categories with total sales > 500.', setupSQL: aggSetup, solution: 'SELECT category, SUM(amount) AS total FROM sales GROUP BY category HAVING SUM(amount) > 500;', hints: ['Use HAVING after GROUP BY'] },
    { id: 'a-7', category: 'aggregation', title: 'Regions with 2+ Sales', difficulty: 'Medium', tags: ['HAVING', 'COUNT'], description: 'Find regions with at least 2 sales.', setupSQL: aggSetup, solution: 'SELECT region, COUNT(*) AS cnt FROM sales GROUP BY region HAVING COUNT(*) >= 2;', hints: ['HAVING COUNT(*) >= 2'] },
    { id: 'a-8', category: 'aggregation', title: 'Total Quantity Sold', difficulty: 'Beginner', tags: ['SUM'], description: 'Calculate total quantity of items sold.', setupSQL: aggSetup, solution: 'SELECT SUM(quantity) AS total_qty FROM sales;', hints: ['SUM(quantity)'] },
    { id: 'a-9', category: 'aggregation', title: 'Average Price Per Unit', difficulty: 'Medium', tags: ['Arithmetic'], description: 'Calculate average price per unit (amount / quantity) per product.', setupSQL: aggSetup, solution: 'SELECT product, ROUND(SUM(amount)/SUM(quantity),2) AS avg_unit_price FROM sales GROUP BY product;', hints: ['Divide SUM(amount) by SUM(quantity)'] },
    { id: 'a-10', category: 'aggregation', title: 'Running Summary', difficulty: 'Medium', tags: ['Multiple Aggregates'], description: 'Show count, sum, avg, min, max of amount in one query.', setupSQL: aggSetup, solution: 'SELECT COUNT(*) AS cnt, SUM(amount) AS total, ROUND(AVG(amount),2) AS avg_amt, MIN(amount) AS min_amt, MAX(amount) AS max_amt FROM sales;', hints: ['Multiple aggregates in one SELECT'] },
    ...Array.from({ length: 40 }, (_, i) => {
        const idx = i + 11;
        const p = [
            { t: 'Quarterly Revenue', d: 'Calculate total revenue per quarter.', s: "SELECT CASE WHEN CAST(SUBSTR(sale_date,6,2) AS INT)<=3 THEN 'Q1' WHEN CAST(SUBSTR(sale_date,6,2) AS INT)<=6 THEN 'Q2' ELSE 'Q3+' END AS quarter, SUM(amount) AS rev FROM sales GROUP BY quarter;", tg: ['CASE', 'GROUP BY'] },
            { t: 'Product Ranking by Revenue', d: 'Rank products by total revenue.', s: 'SELECT product, SUM(amount) AS rev FROM sales GROUP BY product ORDER BY rev DESC;', tg: ['GROUP BY', 'ORDER BY'] },
            { t: 'Region Share', d: 'Show each region\'s percentage of total sales.', s: 'SELECT region, ROUND(SUM(amount)*100.0/(SELECT SUM(amount) FROM sales),1) AS pct FROM sales GROUP BY region;', tg: ['Subquery', 'Arithmetic'] },
            { t: 'Category With Most Products', d: 'Find which category has the most distinct products sold.', s: 'SELECT category, COUNT(DISTINCT product) AS unique_products FROM sales GROUP BY category ORDER BY unique_products DESC LIMIT 1;', tg: ['COUNT DISTINCT'] },
        ][i % 4];
        return { id: `a-${idx}`, category: 'aggregation', title: `${p.t} (${idx})`, difficulty: idx <= 25 ? 'Easy' : 'Medium', tags: p.tg, description: p.d, setupSQL: aggSetup, solution: p.s, hints: ['Think about grouping and aggregating'] };
    })
];

export const joins = [
    { id: 'j-1', category: 'joins', title: 'INNER JOIN Basics', difficulty: 'Beginner', tags: ['INNER JOIN'], description: 'Show all orders with customer names.', setupSQL: joinSetup, solution: 'SELECT c.name, o.product, o.amount FROM customers c INNER JOIN orders o ON c.id = o.customer_id;', hints: ['Use INNER JOIN with ON'] },
    { id: 'j-2', category: 'joins', title: 'LEFT JOIN — All Customers', difficulty: 'Easy', tags: ['LEFT JOIN'], description: 'Show all customers, even those without orders.', setupSQL: joinSetup, solution: 'SELECT c.name, o.product, o.amount FROM customers c LEFT JOIN orders o ON c.id = o.customer_id;', hints: ['LEFT JOIN keeps all left rows'] },
    { id: 'j-3', category: 'joins', title: 'Customers Without Orders', difficulty: 'Easy', tags: ['LEFT JOIN', 'IS NULL'], description: 'Find customers who have never placed an order.', setupSQL: joinSetup, solution: 'SELECT c.name FROM customers c LEFT JOIN orders o ON c.id = o.customer_id WHERE o.id IS NULL;', hints: ['LEFT JOIN + WHERE NULL'] },
    { id: 'j-4', category: 'joins', title: 'Total Spent Per Customer', difficulty: 'Medium', tags: ['JOIN', 'GROUP BY'], description: 'Calculate total amount spent by each customer.', setupSQL: joinSetup, solution: 'SELECT c.name, SUM(o.amount) AS total FROM customers c INNER JOIN orders o ON c.id = o.customer_id GROUP BY c.name ORDER BY total DESC;', hints: ['JOIN + GROUP BY + SUM'] },
    { id: 'j-5', category: 'joins', title: 'Orders Per City', difficulty: 'Medium', tags: ['JOIN', 'GROUP BY'], description: 'Count orders per customer city.', setupSQL: joinSetup, solution: 'SELECT c.city, COUNT(o.id) AS order_count FROM customers c INNER JOIN orders o ON c.id = o.customer_id GROUP BY c.city;', hints: ['GROUP BY city'] },
    { id: 'j-6', category: 'joins', title: 'Gold Tier Orders', difficulty: 'Medium', tags: ['JOIN', 'WHERE'], description: 'Show orders placed by Gold tier customers only.', setupSQL: joinSetup, solution: "SELECT c.name, c.tier, o.product, o.amount FROM customers c INNER JOIN orders o ON c.id = o.customer_id WHERE c.tier = 'Gold';", hints: ['Filter on tier after JOIN'] },
    { id: 'j-7', category: 'joins', title: 'Customer Order Count', difficulty: 'Easy', tags: ['JOIN', 'COUNT'], description: 'Show each customer name with their order count.', setupSQL: joinSetup, solution: 'SELECT c.name, COUNT(o.id) AS orders FROM customers c LEFT JOIN orders o ON c.id = o.customer_id GROUP BY c.name;', hints: ['LEFT JOIN to include 0-order customers'] },
    { id: 'j-8', category: 'joins', title: 'Self Join — Same City', difficulty: 'Hard', tags: ['Self JOIN'], description: 'Find pairs of customers in the same city.', setupSQL: joinSetup, solution: 'SELECT a.name, b.name, a.city FROM customers a JOIN customers b ON a.city = b.city AND a.id < b.id;', hints: ['Join table to itself with a.id < b.id'] },
    { id: 'j-9', category: 'joins', title: 'Average Order by Tier', difficulty: 'Medium', tags: ['JOIN', 'AVG'], description: 'Find average order amount per customer tier.', setupSQL: joinSetup, solution: 'SELECT c.tier, ROUND(AVG(o.amount),2) AS avg_order FROM customers c JOIN orders o ON c.id = o.customer_id GROUP BY c.tier;', hints: ['JOIN + GROUP BY tier'] },
    { id: 'j-10', category: 'joins', title: 'Most Valuable Customer', difficulty: 'Medium', tags: ['JOIN', 'ORDER BY'], description: 'Find the customer who spent the most overall.', setupSQL: joinSetup, solution: 'SELECT c.name, SUM(o.amount) AS total FROM customers c JOIN orders o ON c.id=o.customer_id GROUP BY c.name ORDER BY total DESC LIMIT 1;', hints: ['SUM + ORDER BY DESC + LIMIT 1'] },
    ...Array.from({ length: 70 }, (_, i) => {
        const idx = i + 11;
        const p = [
            { t: 'Cross Join Demo', d: 'Show all possible customer-product combinations.', s: 'SELECT DISTINCT c.name, o.product FROM customers c CROSS JOIN orders o LIMIT 20;', tg: ['CROSS JOIN'] },
            { t: 'Top Spender Per City', d: 'Find the top spender in each city.', s: 'SELECT c.city, c.name, SUM(o.amount) AS total FROM customers c JOIN orders o ON c.id=o.customer_id GROUP BY c.city, c.name ORDER BY c.city, total DESC;', tg: ['JOIN', 'GROUP BY'] },
            { t: 'Orders Above Average', d: 'Find orders with amount above the average order amount.', s: 'SELECT c.name, o.product, o.amount FROM customers c JOIN orders o ON c.id=o.customer_id WHERE o.amount > (SELECT AVG(amount) FROM orders);', tg: ['JOIN', 'Subquery'] },
            { t: 'Tier Distribution', d: 'Count customers per tier with their total orders.', s: 'SELECT c.tier, COUNT(DISTINCT c.id) AS customers, COUNT(o.id) AS orders FROM customers c LEFT JOIN orders o ON c.id=o.customer_id GROUP BY c.tier;', tg: ['LEFT JOIN', 'COUNT DISTINCT'] },
            { t: 'Recent Orders', d: 'Find customers with orders in the last 3 months.', s: "SELECT DISTINCT c.name FROM customers c JOIN orders o ON c.id=o.customer_id WHERE o.order_date >= '2024-03-01';", tg: ['JOIN', 'WHERE'] },
        ][i % 5];
        return { id: `j-${idx}`, category: 'joins', title: `${p.t} (${idx})`, difficulty: idx <= 30 ? 'Easy' : idx <= 60 ? 'Medium' : 'Hard', tags: p.tg, description: p.d, setupSQL: joinSetup, solution: p.s, hints: ['Think about join type and conditions'] };
    })
];

export const subqueries = Array.from({ length: 50 }, (_, i) => {
    const idx = i + 1;
    const templates = [
        { t: 'Above Average Price', d: 'Find products priced above average.', s: 'SELECT * FROM products WHERE price > (SELECT AVG(price) FROM products);', tg: ['Subquery', 'WHERE'] },
        { t: 'Most Expensive Product', d: 'Find the product with the highest price using a subquery.', s: 'SELECT * FROM products WHERE price = (SELECT MAX(price) FROM products);', tg: ['Subquery', 'MAX'] },
        { t: 'Products in Popular Category', d: 'Find products in the category with the most items.', s: 'SELECT * FROM products WHERE category = (SELECT category FROM products GROUP BY category ORDER BY COUNT(*) DESC LIMIT 1);', tg: ['Subquery', 'GROUP BY'] },
        { t: 'Correlated Subquery', d: 'Find products more expensive than their category average.', s: 'SELECT * FROM products p WHERE price > (SELECT AVG(price) FROM products WHERE category = p.category);', tg: ['Correlated'] },
        { t: 'EXISTS Check', d: 'Find categories that have at least one product over $200.', s: "SELECT DISTINCT category FROM products p WHERE EXISTS (SELECT 1 FROM products WHERE category = p.category AND price > 200);", tg: ['EXISTS'] },
        { t: 'NOT EXISTS', d: 'Find categories with NO product under $50.', s: "SELECT DISTINCT category FROM products p WHERE NOT EXISTS (SELECT 1 FROM products WHERE category = p.category AND price < 50);", tg: ['NOT EXISTS'] },
        { t: 'Scalar Subquery', d: 'Show each product with the overall average price alongside.', s: 'SELECT name, price, (SELECT ROUND(AVG(price),2) FROM products) AS avg_price FROM products;', tg: ['Scalar Subquery'] },
        { t: 'IN Subquery', d: 'Find products in categories that have items over $500.', s: 'SELECT * FROM products WHERE category IN (SELECT DISTINCT category FROM products WHERE price > 500);', tg: ['IN', 'Subquery'] },
        { t: 'Subquery in FROM (Derived Table)', d: 'Find the average rating per category, then filter categories with avg > 4.', s: 'SELECT * FROM (SELECT category, ROUND(AVG(rating),2) AS avg_r FROM products GROUP BY category) WHERE avg_r > 4;', tg: ['Derived Table'] },
        { t: 'Multi-level Subquery', d: 'Find the cheapest product in the highest-rated category.', s: 'SELECT * FROM products WHERE category = (SELECT category FROM products GROUP BY category ORDER BY AVG(rating) DESC LIMIT 1) ORDER BY price LIMIT 1;', tg: ['Nested Subquery'] },
    ];
    const p = templates[i % templates.length];
    return { id: `sq-${idx}`, category: 'subqueries', title: `${p.t} (${idx})`, difficulty: idx <= 15 ? 'Easy' : idx <= 35 ? 'Medium' : 'Hard', tags: p.tg, description: p.d, setupSQL: filterSetup, solution: p.s, hints: ['Think about inner vs outer query'] };
});

export const windowFunctions = Array.from({ length: 60 }, (_, i) => {
    const idx = i + 1;
    const templates = [
        { t: 'ROW_NUMBER', d: 'Assign a row number to each sale ordered by amount.', s: 'SELECT *, ROW_NUMBER() OVER (ORDER BY amount DESC) AS rn FROM sales;', tg: ['ROW_NUMBER'] },
        { t: 'RANK Sales', d: 'Rank sales by amount (ties get same rank).', s: 'SELECT *, RANK() OVER (ORDER BY amount DESC) AS rnk FROM sales;', tg: ['RANK'] },
        { t: 'DENSE_RANK', d: 'Dense rank sales by amount.', s: 'SELECT *, DENSE_RANK() OVER (ORDER BY amount DESC) AS drnk FROM sales;', tg: ['DENSE_RANK'] },
        { t: 'Running Total', d: 'Calculate a running total of sales amount ordered by date.', s: 'SELECT *, SUM(amount) OVER (ORDER BY sale_date) AS running_total FROM sales;', tg: ['SUM', 'OVER'] },
        { t: 'Partition by Category', d: 'Rank sales within each category.', s: 'SELECT *, RANK() OVER (PARTITION BY category ORDER BY amount DESC) AS cat_rank FROM sales;', tg: ['PARTITION BY'] },
        { t: 'Moving Average', d: 'Calculate a 3-row moving average of amount.', s: 'SELECT *, ROUND(AVG(amount) OVER (ORDER BY sale_date ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING),2) AS moving_avg FROM sales;', tg: ['AVG', 'ROWS BETWEEN'] },
        { t: 'LAG Function', d: 'Show each sale alongside the previous sale amount.', s: 'SELECT *, LAG(amount) OVER (ORDER BY sale_date) AS prev_amount FROM sales;', tg: ['LAG'] },
        { t: 'LEAD Function', d: 'Show each sale alongside the next sale amount.', s: 'SELECT *, LEAD(amount) OVER (ORDER BY sale_date) AS next_amount FROM sales;', tg: ['LEAD'] },
        { t: 'Cumulative Count', d: 'Show cumulative count of sales by date.', s: 'SELECT *, COUNT(*) OVER (ORDER BY sale_date) AS cum_count FROM sales;', tg: ['COUNT', 'OVER'] },
        { t: 'Pct of Category Total', d: 'Show each sale as a percentage of its category total.', s: 'SELECT *, ROUND(amount * 100.0 / SUM(amount) OVER (PARTITION BY category), 1) AS pct FROM sales;', tg: ['SUM', 'PARTITION BY'] },
        { t: 'NTILE Quartiles', d: 'Divide sales into 4 quartile buckets by amount.', s: 'SELECT *, NTILE(4) OVER (ORDER BY amount) AS quartile FROM sales;', tg: ['NTILE'] },
        { t: 'First & Last Value', d: 'Show the first and last sale amount per category.', s: 'SELECT *, FIRST_VALUE(amount) OVER (PARTITION BY category ORDER BY sale_date) AS first_sale, LAST_VALUE(amount) OVER (PARTITION BY category ORDER BY sale_date RANGE BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS last_sale FROM sales;', tg: ['FIRST_VALUE', 'LAST_VALUE'] },
    ];
    const p = templates[i % templates.length];
    return { id: `w-${idx}`, category: 'window', title: `${p.t} (${idx})`, difficulty: idx <= 20 ? 'Medium' : idx <= 40 ? 'Hard' : 'Expert', tags: p.tg, description: p.d, setupSQL: aggSetup, solution: p.s, hints: ['Use OVER() clause with window function'] };
});
