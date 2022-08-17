const {User, Role} = require('../models/index');
const bcrypt = require('bcryptjs');

class AuthController {
  //Navigate to user register form
  static formRegisterUser(req, res) {
    if (req.session.userId && !req.session.role) {
      res.redirect('/');
      return;
    }

    const {err} = req.query;
    res.render('auth/users/register', {isAuth: false, err});
  }

  //Store user register data and auto login
  static registerUser(req, res) {
    const {name, email, password} = req.body;
    User.create({name, email, password})
      .then(result => {
        req.session.userId = result.id;
        res.redirect('/');
      })
      .catch(e => {
        if (e.name === 'SequelizeValidationError') {
          const errors = e.errors.map(error => {
            return error.message;
          });
          res.redirect(`/users/register?err=${errors}`);
          return
        }
        res.send(e);
      });
  }

  //Navigate to user login form
  static formLoginUser(req, res) {
    if (req.session.userId && !req.session.role) {
      res.redirect('/');
      return;
    }

    const {err, validation} = req.query;
    res.render('auth/users/login', {isAuth: false, err, validation});
  }

  //Login action for user
  static loginUser(req, res) {
    const {email, password} = req.body;
    let userId;

    User.findOne({where: {email}})
      .then(user => {
        if (!user) {
          throw 'Invalid credentials, please check your email or password';
          return;
        }
        userId = user.id;
        return bcrypt.compare(password, user.password);
      })
      .then(isValid => {
        if (!isValid) {
          const err = 'Invalid credentials, please check your email or password';
          res.redirect(`/users/login?err=${err}`);
          return;
        }

        req.session.userId = userId;
        res.redirect('/');
      })
      .catch(e => {
        res.redirect(`/users/login?err=${e}`);
      });
  }

  //Navigate to admin login form
  static formLoginAdmin(req, res) {
    const {err} = req.query;
    res.render('auth/admins/login', {err});
  }

  //Login action for admin
  static loginAdmin(req, res) {
    const {email, password} = req.body;
    let adminId, role;

    User.findOne({where: {email}, include: Role})
      .then(admin => {
        if (!admin) {
          throw 'Invalid credentials, please check your email or password';
          return;
        }
        console.log(admin);
        adminId = admin.id;
        role = admin.Role.name;
        return bcrypt.compare(password, admin.password);
      })
      .then(isValid => {
        if (!isValid) {
          const err = 'Invalid credentials, please check your email or password';
          res.redirect(`/admins/login?err=${err}`);
          return;
        }

        req.session.adminId = adminId;
        req.session.role = role;
        console.log(req.session)

        res.redirect('/admins');
      })
      .catch(e => {
        res.redirect(`/admins/login?err=${e}`);
      });
  }

  //Logout action for user and admin
  static logout(req, res) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  }
}

module.exports = AuthController;
