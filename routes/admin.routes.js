const router = require('express').Router();
const AuthController = require('../controllers/auth.controller');
const AdminController = require('../controllers/admin.controller');

//Admin login
router.get('/login', AuthController.formLoginAdmin);
router.post('/login', AuthController.loginAdmin);

//Middleware (only allows user with role admin to access
router.use((req, res, next) => {
  const {adminId, role} = req.session;
  if (!adminId && !role || role !== 'Admin') {
    res.send('404 Not Found');
    return;
  }
  next();
});

//Admin logout
router.get('/logout', AuthController.logout);

router.get('/', (req, res) => {
  res.send('Hello Admin');
});


module.exports = router;