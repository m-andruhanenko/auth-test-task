const { db } = require('../models');
const { CREATED, BAD_REQUEST } = require('../constants/responseStatuses');
const { NOT_ALL_DATA, USER_EXISTS, INVALID_EMAIL } = require('../constants/responseMessages');
const { createToken } = require('../helpers/createToken');
const { getUserWithoutPassword } = require('../utils/getUserWithoutPassword');

const registration = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const data = {
      email: email.trim(),
      password: password.trim(),
    };

    if (!data.email || !data.password) {
      return res.status(BAD_REQUEST).send(NOT_ALL_DATA);
    }

    const existUser = await db.User.findOne({ where: { email: data.email } });

    if (existUser) {
      return res.status(BAD_REQUEST).send(USER_EXISTS);
    }

    await db.sequelize.transaction(async (t) => {
      const newUser = await db.User.create(data, { transaction: t });
      await db.Password.create({ hash: data.password, userId: newUser.id }, { transaction: t });

      const token = createToken(newUser.id);
      const user = getUserWithoutPassword(newUser.dataValues);

      return res.status(CREATED).send({ user, token });
    });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(BAD_REQUEST).send(INVALID_EMAIL);
    }

    return res.status(BAD_REQUEST).send(error);
  }
};

module.exports = {
  registration,
};
