// API Base URL
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Job Types
export const JOB_TYPES = [
  'Full-time',
  'Part-time',
  'Internship',
  'Remote',
  'Contract'
];

// Experience Levels
export const EXPERIENCE_LEVELS = [
  'Fresher',
  '0-1 years',
  '1-3 years',
  '3-5 years',
  '5-10 years',
  '10+ years'
];

// Application Status
export const APPLICATION_STATUS = {
  PENDING: 'pending',
  VIEWED: 'viewed',
  SHORTLISTED: 'shortlisted',
  REJECTED: 'rejected',
  HIRED: 'hired'
};

// User Roles
export const USER_ROLES = {
  JOB_SEEKER: 'jobseeker',
  EMPLOYER: 'employer',
  ADMIN: 'admin'
};

// Company Sizes
export const COMPANY_SIZES = [
  '1-10',
  '11-50',
  '51-200',
  '201-500',
  '500+'
];

// Industries
export const INDUSTRIES = [
  'Information Technology',
  'Software Development',
  'Finance',
  'Healthcare',
  'Education',
  'E-commerce',
  'Manufacturing',
  'Consulting',
  'Marketing',
  'Other'
];

// Salary Ranges
export const SALARY_RANGES = [
  { label: 'Under 3 LPA', min: 0, max: 300000 },
  { label: '3-5 LPA', min: 300000, max: 500000 },
  { label: '5-10 LPA', min: 500000, max: 1000000 },
  { label: '10-15 LPA', min: 1000000, max: 1500000 },
  { label: '15+ LPA', min: 1500000, max: 10000000 }
];

// Popular Skills
export const POPULAR_SKILLS = [
  'React',
  'Node.js',
  'JavaScript',
  'Python',
  'Java',
  'MongoDB',
  'SQL',
  'AWS',
  'Docker',
  'Git'
];
