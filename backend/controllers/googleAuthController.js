const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// @desc    Google OAuth Login/Register
// @route   POST /api/auth/google
// @access  Public
exports.googleAuth = async (req, res) => {
  try {
    const { email, name, googleId, profilePicture } = req.body;

    if (!email || !name || !googleId) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing required fields'
      });
    }

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      // User exists - login
      const token = generateToken(user._id);

      return res.json({
        status: 'success',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          profilePicture: user.profilePicture
        }
      });
    } else {
      // New user - register
      user = await User.create({
        name,
        email,
        password: googleId, // Use googleId as password (will be hashed)
        profilePicture: profilePicture || 'https://via.placeholder.com/150',
        isVerified: true, // Google users are pre-verified
        role: 'jobseeker' // Default role
      });

      const token = generateToken(user._id);

      return res.status(201).json({
        status: 'success',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          profilePicture: user.profilePicture
        }
      });
    }
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
