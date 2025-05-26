// Rjay luis Acosta 1B

// Display an alert with the café name
alert("** OrderNet Café **");

// Welcome message for the customer
alert("Welcome to OrderNet Café!\nEnjoy delicious food with free Internet!");

// Initialize customer info and orders
let cart = {
    name: "",        // Customer's name
    tableNo: "",    // Customer's table number
    orders: []      // Array to hold customer's orders
};

// Data for items & stock in different categories
let beverages = [
    { name: "Coffee", price: 17, stock: 100 },
    { name: "Soda", price: 25, stock: 500 },
    { name: "Smoothies", price: 30, stock: 20 },
    { name: "Tea", price: 15, stock: 20 },
    { name: "Juice", price: 15, stock: 30 }
];

let snacks = [
    { name: "Chips", price: 15, stock: 30 },
    { name: "Nuts", price: 16, stock: 30 },
    { name: "Popcorn", price: 15, stock: 30 },
    { name: "Crackers", price: 12, stock: 50 },
    { name: "Sandwiches", price: 10, stock: 25 }
];

let meals = [
    { name: "Rice", price: 15, stock: 200 },
    { name: "Curry", price: 25, stock: 200 },
    { name: "Fried Egg", price: 15, stock: 20 },
    { name: "Hotdog", price: 20, stock: 20 },
    { name: "Adobo", price: 20, stock: 200 }
];

let fastFood = [
    { name: "Burgers", price: 20, stock: 35 },
    { name: "Hotdog's", price: 20, stock: 25 },
    { name: "Fries", price: 20, stock: 35 },
    { name: "Cup Noodles", price: 25, stock: 15 },
    { name: "Tacos", price: 30, stock: 40 }
];

let desserts = [
    { name: "Ice Cream", price: 20, stock: 100 },
    { name: "Cup Cake", price: 15, stock: 100 },
    { name: "Donut", price: 20, stock: 100 },
    { name: "Pudding", price: 25, stock: 100 },
    { name: "Puto", price: 5, stock: 300 }
];

let comboMeals = [
    { name: "Breakfast Combo", price: 100, stock: 100 },
    { name: "Lunch Combo", price: 120, stock: 100 },
    { name: "Kids Combo", price: 80, stock: 100 },
    { name: "Dinner Combo", price: 150, stock: 100 },
    { name: "Healthy Combo", price: 160, stock: 100 }
];

// Function to get customer information
function askCustomerInfo() {
    cart.name = prompt("Enter your name:"); // Prompt for customer's name
    cart.tableNo = prompt("Enter your table number:"); // Prompt for customer's table number
}

// Function to show items in a selected category
function showItems(category, name) {
    let message = name + ":\n"; // Initialize message with category name
    for (let i = 0; i < category.length; i++) {
        // Loop through each item in the category
        message += (i + 1) + ". " + category[i].name + " - Price: " + category[i].price + ", Stock: " + category[i].stock + "\n"; // Add item details to message
    }
    message += (category.length + 1) + ". Back"; // Option to go back
    while (true) {
        let choice = prompt(message + "\nChoose item number:"); // Prompt user to choose an item
        if (choice === null) return; // Exit if user cancels
        if (choice == (category.length + 1)) break; // Exit loop if user chooses to go back
        let index = parseInt(choice) - 1; // Convert choice to index
        if (index >= 0 && index < category.length) { // Check if index is valid
            let qty = prompt("Enter quantity (Stock: " + category[index].stock + "):"); // Prompt for quantity
            let qtyNum = parseInt(qty); // Convert quantity to number
            if (qtyNum > 0 && qtyNum <= category[index].stock) { // Validate quantity
                // Check if item is already in cart
                let found = false;
                for (let j = 0; j < cart.orders.length; j++) {
                    if (cart.orders[j].name == category[index].name) { // If item found in cart
                        cart.orders[j].quantity += qtyNum; // Update quantity
                        found = true; // Mark as found
                        break;
                    }
                }
                if (!found) { // If item not found in cart
                    cart.orders.push({
                        name: category[index].name, // Add new item to cart
                        price: category[index].price,
                        quantity: qtyNum
                    });
                }
                category[index].stock -= qtyNum; // Decrease stock
                alert(qtyNum + " x " + category[index].name + " added to cart."); // Confirm addition to cart
            } else {
                alert("Invalid quantity."); // Alert for invalid quantity
            }
        } else {
            alert("Invalid choice."); // Alert for invalid choice
        }
    }
}

// Function to show the main menu
function mainMenu() {
    while (true) {
        // Display main menu options
        let choice = prompt("Menu:\n" +
            "a. Beverages\n" +
            "b. Snacks\n" +
            "c. Meals\n" +
            "d. Fast food\n" +
            "e. Desserts\n" +
            "f. Combo Meal\n" +
            "g. View cart\n" +
            "h. Remove Item\n" +
            "i. Cancel order").toLowerCase(); // Get user choice
        if (!choice) continue; // Continue if no choice is made
        if (choice == 'a') showItems(beverages, "Beverages"); // Show beverages
        else if (choice == 'b') showItems(snacks, "Snacks"); // Show snacks
        else if (choice == 'c') showItems(meals, "Meals"); // Show meals
        else if (choice == 'd') showItems(fastFood, "Fast Food"); // Show fast food
        else if (choice == 'e') showItems(desserts, "Desserts"); // Show desserts
        else if (choice == 'f') showItems(comboMeals, "Combo Meals"); // Show combo meals
        else if (choice == 'g') viewCart(); // View cart
        else if (choice == 'h') removeFromCart(); // Remove item from cart
        else if (choice == 'i') {
            alert("Thank you for visiting OrderNet Café!"); // Thank user for visiting
            break; // Exit the menu
        }
        else alert("Invalid choice."); // Alert for invalid choice
    }
}

// Function to show cart details
function viewCart() {
    if (cart.orders.length == 0) { // Check if cart is empty
        alert("Cart is empty."); // Alert if empty
        return; // Exit function
    }
    let message = "Customer name: " + cart.name + "\nTable no: " + cart.tableNo + "\nOrders:\n"; // Initialize message with customer info
    let total = 0; // Initialize total price
    for (let i = 0; i < cart.orders.length; i++) { // Loop through orders
        let item = cart.orders[i]; // Get current item
        message += item.name + ", " + item.price + " each, Qty: " + item.quantity + "\n"; // Add item details to message
        total += item.price * item.quantity; // Calculate total price
    }
    message += "Total price: " + total + "\n"; // Add total price to message
    let confirmOrder = prompt(message + "Finalize order? (Y/N)").toLowerCase(); // Confirm order
    if (confirmOrder == 'y') { // If confirmed
        payment(total); // Proceed to payment
    }
}

// Function to remove or adjust items in cart
function removeFromCart() {
    if (cart.orders.length == 0) { // Check if cart is empty
        alert("Cart is empty."); // Alert if empty
        return; // Exit function
    }
    let message = "Remove item:\n"; // Initialize message for removing items
    for (let i = 0; i < cart.orders.length; i++) { // Loop through orders
        message += (i + 1) + ". " + cart.orders[i].name + " Qty: " + cart.orders[i].quantity + "\n"; // Add item details to message
    }
    message += (cart.orders.length + 1) + ". Back"; // Option to go back
    let choice = prompt(message + "\nChoose item number:"); // Prompt user to choose an item to remove
    let index = parseInt(choice) - 1; // Convert choice to index
    if (index == cart.orders.length || isNaN(index) || index < 0) return; // Exit if invalid index

    let qtyStr = prompt("Enter quantity to remove (max " + cart.orders[index].quantity + "):"); // Prompt for quantity to remove
    let qtyNum = parseInt(qtyStr); // Convert quantity to number
    if (qtyNum > 0 && qtyNum <= cart.orders[index].quantity) { // Validate quantity
        // Add stock back to the item
        addStockBack(cart.orders[index].name, qtyNum); // Call function to add stock back
        cart.orders[index].quantity -= qtyNum; // Decrease quantity in cart
        if (cart.orders[index].quantity == 0) { // If quantity is zero
            cart.orders.splice(index, 1); // Remove item from cart
        }
        alert("Removed " + qtyNum + " from " + cart.orders[index]?.name || "item"); // Confirm removal
    } else {
        alert("Invalid quantity."); // Alert for invalid quantity
    }
}

// Function to add stock back to item when removed from cart
function addStockBack(itemName, qty) {
    let categories = [beverages, snacks, meals, fastFood, desserts, comboMeals]; // Array of all categories
    for (let c = 0; c < categories.length; c++) { // Loop through categories
        for (let i = 0; i < categories[c].length; i++) { // Loop through items in category
            if (categories[c][i].name == itemName) { // If item matches
                categories[c][i].stock += qty; // Add stock back
                return; // Exit function
            }
        }
    }
}

// Function to handle payment method selection
function payment(total) {
    let choice = prompt("How do you want to pay?\n" + // Prompt for payment method
        "a. Cash\nb. Gcash\nc. Card\nd. Paymaya").toLowerCase(); // Get user choice
    let method = ""; // Initialize payment method
    if (choice == 'a') method = "Cash"; // Set method based on choice
    else if (choice == 'b') method = "Gcash";
    else if (choice == 'c') method = "Card";
    else if (choice == 'd') method = "Paymaya";
    else {
        alert("Invalid payment method."); // Alert for invalid method
        return; // Exit function
    }
    showReceipt(total, method); // Show receipt
}

// Function to show receipt and internet code
function showReceipt(total, method) {
    let receipt = "Order receipt:\nCustomer: " + cart.name + "\nTable: " + cart.tableNo + "\nOrders:\n"; // Initialize receipt message
    for (let i = 0; i < cart.orders.length; i++) { // Loop through orders
        let item = cart.orders[i]; // Get current item
        receipt += item.name + ", " + item.price + " x " + item.quantity + "\n"; // Add item details to receipt
    }
    receipt += "Total: " + total + "\nPayment: " + method + "\n\nThank you for your order!\n\n"; // Add total and payment method
    receipt += "Here is your free internet code: lordNeedKoTulog48hrsplease\nDuration: 1hr 30mins"; // Add internet code
    alert(receipt); // Show receipt to user
    // After payment, clear cart
    cart.orders = []; // Reset orders in cart
}

// Run program
askCustomerInfo(); // Get customer info
mainMenu(); // Show main menu

// Log programmer details to console
console.log("*** OrderNet Cafe ***");
console.log("Programmers:");
console.log("Acosta, R Jay Luis C.");