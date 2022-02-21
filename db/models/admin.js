const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ CommentAboutClient, CommentAboutOrder }) {
      // define association here
      this.hasMany(CommentAboutClient, { foreignKey: 'admin_id' });
      this.hasMany(CommentAboutOrder, { foreignKey: 'admin_id' });
    }
  }

  const options = {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
  };

  Admin.init(options, {
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};
