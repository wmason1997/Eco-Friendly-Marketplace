// let currentCount = 0;
// let increment = 4;


// // Show 4 categories on home page and then show
// function showCategories() {
 
//   const container = document.getElementById('category-container');


//   for (let i = currentCount;i < currentCount + increment && i < categories.length;i++) 
 
//   currentCount += increment;
//   updateButtonVisibility();
// }

// // Load more and back button functionality for categories
// function updateButtonVisibility() {
//   const backButton = document.getElementById('back-button');
//   const loadMoreButton = document.getElementById('load-more');

//   backButton.style.display = currentCount > 0 ? 'inline' : 'none';
//   loadMoreButton.style.display =
//     currentCount + increment < categories.length ? 'inline' : 'none';
// }

// document.getElementById('load-more').addEventListener('click', function () {
//   currentCount += increment;
//   showCategories();
// });

// document.getElementById('back-button').addEventListener('click', function () {
//   currentCount -= increment;
//   if (currentCount < 0) currentCount = 0;
//   showCategories();
// });

// Load the first set of categories on page load
// document.addEventListener('DOMContentLoaded', showCategories);

//FETCH REQUEST FOR SUBCATEGORIES OF CATEGORY CHOSEN 
// function getSubcategories(categoryName) {
//   fetch(`/api/item/items/${categoryName}`)
//     .then(response => response.json())
//     .then(data => {
//       // Handle the response data
//       console.log('Subcategories:', data);
//       // Call function here to display these subcategories
//     })
//     .catch(error => console.error('Error getting subcategories:', error));
// }

// document.getElementById('myaccount-btn').addEventListener('click', function () {
//   if (isLoggedIn()) {
//     window.location.href = '/profile'
//   } else {
//     window.location.href = '/login'
//   }
// });

// function isLoggedIn() {
  
// }

// function searchbarItems() {
//   document.getElementById('search-bar-search-btn').addEventListener('click', function ()) {
//     const response = await fetch('/api/users/login', {
//       method: 'GET',
//       body: JSON.stringify({ itemID, password }),
//       headers: { 'Content-Type': 'application/json' },
//     });
// }


// document.addEventListener('DOMContentLoaded', function() {
//   document.querySelectorAll('.category-link');
//   console.log('Number of links:', links.length);
  
//   links.forEach(link => {
//     link.addEventListener('click', function() {
//       const category = this.getAttribute('data-set-id');

//       fetch(`/api/items/${category}`)
//         .then(response => response.json())
//         .then(subcategories => {
//           displaySubcategories(subcategories, category);
//         })
//         .catch(error => console.error('Error:', error));
//     });
//   });
// });
