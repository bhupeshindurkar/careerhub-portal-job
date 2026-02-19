/**
 * Reset admin password
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const resetPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected\n');

    const email = 'admin@test.com';
    const newPassword = 'Admin@2024';
    
    const user = await User.findOne({ email });
    
    if (user) {
      user.password = newPassword;
      await user.save();
      
      console.log('✅ Password reset successful!');
      console.log('==========================================');
      console.log('Email:', email);
      console.log('New Password:', newPassword);
      console.log('Role:', user.role);
      console.log('==========================================\n');
    } else {
      console.log('❌ User not found!');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

resetPassword();
