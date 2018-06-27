# Bamazon Store

### Description

This application is a point of sale system that allows a user to purchase items stored in a database and a manager to update or add new products.

This CLI node application uses the following npm packages: 
- [inquirer](https://www.npmjs.com/package/inquirer) 
- [cli-table](https://www.npmjs.com/package/cli-table)
- [mysql](https://www.npmjs.com/package/mysql)

There are two interfaces: 
- Customer purchasing (bamazonCustomer.js) 
- Manager inventory (bamazonManager.js)

### Customer Interface

The customer interface offers the following when launched:
```sh
----------------------------------------------------------------
                         Customer's Menu
----------------------------------------------------------------

? What would you like to do: (Use arrow keys)
> Display all products
  Purchase a product
  Quit

```
Display all products:
```sh
----------------------------------------------------------------
                         Customer's Menu
----------------------------------------------------------------
? What would you like to do: Display all products
----------------------------------------------------------------
                         Product Catalog
----------------------------------------------------------------
┌────────────┬──────────────┬────────────┬────────┐
│ Product ID │ Product Name │ Department │ Price  │
├────────────┼──────────────┼────────────┼────────┤
│ 1          │ Basketball   │ Sports     │ 15.5   │
├────────────┼──────────────┼────────────┼────────┤
│ 2          │ Towels       │ House      │ 10     │
├────────────┼──────────────┼────────────┼────────┤
│ 3          │ Baseball     │ Sports     │ 7      │
├────────────┼──────────────┼────────────┼────────┤
│ 4          │ Grill        │ Outdoors   │ 299.95 │
├────────────┼──────────────┼────────────┼────────┤
│ 5          │ Tires        │ Automotive │ 109    │
├────────────┼──────────────┼────────────┼────────┤
│ 6          │ Wipers       │ Automotive │ 9.5    │
├────────────┼──────────────┼────────────┼────────┤
│ 7          │ Pool         │ Outdoors   │ 1500   │
├────────────┼──────────────┼────────────┼────────┤
│ 8          │ Pans         │ House      │ 29.5   │
├────────────┼──────────────┼────────────┼────────┤
│ 9          │ Detergent    │ House      │ 9.95   │
├────────────┼──────────────┼────────────┼────────┤
│ 10         │ Bat          │ Sports     │ 15     │
├────────────┼──────────────┼────────────┼────────┤
│ 11         │ Cup          │ House      │ 2.45   │
├────────────┼──────────────┼────────────┼────────┤
│ 12         │ Laptop       │ Technology │ 750    │
├────────────┼──────────────┼────────────┼────────┤
│ 13         │ Tablet       │ Technology │ 399    │
├────────────┼──────────────┼────────────┼────────┤
│ 14         │ Soda         │ Food       │ 0.99   │
├────────────┼──────────────┼────────────┼────────┤
│ 15         │ Steak        │ Foods      │ 15.95  │
├────────────┼──────────────┼────────────┼────────┤
│ 16         │ Toilet Paper │ House      │ 7      │
├────────────┼──────────────┼────────────┼────────┤
│ 17         │ Table        │ House      │ 150    │
└────────────┴──────────────┴────────────┴────────┘
----------------------------------------------------------------

----------------------------------------------------------------
? Would you like to return to the Customer Menu? (Y/n)
----------------------------------------------------------------
```
There is an option to select one of the products and purchase as many as the user request as long as there is enough quantity in the database.

### Manager Interace
The manager interface offers the following when launched:
```sh
----------------------------------------------------------------
                         Manager's Menu
----------------------------------------------------------------
? What would you like to do: (Use arrow keys)
> Display all products for sale
  Display low inventory
  Add to Inventory
  Add new product
  Quit
```
This is what is displayed on low inventory:
```sh
----------------------------------------------------------------
                         Manager's Menu
----------------------------------------------------------------
? What would you like to do: Display low inventory
----------------------------------------------------------------
Low Inventory Items (Less than 5)
----------------------------------------------------------------
┌────────────┬──────────────┬────────────┬────────┬──────────┐
│ Product ID │ Product Name │ Department │ Price  │ Quantity │
├────────────┼──────────────┼────────────┼────────┼──────────┤
│ 4          │ Grill        │ Outdoors   │ 299.95 │ 1        │
├────────────┼──────────────┼────────────┼────────┼──────────┤
│ 7          │ Pool         │ Outdoors   │ 1500   │ 1        │
├────────────┼──────────────┼────────────┼────────┼──────────┤
│ 12         │ Laptop       │ Technology │ 750    │ 4        │
├────────────┼──────────────┼────────────┼────────┼──────────┤
│ 15         │ Steak        │ Foods      │ 15.95  │ 4        │
└────────────┴──────────────┴────────────┴────────┴──────────┘
----------------------------------------------------------------

? Would you like to return to the Manager Menu? (Y/n)
```
There is also options to add more units to an item already in the database or add a new product to the list.

### Bamazon Demo