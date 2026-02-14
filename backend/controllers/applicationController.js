const Application = require('../models/Application');
const Job = require('../models/Job');
const { sendEmail } = require('../utils/emailService');

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Private (Job Seeker only)
exports.applyJob = async (req, res) => {
  try {
    const { jobId, coverLetter, resume } = req.body;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        status: 'error',
        message: 'Job not found'
      });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: req.user.id
    });

    if (existingApplication) {
      return res.status(400).json({
        status: 'error',
        message: 'You have already applied for this job'
      });
    }

    // Calculate match score (simplified)
    const matchScore = calculateMatchScore(req.user.skills, job.skillsRequired);

    const application = await Application.create({
      job: jobId,
      applicant: req.user.id,
      coverLetter,
      resume: resume || req.user.resume,
      matchScore
    });

    // Update job applicants count
    job.applicantsCount += 1;
    job.applications.push(application._id);
    await job.save();

    // Send confirmation email
    await sendEmail({
      to: req.user.email,
      subject: 'Application Submitted Successfully',
      text: `Your application for ${job.title} has been submitted successfully.`
    });

    res.status(201).json({
      status: 'success',
      application
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get user's applications
// @route   GET /api/applications/user
// @access  Private (Job Seeker only)
exports.getUserApplications = async (req, res) => {
  try {
    const { status } = req.query;
    
    const query = { applicant: req.user.id };
    if (status) {
      query.status = status;
    }

    const applications = await Application.find(query)
      .populate('job', 'title company location salary jobType')
      .populate({
        path: 'job',
        populate: {
          path: 'company',
          select: 'companyName companyLogo'
        }
      })
      .sort({ appliedDate: -1 });

    res.json({
      status: 'success',
      count: applications.length,
      applications
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Get applications for a job
// @route   GET /api/applications/job/:jobId
// @access  Private (Employer only)
exports.getJobApplications = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({
        status: 'error',
        message: 'Job not found'
      });
    }

    // Check if user is the job owner
    if (job.company.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to view these applications'
      });
    }

    const applications = await Application.find({ job: req.params.jobId })
      .populate('applicant', 'name email phone skills education experience resume profilePicture')
      .sort({ matchScore: -1, appliedDate: -1 });

    res.json({
      status: 'success',
      count: applications.length,
      applications
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Update application status
// @route   PUT /api/applications/:id
// @access  Private (Employer only)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status, interviewDate, interviewLink, notes } = req.body;

    const application = await Application.findById(req.params.id)
      .populate('job')
      .populate('applicant', 'email name');

    if (!application) {
      return res.status(404).json({
        status: 'error',
        message: 'Application not found'
      });
    }

    // Check authorization
    if (application.job.company.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to update this application'
      });
    }

    application.status = status || application.status;
    application.interviewDate = interviewDate || application.interviewDate;
    application.interviewLink = interviewLink || application.interviewLink;
    application.notes = notes || application.notes;

    await application.save();

    // Send notification email
    const statusMessages = {
      viewed: 'Your application has been viewed',
      shortlisted: 'Congratulations! You have been shortlisted',
      rejected: 'Thank you for your application',
      hired: 'Congratulations! You have been selected'
    };

    await sendEmail({
      to: application.applicant.email,
      subject: `Application Status Update - ${application.job.title}`,
      text: `${statusMessages[status]}. ${interviewDate ? `Interview scheduled on ${interviewDate}` : ''}`
    });

    res.json({
      status: 'success',
      application
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// @desc    Withdraw application
// @route   DELETE /api/applications/:id
// @access  Private (Job Seeker only)
exports.withdrawApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        status: 'error',
        message: 'Application not found'
      });
    }

    // Check if user owns the application
    if (application.applicant.toString() !== req.user.id) {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to withdraw this application'
      });
    }

    await application.deleteOne();

    // Update job applicants count
    await Job.findByIdAndUpdate(application.job, {
      $inc: { applicantsCount: -1 },
      $pull: { applications: application._id }
    });

    res.json({
      status: 'success',
      message: 'Application withdrawn successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// Helper function to calculate match score
function calculateMatchScore(userSkills, requiredSkills) {
  if (!userSkills || !requiredSkills || requiredSkills.length === 0) {
    return 50;
  }

  const matchedSkills = userSkills.filter(skill => 
    requiredSkills.some(req => req.toLowerCase() === skill.toLowerCase())
  );

  return Math.round((matchedSkills.length / requiredSkills.length) * 100);
}
