'use strict';

module.exports = {
  up: (queryInterface) => {
    const itemsData = [
      {
        name: 'Sweater',
        description: 'para estudiantes con frio',
        max_stock: 5,
        current_stock: 5,
        max_reservations: 1,
        created_at: new Date(),
        updated_at: new Date(),
        img: 'https://res.cloudinary.com/hrvt6ouf6/image/upload/v1591226037/seeds/sweater_ldkzjj.jpg',
      }, {
        name: 'Pelota tenis de mesa',
        description: 'para jugar tenis de mesa',
        max_stock: 7,
        current_stock: 6,
        max_reservations: 1,
        created_at: new Date(),
        updated_at: new Date(),
        img: 'https://res.cloudinary.com/hrvt6ouf6/image/upload/v1591226036/seeds/pelotaspinpon_egp0fp.jpg',
      }, {
        name: 'Paleta tenis de mesa',
        description: 'para jugar tenis de mesa',
        max_stock: 14,
        current_stock: 13,
        max_reservations: 4,
        created_at: new Date(),
        updated_at: new Date(),
        img: 'https://res.cloudinary.com/hrvt6ouf6/image/upload/v1591226035/seeds/paleta_zozzee.jpg',
      }, {
        name: 'Calculadora',
        description: 'Para pruebas y trabajos',
        max_stock: 12,
        current_stock: 12,
        max_reservations: 1,
        created_at: new Date(),
        updated_at: new Date(),
        img: 'https://res.cloudinary.com/hrvt6ouf6/image/upload/v1591226035/seeds/calculadora_dl7lyx.jpg',
      }, {
        name: 'Bata de laboratorio y Gafas',
        description: 'Para el laboratorio de quimica entre otros',
        max_stock: 15,
        current_stock: 15,
        max_reservations: 1,
        created_at: new Date(),
        updated_at: new Date(),
        img: 'https://res.cloudinary.com/hrvt6ouf6/image/upload/v1591226035/seeds/bata_f3quvo.jpg',
      },
    ];
    return queryInterface.bulkInsert('inventory_items', itemsData);
  },

  down: (queryInterface) => queryInterface.bulkDelete('inventory_items', null, {}),

};
