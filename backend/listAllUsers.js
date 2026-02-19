/**
 * List all users in database
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const listUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
    console.log('Database:', process.env.MONGODB_URI.split('@')[1].split('/')[1].split('?')[0]);
    console.log('==========================================');

    const users = await User.find({}).select('+password');
    
    console.log(`Total users: ${users.length}`);
    console.log('==========================================');
    
    users.forEach((user, index) => {
      console.log(`\n${index + 1}. User:`);
      console.log('   ID:', user._id);
      console.log('   Name:', user.name);
      console.log('   Email:', user.email);
      console.log('   Role:', user.role);
      console.log('   Password Hash:', user.password.substring(0, 20) + '...');
      console.log('   Created:', user.createdAt);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

listUsers();
