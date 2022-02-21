const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Order, CommentAboutClient }) {
      // define association here
      this.hasMany(Order, { foreignKey: 'client_id' });
      this.hasMany(CommentAboutClient, { foreignKey: 'client_id' });
    }
  }

  const options = {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
  };
  Client.init(options, {
    sequelize,
    modelName: 'Client',
  });
  return Client;
};
