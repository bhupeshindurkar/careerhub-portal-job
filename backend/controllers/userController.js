const User = require('../models/User');
const Job = require('../models/Job');
const cloudinary = require('../config/cloudinary');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    res.json({
      status: 'success',
      user
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const allowedFields = [
      'name', 'phone', 'location', 'bio', 'skills', 'education', 
      'experience', 'resume', 'companyName', 'industry', 'companySize',
      'companyWebsite', 'companyDescription', 'profilePicture', 'linkedin',
      'github', 'portfolio', 'currentRole'
    ];

    const updates = {};
    Object.keys(req.body).forEach(key => {
      if (allowedFields.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    // If profilePicture is base64, upload to Cloudinary
    if (updates.profilePicture && updates.profilePicture.startsWith('data:image')) {
      try {
        const uploadResult = await cloudinary.uploader.upload(updates.profilePicture, {
          folder: 'careerhub/profiles',
          transformation: [
            { width: 400, height: 400, crop: 'fill' },
            { quality: 'auto' }
          ]
        });
        updates.profilePicture = uploadResult.secure_url;
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        // If upload fails, keep the old picture
        delete updates.profilePicture;
      }
    }

    // If resume is base64 (PDF/DOC), upload to Cloudinary
    if (updates.resume && updates.resume.startsWith('data:application')) {
      try {
        const uploadResult = await cloudinary.uploader.upload(updates.resume, {
          folder: 'careerhub/resumes',
          resource_type: 'raw', // For non-image files
          format: 'pdf'
        });
        updates.resume = uploadResult.secure_url;
      } catch (uploadError) {
        console.error('Cloudinary resume upload error:', uploadError);
        // If upload fails, keep the old resume
        delete updates.resume;
      }
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      status: 'success',
      user
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Upload resume
// @route   POST /api/users/upload-resume
// @access  Private
exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'Please upload a file'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { resume: req.file.path },
      { new: true }
    ).select('-password');

    res.json({
      status: 'success',
      message: 'Resume uploaded successfully',
      resumePath: req.file.path,
      user
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Save/Unsave job
// @route   POST /api/users/save-job/:jobId
// @access  Private (Job Seeker only)
exports.toggleSaveJob = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const jobId = req.params.jobId;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        status: 'error',
        message: 'Job not found'
      });
    }

    const jobIndex = user.savedJobs.indexOf(jobId);

    if (jobIndex > -1) {
      // Unsave job
      user.savedJobs.splice(jobIndex, 1);
      await user.save();
      
      return res.json({
        status: 'success',
        message: 'Job removed from saved jobs',
        saved: false
      });
    } else {
      // Save job
      user.savedJobs.push(jobId);
      await user.save();
      
      return res.json({
        status: 'success',
        message: 'Job saved successfully',
        saved: true
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get saved jobs
// @route   GET /api/users/saved-jobs
// @access  Private (Job Seeker only)
exports.getSavedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: 'savedJobs',
        populate: {
          path: 'company',
          select: 'companyName companyLogo'
        }
      });

    res.json({
      status: 'success',
      count: user.savedJobs.length,
      jobs: user.savedJobs
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Proxy image URL to base64 (for PDF generation)
// @route   GET /api/users/image-proxy?url=...
// @access  Public
exports.imageProxy = async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ message: 'URL required' });

    // Only allow cloudinary or known image hosts
    const allowedHosts = ['cloudinary.com', 'res.cloudinary.com'];
    let parsedHost = '';
    try { parsedHost = new URL(url).hostname; } catch { return res.status(400).json({ message: 'Invalid URL' }); }
    if (!allowedHosts.some(h => parsedHost.includes(h))) {
      return res.status(403).json({ message: 'Host not allowed' });
    }

    const https = require('https');
    const http = require('http');
    const client = url.startsWith('https') ? https : http;

    const request = client.get(url, (imgRes) => {
      if (imgRes.statusCode !== 200) {
        return res.status(502).json({ message: 'Failed to fetch image' });
      }
      const chunks = [];
      imgRes.on('data', chunk => chunks.push(chunk));
      imgRes.on('end', () => {
        const buffer = Buffer.concat(chunks);
        const base64 = buffer.toString('base64');
        const contentType = imgRes.headers['content-type'] || 'image/jpeg';
        res.setHeader('Cache-Control', 'public, max-age=3600');
        res.json({ base64: `data:${contentType};base64,${base64}` });
      });
    });
    request.on('error', () => res.status(500).json({ message: 'Failed to fetch image' }));
    request.setTimeout(10000, () => { request.destroy(); res.status(504).json({ message: 'Timeout' }); });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const { role, search } = req.query;
    
    const query = {};
    if (role) query.role = role;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await User.find(query).select('-password');

    res.json({
      status: 'success',
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Delete user (Admin only)
// @route   DELETE /api/users/:id
// @access  Private (Admin only)
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    await user.deleteOne();

    res.json({
      status: 'success',
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
