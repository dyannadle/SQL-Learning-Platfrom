import sqlite3
import os

os.makedirs("datasets", exist_ok=True)

def create_basic_db():
    conn = sqlite3.connect("datasets/basic.db")
    cur = conn.cursor()
    cur.executescript("""
        CREATE TABLE IF NOT EXISTS employees(id INTEGER PRIMARY KEY,name TEXT,department TEXT,salary INTEGER,hire_date TEXT);
        INSERT OR IGNORE INTO employees VALUES(1,'Alice','Engineering',95000,'2020-01-15'),(2,'Bob','Sales',72000,'2019-06-01'),(3,'Carol','Engineering',88000,'2021-03-20'),(4,'David','Marketing',65000,'2018-11-10'),(5,'Eve','HR',70000,'2022-02-28'),(6,'Frank','Engineering',92000,'2020-07-14'),(7,'Grace','Sales',68000,'2021-09-05'),(8,'Hank','Marketing',71000,'2019-04-22'),(9,'Ivy','HR',73000,'2020-12-01'),(10,'Jack','Engineering',105000,'2017-08-30');
    """)
    conn.commit()
    conn.close()
    
def create_advanced_db():
    conn = sqlite3.connect("datasets/advanced.db")
    cur = conn.cursor()
    cur.executescript("""
        CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY,name TEXT,category TEXT,price REAL,stock INTEGER,rating REAL);
        INSERT OR IGNORE INTO products VALUES(1,'Laptop Pro','Electronics',1299.99,45,4.5),(2,'Wireless Mouse','Electronics',49.99,120,4.2),(3,'Coffee Maker','Home',89.50,30,4.7),(4,'Desk Chair','Furniture',199.00,15,3.9),(5,'Keyboard','Electronics',145.00,60,4.6),(6,'Blender','Home',65.00,40,4.1),(7,'Monitor','Electronics',399.99,25,4.8),(8,'Bookshelf','Furniture',159.00,20,3.5),(9,'Headphones','Electronics',79.99,90,4.4),(10,'Lamp','Home',35.00,55,3.8),(11,'Standing Desk','Furniture',549.99,10,4.9),(12,'Webcam','Electronics',69.99,75,4.0),(13,'Toaster','Home',29.99,80,3.6),(14,'Mouse Pad','Electronics',12.99,200,4.1),(15,'Couch','Furniture',899.00,5,4.3);
        
        CREATE TABLE IF NOT EXISTS sales(id INTEGER PRIMARY KEY,product TEXT,category TEXT,amount REAL,quantity INTEGER,sale_date TEXT,region TEXT);
        INSERT OR IGNORE INTO sales VALUES(1,'Widget A','Electronics',150,3,'2024-01-15','East'),(2,'Widget B','Home',80,1,'2024-01-20','West'),(3,'Widget A','Electronics',450,9,'2024-02-10','East'),(4,'Gadget X','Electronics',200,2,'2024-02-14','South'),(5,'Widget B','Home',160,2,'2024-03-01','East'),(6,'Gadget Y','Home',95,1,'2024-03-15','North'),(7,'Widget A','Electronics',300,6,'2024-04-01','West'),(8,'Gadget X','Electronics',500,5,'2024-04-20','East'),(9,'Widget C','Furniture',350,7,'2024-05-10','South'),(10,'Gadget Y','Home',190,2,'2024-05-25','North'),(11,'Widget A','Electronics',750,15,'2024-06-01','East'),(12,'Widget C','Furniture',700,14,'2024-06-15','West');
        
        CREATE TABLE IF NOT EXISTS customers(id INTEGER PRIMARY KEY,name TEXT,city TEXT,tier TEXT);
        CREATE TABLE IF NOT EXISTS orders(id INTEGER PRIMARY KEY,customer_id INTEGER,product TEXT,amount REAL,order_date TEXT);
        INSERT OR IGNORE INTO customers VALUES(1,'Alice','NYC','Gold'),(2,'Bob','LA','Silver'),(3,'Carol','Chicago','Gold'),(4,'David','NYC','Bronze'),(5,'Eve','LA','Gold'),(6,'Frank','Miami','Silver'),(7,'Grace','Seattle','Bronze');
        INSERT OR IGNORE INTO orders VALUES(1,1,'Laptop',1200,'2024-01-15'),(2,1,'Mouse',50,'2024-02-01'),(3,2,'Keyboard',150,'2024-01-20'),(4,3,'Monitor',400,'2024-03-10'),(5,3,'Webcam',70,'2024-03-10'),(6,5,'Laptop',1100,'2024-04-01'),(7,1,'Headphones',80,'2024-04-15'),(8,4,'Mouse',45,'2024-05-01');
    """)
    conn.commit()
    conn.close()
    
def create_business_db():
    conn = sqlite3.connect("datasets/business.db")
    cur = conn.cursor()
    cur.executescript("""
        CREATE TABLE IF NOT EXISTS orders(id INTEGER PRIMARY KEY,customer_id INTEGER,product TEXT,amount REAL,order_date TEXT,status TEXT);
        CREATE TABLE IF NOT EXISTS customers(id INTEGER PRIMARY KEY,name TEXT,city TEXT,signup_date TEXT);
        INSERT OR IGNORE INTO customers VALUES(1,'Alice','NYC','2023-01-10'),(2,'Bob','LA','2023-03-15'),(3,'Carol','Chicago','2023-06-20'),(4,'David','NYC','2023-09-01'),(5,'Eve','LA','2024-01-05');
        INSERT OR IGNORE INTO orders VALUES(1,1,'Laptop',1200,'2024-01-15','completed'),(2,1,'Mouse',50,'2024-02-01','completed'),(3,2,'Keyboard',150,'2024-01-20','completed'),(4,3,'Monitor',400,'2024-03-10','completed'),(5,3,'Webcam',70,'2024-03-10','returned'),(6,5,'Laptop',1100,'2024-04-01','completed'),(7,1,'Headphones',80,'2024-04-15','completed'),(8,4,'Mouse',45,'2024-05-01','pending'),(9,2,'Tablet',350,'2024-05-15','completed'),(10,1,'SSD',120,'2024-06-01','completed');
    """)
    conn.commit()
    conn.close()

if __name__ == "__main__":
    print("Generating database templates...")
    create_basic_db()
    create_advanced_db()
    create_business_db()
    # Create empty DB
    conn = sqlite3.connect("datasets/empty.db")
    conn.close()
    print("Finished generating dataset *.db files.")
