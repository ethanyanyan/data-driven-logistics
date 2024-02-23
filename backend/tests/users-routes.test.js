/**
 * Tests with Jest to make sure
 * the users-related routes
 * are working correctly.
 */

const request = require("supertest");
const app = require("../index");
const BASE = "/api/v1/users/";

describe("Basic testing config", () => {
  it("should return list for GET /api/v1/users/:companyID", async () => {
    const companyID = "1";
    const res = await request(app).get(BASE + companyID);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Add more test cases for other routes and logic as needed
});
