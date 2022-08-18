const router = require('express').Router();
const AuthController = require('../controllers/auth.controller');
const UserController = require('../controllers/user.controller');
const DashboardController = require('../controllers/dashboard.controller');

router.get('/', DashboardController.index);

router.get('/register', AuthController.formRegisterUser);
router.post('/register', AuthController.registerUser);
router.get('/login', AuthController.formLoginUser);
router.post('/login', AuthController.loginUser);
router.get('/logout', AuthController.logout);

router.use((req, res, next) => {
  if (!req.session.userId) {
    const validation = 'You need to login first to continue';
    res.redirect(`/users/login?validation=${validation}`);
    return;
  }
  next();
});

router.get('/appointment', UserController.appointment);
router.get('/appointment/:vaccineId', UserController.create);
router.post('/appointment', UserController.store);
router.get('/appointment/destroy/:appointmentId', UserController.destroy);
router.get('/qrcode/:appointmentId', UserController.generateCode);

module.exports = router;