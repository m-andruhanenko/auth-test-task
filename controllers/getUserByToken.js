const { OK, BAD_REQUEST } = require('../constants/responseStatuses');

const getUserByToken = async (req, res) => {
  try {
    return res.status(OK).send(req.user);
  } catch (error) {
    return res.status(BAD_REQUEST).send(error);
  }
};

module.exports = {
  getUserByToken,
};
