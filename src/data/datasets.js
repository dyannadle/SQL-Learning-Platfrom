export const datasets = {
  employees: `
    DROP TABLE IF EXISTS employees;
    DROP TABLE IF EXISTS departments;

    CREATE TABLE departments (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL
    );
    
    INSERT INTO departments (id, name) VALUES 
      (1, 'Engineering'),
      (2, 'Sales'),
      (3, 'Marketing'),
      (4, 'HR');

    CREATE TABLE employees (
      id INTEGER PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT UNIQUE,
      hire_date DATE,
      salary DECIMAL(10, 2),
      department_id INTEGER,
      FOREIGN KEY (department_id) REFERENCES departments(id)
    );
    
    INSERT INTO employees (id, first_name, last_name, email, hire_date, salary, department_id) VALUES
      (1, 'John', 'Doe', 'john.doe@company.com', '2020-01-15', 75000, 1),
      (2, 'Jane', 'Smith', 'jane.smith@company.com', '2019-03-22', 82000, 1),
      (3, 'Michael', 'Johnson', 'michael.j@company.com', '2021-08-10', 65000, 2),
      (4, 'Emily', 'Davis', 'emily.d@company.com', '2018-11-05', 95000, 3),
      (5, 'David', 'Wilson', 'david.w@company.com', '2022-02-28', 58000, 2),
      (6, 'Sarah', 'Brown', 'sarah.b@company.com', '2020-07-12', 71000, 1),
      (7, 'James', 'Taylor', 'james.t@company.com', '2017-09-30', 105000, 4),
      (8, 'Jessica', 'Anderson', 'jessica.a@company.com', '2021-04-18', 62000, 3),
      (9, 'William', 'Thomas', 'william.t@company.com', '2019-12-01', 88000, 1),
      (10, 'Ashley', 'Jackson', 'ashley.j@company.com', '2023-01-05', 55000, 2);
  `,
  ecommerce: `
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS products;

    CREATE TABLE products (
      id INTEGER PRIMARY KEY,
      name TEXT,
      category TEXT,
      price DECIMAL(10,2),
      stock INTEGER
    );
    
    INSERT INTO products VALUES
      (1, 'Laptop Pro', 'Electronics', 1299.99, 45),
      (2, 'Wireless Mouse', 'Electronics', 49.99, 120),
      (3, 'Coffee Maker', 'Home', 89.50, 30),
      (4, 'Desk Chair', 'Furniture', 199.00, 15),
      (5, 'Mechanical Keyboard', 'Electronics', 145.00, 60);

    CREATE TABLE orders (
      id INTEGER PRIMARY KEY,
      product_id INTEGER,
      quantity INTEGER,
      order_date DATE,
      FOREIGN KEY (product_id) REFERENCES products(id)
    );
    
    INSERT INTO orders VALUES
      (101, 1, 2, '2023-10-01'),
      (102, 2, 5, '2023-10-02'),
      (103, 1, 1, '2023-10-03'),
      (104, 3, 1, '2023-10-03'),
      (105, 5, 2, '2023-10-05'),
      (106, 4, 4, '2023-10-06');
  `
};
