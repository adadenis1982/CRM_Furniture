module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('CommentAboutClients', [
      {
        client_id: 1,
        admin_id: 1,
        text: 'Почему здесь заказ на имя Марадоны?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        client_id: 2,
        admin_id: 1,
        text: '1: Считает что сейчас 41 тысячелетие, 2: Одержим паровозами',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        client_id: 3,
        admin_id: 1,
        text: 'Remember, no jokes. Очень нервный.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('CommentAboutClients', null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  },
};
