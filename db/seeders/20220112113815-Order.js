module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("Orders", [
      {
        client_id: 1,
        status: "Готов",
        number: 111,
        delivery_price: 2513485,
        assembly_price: 33164894,
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        client_id: 2,
        status: "Не готов",
        number: 13,
        delivery_price: 0,
        assembly_price: 0,
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        client_id: 3,
        status: "Почти не готов",
        number: 51,
        delivery_price: 500,
        assembly_price: 40000,
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Orders", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  },
};
