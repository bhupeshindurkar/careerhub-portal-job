const Job = require('../models/Job');
const Application = require('../models/Application');

// @desc    Get all jobs with filters
// @route   GET /api/jobs
// @access  Public
exports.getJobs = async (req, res) => {
  try {
    const { 
      search, 
      jobType, 
      location, 
      experience, 
      minSalary, 
      maxSalary,
      skills,
      page = 1,
      limit = 10
    } = req.query;

    const query = { status: 'active' };

    // Search filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Job type filter
    if (jobType) {
      query.jobType = jobType;
    }

    // Location filter
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    // Experience filter
    if (experience) {
      query.experience = experience;
    }

    // Salary filter
    if (minSalary || maxSalary) {
      query['salary.min'] = { $gte: parseInt(minSalary) || 0 };
      query['salary.max'] = { $lte: parseInt(maxSalary) || 10000000 };
    }

    // Skills filter
    if (skills) {
      const skillsArray = skills.split(',');
      query.skillsRequired = { $in: skillsArray };
    }

    const jobs = await Job.find(query)
      .populate('company', 'name companyName companyLogo')
      .sort({ postedDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Job.countDocuments(query);

    res.json({
      status: 'success',
      jobs,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
exports.getJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('company', 'name companyName companyLogo companyDescription companyWebsite');

    if (!job) {
      return res.status(404).json({
        status: 'error',
        message: 'Job not found'
      });
    }

    // Increment views
    job.views += 1;
    await job.save();

    res.json({
      status: 'success',
      job
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Create job
// @route   POST /api/jobs
// @access  Private (Employer only)
exports.createJob = async (req, res) => {
  try {
    const jobData = {
      ...req.body,
      company: req.user.id
    };

    const job = await Job.create(jobData);

    res.status(201).json({
      status: 'success',
      job
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private (Employer only)
exports.updateJob = async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        status: 'error',
        message: 'Job not found'
      });
    }

    // Check ownership
    if (job.company.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to update this job'
      });
    }

    job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      status: 'success',
      job
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private (Employer only)
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        status: 'error',
        message: 'Job not found'
      });
    }

    // Check ownership
    if (job.company.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to delete this job'
      });
    }

    await job.deleteOne();

    res.json({
      status: 'success',
      message: 'Job deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get employer's jobs
// @route   GET /api/jobs/employer/my-jobs
// @access  Private (Employer only)
exports.getEmployerJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ company: req.user.id })
      .sort({ postedDate: -1 });

    res.json({
      status: 'success',
      count: jobs.length,
      jobs
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
