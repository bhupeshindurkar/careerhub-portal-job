const User = require('../models/User');
const Application = require('../models/Application');
const Job = require('../models/Job');

// Calculate profile completion percentage
const calculateProfileCompletion = (user) => {
  const fields = [
    { key: 'name', check: () => !!user.name },
    { key: 'email', check: () => !!user.email },
    { key: 'phone', check: () => !!user.phone },
    { key: 'location', check: () => !!user.location },
    { key: 'bio', check: () => !!user.bio && user.bio.trim().length > 0 },
    { key: 'currentRole', check: () => !!user.currentRole && user.currentRole.trim().length > 0 },
    { key: 'profilePicture', check: () => !!user.profilePicture && !user.profilePicture.includes('placeholder') && !user.profilePicture.includes('via.placeholder') },
    { key: 'resume', check: () => !!user.resume },
    { key: 'skills', check: () => user.skills && user.skills.length > 0 },
    { key: 'educationOrExperience', check: () => (user.education && user.education.length > 0) || (user.experience && user.experience.length > 0) },
  ];

  const completed = fields.filter(f => f.check()).length;
  const total = fields.length;
  const percentage = Math.round((completed / total) * 100);

  return { percentage, completed, total, missing: getMissingFields(user) };
};

// Get list of missing fields
const getMissingFields = (user) => {
  const missing = [];
  if (!user.phone) missing.push('Phone Number');
  if (!user.location) missing.push('Location');
  if (!user.bio || !user.bio.trim()) missing.push('Bio');
  if (!user.currentRole || !user.currentRole.trim()) missing.push('Current Role');
  if (!user.profilePicture || user.profilePicture.includes('placeholder') || user.profilePicture.includes('via.placeholder')) missing.push('Profile Picture');
  if (!user.resume) missing.push('Resume');
  if (!user.skills || user.skills.length === 0) missing.push('Skills');
  if ((!user.education || user.education.length === 0) && (!user.experience || user.experience.length === 0)) missing.push('Education or Experience');
  return missing;
};

// @desc    Get job seeker dashboard stats
// @route   GET /api/dashboard/jobseeker
// @access  Private (Job Seeker)
exports.getJobSeekerDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user with all details
    const user = await User.findById(userId);

    // Calculate profile completion
    const profileCompletion = calculateProfileCompletion(user);

    // Get applications count
    const totalApplications = await Application.countDocuments({ user: userId });
    const pendingApplications = await Application.countDocuments({ 
      user: userId, 
      status: 'pending' 
    });

    // Get saved jobs count
    const savedJobsCount = user.savedJobs ? user.savedJobs.length : 0;

    // Get interviews count (shortlisted applications)
    const interviewsCount = await Application.countDocuments({ 
      user: userId, 
      status: 'shortlisted' 
    });

    // Get recent applications with job details
    const recentApplications = await Application.find({ user: userId })
      .populate('job', 'title company location')
      .sort({ createdAt: -1 })
      .limit(5);

    // Get saved jobs details
    const savedJobs = await Job.find({ _id: { $in: user.savedJobs || [] } })
      .select('title company location salary')
      .limit(5);

    res.json({
      status: 'success',
      data: {
        profileCompletion,
        stats: {
          totalApplications,
          pendingApplications,
          savedJobsCount,
          interviewsCount
        },
        recentApplications,
        savedJobs
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
