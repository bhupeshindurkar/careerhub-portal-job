const express = require('express');
const router = express.Router();
const { getDashboardStats, getAllUsersDetailed, getUserById, updateUserByAdmin, deleteUserByAdmin } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

// All routes require admin authentication
router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getDashboardStats);
router.get('/users', getAllUsersDetailed);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUserByAdmin);
router.delete('/users/:id', deleteUserByAdmin);

module.exports = router;
