'use-strict';

import { EMAIL_REGEX, PHONE_NUMBER_REGEX } from '../constants';

module.exports = {
  name: 'users',
  validate: (requestBody) => {
    const errors = [];
    if (!(PHONE_NUMBER_REGEX.test(requestBody.phoneNumber))) {
      errors.push(new Error('Número de teléfono inválido'));
    }
    if (!(EMAIL_REGEX.test(requestBody.email))) {
      errors.push(new Error('Dirección de Correo inválida'));
    }
    if (errors.length > 0) {
      throw errors;
    }
  },
};
