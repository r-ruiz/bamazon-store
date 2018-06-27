var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
const gUI = "----------------------------------------------------------------"; 
const spacers = "                         ";// help with layout
const cb = (err) => { if(err) throw (err); } // trapping error

//connection to the database

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "root",
    database: "bamazondb"
  });

// Looping feature to return user to manager's menu

function tryAgain(){
    console.log(" ");
    inquirer.prompt([
        {   type: "confirm",
            name: "attempt",
            message: "Would you like to return to the Manager Menu?"
        }
    ]).then(function(answer){ 
        var choice = answer.attempt;
        if (choice){
            manOptions();
        }
        else{
            console.log("Goodbye");
            connection.end();
        }
    })
}

//Validation functions

//Check for positive integer
function checkInput(value){
    var userSelect = Number.isInteger(parseFloat(value));
    var givenSign = Math.sign(value);
    if (userSelect && (givenSign === 1)){
        return true;
    }
    else {
        return ("Please enter a positive number that is not a zero");
    }
}

//Check for positive sale price
function checkPrice(value){
    var userPrice = (typeof parseFloat(value)) === "number";
    var givenSign = parseFloat(value) > 0;
    if (userPrice && givenSign){
        return true;
    }
    else {
        return("Please enter a positive sale price.");
    }
}

// Render the manager's menu screen

function manOptions(){
    console.log(gUI);
    console.log(spacers + "manager's Menu");
    console.log(gUI);
    inquirer.prompt([
        {
            name: "options",
            type: "list",
            message: "What would you like to do:",
            choices: [
                "Display all products for sale",
                "Display low inventory",
                "Add to Inventory",
                "Add new product",
                "Quit"
            ]
        }
    ]).then(function(answer){
        var choice = answer.options;
        switch(choice){
            case "Display all products for sale":
                displayAll();
            break;
            case "Display low inventory":
                lowInv();
            break;
            case "Add to Inventory":
                addInv();
            break;
            case "Add new product":
                addProd();
            break;
            case "Quit":
                console.log("Goodbye");
                connection.end();
            break;
        }
    })

}

// Display items in the database with a quantity less than 5

function lowInv(){
    var query = "SELECT * FROM store_items WHERE stock_quantity < 5";
    var table = new Table({
        head: ["Product ID", "Product Name", "Department", "Price", "Quantity"],
    });
    connection.query(query, function(cb, data){
        console.log(gUI);
        console.log("Low Inventory Items (Less than 5)");
        console.log(gUI);
        var prodDisp = "";
        for (var i = 0; i < data.length; i++){
            // build a CLI table 
            table.push([data[i].product_id, data[i].product_name, data[i].department_name, data[i].price, data[i].stock_quantity]);
        }
        console.log(table.toString());
        console.log(gUI);
        tryAgain();
    })
}

// Add more quantity to current items in database 

function addInv(){
    console.log(gUI);
    console.log(spacers + "Add to current inventory");
    console.log(gUI);
    inquirer.prompt([
        {
            type: "input",
            name: "prodID",
            message: "Enter the product ID number:",
            validate: checkInput,
            filter: Number
        },
        {
            type: "input",
            name: "quantity",
            message: "How many will add to this product inventory?",
            validate: checkInput,
            finter: Number
        }
    ]).then(function(userInput){
        var query = "SELECT * FROM store_items WHERE ?";
        var product = userInput.prodID;
        var quantity = parseInt(userInput.quantity);
        connection.query(query, {product_id: product}, function(cb,data){
            if (data.length === 0){
                console.log(gUI);
                console.log("There is no product for that ID.  Please select an ID from our product catalog");
                tryAgain();
            }
            else{
                var manProduct = data[0];
                var newQuantity = manProduct.stock_quantity + quantity;
                console.log(gUI);
                console.log(spacers + "Updating product inventory");
                var query = "UPDATE store_items SET stock_quantity = " + newQuantity + " WHERE product_id = " + product;
                connection.query(query, function(cb, data){
                    console.log(gUI);
                    console.log("Product " + manProduct.product_name + " now has " + newQuantity + ".");
                    tryAgain();
                })
            }
        })

    })
}

// add a new product to the database

function addProd(){
    console.log(gUI);
    console.log(spacers + "Add a new product");
    console.log(gUI);
    inquirer.prompt([
        {
            type: "input",
            name: "product_name",
            message: "Enter the new product's name:"
        },
        {
            type: "input",
            name: "department_name",
            message: "Enter the department for this product:"
        },
        {
            type: "input",
            name: "price",
            message: "What is the unit price?",
            validate: checkPrice
        },
        {
            type: "input",
            name: "stock_quantity",
            message: "How many will be in the inventory?",
            validate: checkInput
        }

    ]).then(function(input){
        console.log(gUI);
        console.log(spacers + "Writing to Inventory");
        console.log(gUI);
        console.log("Adding the following product:\n Product Name: " + input.product_name + "\n Department Name: " + input.department_name + "\n Price: "+ input.price + "\n Quantity: " + input.stock_quantity);
        console.log(gUI);
        var query = "INSERT INTO store_items SET ?";
        connection.query(query, input, function(cb, results){
            console.log(gUI);
            console.log(input.product_name + " has been added to the inventory.");
            console.log(gUI);
            tryAgain();
        })
    })
}

//Display all items in the database

function displayAll(){
    var query = "SELECT * FROM store_items";
    var table = new Table({
        head: ["Product ID", "Product Name", "Department", "Price", "Quantity"],
    });

    connection.query(query, function (cb, data){
        console.log(gUI);
        console.log(spacers + "Product Catalog");
        console.log(gUI);
        var prodDisp ="";
        for (var i = 0; i < data.length; i++){
            // build a CLI table 
            table.push([data[i].product_id, data[i].product_name, data[i].department_name, data[i].price, data[i].stock_quantity]);
        }
        console.log(table.toString());
        console.log(gUI);
        tryAgain();
    })
}

// Start the application
manOptions();