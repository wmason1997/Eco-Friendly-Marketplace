const router = require('express').Router();
const userRoutes = require('./userRoutes.js');
const reviewRoutes = require('./editReview.js');
const editCart = require('./editCart.js');
const withAuth = require('../../utils/auth.js')

// add all the new Routes once configured
router.use('/users', userRoutes);
router.use('/editcart', withAuth, editCart);
router.use('/reviews', reviewRoutes);

module.exports = router;
