/**
 * Seed Demo Users for Testing
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const demoUsers = [
  {
    name: 'Admin User',
    email: 'admin@careerhub.com',
    password: 'Admin@123',
    role: 'admin'
  },
  {
    name: 'Job Seeker Demo',
    email: 'jobseeker@test.com',
    password: 'test123',
    role: 'jobseeker',
    skills: ['JavaScript', 'React', 'Node.js']
  },
  {
    name: 'Employer Demo',
    email: 'employer@test.com',
    password: 'test123',
    role: 'employer',
    companyName: 'Tech Corp',
    industry: 'Information Technology'
  },
  {
    name: 'Admin Demo',
    email: 'admin@test.com',
    password: 'admin123',
    role: 'admin'
  }
];

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Delete existing demo users
    await User.deleteMany({ 
      email: { 
        $in: demoUsers.map(u => u.email) 
      } 
    });
    console.log('Existing demo users deleted');

    // Create demo users
    for (const userData of demoUsers) {
      const user = await User.create(userData);
      console.log(`✅ Created: ${user.email} (${user.role})`);
    }

    console.log('\n==========================================');
    console.log('✅ All demo users created successfully!');
    console.log('==========================================\n');
    
    console.log('Demo Credentials:');
    console.log('1. Admin: admin@careerhub.com / Admin@123');
    console.log('2. Job Seeker: jobseeker@test.com / test123');
    console.log('3. Employer: employer@test.com / test123');
    console.log('4. Admin Demo: admin@test.com / admin123');
    console.log('==========================================\n');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

seedUsers();
