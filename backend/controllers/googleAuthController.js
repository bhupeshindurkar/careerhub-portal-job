const jwt = require('jsonwebtoken');
const User = require('../models/User');
const axios = require('axios');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

// @desc    Google OAuth - exchange code for user data
// @route   POST /api/auth/google/callback
// @access  Public
exports.googleCallback = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ status: 'error', message: 'Authorization code required' });

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = process.env.CLIENT_URL + '/auth/google/callback';

    // Exchange code for tokens
    const tokenRes = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    });

    const { access_token } = tokenRes.data;

    // Get user info from Google
    const userInfoRes = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    const { email, name, picture, id: googleId } = userInfoRes.data;

    // Find or create user
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        password: `google_${googleId}_${Date.now()}`,
        profilePicture: picture || '',
        isVerified: true,
        role: 'jobseeker'
      });
    } else if (picture && !user.profilePicture?.includes('cloudinary')) {
      user.profilePicture = picture;
      await user.save();
    }

    const token = generateToken(user._id);

    res.json({
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
  } catch (error) {
    console.error('Google OAuth Error:', error.response?.data || error.message);
    res.status(500).json({ status: 'error', message: 'Google authentication failed' });
  }
};

// @desc    Legacy - direct google auth with user data
// @route   POST /api/auth/google
// @access  Public
exports.googleAuth = async (req, res) => {
  try {
    const { email, name, googleId, profilePicture } = req.body;
    if (!email || !name) return res.status(400).json({ status: 'error', message: 'Missing required fields' });

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name, email,
        password: `google_${googleId}_${Date.now()}`,
        profilePicture: profilePicture || '',
        isVerified: true,
        role: 'jobseeker'
      });
    }

    const token = generateToken(user._id);
    res.json({
      status: 'success', token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, profilePicture: user.profilePicture }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
