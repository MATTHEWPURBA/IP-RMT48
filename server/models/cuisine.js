"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cuisine extends Model {
    static associate(models) {
      Cuisine.belongsTo(models.Category, { foreignKey: "CategoryId" });
      Cuisine.belongsTo(models.User, { foreignKey: "UserId" });
      Cuisine.belongsToMany(models.User, {
        through: models.Favorite,
        foreignKey: "UserId",
        otherKey: "CuisineId",
      });
    }
  }
  Cuisine.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "title cant be empty",
          },
          notEmpty: {
            msg: "title cant be empty",
          },
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "image Url cant be empty",
          },
          notEmpty: {
            msg: "image Url cant be empty",
          },
        },
      },
      restaurantChain: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Restaurant Name cant be empty",
          },
          notEmpty: {
            msg: "Restaurant Name cant be empty",
          },
        },
      },
      servings: DataTypes.JSON,
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "image Url cant be empty",
          },
          notEmpty: {
            msg: "image Url cant be empty",
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "User Id is required",
          },
          notEmpty: {
            args: true,
            msg: "User Id is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Cuisine",
    }
  );
  return Cuisine;
};
