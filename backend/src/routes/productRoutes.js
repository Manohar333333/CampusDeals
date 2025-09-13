const express = require('express');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByFilter
} = require('../controllers/productController');

const router = express.Router();

// All routes are now public (no authentication required)
router.get('/', getAllProducts);                    // GET /api/products
router.get('/filter', getProductsByFilter);         // GET /api/products/filter?product_name=calculator
router.get('/:id', getProductById);                 // GET /api/products/1
router.post('/', createProduct);                    // POST /api/products (public)
router.put('/:id', updateProduct);                  // PUT /api/products/1 (public)
router.delete('/:id', deleteProduct);               // DELETE /api/products/1 (public)

module.exports = router;