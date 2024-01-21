const router = require('express').Router();
const { Cart, cartItem } = require('../../models');

router.get('/cart', async (req, res) => {
  // find cart
  // be sure to include its associated Products
  try {
    const userId = req.session.userId;
    const userCartItems = await Cart.findAll({
      where: { userId: userId },
      include: [{ model: Item, as: 'Items' }],
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

router.put('/cart/update/:itemId', async (req, res) => {
  // Update the specified cart item's quantity
  try {
    await cartItem.update(req.body, {
      where: {
        id: req.params.itemId,
        userId: req.session.userId, 
      },
    });

    // Fetch the updated cart items for the user
    const updatedCartItems = await cartItem.findAll({
      where: { userId: req.session.userId },
      include: [{ model: Item }], 
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

router.delete('/cart/delete/:itemId', async (req, res) => {
  // delete an item in the cart by its `id` value and 'userid' value match
  try {
    const itemId = req.params.itemId;
    const userId = req.session.userId;

    const cartitemData = await cartItem.destroy({
      where: {
        id: itemId,
        userId: userId,
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
