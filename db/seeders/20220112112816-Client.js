module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Clients', [
      {
        firstname: 'Диего',
        lastname: 'Марадона',
        email: 'dead_narco@cocainum.com',
        address: 'grave',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstname: 'Уриель',
        lastname: 'Вентрис',
        email: 'U@warpdust.com',
        address: 'Калт',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstname: 'Иван',
        lastname: 'Иванов',
        email: 'ivan@ivan.ivan',
        address: 'с. Иваново Иваноская область',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Clients', null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  },
};
