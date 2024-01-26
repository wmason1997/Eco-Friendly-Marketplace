const router = require('express').Router();
const userRoutes = require('./userRoutes');
const reviewRoutes = require('./editReview');
const editCart = require('./editCart');

// add all the new Routes once configured
router.use('/users', userRoutes);
router.use('/cart', editCart);
router.use('/reviews', reviewRoutes);

module.exports = router;
