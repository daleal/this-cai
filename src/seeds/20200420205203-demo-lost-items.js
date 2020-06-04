'use strict';

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('lost_items', [{
    description: 'Poleron azul marca Gap, talla M, estampado de 1969',
    taken: false,
    user_id: null,
    created_at: new Date(),
    updated_at: new Date(),
    img: 'https://res.cloudinary.com/hrvt6ouf6/image/upload/v1591230854/seeds/hoodie_ewhm8o.jpg',
  }, {
    description: 'TUC de Jose Tomás Escobar',
    taken: true,
    user_id: 1,
    created_at: new Date(),
    updated_at: new Date(),
    img: 'https://res.cloudinary.com/hrvt6ouf6/image/upload/v1591228842/seeds/tuc_dmkndb.jpg',
  }, {
    description: 'Cuaderno con apuntes Calculo 1, portada de Lamborghini',
    taken: false,
    user_id: null,
    created_at: new Date(),
    updated_at: new Date(),
    img: 'https://res.cloudinary.com/hrvt6ouf6/image/upload/v1591228842/seeds/lambo_gzrxcs.jpg',
  }, {
    description: 'Guante gris con diseño de alpaca, derecho',
    taken: false,
    user_id: null,
    created_at: new Date(),
    updated_at: new Date(),
    img: 'https://res.cloudinary.com/hrvt6ouf6/image/upload/v1591228842/seeds/guante_fblscu.jpg',
  }, {
    description: 'Cargador computador Lenovo, 2V, encontrado en sala estudio K',
    taken: false,
    user_id: null,
    created_at: new Date(),
    updated_at: new Date(),
    img: 'https://res.cloudinary.com/hrvt6ouf6/image/upload/v1591228842/seeds/lenovo_rasg5w.jpg',
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('lost_items', null, {}),
};
