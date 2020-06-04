'use strict';

module.exports = {
  name: 'inventoryItems',
  validate: (requestBody) => {
    const errors = [];
    if (requestBody.name === '') {
      errors.push(new Error('Debes incluir un nombre para el objeto perdido'));
    }
    if (requestBody.description === '') {
      errors.push(new Error('Descripción inválida'));
    }
    if (requestBody.maxStock < 0 || requestBody.currentStock < 0
       || requestBody.maxStock < requestBody.currentStock) {
      errors.push(new Error('Valores de stock inválidos'));
    }
    if (errors.length > 0) {
      throw errors;
    }
  },
  consistentDecrement: (item) => {
    if (item.currentStock > 0) {
      item.decrement('currentStock', { by: 1 });
    } else {
      throw new Error('Stock agotado');
    }
  },

};
