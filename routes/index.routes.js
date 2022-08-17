const router = require('express').Router();
const adminRoutes = require('./admin.routes');
const userRoutes = require('./user.routes');

router.get('/', (req, res) => {
  res.send('dashboard');
});
router.use('/admins', adminRoutes);
router.use('/users', userRoutes);

module.exports = router;