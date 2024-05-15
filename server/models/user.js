"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Cuisine, {
        foreignKey: "UserId",
      });

      User.belongsToMany(models.Cuisine, {
        through: models.Cart,
        foreignKey: "CuisineId",
        otherKey: "UserId",
      });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Username is required",
          },
          notEmpty: {
            args: true,
            msg: "Username is required",
          },
        },
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Email Already Exist",
        },
        validate: {
          notNull: {
            args: true,
            msg: "Email is required",
          },
          notEmpty: {
            args: true,
            msg: "Email is required",
          },
          isEmail: {
            args: true,
            msg: "Invalid Email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: "Password is required",
          notEmpty: "Password is rquired",
          min(value) {
            if (value < 5) {
              throw new Error("minimum character for Password is 5 char");
            }
          },
        },
      },
      role: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
