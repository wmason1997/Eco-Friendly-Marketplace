const searchForm = document.querySelector("#search-form")

searchForm.addEventListener('submit', e => {
    e.preventDefault()
    let query = searchForm['project-name'].value
    location.href = `/searchpage/${query}`
})

