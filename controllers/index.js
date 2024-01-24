const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const cartRoute = require('./api/cartRoute');
const reviewRoutes = require('./api/reviewRoutes');
const itemRoute = require ('./api/itemRoute')


router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/api', cartRoute);
router.use('/api', reviewRoutes);
router.use('/api', itemRoute);

module.exports = router;
