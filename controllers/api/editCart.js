const router = require('express').Router();
const { Cart, Item } = require("../../models");

// /api/cart

// Add a new item to the user's cart
router.post('/:id', async (req, res) => {
    try {
      const {itemData} = req.body;
      const { itemID, name, quantity, price, imageURL, carbon, energy, waste } = itemData;

      // const {itemID} = itemData;
      // const userID = req.session.userID;
      // const itemID = req.params.id;
      const userID = req.session.userID; // Grab userID from session
  
//       // Find the user's cart or create a new one if it doesn't exist
      let userCart = await Cart.findOne({ where: { userID } });
      if (!userCart) {
        userCart = await Cart.create({ userID });
      }
  
      // Add item to cart
      // Does the cart model have an addItem method?
      const addedItem = await Cart.addItem({
        cartID: userCart.id,
        itemID,
        name,
        quantity,
        price,
        imageURL,
        carbon,
        energy,
        waste
      });
  
      res.status(200).json({ message: 'Item added to cart successfully', addedItem });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while adding the item to the cart' });
    }
  });
  
  
  router.delete('/:itemID', async (req, res) => {
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