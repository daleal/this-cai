/* eslint-disable no-useless-constructor */

class InvalidCredentialsError extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = {
  InvalidCredentialsError,
};
