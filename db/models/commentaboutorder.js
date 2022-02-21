const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CommentAboutOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Order, Admin }) {
      // define association here
      this.belongsTo(Order, { foreignKey: 'order_id' });
      this.belongsTo(Admin, { foreignKey: 'admin_id' });
    }
  }

  const options = {
    order_id: DataTypes.INTEGER,
    admin_id: DataTypes.INTEGER,
    text: DataTypes.TEXT,
  };
  CommentAboutOrder.init(options, {
    sequelize,
    modelName: 'CommentAboutOrder',
  });
  return CommentAboutOrder;
};
