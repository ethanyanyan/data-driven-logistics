const request = require('supertest');
const app = require('../index'); // Assuming your Express app is exported from app.js
const InventoryLevel = require('../models/InventoryLevel');
const Transaction = require('../models/Transaction');

jest.mock('../models/InventoryLevel');
jest.mock('../models/Transaction');

describe('InventoryController', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getHistoricalInventoryLevels', () => {
    it('should return historical inventory levels successfully', async () => {
      const locationID = '1';
      const productID = '2';
      const days = '5,10,15';

      const currentLevel = {
        InventoryLevelID: 1,
        LocationID: locationID,
        ProductID: productID,
        Quantity: 100,
      };

      InventoryLevel.findByLocationAndProduct.mockResolvedValueOnce(currentLevel);
      Transaction.calculateQuantityChange.mockResolvedValueOnce(20);
      Transaction.calculateQuantityChange.mockResolvedValueOnce(50);
      Transaction.calculateQuantityChange.mockResolvedValueOnce(80);

      const response = await request(app)
        .get(`/api/v1/inventory/${locationID}/${productID}/historical?days=${days}`)
        .expect(200);

      expect(response.body.message).toBe('Historical inventory levels retrieved successfully');
      expect(response.body.data).toHaveLength(3);
      expect(response.body.data[0].level).toBe(80);
      expect(response.body.data[1].level).toBe(50);
      expect(response.body.data[2].level).toBe(20);

      expect(InventoryLevel.findByLocationAndProduct).toHaveBeenCalledWith(locationID, productID);
      expect(Transaction.calculateQuantityChange).toHaveBeenCalledTimes(3);
    });

    it('should return 404 if inventory level is not found', async () => {
      const locationID = '1';
      const productID = '2';
      const days = '5,10,15';

      InventoryLevel.findByLocationAndProduct.mockResolvedValueOnce(null);

      const response = await request(app)
        .get(`/api/v1/inventory/${locationID}/${productID}/historical?days=${days}`)
        .expect(404);

      expect(response.body.error).toBe('Inventory level not found');

      expect(InventoryLevel.findByLocationAndProduct).toHaveBeenCalledWith(locationID, productID);
      expect(Transaction.calculateQuantityChange).not.toHaveBeenCalled();
    });
  });
});