const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a job title'],
    trim: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: [true, 'Please provide job description']
  },
  requirements: {
    type: String,
    required: [true, 'Please provide job requirements']
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Internship', 'Remote', 'Contract'],
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  salary: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'INR'
    }
  },
  location: {
    type: String,
    required: [true, 'Please provide job location']
  },
  skillsRequired: [String],
  applications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application'
  }],
  postedDate: {
    type: Date,
    default: Date.now
  },
  deadline: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'closed', 'draft'],
    default: 'active'
  },
  views: {
    type: Number,
    default: 0
  },
  applicantsCount: {
    type: Number,
    default: 0
  },
  numberOfOpenings: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

// Index for search optimization
jobSchema.index({ title: 'text', description: 'text', location: 'text' });

module.exports = mongoose.model('Job', jobSchema);
