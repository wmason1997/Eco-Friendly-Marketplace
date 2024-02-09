
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("show-my-reviews").addEventListener("click", function(event) {
    event.preventDefault();
    console.log('my review button clicked')
    const reviewsContainer = document.getElementById("reviews-container");
    reviewsContainer.classList.remove("hidden");
  });
});
