const router = require('express').Router();
const { Item , Cart } = require('../models');
const withAuth = require('../utils/auth');


router.get('/searchpage', (req, res) => {
    // Handle the request and send the searchpage HTML
    res.render('searchpage', {
        logged_in: req.session.logged_in
    }); // Use your actual rendering method
  });

  module.exports = router;