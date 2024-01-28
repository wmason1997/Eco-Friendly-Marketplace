const router = require('express').Router();
const { Cart, Item } = require("../../models");

// /api/cart

// Add a new item to the user's cart
//Option #1
// router.post('/add/item', async (req, res) => {
//     try {
//       const {itemData} = req.body;
//       const {itemID} = itemData;
//       const userID = req.session.userID;
  
// //       // Find the user's cart or create a new one if it doesn't exist
//       let userCart = await Cart.findOne({ where: { userID } });
//       if (!userCart) {
//         userCart = await Cart.create({ userID });
//       }
  
//       // Add item to cart
//       // Does the cart model have an addItem method?
//       const cartData = await Cart.addItem({
//         cartID: userCart.id,
//         itemID: itemID,
        

//       });
  
//       res
//         .status(200)
//         .json({ message: 'Item added to cart successfully', cartData });
//     } catch (error) {
//       console.error(error);
//       res
//         .status(500)
//         .json({ message: 'An error occurred while adding the item to the cart' });
//     }
//   });
  
//Option #2
  router.post('/items', async (req, res) => {
    try {
        const { userId, itemId, quantity, price, name, carbon, energy,waste } = req.body;
        
        // Find the user's cart or create a new one
        let cart = await Cart.findOne({ where: { userId } });
        if (!cart) {
            cart = await Cart.create({ userId });
        }

        // Add item to cart
        const cartItem = await CartItem.create({
            cartId: cart.id,
            itemId,
            quantity,
            price,
            name,
            carbon,
            energy,
            waste,
        });

        res.status(200).json({ message: 'Item added to cart', cartItem });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding item to cart');
    }
});
  
  router.delete('/:itemId', async (req, res) => {
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