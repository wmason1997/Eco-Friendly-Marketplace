const router = require('express').Router();
const { Item } = require('../../models');

// The '/api/items' endpoint

// find all items
router.get('/item', async (req, res) => {
    console.log('Handling GET request for /api/items');
    // find all items
    try {
        const itemData = await Item.findAll();
        res.status(200).json(itemData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// find one item by its 'id' value
router.get('/:id', async (req, res) => {
    try {
        const itemData = await Item.findByPk(req.params.id);

        if (!itemData) {
            res.status(404).json({ message: 'No item found with this id! '});
            return;
        }

        res.status(200).json(itemData);
    } catch {
        res.status(500).json(err);
    }
});

// Don't foresee needing the below code (hence why it is commented out), but just in case

// Create a new item
router.post('/', async (req, res) => {
    // Create a new Item
    try {
        const itemData = await Item.create(req.body);
        res.status(200).json(itemData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update an item by its 'id' value
router.put('/', async (req, res) => {
    try{
        const itemData = await Item.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(itemData);
    } 
    catch (err) {
        res.status(500).json(err);
    }
});