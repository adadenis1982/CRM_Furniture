const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderFurniture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }

  const options = {
    order_id: DataTypes.INTEGER,
    furniture_id: DataTypes.INTEGER,
  };

  OrderFurniture.init(options, {
    sequelize,
    modelName: 'OrderFurniture',
  });
  return OrderFurniture;
};
