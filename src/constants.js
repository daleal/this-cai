// RegEx
const EMAIL_REGEX = /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;
const PHONE_NUMBER_REGEX = /^[+][0-9]{11}$/;

// Session stuff
const SESSION_DURATION = parseInt(process.env.SESSION_DURATION || 3600, 10); // seconds

// User stuff
const PASSWORD_SALT = 10;
const USER_ROLES = {
  // Sincronize user role values with user role privileges keys
  user: 'user',
  cai: 'cai',
  administrator: 'administrator',
};
const USER_ROLE_PRIVILEGES = {
  // Sincronize user role privileges keys with user role values
  user: 1,
  cai: 2,
  administrator: 3,
};

// Item loans stuff
const INVENTORY_ITEM_RESERVATION_TIME = 2; // In days

// Event stuff
const EVENT_DEFAULT_TIME_LEFT = 30; // In days

// Placeholders
const LANDSCAPE_PLACEHOLDER_IMAGE = 'landscape-placeholder-image.jpg';

module.exports = {
  EMAIL_REGEX,
  PHONE_NUMBER_REGEX,
  PASSWORD_SALT,
  SESSION_DURATION,
  USER_ROLES,
  USER_ROLE_PRIVILEGES,
  INVENTORY_ITEM_RESERVATION_TIME,
  LANDSCAPE_PLACEHOLDER_IMAGE,
  EVENT_DEFAULT_TIME_LEFT,
};
