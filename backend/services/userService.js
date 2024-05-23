const {
  validateEmail,
  validateLength,
  validateUsername,
} = require('../helpers/validations');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { Timestamp } = require('mongodb');
const { generateToken } = require('../helpers/tokens');
const { sendVerificationEmail } = require('../helpers/mailer');

const createUser = async (req, res) => {
  const {
    first_name,
    last_name,
    username,
    email,
    password,
    gender,
    bDay,
    bMonth,
    bYear,
  } = req.body;

  if (!validateEmail(email)) {
    res.status(400).send({
      error: 'Invalid email.',
    });
  }
  const check = await User.find({ email });
  if (check.length) {
    res.status(400).send({
      error: 'The email address already exists, try with different  email. ',
    });
  }
  if (!validateLength(first_name, 2, 15)) {
    res.status(400).send({
      error: 'First name should be of length 2 to 15 characters.',
    });
  }
  if (!validateLength(last_name, 2, 20)) {
    res.status(400).send({
      error: 'First name should be of length 2 to 20 characters.',
    });
  }
  if (!validateLength(3, 15)) {
    res.status(400).send({
      error: 'First name should be of length 3 to 15 characters.',
    });
  }
  const bcryptedPassword = await bcrypt.hash(password, 12);
  const tempUsername = first_name + last_name;
  const newUsername = await validateUsername(tempUsername);
  const userData = await User.create({
    first_name,
    last_name,
    username: newUsername,
    email,
    password: bcryptedPassword,
    gender,
    bDay,
    bMonth,
    bYear,
  });
  const emailVerificationToken = generateToken(
    { id: userData._id.toString() },
    '30m'
  );
  const url = process.env.BASE_URL + `/activate/${emailVerificationToken}`;
  sendVerificationEmail(userData.email, userData.first_name, url);
  const token = generateToken({ id: userData._id.toString() }, '7d');
  return {
    username: userData.username,
    id: userData._id,
    picture: userData.picture,
    first_name: userData.first_name,
    last_name: userData.last_name,
    token: token,
    verified: userData.verified,
    message: 'Register success! Please verify your email to start.',
  };
};

module.exports = { createUser };
