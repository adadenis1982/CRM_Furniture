module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('OrderFurnitures', [
      {
        order_id: 1,
        furniture_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        order_id: 2,
        furniture_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        order_id: 3,
        furniture_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('OrderFurnitures', null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  },
};
