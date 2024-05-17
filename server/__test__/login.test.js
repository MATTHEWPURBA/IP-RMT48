const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const { hashPassword } = require("../helpers/bcrypt");

let access_token;
const dataToInsert = {
  email: "avolet1@behance.net",
  password: "Zamit",
};

beforeAll(async () => {
  let dataUser = require("../data/user.json").map((element) => {
    element.createdAt = element.updatedAt = new Date();
    element.password = hashPassword(element.password);
    return element;
  });
  await sequelize.queryInterface.bulkInsert("Users", dataUser, {});
});

describe("POST users/login", () => {
  test("Login Success!", async () => {
    const response = await request(app).post("/users/login").send({ email: dataToInsert.email, password: dataToInsert.password });

    const { body, status } = response;
    access_token = body.access_token;
    expect(status).toBe(200);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("access_token", access_token);
  });

  test("Login Failed, Email Must Not Empty!", async () => {
    const response = await request(app).post("/users/login").send({ email: "", password: dataToInsert.password });
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Email/Password is required");
  });

  test("Login Failed, Password Must Not Empty!", async () => {
    const response = await request(app).post("/users/login").send({ email: dataToInsert.email, password: "" });
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Email/Password is required");
  });

  test("Login Failed, Email is Invalid!", async () => {
    const response = await request(app).post("/users/login").send({ email: !dataToInsert.email, password: dataToInsert.password });
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Email/Password is required");
  });
  
  test("Login Failed, Password is Invalid!", async () => {
    const response = await request(app).post("/users/login").send({ email: !dataToInsert.email, password: dataToInsert.password });
    const { body, status } = response;
    expect(status).toBe(400);
    expect(body).toBeInstanceOf(Object);
    expect(body).toHaveProperty("message", "Email/Password is required");
  });
});

afterAll(async () => {
  await sequelize.queryInterface.bulkDelete("Users", null, {
    restartIdentity: true,
    cascade: true,
    truncate: true,
  });
});
