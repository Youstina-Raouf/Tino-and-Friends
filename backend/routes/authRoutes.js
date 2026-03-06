// Auth Routes
const express = require('express');
const router = express.Router();
const { requestOtp, verifyOtp, getProfile, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/request-otp', requestOtp);
router.post('/verify-otp', verifyOtp);

// Protected routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

module.exports = router;
