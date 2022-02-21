const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Furniture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Order }) {
      // define association here
      this.belongsToMany(Order, {
        through: "OrderFurniture",
        foreignKey: "order_id",
      });
    }
  }
  Furniture.init(
    {
      type: DataTypes.STRING,
      price: DataTypes.INTEGER,
      title: DataTypes.STRING,
    },

    {
      sequelize,
      modelName: "Furniture",
      tableName: "Furnitures",
    }
  );
  return Furniture;
};
