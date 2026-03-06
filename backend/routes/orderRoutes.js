// Order Routes
const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/auth');
const {
  createOrder,
  getUserOrders,
  getOrder,
  createCheckoutSession,
  verifyPayment,
  getAllOrders,
  updateOrderStatus
} = require('../controllers/orderController');

// All order routes require authentication
router.use(protect);

router.post('/', createOrder);
router.get('/user', getUserOrders);
router.get('/:id', getOrder);

// Payment routes
router.post('/payment/create-checkout-session', createCheckoutSession);
router.post('/payment/verify', verifyPayment);

// Admin routes
router.get('/', authorizeRoles('admin'), getAllOrders);
router.put('/:id/status', authorizeRoles('admin'), updateOrderStatus);

module.exports = router;
