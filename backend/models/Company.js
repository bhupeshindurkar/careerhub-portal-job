const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  companyName: {
    type: String,
    required: [true, 'Please provide company name'],
    trim: true
  },
  companyLogo: {
    type: String,
    default: 'https://via.placeholder.com/200'
  },
  coverImage: {
    type: String,
    default: 'https://via.placeholder.com/1200x400'
  },
  industry: {
    type: String,
    required: true
  },
  companySize: {
    type: String,
    enum: ['1-10', '11-50', '51-200', '201-500', '500+'],
    required: true
  },
  website: {
    type: String,
    match: [/^https?:\/\/.+/, 'Please provide a valid URL']
  },
  description: {
    type: String,
    maxlength: 2000
  },
  culture: {
    type: String,
    maxlength: 1000
  },
  benefits: [String],
  socialLinks: {
    linkedin: String,
    twitter: String,
    facebook: String,
    instagram: String
  },
  location: {
    address: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending'
  },
  verificationNotes: String,
  foundedYear: Number,
  teamSize: Number,
  awards: [String],
}, {
  timestamps: true
});

module.exports = mongoose.model('Company', companySchema);
