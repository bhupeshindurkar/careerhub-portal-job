const express = require('express');
const router = express.Router();
const { register, login, getMe, forgotPassword } = require('../controllers/authController');
const { googleAuth, googleCallback } = require('../controllers/googleAuthController');
const { linkedinAuth, linkedinCallback } = require('../controllers/linkedinAuthController');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleAuth);
router.post('/google/callback', googleCallback);
router.post('/linkedin', linkedinAuth);
router.post('/linkedin/callback', linkedinCallback);
router.get('/me', protect, getMe);
router.post('/forgot-password', forgotPassword);

module.exports = router;
