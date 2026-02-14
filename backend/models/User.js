const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['jobseeker', 'employer', 'admin'],
    default: 'jobseeker'
  },
  profilePicture: {
    type: String,
    default: 'https://via.placeholder.com/150'
  },
  phone: String,
  location: String,
  isVerified: {
    type: Boolean,
    default: false
  },
  
  // Job Seeker specific fields
  skills: [String],
  resume: String,
  education: [{
    degree: String,
    institute: String,
    year: String,
    percentage: String
  }],
  experience: [{
    company: String,
    role: String,
    duration: String,
    description: String
  }],
  savedJobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  }],
  
  // Employer specific fields
  companyName: String,
  industry: String,
  companySize: String,
  companyWebsite: String,
  companyDescription: String,
  companyLogo: String,
  
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
