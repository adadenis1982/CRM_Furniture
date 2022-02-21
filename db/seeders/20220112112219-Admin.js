module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Admins', [
      {
        name: 'Alex',
        password: '12345678',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Admins'.null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  },
};
