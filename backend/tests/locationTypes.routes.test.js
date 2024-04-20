const request = require("supertest");
const app = require("../index");
const BASE = "/api/v1/location-types/";
const db = require("../config/dbConfig");

jest.mock("../config/dbConfig", () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe("LocationTypeAPIs", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a location type and status 200 if found", async () => {
    const mockDbResponse = [{ TypeID: 1, Name: "Warehouse" }];

    db.pool.query.mockResolvedValueOnce([mockDbResponse]);

    const res = await request(app).get(BASE + '1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Location type retrieved successfully');
    expect(res.body.data).toEqual(expect.objectContaining({
      TypeID: 1,
      Name: "Warehouse",
    }));
  });

  it("should return 404 when retrieving a non-existent location type", async () => {
    const mockDbResponse = [];

    db.pool.query.mockResolvedValueOnce([mockDbResponse]);

    const res = await request(app).get(BASE + '9999');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error', 'Location type not found');
  });

  it("should handle database errors gracefully", async () => {
    const errorMessage = "Database connection lost";
    db.pool.query.mockRejectedValueOnce(new Error(errorMessage));

    const res = await request(app).get(BASE + '1');
    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty('error');
  });
});