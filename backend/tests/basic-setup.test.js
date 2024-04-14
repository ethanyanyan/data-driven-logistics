/**
 * Simple tests with Jest to make sure
 * the testing environment is set up correctly.
 */

const request = require("supertest");
const app = require("../index");
const BASE = "/api/v1/";

describe("Basic testing config", () => {
  it("does 1 + 1 equal 2", () => {
    const result = 1 + 1;
    expect(result).toBe(2);
  });

  it("GET <base>/testing/ping should return 'pong'", async () => {
    const res = await request(app).get(BASE + "testing/ping");
    expect(res.text).toBe("pong");
  });

  // Add more test cases for other routes and logic as needed
});
