const jwt = require('jsonwebtoken');
const User = require('../models/User');
const axios = require('axios');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

// @desc    LinkedIn OAuth callback - exchange code for user data
// @route   POST /api/auth/linkedin/callback
// @access  Public
exports.linkedinCallback = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ status: 'error', message: 'Authorization code required' });

    const clientId = process.env.LINKEDIN_CLIENT_ID;
    const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
    const redirectUri = process.env.CLIENT_URL + '/auth/linkedin/callback';

    // Exchange code for access token
    const tokenRes = await axios.post('https://www.linkedin.com/oauth/v2/accessToken',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const { access_token } = tokenRes.data;

    // Get user profile
    const profileRes = await axios.get('https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~:playableStreams))', {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    // Get email
    const emailRes = await axios.get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    const profile = profileRes.data;
    const name = `${profile.localizedFirstName} ${profile.localizedLastName}`;
    const email = emailRes.data.elements?.[0]?.['handle~']?.emailAddress;
    const linkedinId = profile.id;
    const picture = profile.profilePicture?.['displayImage~']?.elements?.slice(-1)?.[0]?.identifiers?.[0]?.identifier || '';

    if (!email) return res.status(400).json({ status: 'error', message: 'Could not get email from LinkedIn' });

    // Find or create user
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name, email,
        password: `linkedin_${linkedinId}_${Date.now()}`,
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
      status: 'success', token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, profilePicture: user.profilePicture }
    });
  } catch (error) {
    console.error('LinkedIn OAuth Error:', error.response?.data || error.message);
    res.status(500).json({ status: 'error', message: 'LinkedIn authentication failed' });
  }
};

// Legacy
exports.linkedinAuth = async (req, res) => {
  try {
    const { email, name, linkedinId, profilePicture } = req.body;
    if (!email || !name) return res.status(400).json({ status: 'error', message: 'Missing required fields' });

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name, email,
        password: `linkedin_${linkedinId}_${Date.now()}`,
        profilePicture: profilePicture || '',
        isVerified: true, role: 'jobseeker'
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
