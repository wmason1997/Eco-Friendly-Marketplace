const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const cartRoute = require('./api/cartRoute')

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/api', cartRoute);

module.exports = router;
