'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role);
      User.hasMany(models.Appointment)
    }
  }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name cannot be empty"
        },
        notEmpty: {
          msg: "Name cannot be empty"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email cannot be empty"
        },
        notEmpty: {
          msg: "Email cannot be empty"
        },
        isEmail: {
          msg: "Email format required"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password cannot be empty"
        },
        notEmpty: {
          msg: "Password cannot be empty"
        }
      }
    },
    RoleId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook('beforeCreate', (user, options) => {
    return bcrypt.genSalt(10)
      .then(salt => {
        return bcrypt.hash(user.password, salt);
      })
      .then(hashPassword => {
        user.password = hashPassword;
      })
      .catch(e => {
        console.log(e);
      });
  });
  return User;
};