// Product Routes
const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductsByCategory,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  updateStock
} = require('../controllers/productController');
const { protect, authorizeRoles } = require('../middleware/auth');

// Public routes
router.get('/', getProducts);
router.get('/search', searchProducts);
router.get('/category/:category', getProductsByCategory);
router.get('/:id', getProduct);

// Admin routes
router.post('/', protect, authorizeRoles('admin'), createProduct);
router.put('/:id', protect, authorizeRoles('admin'), updateProduct);
router.delete('/:id', protect, authorizeRoles('admin'), deleteProduct);
router.put('/:id/stock', protect, authorizeRoles('admin'), updateStock);

module.exports = router;
