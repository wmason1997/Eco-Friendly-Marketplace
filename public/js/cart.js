document.addEventListener('DOMContentLoaded', function() {});
//     initializeEventListeners();
// });

// let cartItems = {};
// const addToCartButton = document.querySelector('.add-to-cart');
// addToCartButton.addEventListener('click', function(event) {
//     console.log('click');
//     const itemID = this.getAttribute('data-item-id');//addToCartButton.dataset.itemID;
//     console.log(itemID);
//     addToCart(itemID);
    
// });

// const addToCartButton = document.querySelector('.add-to-cart');
// addToCartButton.addEventListener('click', function(event) {
//     console.log('click');
//     const itemID = this.getAttribute('data-item-id');//addToCartButton.dataset.itemID;
//     console.log(itemID);
//     addToCart(itemID);

//     // function initializeEventListener() {
//     //     document.querySelector('.add-to-cart').addEventListener('click', function(event) {
//     //         console.log('click1');
//     //         const itemID = event.target.dataset.itemID;
//     //         const carbon = parseFloat(document.querySelector('.item-carbon').textContent);
//     //         const energy = parseFloat(document.querySelector('.item-energy').textContent);
//     //         const waste = parseFloat(document.querySelector('.item-waste').textContent);
//     //         addToCart(itemID, carbon, energy, waste);
//     //     });
//     // }

// // function addToCart(itemID, quantity, price, imageURL) { 
//     function addToCart(itemID, name, quantity, price, imageURL, carbon, energy, waste) { 

//     // example values for debugging
//     // need to circle back for these to get properly passed in per item
//         // const quantity = 1;
//         // const price = 20;
//         // const imageURL = "https://i.etsystatic.com/23090474/r/il/1770f0/2956128671/il_570xN.2956128671_n2xg.jpg";

//         const itemData = {  // fill in more properties we want posted to server
//             itemID,
//             name, 
//             quantity,
//             price,
//             imageURL,
//             carbon,
//             energy,
//             waste
//         };

//         fetch(`/api/cart/${itemID}`, { // makes request to backend
//             method: 'POST',
//             body: JSON.stringify(itemData), // fill out rest 
//             headers: { 'Content-Type': 'application/json' }
//         })
//         //.then(response => response.json(itemData))
//         //.then(data => {
//         //    console.log(data)
//         //.then (() => window.location.reload());
//     };
        
// });

// // function initializeEventListener() {
// //     document.querySelector('.add-to-cart').addEventListener('click', function(event) {
// //             console.log('click2');
// //             const itemID = event.target.dataset.itemID;
// //             addToCart(itemID);
// //         });
// //     }


// //initializeEventListener();

// function updateTotalPrice(cartData) {
//     let totalPrice = 0;
//     cartData.items.forEach(item => {
//         totalPrice += item.price * item.quantity;
//     });
//     // Update the total price on the UI
//     document.getElementById('total-price').innerText = totalPrice.toFixed(2); // rounds to 2 decimal places (i.e. $10.9934 to $10.99)
// }

// // Go to cart page when cart in navbar is clicked
//     document.getElementById('my-cart-page').addEventListener('click', function() {
//         window.location.href = `/cart`; 
//     });

document.querySelector('.add-to-cart').addEventListener('click', function() {
    const name = document.querySelector('#name').value;
    const price = document.querySelector('#price').value;
    const quantity = document.querySelector('#quantity').value;
    const imageURL = document.querySelector('#imageURL').value;
    const carbon = document.querySelector('#carbon').value;
    const energy = document.querySelector('#energy').value;
    const waste = document.querySelector('#waste').value;
    const userId = session.user;
    const itemID = this.getAttribute('data-item-id');//addToCartButton.dataset.itemID;
    if (itemID) {
        const itemData = {
            name,
            price,
            quantity,
            imageURL,
            carbon,
            energy,
            waste,
            itemID,
            userId
        };
        sendPostRequest(itemData);
    } else {
        console.error('Error: itemID is not set correctly.');
    }
});


function sendPostRequest(itemData) {
    fetch(`/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
