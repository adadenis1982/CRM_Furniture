const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CommentAboutClient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Client, Admin }) {
      // define association here
      this.belongsTo(Client, { foreignKey: 'client_id' });
      this.belongsTo(Admin, { foreignKey: 'admin_id' });
    }
  }

  const options = {
    client_id: DataTypes.INTEGER,
    admin_id: DataTypes.INTEGER,
    text: DataTypes.TEXT,
  };

  CommentAboutClient.init(options, {
    sequelize,
    modelName: 'CommentAboutClient',
  });
  return CommentAboutClient;
};
