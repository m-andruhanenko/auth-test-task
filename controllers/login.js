const { User } = require('../models');
const {
  OK,
  BAD_REQUEST,
  UNAUTHORIZED,
} = require('../constants/responseStatuses');
const {
  NOT_ALL_DATA,
  USER_NOT_FOUND,
  WRONG_PASSWORD,
} = require('../constants/responseMessages');
const { createToken } = require('../helpers/createToken');
const { getUserWithoutPassword } = require('../helpers/getUserWithoutPassword');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email.trim() || !password) {
      return res.status(BAD_REQUEST).send(NOT_ALL_DATA);
    }

    const existUser = await User.findOne({
      where: { email },
      attributes: ['id', 'password'],
    });

    if (!existUser) {
      return res.status(UNAUTHORIZED).send(USER_NOT_FOUND);
    }

    const isPasswordValid = await existUser.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(UNAUTHORIZED).send(WRONG_PASSWORD);
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
