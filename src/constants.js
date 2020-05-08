// RegEx
const EMAIL_REGEX = /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;
const PHONE_NUMBER_REGEX = /^[+][0-9]{11}$/;

// LogIn stuff
const PASSWORD_SALT = 10;

// Session stuff
const SESSION_DURATION = parseInt(process.env.SESSION_DURATION || 3600, 10); // seconds

module.exports = {
  EMAIL_REGEX, PHONE_NUMBER_REGEX, PASSWORD_SALT, SESSION_DURATION,
};
