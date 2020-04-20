'use strict';

module.exports = {
  up: (queryInterface) => {
    const itemsData = [
      {
        id: 1,
        name: 'Sweater',
        description: 'para estudiantes con frio',
        max_stock: 5,
        current_stock: 5,
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        id: 2,
        name: 'Pelota tenis de mesa',
        description: 'para jugar tenis de mesa',
        max_stock: 7,
        current_stock: 6,
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        id: 3,
        name: 'Paleta tenis de mesa',
        description: 'para jugar tenis de mesa',
        max_stock: 14,
        current_stock: 13,
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        id: 4,
        name: 'Calculadora',
        description: 'Para pruebas y trabajos',
        max_stock: 12,
        current_stock: 12,
        created_at: new Date(),
        updated_at: new Date(),
      }, {
        id: 5,
        name: 'Bata de laboratorio y Gafas',
        description: 'Para el laboratorio de quimica entre otros',
        max_stock: 15,
        current_stock: 15,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    return queryInterface.bulkInsert('inventory_items', itemsData);
  },

  down: (queryInterface) => queryInterface.bulkDelete('inventory_items', null, {}),

};
