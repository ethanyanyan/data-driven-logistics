const db = require("../config/dbConfig");
const bcrypt = require("bcrypt");
jest.mock("../config/dbConfig");
jest.mock("bcrypt");

const User = require("./../models/User");
const saltRounds = 10;

describe("User Model", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const mockConnection = {
      query: jest.fn().mockResolvedValue([{ insertId: 1 }, undefined]),
      commit: jest.fn(),
      rollback: jest.fn(),
      release: jest.fn(),
      beginTransaction: jest.fn(),
    };

    // Mock `db.pool.getConnection` to return the mock connection object
    db.pool.getConnection.mockResolvedValue(mockConnection);
  });

  it("should save a new user to the database with a hashed password", async () => {
    const mockUser = { insertId: 1 };
    db.pool.getConnection.mockResolvedValue({
      query: jest.fn().mockResolvedValue([mockUser, undefined]),
      beginTransaction: jest.fn(),
      commit: jest.fn(),
      rollback: jest.fn(),
      release: jest.fn(),
    });
    bcrypt.hash.mockResolvedValue("hashedPassword");

    const userObj = {
      BusinessID: 1,
      RoleID: 1,
      Username: "testUser",
      Password: "password",
      FirstName: "Test",
      LastName: "User",
    };
    const result = await User.save(userObj);

    const mockConnection = await db.pool.getConnection();
    expect(mockConnection.query).toHaveBeenCalled();
    expect(bcrypt.hash).toHaveBeenCalledWith("password", saltRounds);
    expect(result).toHaveProperty("insertId", 1);
  });

  it("should find a user by their unique UserID", async () => {
    const mockUserData = {
      UserID: 1,
      BusinessID: 1,
      RoleID: 1,
      Username: "testUser",
      Password: "hashedPassword",
      FirstName: "Test",
      LastName: "User",
    };
    db.pool.execute.mockResolvedValue([[mockUserData], undefined]);

    const user = await User.findByUserID(1);

    expect(db.pool.execute).toHaveBeenCalledWith(expect.any(String), [1]);
    expect(user).toBeInstanceOf(User);
    expect(user.FirstName).toEqual("Test");
  });

  it("should verify a user's password", async () => {
    const user = new User({
      UserID: 1,
      Username: "testUser",
      Password: "hashedPassword", // Assume this is the hashed version of "password"
      FirstName: "Test",
      LastName: "User",
    });
    bcrypt.compare.mockResolvedValue(true);

    const verificationResult = await user.verifyPassword("password");

    expect(bcrypt.compare).toHaveBeenCalledWith("password", "hashedPassword");
    expect(verificationResult).toBeTruthy();
  });

  it("should update specified details of a user", async () => {
    db.pool.getConnection.mockResolvedValue({
      query: jest
        .fn()
        .mockImplementation(() =>
          Promise.resolve([{ affectedRows: 1 }, undefined]),
        ),
      commit: jest.fn(() => Promise.resolve()),
      rollback: jest.fn(() => Promise.resolve()),
      release: jest.fn(),
      beginTransaction: jest.fn(() => Promise.resolve()),
    });
    bcrypt.hash.mockResolvedValue("newHashedPassword");

    const updateData = { Password: "newPassword" };
    const success = await User.updateUser(1, updateData);

    const mockConnection = await db.pool.getConnection();
    expect(mockConnection.query).toHaveBeenCalled();
    expect(bcrypt.hash).toHaveBeenCalledWith("newPassword", saltRounds);
    expect(success).toBeTruthy();
  });

  // Additional tests as needed for other functionalities and error handling
});
