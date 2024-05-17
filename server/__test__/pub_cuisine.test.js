const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { hashPassword } = require("../helpers/bcrypt");
const { ARRAY } = require("sequelize");

// before all => seeding
beforeAll(async () => {
  let dataUser = require("../data/user.json").map((element) => {
    element.createdAt = element.updatedAt = new Date();
    element.password = hashPassword(element.password);
    return element;
  });

  await sequelize.queryInterface.bulkInsert("Users", dataUser, {});

  let dataCategory = require("../data/category.json").map((element) => {
    element.createdAt = element.updatedAt = new Date();
    return element;
  });

  await sequelize.queryInterface.bulkInsert("Categories", dataCategory, {});

  let dataCuisine = require("../data/cuisine.json").map((element) => {
    element.createdAt = element.updatedAt = new Date();
    return element;
  });

  await sequelize.queryInterface.bulkInsert("Cuisines", dataCuisine, {});
});

describe("GET /pub/restaurant", () => {
  test("Get Cuisine without query filter", async () => {
    const response = await request(app).get("/pub/restaurant");
    const { body, status } = response;
    expect(status).toBe(200);
    expect(body.data.length).toBe(11);
    expect(body).toBeInstanceOf(Object);
    expect(body.data).toBeInstanceOf(Array);
  });

  test("Get Articles with 1 query filter", async () => {
    const response = await request(app).get("/pub/restaurant?filter=1");
    const { body, status } = response;
    expect(status).toBe(200);
  });
});


// after all => cleaning
afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });

  await sequelize.queryInterface.bulkDelete("Categories", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });

  await sequelize.queryInterface.bulkDelete("Cuisines", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });
});
