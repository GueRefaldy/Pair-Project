const {User, Vaccine, Appointment} = require('../models/index');
const {Op} = require('sequelize')
const {generateCode} = require('../helpers/generateCode');

class UserController {
  static create(req, res) {
    const {err} = req.query
    const {vaccineId} = req.params;
    const {userId} = req.session;
    let user;

    User.findOne({
      where: {
        id: userId
      }
    }).then(result => {
      user = result
      return Vaccine.findOne({where: {id: vaccineId}});
    }).then(vaccine => {
      res.render('users/create', {isAuth: true, user, vaccine, err});
    })
      .catch(e => {
        res.send(e);
      });
  }

  static store(req, res) {
    const {UserId, VaccineId, date} = req.body;

    Appointment.findOne({where: {status: 0}})
      .then(result => {
        if (result) {
          console.log(result);
          throw 'Cannot make more than 1 appointment! Please finish your appointment first!';
        }

        return Appointment.create({UserId, VaccineId, date});
      })
      .then(result => {
        return Vaccine.decrement({stock: 1}, {where: {id: VaccineId}});
      })
      .then(result => {
        res.redirect('/');
      })
      .catch(e => {
        if (e.name === 'SequelizeValidationError') {
          const err = e.errors.map(error => {
            return error.message;
          });
          res.redirect(`/users/appointment/${VaccineId}?err=${err}`);
          return;
        }
        res.redirect(`/users/appointment/${VaccineId}?err=${e}`);
      });

  }

  static appointment(req, res) {
    const {userId: UserId} = req.session;
    let history;

    Appointment.findAll({where: {UserId, status: 1}, include: Vaccine})
      .then(appointments => {
        history = appointments;
        return Appointment.findOne({where: {UserId, status: 0}, include: Vaccine});
      })
      .then(appointment => {
        res.render('users/appointment', {isAuth: true, history, appointment});
      })
      .catch(e => {
        res.send(e);
      });
  }

  static destroy(req, res) {
    const {appointmentId} = req.params;
    Appointment.destroy({where: {id: appointmentId}})
      .then(_ => {
        res.redirect('/users/appointment');
      })
      .catch(e => {
        res.send(e);
      });
  }

  static generateCode(req, res) {
    const {appointmentId} = req.params;
    const {userId} = req.session;

    Appointment.findOne({
      where: {
        id: appointmentId,
        UserId: userId
      },
      include: [User, Vaccine]
    }).then(appointment => {
      const qrCodeValue = {
        'name': appointment.User.name,
        'appointment date': appointment.date,
        'appointment created date': appointment.createdAt,
        'category': appointment.Vaccine.category,
        'vaccine name': appointment.Vaccine.name
      };
      return generateCode(JSON.stringify(qrCodeValue))
    }).then(url => {
      console.log(url);
      res.render('users/qrcode', {isAuth: true, url});
    })
      .catch(e => {
        console.log(e);
        res.send(e);
      })
  }
}

module.exports = UserController;