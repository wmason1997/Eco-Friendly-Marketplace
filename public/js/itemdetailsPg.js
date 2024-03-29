// ADD TO CART
document.addEventListener('DOMContentLoaded', function () {});
document.querySelectorAll('.add-to-cart').forEach((button) => {
  button.addEventListener('click', function () {
    console.log('test');
    const itemID = this.dataset.itemId;
    addToCart(itemID);
  });
});

function addToCart(itemID) {
  fetch(`/api/editcart/${itemID}`, {
    method: 'POST',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => console.log(data))
    .catch((error) => console.error('Fetch error:', error));
}

const showReviewFormBtn = document.querySelector('#show-review-form');
const reviewForm = document.querySelector('#review-form');
const reviewFormContainer = document.querySelector('#review-form-container');
const closeReview = document.querySelector('#review-form-container i');
const starsRanges = document.querySelectorAll('.stars-range');
const starsSpans = document.querySelectorAll('.stars');

starsRanges.forEach((range, i) => {
  const span = starsSpans[i];
  span.innerText = '⭐'.repeat(range.value);
  range.addEventListener('input', (e) => {
    span.innerText = '⭐'.repeat(e.target.value);
  });
});

showReviewFormBtn.addEventListener('click', () => {
  console.log("Clicked showreview");
  reviewFormContainer.classList.remove('hidden');
});

reviewForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  reviewFormContainer.classList.add('hidden');

  let res = await fetch('/api/reviews/add/review', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      itemID: reviewForm.dataset.itemid,
      stars: reviewForm.stars.value,
      reviewText: reviewForm.reviewText.value.trim(),
    }),
  });

  if (!res.ok) {
    console.log('something went wrnog', res);
    return;
  }

  let newReview = await res.json();

  console.log(newReview);
});


