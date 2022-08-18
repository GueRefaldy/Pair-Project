'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vaccine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Vaccine.hasMany(models.Appointment);
    }

    static listCategories() {
      return ['Vaksin 1', 'Vaksin 2', 'Vaksin 3'];
    }
  }

  Vaccine.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Vaccine name required'
        },
        notNull: {
          msg: 'Vaccine name required'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Vaccine stock required'
        },
        notNull: {
          msg: 'Vaccine stock required'
        }
      }
    },
    category: DataTypes.STRING,
    isDeleted: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Vaccine',
  });

  Vaccine.addHook('beforeCreate', (vaccine, options) => {
    vaccine.isDeleted = 0;
  });
  return Vaccine;
};