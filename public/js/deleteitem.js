//DELETE FROM CART REQUEST
document.addEventListener('DOMContentLoaded', function () {});
document.querySelectorAll('.delete-from-cart').forEach((button) => {
  button.addEventListener('click', function () {
    console.log('clicked delete button');

    const itemID = this.dataset.itemId;

    deletefromCart(itemID);

    function deletefromCart(itemID) {
      fetch(`/api/editcart/${itemID}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })

        .then((data) => {
          console.log('delete successful', data);
          location.reload();
        })
        .catch((error) => console.error('Fetch error:', error));
    }
  });
});