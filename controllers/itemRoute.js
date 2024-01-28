const router = require('express').Router();
const { Item } = require('../models');

// find one item by its 'id' value - for search bar functionality? - redirect user to itemdetailsPg
router.get('/single/:id', async (req, res) => {
  try {
    const itemData = await Item.findByPk(req.params.id, {raw: true});

    // console.log("--- itemData from /single/:id ---")
    // console.log(itemData)

    if (!itemData) {
      res.status(404).json({ message: 'No item found with this id! ' });
      return;
    }
    res.render('itemdetailPg', {
      item: itemData,
      category: req.params.category,
      subcategory: req.params.subcategory,
    });

    // res.status(200).json(itemData);
  } catch (err) {
    console.log("Something went wrong at /single/:id")
    console.log(err)
    res.status(500).json(err);
  }
});

// The '/item' endpoint

// find all subcategories from a specific category AKA category >> subcategory (subcategoriesPg)
router.get('/:category', async (req, res) => {
  try {
    const category = req.params.category;
// console.log("route has been hit")
    // Find all items in db that match the specified category
    const items = await Item.findAll({ 
      where: { category: category },
      attributes: ['subcategory'],
    }); //go plain: text 
    // console.log plain version
// console.log(items)
    const subcategoryData = items.map((item) => item.get({ plain: true }));
    const formattedSubcategories = [...new Set(subcategoryData.map((item) => item.subcategory))];
 
    // create object where each key is a subcategory name and each property is an image
    res.render('subcategoriesPg', {subcategories: formattedSubcategories, category}); 
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// find all items from a specific category and subcategory AKA category >> subcategory >> Items
router.get('/:category/:subcategory', async (req, res) => {
  try {
    let finditems = {
      where: { category: req.params.category },
    };

    if (req.params.subcategory) {
      finditems = {
        where: { subcategory: req.params.subcategory },
      };
    }

    const items = await Item.findAll(finditems);
    const itemData = items.map((item) => item.get({ plain: true }));
    // console.log(itemData);

    res.render('itemsPg', {
      itemData: itemData,
      category: req.params.category,
      subcategory: req.params.subcategory,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});



module.exports = router;
