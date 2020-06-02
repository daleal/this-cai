'use strict';

function isPast(event) {
  if (new Date(`${event.dateAndTime}`).getTime() < new Date().getTime()) {
    return true;
  }
  return false;
}

module.exports = {
  name: 'events',
  validate: (requestBody) => {
    const errors = [];
    if (isPast(requestBody)) {
      errors.push(new Error('El evento no puede ocurrir en el pasado'));
    }

    if (errors.length > 0) {
      throw errors;
    }
  },
  validateAttendance: (event) => {
    const errors = [];
    if (isPast(event)) {
      errors.push(new Error('Este evento ya ocurrió'));
    }

    if (errors.length > 0) {
      throw errors;
    }
  },
  isPast,
};
