var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
const gUI = "----------------------------------------------------------------";  
const spacers = "                         "// help with layout
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

// Looping feature to return user to customer menu

function tryAgain(){
    console.log(" ");
    inquirer.prompt([
        {   type: "confirm",
            name: "attempt",
            message: "Would you like to return to the Customer Menu?"
        }
    ]).then(function(answer){ 
        var choice = answer.attempt;
        if (choice){
            custOptions();
        }
        else{
            console.log("Goodbye");
            connection.end();
        }
    })
}

//Validation function

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

// Loading customer menu

function custOptions(){
    console.log(gUI);
    console.log(spacers + "Customer's Menu");
    console.log(gUI);
    inquirer.prompt([
        {
            name: "options",
            type: "list",
            message: "What would you like to do:",
            choices: [
                "Display all products",
                "Purchase a product",
                "Quit"
            ]
        }
    ]).then(function(answer){
        var choice = answer.options;
        switch(choice){
            case "Display all products":
                displayAll();
            break;
            case "Purchase a product":
                custPurch();
            break;
            case "Quit":
                console.log("Goodbye");
                connection.end();
            break;
        }
    })

}

//processing user's purchase request

function custPurch(){
    var query = "SELECT * FROM store_items WHERE ?;"
    console.log(gUI);
    console.log(spacers + "Purchase an Item");
    console.log(gUI);
    inquirer.prompt([
        {
            type: "input",
            name: "itemID",
            message: "Please enter the Product's ID number you wish to purchase:",
            validate: checkInput,
            filter: Number
        },
        {
            type: "input",
            name: "quantity",
            message: "How many do you want?",
            validate: checkInput,
            filter: Number
        }
    ]).then(function(userInput) {
        var product = userInput.itemID;
        var quantity = userInput.quantity;
        connection.query(query, {product_id: product}, function(cb, data){
            if (data.length === 0){
                console.log(gUI);
                console.log("There is no product for that ID.  Please select an ID from our product catalog");
                tryAgain();
            }
            else {
                // assign variable to the return data from database
                var custProduct = data[0];
                if (quantity <= custProduct.stock_quantity){
                    console.log(gUI);
                    console.log("The product " + custProduct.product_name +" is in stock!  Processing your purchase for " + quantity + " " + custProduct.product_name + "(s)." );
                    var queryUpdate = "UPDATE store_items SET stock_quantity = " + (custProduct.stock_quantity - quantity) + " WHERE product_id = " + product;
                    connection.query(queryUpdate, function(cb, data){
                        console.log(gUI);
                        console.log("Your purchase of " + quantity + " " + custProduct.product_name + "(s) has been placed with the total cost of: $" + custProduct.price * quantity);
                        tryAgain();
                    })
                }
                else{
                    console.log("That product is not in stock.")
                    console.log(gUI);
                    tryAgain();
                }
            }
        })
    })
}

//displaying the store's inventory

function displayAll(){
    var query = "SELECT * FROM store_items";
    var table = new Table({
        head: ["Product ID", "Product Name", "Department", "Price"],
    });

    connection.query(query, function (cb, data){
        console.log(gUI);
        console.log(spacers + "Product Catalog");
        console.log(gUI);
        var prodDisp ="";
        for (var i = 0; i < data.length; i++){
            // build a CLI table 
            table.push([data[i].product_id, data[i].product_name, data[i].department_name, data[i].price]);
        }
        console.log(table.toString());
        console.log(gUI);
        tryAgain();
    })
}

// Start the application
custOptions();