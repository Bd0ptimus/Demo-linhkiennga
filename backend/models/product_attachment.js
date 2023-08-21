'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_Attachment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product_Attachment.init({
    path: DataTypes.STRING,
    productId: DataTypes.INTEGER,
    data: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Product_Attachment',
  });
  return Product_Attachment;
};