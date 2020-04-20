'use-strict';

module.exports = {
  name: 'messages',
  validate: (requestBody) => {
    const errors = [];
    if (!(/^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/.test(requestBody.email))) {
      errors.push(new Error('Dirección de Correo inválida'));
    }
    if (errors.length > 0) {
      throw errors;
    }
  },
};
