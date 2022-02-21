module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Furnitures', [
      {
        type: 'Стол',
        price: 1566,
        title: 'Из Испанского тиса',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'Стул',
        price: 1524,
        title: 'Табуретка со спинкой',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'Комод',
        price: 1777,
        title: 'Комод',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Furnitures', null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  },
};
