const { Appointment, User, Vaccine } = require('../models')
class AdminController {
  //Code admin features here
  static appointment(req,res){
    Appointment.findAll({
      include: [User, Vaccine]
    })
    .then(data => {
        res.render('home',{data})
    })
    .catch(err => {
        res.send(err)
    })
  }
  static vaccine(req, res){
    Vaccine.findAll()
    .then(data =>{
      res.render('allVaccine', {data})
    })
    .catch(err=>{
      res.render(err)
    })
  }
  static add(req, res){
    res.render('formAddVaccine')
  }
  static addpost(req, res){
    const { name, stock, category } = req.body
    Vaccine.create({name, stock, category})
    .then(_=>{
      res.redirect('/admins/vaccine')
    })
    .catch(err=>{
      res.send(err)
    })
  }
  static edit(req, res){
    const id = req.params.id
    Vaccine.findOne({
      where: {id}
    })
    .then(data=>{
      res.render('editVaccine', {data})
    })
    .catch(err=>{
      res.send(err)
    })
  }
  static editpost(req, res){
    const { name, stock, category } = req.body
    const id = req.params.id
    Vaccine.update({name, stock, category},{
      where: {id}
    })
    .then(_=>{
      res.redirect('/admins/vaccine')
    })
    .catch(err=>{
      res.send(err)
    })
  }
  static delete(req,res){
    const id = req.params.id
    Vaccine.update({isDeleted:1},{
      where: {id}
    })
    .then(_=>{
      res.redirect('/admins/vaccine')
    })
    .catch(err=>{
      res.send(err)
    })
  }
}

module.exports = AdminController;