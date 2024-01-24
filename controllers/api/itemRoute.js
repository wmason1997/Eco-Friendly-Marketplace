const router = require('express').Router();
const { Item } = require('../../models');

// The '/api/item' endpoint

// find all subcategories from a specific category AKA category >> subcategory (subcategoriesPg)
router.get('/items/:category', async (req, res) => {
    try {
        const category = req.params.category;

       // Find all items in db that match the specified category
        const items = await Item.findAll({
            attributes: ['subcategory'],
            where: { category: category },
            group: ['subcategory'] // Group by subcategory to get distinct values
        });

        // Extract subcategories and filter out duplicates
        const subcategories = [...new Set(items.map(item => item.subcategory))];

        res.render('subcategoriesPg', {
            category: category,
            subcategories: subcategories
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});


// find all items from a specific category and subcategory AKA category >> subcategory >> Items
router.get('/items/:category/:subcategory/itemsPg', async (req, res) => {
    try {
      let finditembyCategory = {
        where: { category: req.params.category }
      };
  
      if (req.params.subcategory) {
        finditembyCategory = {
            where: {subcategory: req.params.subcategory} 
      };
    }
  
      const items = await Item.findAll(finditembyCategory);
      const itemData = items.map((item) => item.get({plain : true}))
    console.log(itemData)

      res.render('itemsPg', { 
        itemData: itemData,
        category: req.params.category,
        subcategory: req.params.subcategory
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });

// find one item by its 'id' value - for search bar functionality? - redirect user to itemdetailsPg
router.get('/:id', async (req, res) => {
    try {
        const itemData = await Item.findByPk(req.params.id);

        if (!itemData) {
            res.status(404).json({ message: 'No item found with this id! '});
            return;
        }
        res.render('itemsdetailsPg', { 
            itemData: itemData,
            category: req.params.category,
            subcategory: req.params.subcategory
        });

        res.status(200).json(itemData);
    } catch {
        res.status(500).json(err);
    }
});

module.exports = router