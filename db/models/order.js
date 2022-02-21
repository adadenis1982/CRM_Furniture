const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Client, CommentAboutOrder, Furniture }) {
      // define association here
      this.belongsTo(Client, { foreignKey: 'client_id' });
      this.hasMany(CommentAboutOrder, { foreignKey: 'order_id' });
      this.belongsToMany(Furniture, {
        through: 'OrderFurniture',
        foreignKey: 'furniture_id',
      });
    }
  }

  const options = {
    client_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    number: DataTypes.INTEGER,
    delivery_price: DataTypes.INTEGER,
    assembly_price: DataTypes.INTEGER,
    date: DataTypes.DATE,
  };

  Order.init(options, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
