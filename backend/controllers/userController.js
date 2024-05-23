const { verifyToken } = require('../helpers/tokens');
const UserService = require('../services/userService');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const register = async (req, res) => {
  const userData = await UserService.createUser(req, res);
  res.json(userData);
};

const activateEmail = async (req, res) => {
  try {
    const { token } = req.body;
    const isVerified = verifyToken(token);
    if (isVerified.id) {
      const check = await User.findById(isVerified.id);
      if (check?.verified) {
        res.status(200);
        res.json({
          message: 'user email is already verified.',
        });
      } else {
        const updatedData = await User.findByIdAndUpdate(isVerified.id, {
          verified: true,
        });
        console.log({ updatedData });
        res.status(200);
        res.json({
          message: 'user email verification successful.',
        });
      }
    } else {
      res.status(400);
      res.json({
        message: 'invalid token',
      });
    }
  } catch (error) {
    res.status(500);
    res.send({
      message: 'Internal server error.',
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400);
      res.send({ message: 'user not found.' });
    } else {
      const check = await bcrypt.compare(password, user.password);

      if (!check) {
        res.status(400);
        res.send({
          message: 'invalid credentials.',
        });
      }
      res.status(200);
      res.send({
        message: 'login successful.',
      });
    }
  } catch (error) {
    res.status(500);
    res.send({
      message: 'Internal server error.',
    });
  }
};
module.exports = { register, activateEmail, login };
