const searchFormHandler = async (event) => {
    event.preventDefault();

    // Akin to profile.js
    // Need to intake the search info and assign to variables
    const searchInput = document.querySelector('#search-bar').value.trim();
    
    if (searchInput) {
        const response = await fetch(`/api/items`, {
            method: 'POST',
            body: JSON.stringify({ searchInput }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/itemsPg');
            // here I want to filter through the items to return only the items that match what the user searched
            
        } else {
            alert('Could not perform search');
        }
    }
};

// Need to add according to the id
document
    .querySelector('.new-search-form')
    .addEventListener('submit', searchFormHandler)