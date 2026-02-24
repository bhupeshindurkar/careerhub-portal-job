require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const createJobSeeker = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected\n');

    // Check if user already exists
    const existingUser = await User.findOne({ email: 'bhupesh.jobseeker@gmail.com' });
    
    if (existingUser) {
      console.log('Job seeker account already exists!');
      console.log('Email: bhupesh.jobseeker@gmail.com');
      console.log('Password: Bhupesh@123');
      process.exit(0);
    }

    // Create job seeker account with complete profile
    const jobSeeker = await User.create({
      name: 'Bhupesh Indurkar',
      email: 'bhupesh.jobseeker@gmail.com',
      password: 'Bhupesh@123',
      role: 'jobseeker',
      phone: '+91 9876543210',
      location: 'Nagpur, Maharashtra',
      profilePicture: 'https://ui-avatars.com/api/?name=Bhupesh+Indurkar&size=200&background=6366f1&color=fff&bold=true',
      resume: 'https://example.com/resume.pdf',
      skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express', 'HTML', 'CSS'],
      education: [
        {
          degree: 'Bachelor of Engineering in Computer Science',
          institute: 'RTMNU University',
          year: '2020-2024',
          percentage: '85%'
        }
      ],
      experience: [
        {
          company: 'Tech Solutions Pvt Ltd',
          role: 'Full Stack Developer',
          duration: '2024 - Present',
          description: 'Working on MERN stack projects, building scalable web applications'
        }
      ],
      isVerified: true
    });

    console.log('✅ Job Seeker Account Created Successfully!\n');
    console.log('='.repeat(60));
    console.log('LOGIN CREDENTIALS:');
    console.log('='.repeat(60));
    console.log('Email: bhupesh.jobseeker@gmail.com');
    console.log('Password: Bhupesh@123');
    console.log('Role: Job Seeker');
    console.log('='.repeat(60));
    console.log('\nProfile is 100% complete!');
    console.log('Login with these credentials to see 100% profile completion.');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createJobSeeker();
