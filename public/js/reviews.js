const editForms = document.querySelectorAll('.edit-review-form')
const editButtons = document.querySelectorAll('.edit-review-button')
const deleteButtons = document.querySelectorAll('.delete-review-button')
const starsRanges = document.querySelectorAll('.stars-range')
const starsSpans = document.querySelectorAll('.stars')

editButtons.forEach((btn, i) => {
  btn.addEventListener('click', ()=>{
    const form = editForms[i]
    form.parentElement.classList.remove('hidden')
  })
})

editForms.forEach(form => {
  form.addEventListener('submit', async e=> {
    e.preventDefault()

    let res = await fetch(`/api/reviews/update/review/${form.dataset.reviewid}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        reviewText: form.reviewText.value,
        stars: form.stars.value
      })
    })

    if (!res.ok) {
      console.log("something went wrong")
      return
    }

    console.log('success')
    location.reload()
    form.parentElement.classList.add('hidden')

  })
})


//Delete review
deleteButtons.forEach((button, i) => {
  button.addEventListener('click', async function () {
    console.log('clicked delete button');

    const form = editForms[i]
    const reviewid = form.dataset.reviewid;

    const res = await fetch(`/api/reviews/delete/review/${reviewid}`, {
        method: 'DELETE'
    })

    const result = await res.json()
    location.reload()
    
  });
});


starsRanges.forEach((range, i) => {
    const span = starsSpans[i]
    span.innerText = ("⭐").repeat(range.value)
    range.addEventListener('input', (e) => {
        span.innerText = ("⭐").repeat(e.target.value)
    })
})