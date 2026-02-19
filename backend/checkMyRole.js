/**
 * Check specific user role
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const checkRole = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected\n');

    const email = 'bhupeshindurkar6@gmail.com';
    const user = await User.findOne({ email });
    
    if (user) {
      console.log('✅ User found!');
      console.log('==========================================');
      console.log('ID:', user._id);
      console.log('Name:', user.name);
      console.log('Email:', user.email);
      console.log('Role:', user.role);
      console.log('Created:', user.createdAt);
      console.log('==========================================\n');
      
      if (user.role !== 'admin') {
        console.log('⚠️  Role is not admin. Updating...');
        user.role = 'admin';
        await user.save();
        console.log('✅ Role updated to admin!\n');
      } else {
        console.log('✅ Role is already admin!\n');
      }
    } else {
      console.log('❌ User not found!');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

checkRole();
