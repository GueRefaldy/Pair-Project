const {Vaccine} = require('../models/index');
const {Sequelize} = require("sequelize");
const {Op} = require("sequelize");

class DashboardController {
  static index(req, res) {
    const {userId} = req.session;
    let isAuth = false;

    if (userId) {
      isAuth = true;
    }
    const condition = {
      where: {
        'stock': {
          [Op.gt]: 0
        }
      }
    };
    const {category, name} = req.query;

    if (category) {
      condition.where.category = category;
    }

    if (name) {
      condition.where.name = {
        [Op.iLike]: `%${name}%`
      }
    }

    console.log(condition);

    let categories;
    Vaccine.findAll({
      attributes: [Sequelize.fn('DISTINCT', Sequelize.col('category')), 'category'],
    })
      .then(vaccineCategories => {
        categories = vaccineCategories;
        return Vaccine.findAll(condition);
      })
      .then(vaccines => {
        res.render('users/index', {categories, vaccines, isAuth});
      })
      .catch(e => {
        res.send(e);
      })
  }
}

module.exports = DashboardController;