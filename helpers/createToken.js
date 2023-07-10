const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

module.exports.createToken = (id) => {
  const token = jwt.sign(id, SECRET_KEY);

  return token;
};
