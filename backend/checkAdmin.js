/**
 * Check if Admin User Exists
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const checkAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Find admin user
    const admin = await User.findOne({ email: 'admin@careerhub.com' });
    
    if (admin) {
      console.log('✅ Admin user found!');
      console.log('==========================================');
      console.log('ID:', admin._id);
      console.log('Name:', admin.name);
      console.log('Email:', admin.email);
      console.log('Role:', admin.role);
      console.log('Created:', admin.createdAt);
      console.log('==========================================');
      
      // Test password
      const testPassword = await admin.comparePassword('Admin@123');
      console.log('Password test:', testPassword ? '✅ Correct' : '❌ Wrong');
    } else {
      console.log('❌ Admin user not found!');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

checkAdmin();
