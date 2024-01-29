
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

//DELETE FROM CART REQUEST
document.addEventListener('DOMContentLoaded', function() {});
  document.querySelectorAll('.delete-from-cart').forEach((button) => {
    button.addEventListener('click', function () {
      console.log('clicked delete button')
      // const updatedCartItems = Cart.items.filter(item => item.id !== itemId);
      // Cart.items = updatedCartItems;
      const itemID = this.dataset.itemId;
      // const itemElement = this.closest('li');
      // if (!itemElement) {
      //   console.log('Item element not found');
      //   return;
      // }

      deletefromCart(itemID)
    
      function deletefromCart(itemID) {

        fetch(`/api/editcart/${itemID}`, {
          method: 'DELETE',
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })

        .then(data => {
        console.log("delete successful", data);
          // itemElement.remove();
      })
        .catch(error => console.error('Fetch error:', error));
}
    });
  });



