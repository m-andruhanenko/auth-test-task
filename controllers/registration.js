const { User } = require('../models');
const { CREATED, BAD_REQUEST } = require('../constants/responseStatuses');
const { NOT_ALL_DATA, USER_EXISTS } = require('../constants/responseMessages');
const { createToken } = require('../helpers/createToken');
const { getUserWithoutPassword } = require('../helpers/getUserWithoutPassword');

const registration = async (req, res) => {
  const {
    email,
    password,
  } = req.body;
  const data = {
    email: email.trim(),
    password,
  };

  try {
    if (!data.email || !password) {
      return res.status(BAD_REQUEST).send(NOT_ALL_DATA);
    }

    const existUser = await User.findOne({ where: { email: data.email } });

    if (existUser) {
      return res.status(BAD_REQUEST).send(USER_EXISTS);
    }

    const newUser = await User.create(data);
    const token = createToken(newUser.id);
    const user = getUserWithoutPassword(newUser.dataValues);

    return res.status(CREATED).send({ user, token });
  } catch (error) {
    return res.status(BAD_REQUEST).send(error);
  }
};

module.exports = {
  registration,
};
