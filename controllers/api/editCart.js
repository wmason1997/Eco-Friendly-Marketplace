const router = require('express').Router();
const { cartItem, Item } = require("../../models");

// /api/cart

// POST a new item to the user's cart
router.post('/:id', async (req, res) => {

    const itemID = req.params.id

    try {
  
      const userID = req.session.userID; // Grab userID from session
  
     const addedItem = await cartItem.create({
        userID,
        itemID: itemID
     })

     res.status(200).json({ message: 'Item added to cart successfully', addedItem });

    } catch (error) {
      console.error(error);
    }
  });
    
  
// DELETE an item from the user's cart  
  router.delete('/:id', async (req, res) => {
    // delete an item in the cart by its `id` value and 'userid' value match
    try {
      const cartItemData = await cartItem.destroy({
        where: {
          id: req.params.id,
          userID: req.session.userID,
        },
      });
  
      res.status(200).json(cartItemData);
    } catch (err) {
      res.status(500).json({
        message: 'An error occurred while deleting the item from the cart',
      });
    }
  }); 
  
  module.exports = router;