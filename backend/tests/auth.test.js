/**
 * Simple tests with Jest to make sure
 * the authentication functionality is set up correctly.
 */

const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../index");
require("dotenv").config();
const { generateToken } = require("../middleware/auth");
const db = require("../config/dbConfig");

jest.mock("../config/dbConfig", () => ({
  pool: {
    execute: jest.fn(),
  },
}));

describe("Authentication and Protected Route Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clears any previous mocking behavior
    db.pool.execute.mockResolvedValue([
      [
        {
          UserID: 1,
          Username: "testUser",
          FirstName: "Test",
          LastName: "User",
          Email: "testuser@example.com",
        },
      ],
      [], // Fields array
    ]);
  });

  it("should generate a valid JWT for a user", () => {
    const user = { Username: "testUser", UserID: 1 };
    const token = generateToken(user);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    expect(decoded).toHaveProperty("Username", user.Username);
  });

  it("should allow access to a protected route with a valid token", async () => {
    const user = { Username: "testUser", UserID: 1 };
    const token = generateToken(user);

    const response = await request(app)
      .get("/api/v1/users/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      UserID: expect.any(Number),
      Username: "testUser",
      FirstName: expect.any(String),
      LastName: expect.any(String),
      Email: expect.any(String),
    });
  });

  // Add more tests as needed...
});
