'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  request.init({
    requestCode: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    des: DataTypes.TEXT,
    status: DataTypes.INTEGER,
    userId: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'request',
  });
  return request;
};