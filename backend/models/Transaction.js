const db = require("../config/dbConfig");

class Transaction {
  constructor(
    TransactionID,
    ItemID,
    LocationID,
    TypeID,
    Quantity,
    date,
    UserID,
  ) {
    this.TransactionID = TransactionID;
    this.ItemID = ItemID;
    this.LocationID = LocationID;
    this.TypeID = TypeID;
    this.Quantity = Quantity;
    this.Date = date;
    this.UserID = UserID;
  }

  /**
   * Saves a new transaction to the database.
   *
   * @return {Promise<object>} The result object from the database operation.
   */
  async save() {
    const query = `
            INSERT INTO Transactions (ItemID, LocationID, TypeID, Quantity, Date, UserID) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
    const values = [
      this.ItemID,
      this.LocationID,
      this.TypeID,
      this.Quantity,
      this.Date,
      this.UserID,
    ];

    try {
      const [result] = await db.pool.query(query, values);
      this.TransactionID = result.insertId; // Since auto_increment is used for TransactionID
      return result;
    } catch (error) {
      throw new Error("Error saving the transaction: " + error.message);
    }
  }

  /**
   * Finds transactions by their type.
   *
   * @param {number} TypeID - The type ID of transactions to find.
   * @return {Promise<Array<Transaction>>} An array of Transaction instances that match the type.
   */
  static async findByType(TypeID) {
    const query = `SELECT * FROM Transactions WHERE TypeID = ?`;

    try {
      const [rows] = await db.pool.query(query, [TypeID]);
      return rows.map(
        (row) =>
          new Transaction(
            row.TransactionID,
            row.ItemID,
            row.LocationID,
            row.TypeID,
            row.Quantity,
            row.Date,
            row.UserID,
          ),
      );
    } catch (error) {
      throw new Error("Error finding transactions by type: " + error.message);
    }
  }

  /**
   * Retrieves all transactions within a specified Date range.
   *
   * @param {Date} startDate - The start Date of the range.
   * @param {Date} endDate - The end Date of the range.
   * @return {Promise<Array<Transaction>>} An array of Transaction instances within the Date range.
   */
  static async findByDateRange(startDate, endDate) {
    const query = `SELECT * FROM Transactions WHERE Date >= ? AND Date <= ?`;
    const values = [startDate, endDate];

    try {
      const [rows] = await db.pool.query(query, values);
      return rows.map(
        (row) =>
          new Transaction(
            row.TransactionID,
            row.ItemID,
            row.LocationID,
            row.TypeID,
            row.Quantity,
            row.Date,
            row.UserID,
          ),
      );
    } catch (error) {
      throw new Error(
        "Error finding transactions by Date range: " + error.message,
      );
    }
  }

  static async calculateQuantityChange(locationID, productID, startDate, endDate) {
    const query = `
      SELECT SUM(Quantity) AS quantityChange
      FROM Transactions
      WHERE LocationID = ? AND ItemID = ? AND Date BETWEEN ? AND ?
    `;

    const [result] = await db.pool.query(query, [locationID, productID, startDate, endDate]);
    return result[0].quantityChange || 0;
  }

  // Additional methods as needed for transaction management
}

module.exports = Transaction;
