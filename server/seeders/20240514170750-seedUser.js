"use strict";

const { hashPassword } = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const dataUser = require("../data/user.json").map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      /** BUAT HASH PAASSWORD SEBELUM SEEDING UNTUK BISA BEDAIN ADMIN DAN JUGA STAFF */
      el.password = hashPassword(el.password);
      return el;
    });
    await queryInterface.bulkInsert("Users", dataUser, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {
      truncate: true,
      restartIdentity: true,
    });
  },
};
