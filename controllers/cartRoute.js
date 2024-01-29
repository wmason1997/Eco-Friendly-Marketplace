const router = require('express').Router();
const { Cart, cartItem, Item } = require('../models');
const withAuth = require('../utils/auth');

// GET user's shopping cart  /cart
router.get('/', withAuth, async (req, res) => {
  try {
    const userCartItems = await Cart.findAll({
      where: { userID: req.session.userID },
      include: [{ model: cartItem, include: [{ model: Item }] }]
    });

    // Check if userCartItems is not null or undefined before mapping
    let cartItems = userCartItems
      ? (userCartItems.map((item) => item.get({ plain: true }))[0]?.cartitems || [])
      : [];
      

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



// router.put('/update/:itemID', async (req, res) => {
//   // Update the specified cart item's quantity
//   try {
//     // await Cart.update(req.body, {
//     //   where: {
//     //     id: req.params.itemID,
//     //     userID: req.session.userID,
//     //   },
//     // });

//     // Fetch the updated cart items for the user
//     const updatedCartItems = await Cart.findOne({
//       where: { userID: req.session.userID },
//       include: [{ model: cartItem }],
//     });
//     console.log(updatedCartItems);
//     // After we get the users cart, add the item to that cart

//     // Serialize data so the template can read it
//     const cartItems = updatedCartItems.map((cartItem) =>
//       cartItem.get({ plain: true })
//     );

//     // Render the cart page and pass the updated cart items to the template
//     res.render('cart', {
//       items: cartItems,
//       logged_in: req.session.logged_in,
//     });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .render(error, { message: 'An error occurred while updating the cart' });
//   }
// });

// Splite delete and post route and put in API folder for cart

module.exports = router;
