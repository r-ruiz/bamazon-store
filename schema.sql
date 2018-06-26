create database bamazondb;
use bamazondb;
create table store_items (
product_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(45) NOT NULL,
department_name VARCHAR(45) NOT NULL,
price DECIMAL(11,2),
stock_quantity int(11),
PRIMARY KEY (product_id)
);

INSERT INTO store_items (product_name, department_name, price, stock_quantity)
VALUES  ('Basketball', 'Sports', 15.5, 45),
		('Towels', 'House', 10, 100),
		('Baseball', 'Sports', 7, 500),
		('Grill', 'Outdoors', 299.95, 10),
		('Tires', 'Automotive', 109, 250),
		('Wipers', 'Automotive', 9.5, 1000),
		('Pool', 'Outdoors', 1500, 0),
		('Pans', 'House', 29.5, 4500),
		('Detergent', 'House', 9.95, 1000),
		('Bat', 'Sports', 15, 75);

SELECT * FROM store_items;
