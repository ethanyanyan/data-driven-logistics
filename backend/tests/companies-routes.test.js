/**
 * Tests with Jest to make sure
 * the companies-related routes
 * are working correctly.
 */

const request = require("supertest");
const app = require("../index");
const BASE = "/api/v1/companies/";

describe("Basic testing config", () => {
  it("should return list for GET /api/v1/companies/", async () => {
    const res = await request(app).get(BASE);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Add more test cases for other routes and logic as needed
});
