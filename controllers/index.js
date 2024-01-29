const router = require('express').Router();
const withAuth = require('../utils/auth.js')
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const cartRoute = require('./cartRoute');
// const cartEdit = require('./api/editCart')
const itemRoute = require('./itemRoute');

router.use('/api', apiRoutes);
router.use('/items', itemRoute);
router.use('/cart', withAuth, cartRoute);
// router.use('/cart', cartEdit);
router.use('/', homeRoutes);


module.exports = router;
