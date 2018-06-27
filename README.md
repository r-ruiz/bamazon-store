# bamazon-store

## Description

This application is a point of sale system that allows a user to purchase items stored in a database and a manager to update or add new products.

This CLI node application uses the following npm packages: 
[inquirer](https://www.npmjs.com/package/inquirer) 
[cli-table](https://www.npmjs.com/package/cli-table)
[mysql](https://www.npmjs.com/package/mysql)

There are two interfaces: **Customer purchasing (bamazonCustomer.js)** and **Manager inventory (bamazonManager.js)**.

### Customer Interface

The customer interface offers the following when launched:
----------------------------------------------------------------

                         Customer's Menu

 What would you like to do: (Use arrow keys)
-> Display all products

  Purchase a product

  Quit

Display all products:

----------------------------------------------------------------

There is an option to select one of the products and purchase as many as the user request as long as there is enough quantity in the database.

### Manager Interace

The manager interface offers the following when launched:
----------------------------------------------------------------

                         manager's Menu

 What would you like to do: (Use arrow keys)
-> Display all products for sale

  Display low inventory

  Add to Inventory

  Add new product
  
  Quit

There is also options to add more units to an item already in the database or add a new product to the list.

### Bamazon Demo
