const jwt = require('jsonwebtoken');

const generateToken = (payload, expires) => {
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: expires,
  });
};

const verifyToken = (token) => {
  const isVerified = jwt.verify(token, process.env.TOKEN_SECRET);
  return isVerified;
};
module.exports = { generateToken, verifyToken };
