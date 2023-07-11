const jwt = require('jsonwebtoken');

module.exports.createToken = (id) => {
  const token = jwt.sign(id, process.env?.SECRET_KEY);

  return token;
};
