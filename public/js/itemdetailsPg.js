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

// //DELETE FROM CART REQUEST
// document.addEventListener('DOMContentLoaded', function () {});
// document.querySelectorAll('.delete-from-cart').forEach((button) => {
//   button.addEventListener('click', function () {
//     console.log('clicked delete button');

//     const itemID = this.dataset.itemId;

//     deletefromCart(itemID);

//     function deletefromCart(itemID) {
//       fetch(`/api/editcart/${itemID}`, {
//         method: 'DELETE',
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
//           return response.json();
//         })

//         .then((data) => {
//           console.log('delete successful', data);
//           location.reload();
//         })
//         .catch((error) => console.error('Fetch error:', error));
//     }
//   });
// });

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
  reviewFormContainer.classList.add('review-model-active');
});

reviewForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  reviewFormContainer.classList.remove('review-model-active');

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

closeReview.addEventListener('click', () => {
  reviewFormContainer.classList.remove('review-model-active');
});


