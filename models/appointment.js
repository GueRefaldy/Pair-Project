'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Appointment.belongsTo(models.User);
      Appointment.belongsTo(models.Vaccine);
    }
  }

  Appointment.init({
    UserId: DataTypes.INTEGER,
    VaccineId: DataTypes.INTEGER,
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Date cannot be empty"
        },
        notEmpty: {
          msg: "Date cannot be empty"
        }
      }
    },
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Appointment',
  });

  Appointment.addHook('beforeCreate', (appointment, options) => {
    appointment.status = 0;
  });
  return Appointment;
};