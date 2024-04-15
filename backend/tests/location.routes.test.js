const request = require("supertest");
const app = require("../index");
const BASE = "/api/v1/locations/";
const db = require("../config/dbConfig");

jest.mock("../config/dbConfig", () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe("LocationAPIs", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a location and return 201", async () => {
    const locationData = { BusinessID: 1, TypeID: 1, Latitude: "1.23", Longitude: "4.56" };
    const mockDbResponse = { insertId: 1 };

    db.pool.query.mockResolvedValueOnce([mockDbResponse]);

    const res = await request(app).post(BASE).send(locationData);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message', 'Location created successfully');
  });

  it("should return a location and status 200 if found", async () => {
    const mockDbResponse = [{ LocationID: 1, BusinessID: 1, TypeID: 1, Latitude: "1.23", Longitude: "4.56" }];

    db.pool.query.mockResolvedValueOnce([mockDbResponse]);

    const res = await request(app).get(BASE + '1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Location retrieved successfully');
  });

  it("should return 404 when updating a non-existent location", async () => {
    const updateData = { BusinessID: 1, TypeID: 1, Latitude: "2.34", Longitude: "5.67" };
    const mockDbFindResponse = [];

    db.pool.query.mockResolvedValueOnce([mockDbFindResponse]);

    const res = await request(app).patch(BASE + '9999').send(updateData);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error', 'Location not found');
  });

  it("should return 404 when deleting a non-existent location", async () => {
    const mockDbFindResponse = [];

    db.pool.query.mockResolvedValueOnce([mockDbFindResponse]);

    const res = await request(app).delete(BASE + '9999');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error', 'Location not found');
  });
});