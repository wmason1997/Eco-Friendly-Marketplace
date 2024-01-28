<<<<<<< HEAD
=======
// Option #3
function initializeEventListener() {
  document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', function () {
      const itemID = this.dataset.itemId; 
      const quantity = document.querySelector('.quantity-input').value;
      const price = document.querySelector('.price').value // Extracts only the numeric part
      const imageURL = document.querySelector('.imageURL').src;
      const carbon = document.querySelector('.carbon').textContent // Extracts only the numeric part
      const energy = document.querySelector('.energy').textContent // Extracts only the numeric part
      const waste = document.querySelector('.waste').textContent // Extracts only the numeric part
      const name = document.querySelector('.name').textContent; 

      addToCart(itemID, quantity, price, imageURL, carbon, energy, waste, name);
    });
  });
}

function addToCart(itemID, quantity, price, imageURL, carbon, name, energy, waste) {
  const itemData = {
    itemID,
    quantity,
    price,
    imageURL,
    carbon,
    energy,
    waste,
    name,
  };

   fetch('/api/editcart', {
    method: 'POST',
    body: JSON.stringify({itemData}),
    headers: { 'Content-Type': 'application/json' },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error('Fetch error:', error));
}

// Initialize the event listeners when the document is ready
document.addEventListener('DOMContentLoaded', initializeEventListener);
>>>>>>> b89b12c570d4a141c7e330e07b880eae519310f4
