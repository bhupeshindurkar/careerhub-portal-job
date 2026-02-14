/**
 * Test Server - Works WITHOUT MongoDB
 * Developed by: BHUPESH INDURKAR
 */

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// In-memory storage (temporary)
const users = [];
const jobs = [
  {
    _id: '1',
    title: 'Senior React Developer',
    company: { companyName: 'TCS', companyLogo: 'https://via.placeholder.com/100' },
    description: 'Looking for experienced React developer with strong JavaScript skills',
    requirements: 'React, Redux, JavaScript, TypeScript',
    jobType: 'Full-time',
    experience: '3-5 years',
    salary: { min: 800000, max: 1500000, currency: 'INR' },
    location: 'Mumbai, Maharashtra',
    skillsRequired: ['React', 'Redux', 'JavaScript', 'TypeScript'],
    postedDate: new Date(),
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    status: 'active',
    applicantsCount: 15,
    views: 320
  },
  {
    _id: '2',
    title: 'Full Stack Developer - MERN',
    company: { companyName: 'Infosys', companyLogo: 'https://via.placeholder.com/100' },
    description: 'Join our team as Full Stack Developer working on cutting-edge projects',
    requirements: 'MERN Stack, REST APIs, MongoDB',
    jobType: 'Full-time',
    experience: '2-4 years',
    salary: { min: 600000, max: 1200000, currency: 'INR' },
    location: 'Bangalore, Karnataka',
    skillsRequired: ['MongoDB', 'Express', 'React', 'Node.js'],
    postedDate: new Date(),
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    status: 'active',
    applicantsCount: 22,
    views: 450
  },
  {
    _id: '3',
    title: 'Frontend Developer',
    company: { companyName: 'Wipro', companyLogo: 'https://via.placeholder.com/100' },
    description: 'Create amazing user experiences with modern frontend technologies',
    requirements: 'HTML, CSS, JavaScript, React',
    jobType: 'Full-time',
    experience: '1-3 years',
    salary: { min: 400000, max: 800000, currency: 'INR' },
    location: 'Pune, Maharashtra',
    skillsRequired: ['HTML', 'CSS', 'JavaScript', 'React'],
    postedDate: new Date(),
    deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    status: 'active',
    applicantsCount: 18,
    views: 280
  },
  {
    _id: '4',
    title: 'Python Developer',
    company: { companyName: 'Tech Mahindra', companyLogo: 'https://via.placeholder.com/100' },
    description: 'Work on Python-based backend systems and APIs',
    requirements: 'Python, Django, Flask, REST APIs',
    jobType: 'Full-time',
    experience: '2-5 years',
    salary: { min: 700000, max: 1300000, currency: 'INR' },
    location: 'Pune, Maharashtra',
    skillsRequired: ['Python', 'Django', 'Flask', 'PostgreSQL'],
    postedDate: new Date(),
    deadline: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000),
    status: 'active',
    applicantsCount: 12,
    views: 210
  },
  {
    _id: '5',
    title: 'Java Backend Developer',
    company: { companyName: 'HCL', companyLogo: 'https://via.placeholder.com/100' },
    description: 'Develop robust backend systems using Java and Spring Boot',
    requirements: 'Java, Spring Boot, Microservices, MySQL',
    jobType: 'Full-time',
    experience: '3-6 years',
    salary: { min: 900000, max: 1600000, currency: 'INR' },
    location: 'Noida, Uttar Pradesh',
    skillsRequired: ['Java', 'Spring Boot', 'Microservices', 'MySQL'],
    postedDate: new Date(),
    deadline: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
    status: 'active',
    applicantsCount: 25,
    views: 380
  },
  {
    _id: '6',
    title: 'Data Analyst',
    company: { companyName: 'Accenture', companyLogo: 'https://via.placeholder.com/100' },
    description: 'Analyze data and provide insights for business decisions',
    requirements: 'SQL, Python, Excel, Power BI',
    jobType: 'Full-time',
    experience: '1-3 years',
    salary: { min: 500000, max: 900000, currency: 'INR' },
    location: 'Bangalore, Karnataka',
    skillsRequired: ['SQL', 'Python', 'Excel', 'Power BI'],
    postedDate: new Date(),
    deadline: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000),
    status: 'active',
    applicantsCount: 30,
    views: 520
  },
  {
    _id: '7',
    title: 'DevOps Engineer',
    company: { companyName: 'Persistent Systems', companyLogo: 'https://via.placeholder.com/100' },
    description: 'Manage cloud infrastructure and CI/CD pipelines',
    requirements: 'AWS, Docker, Kubernetes, Jenkins',
    jobType: 'Full-time',
    experience: '3-5 years',
    salary: { min: 1000000, max: 1800000, currency: 'INR' },
    location: 'Pune, Maharashtra',
    skillsRequired: ['AWS', 'Docker', 'Kubernetes', 'Jenkins'],
    postedDate: new Date(),
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    status: 'active',
    applicantsCount: 8,
    views: 150
  },
  {
    _id: '8',
    title: 'UI/UX Designer',
    company: { companyName: 'Cybage', companyLogo: 'https://via.placeholder.com/100' },
    description: 'Design beautiful and intuitive user interfaces',
    requirements: 'Figma, Adobe XD, Sketch, User Research',
    jobType: 'Full-time',
    experience: '2-4 years',
    salary: { min: 600000, max: 1100000, currency: 'INR' },
    location: 'Nagpur, Maharashtra',
    skillsRequired: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
    postedDate: new Date(),
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    status: 'active',
    applicantsCount: 14,
    views: 240
  },
  {
    _id: '9',
    title: 'Mobile App Developer - React Native',
    company: { companyName: 'Bitwise', companyLogo: 'https://via.placeholder.com/100' },
    description: 'Build cross-platform mobile applications',
    requirements: 'React Native, JavaScript, iOS, Android',
    jobType: 'Full-time',
    experience: '2-4 years',
    salary: { min: 700000, max: 1300000, currency: 'INR' },
    location: 'Nagpur, Maharashtra',
    skillsRequired: ['React Native', 'JavaScript', 'Redux', 'Firebase'],
    postedDate: new Date(),
    deadline: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000),
    status: 'active',
    applicantsCount: 10,
    views: 190
  },
  {
    _id: '10',
    title: 'Machine Learning Engineer',
    company: { companyName: 'LTI Mindtree', companyLogo: 'https://via.placeholder.com/100' },
    description: 'Develop ML models and AI solutions',
    requirements: 'Python, TensorFlow, PyTorch, Machine Learning',
    jobType: 'Full-time',
    experience: '3-5 years',
    salary: { min: 1200000, max: 2000000, currency: 'INR' },
    location: 'Bangalore, Karnataka',
    skillsRequired: ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning'],
    postedDate: new Date(),
    deadline: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
    status: 'active',
    applicantsCount: 6,
    views: 130
  },
  {
    _id: '11',
    title: 'Software Engineer - Fresher',
    company: { companyName: 'Codeprism', companyLogo: 'https://via.placeholder.com/100' },
    description: 'Great opportunity for freshers to start their career',
    requirements: 'Any programming language, Good problem solving',
    jobType: 'Full-time',
    experience: '0-1 years',
    salary: { min: 300000, max: 500000, currency: 'INR' },
    location: 'Nagpur, Maharashtra',
    skillsRequired: ['Java', 'Python', 'JavaScript', 'Problem Solving'],
    postedDate: new Date(),
    deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    status: 'active',
    applicantsCount: 45,
    views: 680
  },
  {
    _id: '12',
    title: 'Cloud Architect',
    company: { companyName: 'Trigent Software', companyLogo: 'https://via.placeholder.com/100' },
    description: 'Design and implement cloud solutions',
    requirements: 'AWS, Azure, Cloud Architecture, Microservices',
    jobType: 'Full-time',
    experience: '5-8 years',
    salary: { min: 1500000, max: 2500000, currency: 'INR' },
    location: 'Nagpur, Maharashtra',
    skillsRequired: ['AWS', 'Azure', 'Cloud Architecture', 'Terraform'],
    postedDate: new Date(),
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    status: 'active',
    applicantsCount: 4,
    views: 95
  },
  {
    _id: '13',
    title: 'QA Automation Engineer',
    company: { companyName: 'Softenger', companyLogo: 'https://via.placeholder.com/100' },
    description: 'Automate testing processes and ensure quality',
    requirements: 'Selenium, Java, TestNG, Automation',
    jobType: 'Full-time',
    experience: '2-4 years',
    salary: { min: 600000, max: 1000000, currency: 'INR' },
    location: 'Nagpur, Maharashtra',
    skillsRequired: ['Selenium', 'Java', 'TestNG', 'Automation'],
    postedDate: new Date(),
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    status: 'active',
    applicantsCount: 16,
    views: 270
  },
  {
    _id: '14',
    title: 'Business Analyst',
    company: { companyName: 'Quadrant Technologies', companyLogo: 'https://via.placeholder.com/100' },
    description: 'Bridge the gap between business and technology',
    requirements: 'Business Analysis, SQL, Agile, Documentation',
    jobType: 'Full-time',
    experience: '2-5 years',
    salary: { min: 700000, max: 1200000, currency: 'INR' },
    location: 'Nagpur, Maharashtra',
    skillsRequired: ['Business Analysis', 'SQL', 'Agile', 'JIRA'],
    postedDate: new Date(),
    deadline: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000),
    status: 'active',
    applicantsCount: 11,
    views: 200
  },
  {
    _id: '15',
    title: 'Angular Developer',
    company: { companyName: 'TCS', companyLogo: 'https://via.placeholder.com/100' },
    description: 'Build enterprise applications using Angular',
    requirements: 'Angular, TypeScript, RxJS, REST APIs',
    jobType: 'Full-time',
    experience: '2-4 years',
    salary: { min: 700000, max: 1200000, currency: 'INR' },
    location: 'Mumbai, Maharashtra',
    skillsRequired: ['Angular', 'TypeScript', 'RxJS', 'HTML', 'CSS'],
    postedDate: new Date(),
    deadline: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
    status: 'active',
    applicantsCount: 19,
    views: 310
  }
];

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, 'test_secret_key', { expiresIn: '7d' });
};

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'success', 
    message: 'Test Server Running (No MongoDB)',
    developer: 'BHUPESH INDURKAR'
  });
});

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role, companyName } = req.body;

    // Check if user exists
    const userExists = users.find(u => u.email === email);
    if (userExists) {
      return res.status(400).json({ status: 'error', message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      role: role || 'jobseeker',
      companyName: companyName || '',
      profilePicture: 'https://via.placeholder.com/150'
    };

    users.push(user);

    const token = generateToken(user.id);

    res.status(201).json({
      status: 'success',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
    }

    const token = generateToken(user.id);

    res.json({
      status: 'success',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture
      }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// In-memory OTP storage
const otpStorage = new Map();

// Forgot Password - Send OTP
app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ status: 'error', message: 'Email is required' });
    }

    // Check if user exists
    const user = users.find(u => u.email === email);
    if (!user) {
      // For security, don't reveal if email exists
      return res.json({ 
        status: 'success', 
        message: 'If the email exists, an OTP has been sent' 
      });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP with expiry (10 minutes)
    otpStorage.set(email, {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000,
      attempts: 0
    });

    // Send OTP email (simulated - will show in console)
    console.log('\n' + '='.repeat(60));
    console.log('📧 OTP EMAIL SENT');
    console.log('='.repeat(60));
    console.log(`To: ${email}`);
    console.log(`Name: ${user.name}`);
    console.log(`OTP Code: ${otp}`);
    console.log(`Valid for: 10 minutes`);
    console.log(`Time: ${new Date().toLocaleString()}`);
    console.log('='.repeat(60) + '\n');

    // In production, use nodemailer to send actual email
    // const emailService = require('./utils/emailService');
    // await emailService.sendEmail(emailService.sendOTPEmail(email, otp, user.name));

    res.json({
      status: 'success',
      message: 'OTP sent to your email',
      // For demo purposes, include OTP in response (remove in production)
      demo: {
        otp,
        note: 'In production, OTP will only be sent via email'
      }
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to send OTP' });
  }
});

// Verify OTP
app.post('/api/auth/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ status: 'error', message: 'Email and OTP are required' });
    }

    const otpData = otpStorage.get(email);

    if (!otpData) {
      return res.status(400).json({ status: 'error', message: 'OTP not found or expired' });
    }

    // Check if OTP expired
    if (Date.now() > otpData.expiresAt) {
      otpStorage.delete(email);
      return res.status(400).json({ status: 'error', message: 'OTP has expired' });
    }

    // Check attempts
    if (otpData.attempts >= 3) {
      otpStorage.delete(email);
      return res.status(400).json({ status: 'error', message: 'Too many failed attempts' });
    }

    // Verify OTP
    if (otpData.otp !== otp) {
      otpData.attempts++;
      return res.status(400).json({ 
        status: 'error', 
        message: 'Invalid OTP',
        attemptsLeft: 3 - otpData.attempts
      });
    }

    // OTP verified successfully
    otpStorage.delete(email);

    res.json({
      status: 'success',
      message: 'OTP verified successfully'
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to verify OTP' });
  }
});

// Reset Password
app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ status: 'error', message: 'Email and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ status: 'error', message: 'Password must be at least 6 characters' });
    }

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    user.password = hashedPassword;

    console.log('\n' + '='.repeat(60));
    console.log('🔒 PASSWORD RESET SUCCESSFUL');
    console.log('='.repeat(60));
    console.log(`Email: ${email}`);
    console.log(`Time: ${new Date().toLocaleString()}`);
    console.log('='.repeat(60) + '\n');

    res.json({
      status: 'success',
      message: 'Password reset successfully'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ status: 'error', message: 'Failed to reset password' });
  }
});


// LinkedIn OAuth
app.post('/api/auth/linkedin', async (req, res) => {
  try {
    const { email, name, linkedinId, profilePicture } = req.body;

    if (!email || !name) {
      return res.status(400).json({ status: 'error', message: 'Missing required data' });
    }

    // Check if user exists
    let user = users.find(u => u.email === email);

    if (!user) {
      // Create new user
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(Math.random().toString(36).slice(-8), salt);

      user = {
        id: Date.now().toString(),
        name,
        email,
        password: hashedPassword,
        linkedinId: linkedinId || '',
        profilePicture: profilePicture || 'https://via.placeholder.com/150',
        role: 'jobseeker'
      };

      users.push(user);
    }

    const token = generateToken(user.id);

    res.status(200).json({
      status: 'success',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture
      }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Get all jobs with search functionality
app.get('/api/jobs', (req, res) => {
  const { search, company, jobType, location } = req.query;
  
  let filteredJobs = [...jobs];
  
  // Search by job title or keywords
  if (search) {
    const searchLower = search.toLowerCase();
    filteredJobs = filteredJobs.filter(job => 
      job.title.toLowerCase().includes(searchLower) ||
      job.description.toLowerCase().includes(searchLower) ||
      job.skillsRequired.some(skill => skill.toLowerCase().includes(searchLower))
    );
  }
  
  // Filter by company name
  if (company) {
    const companyLower = company.toLowerCase();
    filteredJobs = filteredJobs.filter(job => 
      job.company.companyName.toLowerCase().includes(companyLower)
    );
  }
  
  // Filter by job type
  if (jobType) {
    filteredJobs = filteredJobs.filter(job => job.jobType === jobType);
  }
  
  // Filter by location
  if (location) {
    const locationLower = location.toLowerCase();
    filteredJobs = filteredJobs.filter(job => 
      job.location.toLowerCase().includes(locationLower)
    );
  }
  
  res.json({
    status: 'success',
    jobs: filteredJobs,
    totalPages: 1,
    currentPage: 1,
    total: filteredJobs.length
  });
});

// Get single job
app.get('/api/jobs/:id', (req, res) => {
  const job = jobs.find(j => j._id === req.params.id);
  if (!job) {
    return res.status(404).json({ status: 'error', message: 'Job not found' });
  }
  res.json({ status: 'success', job });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════════════════════╗
  ║                                                       ║
  ║           CareerHub Pro - TEST SERVER                ║
  ║           (Works WITHOUT MongoDB)                    ║
  ║                                                       ║
  ║   Developed by: BHUPESH INDURKAR                     ║
  ║   Full Stack Developer                               ║
  ║                                                       ║
  ║   Server running on port: ${PORT}                       ║
  ║   Status: ✅ READY TO TEST                           ║
  ║                                                       ║
  ╚═══════════════════════════════════════════════════════╝
  `);
});
