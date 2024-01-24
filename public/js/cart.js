document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
});

function initializeEventListeners() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function(event) {
            const itemID = event.target.dataset.itemID;
            addToCart(itemID);
        });
    });

    // Other event listeners for cart page...
}

function addToCart(itemID, quantity, price, imageURL) { // addToCart function will get called in handlebars html when the button is clicked

// item data to send to server 
    const itemData = {  // fill in more properties
        itemID: itemID,
        quantity: quantity,
        price: price,
        imageURL: imageURL
    };

    fetch('/cart/add/item', { // makes request to backend
        method: 'POST',
        body: JSON.stringify({itemData}), // fill out rest 
        headers: { 'Content-Type': 'application/json' }
    })
 
    .then(response => {response.json()
    //window.reload to get backend to update the cart.
    })
    // .then(cartData => { // cartData is whatever gets sent back from the fetch request from backend
    //     updateCartUI(cartData);
    //     updateTotalPrice(cartData);
    //     updateQuantity(cartData); // how would i do this with button dropdown? Comes from Bootstrap or wherever i get button icon from(michael)
    // })
    
    .catch(error => console.error('Error:', error));
}


function updateTotalPrice(cartData) {
    let totalPrice = 0;
    cartData.items.forEach(item => {
        totalPrice += item.price * item.quantity;
    });
    // Update the total price on the UI
    document.getElementById('total-price').innerText = totalPrice.toFixed(2); // rounds to 2 decimal places (i.e. $10.9934 to $10.99)
}