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
    res.render('404');
    return;
  }
  next();
});

//Admin logout
router.get('/logout', AuthController.logout);
router.get('/', AdminController.appointment)
router.get('/appointment/:id', AdminController.approve);
router.get('/vaccine', AdminController.vaccine)
router.get('/vaccine/add', AdminController.add)
router.post('/vaccine/add', AdminController.addpost)
router.get('/vaccine/edit/:id', AdminController.edit)
router.post('/vaccine/edit/:id', AdminController.editpost)
router.get('/vaccine/delete/:id', AdminController.delete)


module.exports = router;