const router = require('express').Router();
const { Cart, cartItem, Item } = require('../../models');


 // Add a new item to the user's cart
 router.post('/cart/add/item', async (req, res) => {
  try {
     const {itemID, quantity, price, imageURL} = req.body; // add other properties we want. 
     const userID =req.session.userID;
  
     if (!quantity || quantity < 1) {
      return res.status(400).json({ message: 'Quantity is required' })
    }  
    // Fetch the users cart
      let userCart = await Cart.findOne({ where: { userID } });
  
      if (!userCart) { // if user has no cart, create one for them
        userCart = await Cart.create({ userID });
    }
    
    // Add item to cart  
      const cartData = await Cart.addItem({ //add item will only work with many to many
        cartID: userCart.id,
        itemID: itemID,
        price: price,
        quantity: quantity,
        itemImage: imageURL 
      });
  
      res.status(200).json({ message: 'Item added to cart successfully', cartData });

    } catch (error) {

      console.error(error);
      res.status(500).json({ message: 'An error occurred while adding the item to the cart' });
    }
  });


// GET items in user's shopping cart
router.get('/cart', async (req, res) => {
  try {
    const userID = req.session.userID;
    console.log("###", userID);
    const userCartItems = await Cart.findOne({

      where: { userID: req.session.userID },
      include: [{ model: cartItem ,
        include: [{model: Item}]

      }],
    });

    // Check if userCartItems is not null or undefined before mapping
    const cartItems = userCartItems ? userCartItems.map((item) => item.get({ plain: true })) : [];

    // Pass serialized data and session flag into template
    res.render('cart', { // 'cart' has to correspond to card.handlebars
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
    console.log(updatedCartItems)
    // After we get the users cart, add the item to that cart

    
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
    const itemID = req.params.itemID;
    const userID = req.session.userID;

    const cartItemData = await Cart.findByPk(itemID);
    await cartItemData.destroy();
  

    res.status(200).json(cartitemData);
  } catch (err) {
    res.status(500).json({
      message: 'An error occurred while deleting the item from the cart',
    });
  }
});

module.exports = router;
