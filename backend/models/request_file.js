'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class request_file extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  request_file.init({
    requestId: DataTypes.INTEGER,
    filePath: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'request_file',
  });
  return request_file;
};