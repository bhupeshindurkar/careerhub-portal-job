const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private (Admin only)
exports.getDashboardStats = async (req, res) => {
  try {
    // Get counts
    const totalUsers = await User.countDocuments();
    const totalJobSeekers = await User.countDocuments({ role: 'jobseeker' });
    const totalEmployers = await User.countDocuments({ role: 'employer' });
    const totalJobs = await Job.countDocuments();
    const activeJobs = await Job.countDocuments({ status: 'active' });
    const totalApplications = await Application.countDocuments();
    
    // Get recent users (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentUsers = await User.countDocuments({ 
      createdAt: { $gte: sevenDaysAgo } 
    });
    
    // Get recent jobs
    const recentJobs = await Job.countDocuments({ 
      createdAt: { $gte: sevenDaysAgo } 
    });
    
    // Get latest users
    const latestUsers = await User.find()
      .select('name email role createdAt')
      .sort({ createdAt: -1 })
      .limit(10);
    
    // Get latest jobs
    const latestJobs = await Job.find()
      .populate('company', 'name email')
      .select('title company location salary createdAt')
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      status: 'success',
      stats: {
        totalUsers,
        totalJobSeekers,
        totalEmployers,
        totalJobs,
        activeJobs,
        totalApplications,
        recentUsers,
        recentJobs
      },
      latestUsers,
      latestJobs
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get all users with pagination
// @route   GET /api/admin/users
// @access  Private (Admin only)
exports.getAllUsersDetailed = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });
    
    res.json({
      status: 'success',
      users
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Get single user details
// @route   GET /api/admin/users/:id
// @access  Private (Admin only)
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });
    res.json({ status: 'success', user });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Update user by admin
// @route   PUT /api/admin/users/:id
// @access  Private (Admin only)
exports.updateUserByAdmin = async (req, res) => {
  try {
    const allowedFields = ['name', 'email', 'phone', 'location', 'bio', 'role',
      'skills', 'education', 'experience', 'linkedin', 'github', 'portfolio',
      'currentRole', 'companyName', 'industry'];
    
    const updates = {};
    Object.keys(req.body).forEach(key => {
      if (allowedFields.includes(key)) updates[key] = req.body[key];
    });

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
    if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });

    res.json({ status: 'success', user });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Delete user by admin
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin only)
exports.deleteUserByAdmin = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });
    res.json({ status: 'success', message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
