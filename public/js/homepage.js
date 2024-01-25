let currentCount = 0;
const increment = 4;

// Show 4 categories on home page and then show
function showCategories() {
  const container = document.getElementById('category-container');

  for (let i = currentCount;i < currentCount + increment && i < categories.length;i++) 
  {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'category';

    categoryDiv.innerHTML = `
            <a href='/items/${categories[i].name}'>
                <h2>${categories[i].name}</h2>
                <img src='${categories[i].image}' alt='${categories[i].name}' />
            </a>
        `;

    container.appendChild(categoryDiv);
  }

  updateButtonVisibility();
}

function updateButtonVisibility() {
  const backButton = document.getElementById('back-button');
  const loadMoreButton = document.getElementById('load-more');

  backButton.style.display = currentCount > 0 ? 'inline' : 'none';
  loadMoreButton.style.display =
    currentCount + increment < categories.length ? 'inline' : 'none';
}

document.getElementById('load-more').addEventListener('click', function () {
  currentCount += increment;
  showCategories();
});

document.getElementById('back-button').addEventListener('click', function () {
  currentCount -= increment;
  if (currentCount < 0) currentCount = 0;
  showCategories();
});

// Load the first set of categories on page load
document.addEventListener('DOMContentLoaded', showCategories);
