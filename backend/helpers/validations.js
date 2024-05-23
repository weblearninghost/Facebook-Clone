const User = require('../models/User');

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^([a-z\d\.-]+)@([a-z\d-]+)(\.[a-z]{2,12})?$/);
};
const validateLength = (text, min, max) => {
  if (text.length < min || text.length > max) {
    return false;
  }
  return true;
};

const validateUsername = async (username) => {
  let flag = false;

  do {
    const isUsername = await User.findOne({ username });
    if (isUsername) {
      //change username
      const randomNumber = (+new Date() * Math.random())
        .toString()
        .substring(0, 1);
      username = username + randomNumber;
      flag = true;
    } else {
      flag = false;
    }
  } while (flag);
  return username;
};

module.exports = { validateEmail, validateLength, validateUsername };
