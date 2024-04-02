/**
 * ProductsController.js
 * This controller handles all product-related operations, including
 * creating, retrieving (all and by productId), updating price and description
 *  and deleting products,
 */

const Product = require("./../models/Product");
const db = require("../config/dbConfig");

// Logs a new product in the inventory
async function createProduct(req, res) {
  const { Name, Description, UnitPrice } = req.body;

  try {
    const newProduct = new Product(
      ((ProductID = null)),
      Name,
      Description,
      UnitPrice
    );
    const result = await newProduct.save();
    res.status(200).json({
      message: "Product created successfully",
      data: {
        ProductID: result.insertId,
        Name,
        Description,
        UnitPrice,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Database error occurred." });
  }
}

// Get status, details and Unitprice of a particular product
async function getProduct(req, res) {
  try {
    const product = await Product.findByID(req.params.id);
    if (product) {
      res.status(200).json({
        message: `Product id ${req.params.id} retrieved successfully`,
        data: product,
      });
    } else {
      res.status(404).json({
        error: `Product with id ${req.params.id} not found`,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Database error occurred.",
    });
  }
}

// Get status, details and Unitprice of all products
async function getAllProducts(req, res) {
  try {
    const products = await Product.getAll();
    if (products.length > 0) {
      res.status(200).json({
        message: `All products retrieved successfully`,
        data: products,
      });
    } else {
      res.status(404).json({
        error: `No products found`,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Database error occurred.",
    });
  }
}

// Update the details of a product
async function updateDetails(req, res) {
  const updateData = {};
  const allowedUpdates = ["Name", "Description", "UnitPrice"];

  allowedUpdates.forEach((update) => {
    if (req.body[update]) {
      updateData[update] = req.body[update];
    }
  });

  // Initialise product object given the id
  let product;
  try {
    product = await Product.findByID(req.params.id);
    if (!product) {
      return res.status(404).json({
        error: `Product with id ${req.params.id} not found`,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Database error occurred.",
    });
  }

  // update the product object
  try {
    const productUpdated = await product.update(updateData);
    if (productUpdated) {
      res.status(200).json({
        message: `Product id ${product.ProductID} updated successfully`,
        data: await Product.findByID(product.ProductID),
      });
    } else {
      res.status(404).json({
        error: `Product with id ${product.ProductID} failed to update or no changes were made. Make sure the fields are different from the current values.`,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Database error occurred.",
    });
  }
}

// Delete a product
async function deleteProduct(req, res) {
  try {
    const product = await Product.findByID(req.params.id);
    if (product) {
      const result = await product.delete();
      if (result) {
        res.status(200).json({
          message: `Product id ${req.params.id} deleted successfully`,
        });
      } else {
        res.status(500).json({
          error: "Database error occurred.",
        });
      }
    } else {
      res.status(404).json({
        error: `Product with id ${req.params.id} not found`,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Database error occurred.",
    });
  }
}

module.exports = {
  createProduct,
  getProduct,
  getAllProducts,
  updateDetails,
  deleteProduct
};
