const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const cartRoute = require('./api/cartRoute');
const reviewRoutes = require('./api/reviewRoutes');


router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/api', cartRoute);
router.use('/api', reviewRoutes);


module.exports = router;
