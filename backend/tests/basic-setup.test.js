/**
 * Simple tests with Jest to make sure
 * the testing environment is set up correctly.
 */

const request = require("supertest");
const app = require("../index");

describe("Basic testing config", () => {
  it("does 1 + 1 equal 2", () => {
    const result = 1 + 1;
    expect(result).toBe(2);
  });

  it("should return status 200 for GET /api/status", async () => {
    const res = await request(app).get("/api/status");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: "OK" });
  });

  // Add more test cases for other routes and logic as needed
});
