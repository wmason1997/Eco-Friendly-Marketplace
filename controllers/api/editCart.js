const router = require('express').Router();
const { Cart, cartItem, Item } = require('../models');

// Add a new item to the user's cart
router.post('/cart/add/item', async (req, res) => {
    try {
      const { itemID, price, imageURL } = req.body;
      let { quantity } = req.body; // extract quantity to modify it if needed
      const userID = req.session.userID;
  
      // Set default quantity to 1 if it's not provided or less than 1
      if (!quantity || quantity < 1) {
        quantity = 1;
      }
      // Find the user's cart or create a new one if it doesn't exist
      let userCart = await Cart.findOne({ where: { userID } });
      if (!userCart) {
        userCart = await Cart.create({ userID });
      }
  
      // Add item to cart
      const cartData = await Cart.addItem({
        // ensure this method is correctly implemented, does it only work with many to many relationships?
        cartID: userCart.id,
        itemID: itemID,
        price: price,
        quantity: quantity,
        itemImage: imageURL,
      });
  
      res
        .status(200)
        .json({ message: 'Item added to cart successfully', cartData });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: 'An error occurred while adding the item to the cart' });
    }
  });
  
  
  router.delete('/cart/delete/:itemId', async (req, res) => {
    // delete an item in the cart by its `id` value and 'userid' value match
    try {
      const cartItemData = await Cart.destroy({
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