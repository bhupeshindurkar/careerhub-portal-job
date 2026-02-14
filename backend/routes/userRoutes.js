const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  uploadResume,
  toggleSaveJob,
  getSavedJobs,
  getAllUsers,
  deleteUser
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');
const { uploadResume: uploadMiddleware } = require('../middleware/upload');

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.post('/upload-resume', protect, uploadMiddleware.single('resume'), uploadResume);
router.post('/save-job/:jobId', protect, authorize('jobseeker'), toggleSaveJob);
router.get('/saved-jobs', protect, authorize('jobseeker'), getSavedJobs);
router.get('/', protect, authorize('admin'), getAllUsers);
router.delete('/:id', protect, authorize('admin'), deleteUser);

module.exports = router;
