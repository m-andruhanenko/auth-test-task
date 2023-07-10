const bcrypt = require('bcrypt');

const { Model } = require('sequelize');

const SALT_ROUNDS = 10;

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeSave(async (user) => {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
    }
  });

  User.prototype.comparePassword = function compare(password) {
    return new Promise((res, rej) => {
      bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
          return rej(err);
        }

        return res(isMatch);
      });
    });
  };

  return User;
};
