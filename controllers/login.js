const { db } = require('../models');
const {
  OK,
  BAD_REQUEST,
  UNAUTHORIZED,
} = require('../constants/responseStatuses');
const {
  NOT_ALL_DATA,
  INVALID_DATA,
} = require('../constants/responseMessages');
const { createToken } = require('../helpers/createToken');
const { getUserWithoutPassword } = require('../utils/getUserWithoutPassword');

const login = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (!email.trim() || !password) {
      return res.status(BAD_REQUEST).send(NOT_ALL_DATA);
    }

    const existUser = await db.User.findOne({
      where: { email },
      attributes: ['id'],
    });

    const passwordExistUser = await db.Password.findOne({
      where: { userId: existUser.dataValues.id },
      attributes: ['hash'],
    });

    if (!existUser) {
      return res.status(UNAUTHORIZED).send(INVALID_DATA);
    }

    const isPasswordValid = await passwordExistUser.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(UNAUTHORIZED).send(INVALID_DATA);
    }

    const token = createToken(existUser.id);
    const user = getUserWithoutPassword(existUser.dataValues);

    return res.status(OK).send({ user, token });
  } catch (error) {
    return res.status(BAD_REQUEST).send(error);
  }
};

module.exports = {
  login,
};
