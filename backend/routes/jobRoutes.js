const express = require('express');
const router = express.Router();
const {
  getJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  getEmployerJobs
} = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getJobs);
router.get('/employer/my-jobs', protect, authorize('employer', 'admin'), getEmployerJobs);
router.get('/:id', getJob);
router.post('/', protect, authorize('employer', 'admin'), createJob);
router.put('/:id', protect, authorize('employer', 'admin'), updateJob);
router.delete('/:id', protect, authorize('employer', 'admin'), deleteJob);

module.exports = router;
