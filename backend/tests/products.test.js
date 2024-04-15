const request = require("supertest");
const app = require("../index");
const BASE = "/api/v1/products/";
const db = require("../config/dbConfig");
const {
  mockProductPostReq,
  mockProductPostRes,
  mockProductDbRow,
  mockProductDbAllRows,
  mockProductPatchReq,
  mockProductPatchRes,
} = require("./constants/products");

jest.mock("../config/dbConfig", () => ({
  pool: {
    query: jest.fn(),
  },
}));


describe("Product API routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new product for POST /", async () => {
    const mockDbResponse = {
      insertId: 1,
    };
    const mockRequestBody = mockProductPostReq;
    db.pool.query.mockResolvedValueOnce([mockDbResponse]);
    const res = await request(app).post(BASE).send(mockRequestBody);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject(mockProductPostRes);
  });

  it("should handle database errors for GET /:id", async () => {
    db.pool.query.mockImplementationOnce((sql, params, callback) => {
      callback(new Error("Database error"), null); // Simulate an error
    });
    const res = await request(app).get(BASE);
    expect(res.status).toBe(500);
    expect(res.body.error).toBeDefined();
  });

  it("should return a product for GET /:id", async () => {
    // Mock data that the route handler is expected to receive from the database
    const mockDBResponse = [mockProductDbRow];
    // Mock the query function to return the mockDbResult
    db.pool.query.mockResolvedValueOnce([mockDBResponse]);
    // Make the request to the API
    const res = await request(app).get(BASE + "1");
    expect(res.status).toBe(200);
    expect(res.body.data).toMatchObject(mockProductDbRow);
  });

  it("should return all products for GET /", async () => {
    //const mockDBResponse = mockPro;
    db.pool.query.mockResolvedValueOnce([mockProductDbAllRows]);
    const res = await request(app).get(BASE);
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(2);
    expect(res.body.data).toMatchObject(mockProductDbAllRows);
  });

  it("Should update a product for PATCH /:id", async () => {
    db.pool.query.mockResolvedValueOnce([[mockProductDbRow]]);
    //db.pool.query.mockResolvedValueOnce([mockProductPatchReq]);
    db.pool.query.mockResolvedValueOnce([{ changedRows: 1 }]);
    db.pool.query.mockResolvedValueOnce([[mockProductPatchRes.data]]);
    const res = await request(app)
      .patch(BASE + "1")
      .send(mockProductPatchReq);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject(mockProductPatchRes);
  });
});
