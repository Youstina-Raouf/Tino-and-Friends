// Authentication Controller
const User = require('../models/User');
const { getSignedJwtToken } = require('../middleware/auth');

// Function to generate a 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Request OTP (Acts as both register and login initiation)
exports.requestOtp = async (req, res, next) => {
  try {
    const { phone, name, email } = req.body;

    if (!phone) {
      return res.status(400).json({ message: 'Please provide a phone number' });
    }

    let user = await User.findOne({ phone });

    // Auto-register if user doesn't exist
    if (!user) {
      user = await User.create({
        phone,
        name: name || 'Valued Customer',
        email: email || undefined
      });
    }

    // Generate OTP
    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes from now

    await user.save();

    // Mock SMS sending (In production, replace with Twilio etc.)
    console.log(`[Twilio Mock] Sending OTP ${otp} to phone ${phone}`);

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      // Include OTP in response ONLY in development for easier testing
      devOtp: process.env.NODE_ENV === 'development' ? otp : undefined
    });
  } catch (error) {
    next(error);
  }
};

// Verify OTP
exports.verifyOtp = async (req, res, next) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({ message: 'Please provide phone and OTP' });
    }

    const user = await User.findOne({ phone }).select('+otp +otpExpires');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.otp || !user.otpExpires || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: 'OTP is missing or expired' });
    }

    const isMatch = await user.verifyOtp(otp);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid OTP' });
    }

    // Clear OTP after successful login
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    // Get token
    const token = getSignedJwtToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get current user profile
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('favorites')
      .populate('orderHistory');

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Update user profile
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user,
    });
  } catch (error) {
    next(error);
  }
};
