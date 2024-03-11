const db = require("../config/dbConfig");
jest.mock("../config/dbConfig");

const Transaction = require("./../models/Transaction");

describe("Transaction Model", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it("should save a new transaction to the database", async () => {
    // Mock db.pool.query to simulate a successful insert
    db.pool.query.mockResolvedValue([{ insertId: 1 }, undefined]);

    const transaction = new Transaction(null, 1, 1, 1, 100, new Date(), 1);
    await transaction.save();

    // Check if db.pool.query was called
    expect(db.pool.query).toHaveBeenCalled();
    expect(transaction.TransactionID).toEqual(1);
  });

  it("should find transactions by type", async () => {
    // Mock db.pool.query to return a sample transaction array
    const mockTransactions = [
      {
        TransactionID: 1,
        ItemID: 1,
        LocationID: 1,
        TypeID: 1,
        Quantity: 100,
        Date: new Date(),
        UserID: 1,
      },
    ];
    db.pool.query.mockResolvedValue([mockTransactions, undefined]);

    const transactions = await Transaction.findByType(1);

    // Check if the method returns the expected mock data
    expect(db.pool.query).toHaveBeenCalledWith(expect.any(String), [1]);
    expect(transactions[0].TransactionID).toEqual(
      mockTransactions[0].TransactionID,
    );
  });

  it("should retrieve transactions within a specified date range", async () => {
    // Mock db.pool.query to return a sample transaction array
    const mockTransactions = [
      {
        TransactionID: 2,
        ItemID: 1,
        LocationID: 1,
        TypeID: 1,
        Quantity: 50,
        Date: new Date("2022-07-01"),
        UserID: 1,
      },
    ];
    db.pool.query.mockResolvedValue([mockTransactions, undefined]);

    const startDate = new Date("2022-01-01");
    const endDate = new Date("2022-12-31");
    const transactions = await Transaction.findByDateRange(startDate, endDate);

    // Check if the method returns the expected mock data
    expect(db.pool.query).toHaveBeenCalledWith(expect.any(String), [
      startDate,
      endDate,
    ]);
    expect(transactions.length).toBeGreaterThan(0);
    expect(transactions[0].TransactionID).toEqual(
      mockTransactions[0].TransactionID,
    );
  });

  // Additional tests as needed
});
