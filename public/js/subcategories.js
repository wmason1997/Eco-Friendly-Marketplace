document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('.item');
  
    items.forEach((item) => {
      item.addEventListener('click', function () {
        const itemId = this.getAttribute('data-item-id');
        window.location.href = `/item/${itemId}`; // Redirect to item detail page
        console.log("--want item to appear", item)
      });
    });
  });
  