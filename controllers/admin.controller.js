const {Appointment, User, Vaccine} = require('../models')
const {Op} = require("sequelize");

class AdminController {
  //Code admin features here
  static appointment(req, res) {
    const {name} = req.query;
    const condition = {
      include: [{model: User}, {model: Vaccine}]
    }

    if (name) {
      condition.include[0].where = {
        name: {
          [Op.iLike]: `%${name}%`
        }
      }
    }

    Appointment.findAll(condition)
      .then(data => {
        res.render('admins/home', {data})
      })
      .catch(err => {
        res.send(err)
      });
  }

  static vaccine(req, res) {
    Vaccine.findAll()
      .then(data => {
        res.render('admins/allVaccine', {data})
      })
      .catch(err => {
        res.send(err)
      })
  }

  static add(req, res) {
    const {err} = req.query;

    const categories = Vaccine.listCategories()
    res.render('admins/formAddVaccine', {categories, err})
  }

  static addpost(req, res) {
    const {name, stock, category} = req.body

    Vaccine.create({name, stock, category})
      .then(_ => {
        res.redirect('/admins/vaccine')
      })
      .catch(err => {
        if (err.name === 'SequelizeValidationError') {
          const e = err.errors.map(error => {
            return error.message;
          })
          res.redirect(`/admins/vaccine/add?err=${e}`)
          return;
        }
        res.send(err);
      })
  }

  static edit(req, res) {
    const {err} = req.query;

    const id = req.params.id
    Vaccine.findOne({
      where: {id}
    })
      .then(data => {
        res.render('admins/editVaccine', {data, err})
      })
      .catch(err => {
        res.send(err)
      })
  }

  static editpost(req, res) {
    const {name, stock, category} = req.body
    const id = req.params.id
    Vaccine.update({name, stock, category}, {
      where: {id}
    })
      .then(_ => {
        res.redirect('/admins/vaccine')
      })
      .catch(err => {
        if (err.name === 'SequelizeValidationError') {
          const e = err.errors.map(error => {
            return error.message;
          })
          res.redirect(`/admins/vaccine/edit/${id}?err=${e}`)
          return;
        }
        res.send(err)
      })
  }

  static delete(req, res) {
    const id = req.params.id
    Vaccine.update({isDeleted: 1}, {
      where: {id}
    })
      .then(_ => {
        res.redirect('/admins/vaccine')
      })
      .catch(err => {
        res.send(err)
      })
  }

  static approve(req, res) {
    const {id} = req.params;

    Appointment.update({status: 1}, {where: {id}})
      .then(_ => {
        res.redirect('/admins');
      })
      .catch(err => {
        res.send(err);
      })
  }

}

module.exports = AdminController;