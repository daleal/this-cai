
module.exports = {
  up: (queryInterface) => {
    const itemsData = [
      {
        name: 'Sweater',
        description: 'For cold students',
        maxStock: 5,
        currentStock: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return queryInterface.bulkInsert('inventory_items', itemsData);
  },

  down: (queryInterface) => queryInterface.bulkDelete('inventory_items', null, {}),

};
