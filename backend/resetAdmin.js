/**
 * Reset Admin User - Delete and Recreate
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const resetAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Delete existing admin
    await User.deleteOne({ email: 'admin@careerhub.com' });
    console.log('Old admin deleted (if existed)');

    // Create fresh admin user
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
    
    // Test the password immediately
    const testPassword = await admin.comparePassword('Admin@123');
    console.log('Password verification:', testPassword ? '✅ Working' : '❌ Failed');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

resetAdmin();
