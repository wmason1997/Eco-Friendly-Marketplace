const router = require('express').Router();
const { Wishlist, Item, User} = require('../models'); // What else needs to be imported??

// POST route to add an item to the wishlist
router.post('/add', async (req, res) => {
    try {
        const { itemId, userId } = req.body; // Replace with actual data from the request
        const newItem = await Wishlist.create({ 
            itemId: itemId, 
            userId: userId 
        });
        
        res.status(201).json(newItem);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding item to wishlist' });
    }
});

module.exports = router;