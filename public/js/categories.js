const categories = [
  {
    name: 'Category 1',
    imageUrl: 'http://',
  },
  {
    name: 'Category 2',
    imageUrl: 'http://',
  },
  {
    name: 'Category 3',
    imageUrl: 'http://',
  },
  {
    name: 'Category 4',
    imageUrl: 'http://',
  },
  {
    name: 'Category 5',
    imageUrl: 'http://',
  },
  {
    name: 'Category 6',
    imageUrl: 'http://',
  },
  {
    name: 'Category 7',
    imageUrl: 'http://',
  },
  {
    name: 'Category 8',
    imageUrl: 'http://',
  },
  // ... more categories if needed
];

function choseCategory(itemID, subcategory,subcategoryImage) { //chooseCategory function will get called in handlebars html when user click category image. Will get take to the subcategories page of that category. 

    // Redirect to the subcategories page for the chosen category
    window.location.href = `/items/${category}`;
}