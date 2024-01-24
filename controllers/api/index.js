const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const cartRoute = require('./cartRoute');
const reviewRoutes = require('./reviewRoutes')

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
// add all the new Routes once configured
router.use('/cart', cartRoute);
router.use('/reviews', reviewRoutes);


module.exports = router;
