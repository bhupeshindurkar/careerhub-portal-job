/**
 * LinkedIn OAuth Controller
 * Developed by: BHUPESH INDURKAR - Full Stack Developer
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * @desc    LinkedIn OAuth Login
 * @route   POST /api/auth/linkedin
 * @access  Public
 */
const linkedinAuth = async (req, res) => {
  try {
    const { email, name, linkedinId, profilePicture } = req.body;

    if (!email || !name || !linkedinId) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing required LinkedIn data',
      });
    }

    // Check if user exists
    let user = await User.findOne({ email });

    if (user) {
      // Update LinkedIn ID if not set
      if (!user.linkedinId) {
        user.linkedinId = linkedinId;
        if (profilePicture) user.profilePicture = profilePicture;
        await user.save();
      }
    } else {
      // Create new user
      user = await User.create({
        name,
        email,
        linkedinId,
        profilePicture: profilePicture || 'https://via.placeholder.com/150',
        role: 'jobseeker',
        password: Math.random().toString(36).slice(-8), // Random password
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'your_jwt_secret_key',
      { expiresIn: '7d' }
    );

    res.status(200).json({
      status: 'success',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.error('LinkedIn Auth Error:', error);
    res.status(500).json({
      status: 'error',
      message: 'LinkedIn authentication failed',
      error: error.message,
    });
  }
};

module.exports = {
  linkedinAuth,
};
