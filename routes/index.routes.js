const router = require('express').Router();
const adminRoutes = require('./admin.routes');
const userRoutes = require('./user.routes');
const DashboardController = require('../controllers/dashboard.controller');

router.get('/', DashboardController.index);
router.use('/admins', adminRoutes);
router.use('/users', userRoutes);

module.exports = router;