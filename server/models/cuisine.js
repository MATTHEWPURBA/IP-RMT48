"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cuisine extends Model {
    static associate(models) { 
      
    }
  }
  Cuisine.init(
    {
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      restaurantChain: DataTypes.STRING,
      servings: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "Cuisine",
    }
  );
  return Cuisine;
};
