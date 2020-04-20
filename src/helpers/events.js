'use strict';

module.exports = {
  name: 'events',
  validate: (requestBody) => {
    const errors = [];
    if (new Date(`${requestBody.dateAndTime}Z`).getTime() < new Date().getTime()) {
      errors.push(new Error('El evento no puede ocurrir en el pasado'));
    }

    if (errors.length > 0) {
      throw errors;
    }
  },
};
