const request = require("supertest");
const app = require("../index");
const BASE = "/api/v1/roles/";
const db = require("../config/dbConfig");

jest.mock("../config/dbConfig", () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe("Roles API routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should handle database errors for GET /", async () => {
    db.pool.query.mockImplementationOnce((sql, params, callback) => {
      callback(new Error("Database error"), null); // Simulate an error
    });

    const res = await request(app).get(BASE);
    expect(res.status).toBe(500);
    expect(res.body.error).toBeDefined();
  });

  it("Should return all roles for GET /", async () => {
    const mockApiResponse = [
      {
        RoleID: 1,
        RoleName: "Admin",
        Description: "System administrator with full access",
      },
      {
        RoleID: 2,
        RoleName: "Corporate Manager",
        Description: "Manages corporate strategy and oversees all facilities.",
      },
    ];

    db.pool.query.mockResolvedValueOnce([mockApiResponse]);
    const res = await request(app).get(BASE);
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(2);
    for (let role of res.body.data) {
      expect(role).toMatchObject({
        RoleID: expect.any(Number),
        RoleName: expect.any(String),
        Description: expect.any(String),
      });
    }
  });
});
