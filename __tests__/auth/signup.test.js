const request = require("supertest");
const app = require("../app");
const User = require("../models/user");

describe("POST /signup", () => {
  it("should create a new user if email is not taken", async () => {
    const res = await request(app)
      .post("/signup")
      .send({
        username: "testuser",
        email: "testuser@test.com",
        password: "password123",
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("token");
  });

  it("should return an error if email is already taken", async () => {
    const existingUser = new User({
      username: "existinguser",
      email: "existinguser@test.com",
      password: "existingpassword",
    });
    await existingUser.save();

    const res = await request(app)
      .post("/signup")
      .send({
        username: "testuser",
        email: "existinguser@test.com",
        password: "password123",
      });

    expect(res.statusCode).toEqual(409);
    expect(res.body).toHaveProperty("message", "Email already taken");
  });

  it("should return an error if required fields are missing", async () => {
    const res = await request(app)
      .post("/signup")
      .send({
        username: "testuser",
      });

    expect(res.statusCode).toEqual(422);
    expect(res.body.errors).toHaveLength(2);
  });
});
