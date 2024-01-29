const router = require('express').Router();
const { Item , Cart } = require('../models');
const withAuth = require('../utils/auth');


router.get('/searchpage/:query', async (req, res) => {
    // Handle the request and send the searchpage HTML
    const query = req.params.query.toLowerCase()

    const items = await Item.findAll({ raw: true })
    
    // DEBUG
    // console.log('--- searchpage items ---')
    // console.log(items)

    const matches = items.filter(item => {
        // many items do not have an name for some reason
        const name = (item.name||item.description).toLowerCase()
        if (name.includes(query)) {
            return true
        }
    })

    res.render('searchpage', {
        logged_in: req.session.logged_in,
        items: matches
    }); // Use your actual rendering method
  });

  module.exports = router;