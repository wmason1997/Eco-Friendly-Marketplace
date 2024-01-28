const router = require('express').Router();
const userRoutes = require('./userRoutes.js');
const reviewRoutes = require('./editReview.js');
const editCart = require('./editCart.js');

// add all the new Routes once configured
router.use('/users', userRoutes);
router.use('/editcart', editCart);
router.use('/reviews', reviewRoutes);

module.exports = router;
