const router = require('express').Router();
const { Cart, cartItem, Item } = require('../../models');

router.get('/cart', async (req, res) => {
  // find cart
  // be sure to include its associated Products
  try {
    const userID = req.session.userID;
    const userCartItems = await Cart.findAll({
      where: { userID: 1 },
      include: [{ model: cartItem }],
    });

    // Serialize data so the template can read it
    const cartItems = userCartItems.map((item) => item.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('cart', {
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
    await cartItem.update(req.body, {
      where: {
        id: req.params.itemID,
        userID: req.session.userID, 
      },
    });

    // Fetch the updated cart items for the user
    const updatedCartItems = await cartItem.findAll({
      where: { userID: req.session.userID },
      include: [{ model: cartItem }], 
    });

    // Serialize data so the template can read it
    const cartItems = updatedCartItems.map((cartItem) => cartItem.get({ plain: true }));

    // Render the cart page and pass the updated cart items to the template
    res.render('cart', {
      items: cartItems,
      logged_in: req.session.logged_in,
    });

  } catch (error) {
    console.error(error);
    res.status(500).render(error, { message: 'An error occurred while updating the cart' });
  }
});

router.delete('/:id', async (req, res) => {
  // delete an item in the cart by its `id` value and 'userid' value match
  try {
    const itemID = req.params.itemID;
    const userID = req.session.userID;

    const cartitemData = await cartItem.destroy({
      where: {
        id: itemID,
        userID: userID,
      },
    });

    res.status(200).json(cartitemData);
  } catch (err) {
    res.status(500).json({
      message: 'An error occurred while deleting the item from the cart',
    });
  }
});

module.exports = router;
