"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate(models) {
      Favorite.belongsTo(models.User, { foreignKey: "UserId" });
      Favorite.belongsTo(models.Cuisine, { foreignKey: "CuisineId" });
    }
  }
  Favorite.init(
    {
      UserId: DataTypes.INTEGER,
      CuisineId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Favorite",
    }
  );
  return Favorite;
};
