const express = require('express');
const router = express.Router();
const { register, login, getMe, forgotPassword } = require('../controllers/authController');
const { googleAuth } = require('../controllers/googleAuthController');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleAuth);
router.get('/me', protect, getMe);
router.post('/forgot-password', forgotPassword);

module.exports = router;
