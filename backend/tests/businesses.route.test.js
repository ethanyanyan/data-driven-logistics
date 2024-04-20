const request = require("supertest");
const app = require("../index");
const BASE = "/api/v1/businesses/";
const db = require("../config/dbConfig");

jest.mock("../config/dbConfig", () => ({
  pool: {
    query: jest.fn(),
    getConnection: jest.fn(() => ({
      beginTransaction: jest.fn(),
      commit: jest.fn(),
      rollback: jest.fn(),
      query: jest.fn(),
      release: jest.fn(),
    })),
  },
}));

describe("BusinessAPIs", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a business and return 201", async () => {
    const businessData = { BusinessName: "Test Business", Description: "Test Description" };
    const mockDbResponse = { insertId: 1 };

    db.pool.query.mockResolvedValueOnce([mockDbResponse]);

    const res = await request(app).post(BASE).send(businessData);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('message', 'Business created successfully');
  });

  it("should return a business and status 200 if found", async () => {
    const mockDbResponse = [{ BusinessID: 1, BusinessName: "Test Business", Description: "Test Description" }];

    db.pool.query.mockResolvedValueOnce([mockDbResponse]);

    const res = await request(app).get(BASE + '1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('message', 'Business retrieved successfully');
  });

  it("should return 404 when updating a non-existent business", async () => {
    const updateData = { BusinessName: "Updated Business", Description: "Updated Description" };
    const mockDbFindResponse = [];

    db.pool.query.mockResolvedValueOnce([mockDbFindResponse]);

    const res = await request(app).patch(BASE + '9999').send(updateData);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error', 'Business not found');
  });

  it("should return 404 when deleting a non-existent business", async () => {
    const mockDbFindResponse = [];
    const mockDbLocationResponse = [[]];

    db.pool.query.mockResolvedValueOnce([mockDbFindResponse]);
    db.pool.query.mockResolvedValueOnce(mockDbLocationResponse);

    const res = await request(app).delete(BASE + '9999');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error', 'Business not found');
  });
});