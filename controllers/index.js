const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const cartRoute = require('./cartRoute');
const reviewRoutes = require('./api/editReview');
const itemRoute = require('./itemRoute');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/items', itemRoute);
router.use('/cart', cartRoute);
router.use('/cart', cartRoute);

module.exports = router;
