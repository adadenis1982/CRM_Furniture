module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('CommentAboutOrders', [
      {
        order_id: 1,
        admin_id: 1,
        text: '--------',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        order_id: 2,
        admin_id: 1,
        text: 'Не говорить при клиенте слово "ПАРОВОЗ".',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        order_id: 3,
        admin_id: 1,
        text: 'Remember, no jokes. Очень нервный.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('CommentAboutOrders', null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  },
};
