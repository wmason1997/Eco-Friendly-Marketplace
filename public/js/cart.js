// document.addEventListener('DOMContentLoaded', function() {
//     initializeEventListeners();
// });

// let cartItems = {};


function initializeEventListener() {
    document.querySelector('.add-to-cart').addEventListener('click', function(event) {
            const itemID = event.target.dataset.itemID;
            addToCart(itemID);
        });
    }

// function addToCart(itemID, quantity, price, imageURL) { 
function addToCart(itemID) { 

    const itemData = {  // fill in more properties we want posted to server
        itemID: itemID,
        quantity: quantity,
        price: price,
        imageURL: imageURL,
        carbon: carbon,
        energy: energy,
        waste: waste

    };

    fetch('/cart/add/item', { // makes request to backend
        method: 'POST',
        body: JSON.stringify({itemData}), // fill out rest 
        headers: { 'Content-Type': 'application/json' }
    })
 
    .then(response => response.json())
    .then (() => window.location.reload());
};

function initializeEventListener() {
    document.querySelector('.add-to-cart').addEventListener('click', function(event) {
            console.log('click');
            const itemID = event.target.dataset.itemID;
            addToCart(itemID);
        });
    }

initializeEventListener();

function updateTotalPrice(cartData) {
    let totalPrice = 0;
    cartData.items.forEach(item => {
        totalPrice += item.price * item.quantity;
    });
    // Update the total price on the UI
    document.getElementById('total-price').innerText = totalPrice.toFixed(2); // rounds to 2 decimal places (i.e. $10.9934 to $10.99)
}

// function initializeEventListener() {
//     document.querySelector('.add-to-cart').addEventListener('click', function(event) {
//             const itemID = event.target.dataset.itemID;
//             addToCart(itemID);
//         });
//     }

// Go to cart page when cart in navbar is clicked
document.addEventListener('DOMContentLoaded', function() {
         document.getElementById('my-cart-page').addEventListener('click', function() {
                window.location.href = `/cart`; 
            });
        });