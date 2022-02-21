module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CommentAboutClients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      client_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Clients',
          key: 'id',
        },
      },
      admin_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Admins',
          key: 'id',
        },
      },
      text: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('CommentAboutClients');
  },
};
