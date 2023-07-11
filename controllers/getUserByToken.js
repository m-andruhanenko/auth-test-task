const { OK, SERVER_ERROR } = require('../constants/responseStatuses');

const getUserByToken = async (req, res) => {
  try {
    return res.status(OK).send(req.user);
  } catch (error) {
    return res.status(SERVER_ERROR);
  }
};

module.exports = {
  getUserByToken,
};
