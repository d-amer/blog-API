const request = require("supertest");
const app = require("../app");
const User = require("../models/user");

describe("POST /login", () => {
  it("should return a token for a valid user", async () => {
    const user = new User({
      username: "testuser",
      email: "testuser@test.com",
      password: "$2a$10$3IzJ/6QH/T6GTzsKXZcRDeHiN.kp/a5Nap1nFpKhPKjK4uzV7kk4W",
    });
    await user.save();

    const res = await request(app)
      .post("/login")
      .send({
        email: "testuser@test.com",
        password: "password123",
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should return an error for an invalid user", async () => {
    const res = await request(app)
      .post("/login")
      .send({
        email: "testuser@test.com",
        password: "password123",
      });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("message", "Auth failed");
  });
});
