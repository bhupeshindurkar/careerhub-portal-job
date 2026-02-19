const express = require('express');
const router = express.Router();
const { getDashboardStats, getAllUsersDetailed } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

// All routes require admin authentication
router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getDashboardStats);
router.get('/users', getAllUsersDetailed);

module.exports = router;
