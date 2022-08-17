const router = require('express').Router();
const AuthController = require('../controllers/auth.controller');

router.get('/', (req, res) => {
  res.send('Hello User');
});

router.get('/register', AuthController.formRegisterUser);
router.post('/register', AuthController.registerUser);
router.get('/login', AuthController.formLoginUser);
router.post('/login', AuthController.loginUser);
router.get('/logout', AuthController.logout);

module.exports = router;