'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('lost_items', [{
    description: 'Poleron azul marca Gup, talla M, estampado de 1953',
    taken: false,
    user_id: null,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    description: 'TUC de Jose Tomás Escobar',
    taken: true,
    user_id: 1,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    description: 'Cuaderno con apuntes Calculo 1, portada de Lamborghini',
    taken: false,
    user_id: null,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    description: 'Guante gris con diseño de alpaca, derecho',
    taken: false,
    user_id: null,
    created_at: new Date(),
    updated_at: new Date(),
  }, {
    description: 'Cargador computador Lenovo, 2V, encontrado en sala estudio K',
    taken: false,
    user_id: null,
    created_at: new Date(),
    updated_at: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('lost_items', null, {}),
};
