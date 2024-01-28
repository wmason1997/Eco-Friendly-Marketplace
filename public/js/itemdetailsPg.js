
document.addEventListener('DOMContentLoaded', function() {});

  document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', function () {
      console.log('test')
      const itemID = this.dataset.itemId; 
      addToCart(itemID);
    })
  })


function addToCart(itemID) {

    fetch(`/api/editcart/${itemID}`, {
      method: 'POST',
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
