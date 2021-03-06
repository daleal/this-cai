'use-strict';

const { EMAIL_REGEX } = require('../constants');

module.exports = {
  name: 'messages',
  validate: (requestBody) => {
    const errors = [];
    if (!(EMAIL_REGEX.test(requestBody.email))) {
      errors.push(new Error('Dirección de Correo inválida'));
    }
    if (errors.length > 0) {
      throw errors;
    }
  },
};
