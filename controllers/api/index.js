const router = require('express').Router();
const userRoutes = require('./userRoutes');
const cartRoute = require('./cartRoute');
const reviewRoutes = require('./reviewRoutes');
const itemRoute = require ('./itemRoute');

router.use('/users', userRoutes);
// add all the new Routes once configured
router.use('/cart', cartRoute);
router.use('/reviews', reviewRoutes);
router.use('/item', itemRoute);


module.exports = router;
