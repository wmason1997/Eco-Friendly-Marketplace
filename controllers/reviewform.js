function loadAddReviewForm(itemId, itemName, itemImage) {
    // Populate the form fields with the item information
    document.getElementById('itemName').value = itemName;
    document.getElementById('itemID').value = itemID;
    document.getElementById('itemImage').src = itemImage;
  
  };

  function loadupdateReviewForm(itemId) {
    // Assuming 'items' is array of item data
    var item = items.find(item => item.id === itemID);
  
    // Populate the form fields
    document.getElementById('itemName').value = item.name;
    document.getElementById('itemReview').value = item.review;
    document.getElementById('itemID').value = item.id;
  }
  
  