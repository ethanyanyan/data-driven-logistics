/**
 * Simple tests with Jest to make sure
 * the authentication functionality is set up correctly.
 */

jest.mock("../config/dbConfig", () => ({
  query: jest.fn(),
}));

const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../index");
require("dotenv").config();
const { generateToken } = require("../middleware/auth");
const db = require("../config/dbConfig");

// Setting up a general mock for db.query
db.query.mockImplementation((sql, params, callback) => {
  if (sql.includes("SELECT * FROM Users WHERE UserID = ?")) {
    // Simulate finding a user by ID
    const mockUser = {
      UserID: params[0],
      username: "testUser" /* other fields */,
    };
    callback(null, [mockUser]);
  } else {
    callback(null, []);
  }
});

describe("Authentication and Protected Route Tests", () => {
  it("should generate a valid JWT for a user", () => {
    const user = { username: "testUser" };
    const token = generateToken(user);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    expect(decoded).toHaveProperty("username", user.username);
  });

  it("should allow access to a protected route with a valid token", async () => {
    const user = { username: "testUser" };
    const token = generateToken(user);

    const response = await request(app)
      .get("/api/v1/users/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });

  // Add more tests as needed...
});
