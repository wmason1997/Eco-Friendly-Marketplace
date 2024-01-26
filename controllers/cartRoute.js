const router = require('express').Router();
const { Cart, cartItem, Item } = require('../models');

// GET user's shopping cart
router.get('/cart', async (req, res) => {
  try {
    const userID = req.session.userID;
    console.log(userID);
    const userCartItems = await Cart.findAll({
      where: { userID: req.session.userID },
      include: [{ model: cartItem, include: [{ model: Item }] }],
    });
    // Check if userCartItems is not null or undefined before mapping
    const cartItems = userCartItems ? userCartItems.map((item) => item.get({ plain: true })): [];

    // Pass serialized data and session flag into template
    res.render('cart', {
      // 'cart' has to correspond to card.handlebars
      items: cartItems,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'An error occurred while retrieving the cart' });
  }
});

router.put('/cart/update/:itemID', async (req, res) => {
  // Update the specified cart item's quantity
  try {
    // await Cart.update(req.body, {
    //   where: {
    //     id: req.params.itemID,
    //     userID: req.session.userID,
    //   },
    // });

    // Fetch the updated cart items for the user
    const updatedCartItems = await Cart.findOne({
      where: { userID: req.session.userID },
      include: [{ model: cartItem }],
    });
    console.log(updatedCartItems);
    // After we get the users cart, add the item to that cart

    // Serialize data so the template can read it
    const cartItems = updatedCartItems.map((cartItem) =>
      cartItem.get({ plain: true })
    );

    // Render the cart page and pass the updated cart items to the template
    res.render('cart', {
      items: cartItems,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .render(error, { message: 'An error occurred while updating the cart' });
  }
});

// Splite delete and post route and put in API folder for cart

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
