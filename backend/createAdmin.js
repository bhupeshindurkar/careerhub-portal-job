/**
 * Create Admin User Script
 * Run this once to create admin account
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@careerhub.com' });
    
    if (adminExists) {
      console.log('Admin user already exists!');
      console.log('Email: admin@careerhub.com');
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@careerhub.com',
      password: 'Admin@123',
      role: 'admin'
    });

    console.log('✅ Admin user created successfully!');
    console.log('==========================================');
    console.log('Email: admin@careerhub.com');
    console.log('Password: Admin@123');
    console.log('==========================================');
    console.log('⚠️  Please change the password after first login!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

createAdmin();
