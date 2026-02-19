/**
 * Make user admin by email
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const makeAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected\n');

    // List all users first
    const allUsers = await User.find({});
    console.log(`Total users in database: ${allUsers.length}\n`);
    
    allUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.email} - ${user.role}`);
    });
    
    console.log('\n==========================================');
    console.log('Making latest user admin...');
    console.log('==========================================\n');
    
    // Get the latest user (most recently created)
    const latestUser = await User.findOne().sort({ createdAt: -1 });
    
    if (latestUser) {
      console.log('Latest user found:');
      console.log('Email:', latestUser.email);
      console.log('Current Role:', latestUser.role);
      
      latestUser.role = 'admin';
      await latestUser.save();
      
      console.log('\n✅ User updated to admin!');
      console.log('==========================================');
      console.log('Email:', latestUser.email);
      console.log('New Role:', latestUser.role);
      console.log('==========================================\n');
      console.log('⚠️  Please logout and login again to see admin access!');
    } else {
      console.log('❌ No users found!');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

makeAdmin();
