require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const checkUserProfile = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected\n');

    // Find user by email - get latest job seeker
    const email = process.argv[2]; // Pass email as argument
    
    if (!email) {
      console.log('Finding all job seekers...\n');
      const jobSeekers = await User.find({ role: 'jobseeker' }).select('name email phone location');
      console.log('Job Seeker Accounts:');
      jobSeekers.forEach((js, index) => {
        console.log(`${index + 1}. ${js.name} - ${js.email}`);
      });
      console.log('\nRun: node checkUserProfile.js <email>');
      process.exit(0);
    }
    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found!');
      process.exit(1);
    }

    console.log('='.repeat(60));
    console.log('USER PROFILE DETAILS');
    console.log('='.repeat(60));
    console.log(`Name: ${user.name || 'NOT SET'}`);
    console.log(`Email: ${user.email || 'NOT SET'}`);
    console.log(`Phone: ${user.phone || 'NOT SET'}`);
    console.log(`Location: ${user.location || 'NOT SET'}`);
    console.log(`Profile Picture: ${user.profilePicture || 'NOT SET'}`);
    console.log(`Resume: ${user.resume || 'NOT SET'}`);
    console.log(`Skills: ${user.skills && user.skills.length > 0 ? user.skills.join(', ') : 'NOT SET'}`);
    console.log(`Education: ${user.education && user.education.length > 0 ? user.education.length + ' entries' : 'NOT SET'}`);
    console.log(`Experience: ${user.experience && user.experience.length > 0 ? user.experience.length + ' entries' : 'NOT SET'}`);
    
    console.log('\n' + '='.repeat(60));
    console.log('PROFILE COMPLETION CALCULATION');
    console.log('='.repeat(60));
    
    let completed = 0;
    const total = 8;
    
    console.log(`1. Name: ${user.name ? '✓ YES' : '✗ NO'}`);
    if (user.name) completed++;
    
    console.log(`2. Email: ${user.email ? '✓ YES' : '✗ NO'}`);
    if (user.email) completed++;
    
    console.log(`3. Phone: ${user.phone ? '✓ YES' : '✗ NO'}`);
    if (user.phone) completed++;
    
    console.log(`4. Location: ${user.location ? '✓ YES' : '✗ NO'}`);
    if (user.location) completed++;
    
    console.log(`5. Profile Picture: ${user.profilePicture && user.profilePicture !== 'https://via.placeholder.com/150' ? '✓ YES' : '✗ NO'}`);
    if (user.profilePicture && user.profilePicture !== 'https://via.placeholder.com/150') completed++;
    
    console.log(`6. Resume: ${user.resume ? '✓ YES' : '✗ NO'}`);
    if (user.resume) completed++;
    
    console.log(`7. Skills: ${user.skills && user.skills.length > 0 ? '✓ YES' : '✗ NO'}`);
    if (user.skills && user.skills.length > 0) completed++;
    
    console.log(`8. Education OR Experience: ${(user.education && user.education.length > 0) || (user.experience && user.experience.length > 0) ? '✓ YES' : '✗ NO'}`);
    if ((user.education && user.education.length > 0) || (user.experience && user.experience.length > 0)) completed++;
    
    const percentage = Math.round((completed / total) * 100);
    
    console.log('\n' + '='.repeat(60));
    console.log(`COMPLETED: ${completed}/${total} fields`);
    console.log(`PERCENTAGE: ${percentage}%`);
    console.log('='.repeat(60));
    
    if (completed < total) {
      console.log('\nMISSING FIELDS:');
      if (!user.phone) console.log('- Phone Number');
      if (!user.location) console.log('- Location');
      if (!user.profilePicture || user.profilePicture === 'https://via.placeholder.com/150') console.log('- Profile Picture');
      if (!user.resume) console.log('- Resume');
      if (!user.skills || user.skills.length === 0) console.log('- Skills');
      if ((!user.education || user.education.length === 0) && (!user.experience || user.experience.length === 0)) {
        console.log('- Education or Experience');
      }
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkUserProfile();
