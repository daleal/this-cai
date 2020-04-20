'use-strict';

module.exports = {
  name: 'users',
  validate: (requestBody) => {
    const errors = [];
    if (!(/^[+][0-9]{11}$/.test(requestBody.phoneNumber))) {
      errors.push(new Error('Número de teléfono inválido'));
    }
    if (!(/^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/.test(requestBody.email))) {
      errors.push(new Error('Dirección de Correo inválida'));
    }
    if (errors.length > 0) {
      throw errors;
    }
  },
};
