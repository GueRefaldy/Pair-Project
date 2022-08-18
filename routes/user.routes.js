const router = require('express').Router();
const AuthController = require('../controllers/auth.controller');
const UserController = require('../controllers/user.controller');

router.get('/', (req, res) => {
  res.send('Hello User');
});

router.get('/register', AuthController.formRegisterUser);
router.post('/register', AuthController.registerUser);
router.get('/login', AuthController.formLoginUser);
router.post('/login', AuthController.loginUser);

router.use((req, res, next) => {
  if (!req.session.userId || req.session.role) {
    const validation = 'You need to login first to continue';
    res.redirect(`/users/login?validation=${validation}`);
    return;
  }

  next();
});

router.get('/logout', AuthController.logout);
router.get('/appointment', UserController.appointment);
router.get('/appointment/:vaccineId', UserController.create);
router.post('/appointment', UserController.store);
router.get('/appointment/destroy/:appointmentId', UserController.destroy);
router.get('/qrcode/:appointmentId', UserController.generateCode);

module.exports = router;