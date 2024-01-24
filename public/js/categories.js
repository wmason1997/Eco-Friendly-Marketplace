const categories = [
  {
    name: 'Category 1',
    imageUrl: 'http://',
  },
  {
    name: 'Category 2',
    imageUrl: 'http://',
  },
  {
    name: 'Category 3',
    imageUrl: 'http://',
  },
  {
    name: 'Category 4',
    imageUrl: 'http://',
  },
  {
    name: 'Category 5',
    imageUrl: 'http://',
  },
  {
    name: 'Category 6',
    imageUrl: 'http://',
  },
  {
    name: 'Category 7',
    imageUrl: 'http://',
  },
  {
    name: 'Category 8',
    imageUrl: 'http://',
  },
  // ... more categories if needed
];


function choseCategory(itemID, quantity, price, imageURL) { // addToCart function will get called in handlebars html when the button is clicked

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