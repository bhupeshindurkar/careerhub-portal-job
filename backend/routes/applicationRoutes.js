const express = require('express');
const router = express.Router();
const {
  applyJob,
  getUserApplications,
  getJobApplications,
  updateApplicationStatus,
  withdrawApplication
} = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, authorize('jobseeker'), applyJob);
router.get('/user', protect, authorize('jobseeker'), getUserApplications);
router.get('/job/:jobId', protect, authorize('employer', 'admin'), getJobApplications);
router.put('/:id', protect, authorize('employer', 'admin'), updateApplicationStatus);
router.delete('/:id', protect, authorize('jobseeker'), withdrawApplication);

module.exports = router;
