/**
 * Tests with Jest to make sure
 * the users-related routes
 * are working correctly.
 */

const request = require("supertest");
const app = require("../index");
const BASE = "/api/v1/users/";
const db = require("../config/dbConfig");

jest.mock("../config/dbConfig", () => ({
  query: jest.fn(),
}));

describe("Basic testing config", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should handle database errors gracefully", async () => {
    jest.spyOn(db, "query").mockImplementationOnce((sql, params, callback) => {
      callback(new Error("Database error"), null); // Simulate an error
    });

    const res = await request(app).get(BASE + "1");
    expect(res.status).toBe(500);
    expect(res.body.error).toBeDefined();
  });

  it("should return list for GET /api/v1/users/:companyID", async () => {
    // Mock successful database response
    jest.spyOn(db, "query").mockImplementationOnce((sql, params, callback) => {
      callback(null, [{ userId: 1, username: "testUser" }]);
    });

    const companyID = "1";
    const res = await request(app).get(BASE + companyID);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body).toEqual(
      expect.arrayContaining([
        { userId: expect.any(Number), username: expect.any(String) },
      ]),
    );
  });

  // Add more test cases for other routes and logic as needed
});
