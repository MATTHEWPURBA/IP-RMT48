"use strict";
const axios = require("axios");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const API_URL = "https://api.spoonacular.com/food/menuItems/search?query=chicken&number=100";
    const API_KEY = "f574eaeff8e04d189204062510b0e49c";

    async function fetchMenu(page) {
      try {
        let { data } = await axios.get(API_URL, {
          params: {
            apiKey: API_KEY,
          },
          headers: {
            accept: "application/json",
          },
        });
        return data.menuItems;
        /** menuItems ini adalah hasil dari API URL nya dan isi data nya disitu semua */
      } catch (error) {
        console.error(`Error fetching movies for page ${page}:`, error);
        return [];
      }
    }

    const menuItems = await fetchMenu();

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const cuisine = menuItems.map((item) => ({
      UserId: getRandomInt(1, 3),
      CategoryId: getRandomInt(1, 3),
      title: item.title,
      image: item.image,
      restaurantChain: item.restaurantChain,
      servings: JSON.stringify(item.servings),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("Cuisines", cuisine, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Cuisines", null, {
      truncate: true,
      restartIdentity: true,
    });
  },
};
