const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const cartRoute = require('./api/cartRoute');
const itemRoute = require('./itemRoute');

router.use('/api', apiRoutes);
router.use('/items', itemRoute);
router.use('/cart', cartRoute);
router.use('/', homeRoutes);

module.exports = router;
