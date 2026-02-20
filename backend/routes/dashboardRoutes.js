const express = require('express');
const router = express.Router();
const { getJobSeekerDashboard } = require('../controllers/dashboardController');
const { protect, authorize } = require('../middleware/auth');

// Job Seeker dashboard
router.get('/jobseeker', protect, authorize('jobseeker'), getJobSeekerDashboard);

module.exports = router;
