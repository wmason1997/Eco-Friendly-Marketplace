const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const cartRoute = require('./cartRoute');

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
// add all the new Routes once configured
router.use('/cart', cartRoute);


module.exports = router;
