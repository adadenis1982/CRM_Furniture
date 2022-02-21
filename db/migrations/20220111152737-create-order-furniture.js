module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OrderFurnitures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      order_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Orders',
          key: 'id',
        },
      },
      furniture_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Furnitures',
          key: 'id',
        },
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
    await queryInterface.dropTable('OrderFurnitures');
  },
};
