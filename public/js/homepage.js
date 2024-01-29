const searchForm = document.querySelector("#search-form")

if (searchForm) {
    searchForm.addEventListener('submit', e => {
        e.preventDefault()
        let query = searchForm['item-name'].value
        location.href = `/searchpage/${query}`
    })
}

