require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const checkProfile = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    const email = 'bhupeshindurkar6@gmail.com';
    const user = await User.findOne({ email });

    if (!user) {
      console.log('❌ User not found!');
      process.exit(1);
    }

    console.log('\n==========================================');
    console.log('Profile Completion Check');
    console.log('==========================================\n');

    console.log('User:', user.name);
    console.log('Email:', user.email);
    console.log('\n--- Field Status ---');
    console.log('✓ Name:', user.name ? '✅' : '❌');
    console.log('✓ Email:', user.email ? '✅' : '❌');
    console.log('✓ Phone:', user.phone ? `✅ (${user.phone})` : '❌ Missing');
    console.log('✓ Location:', user.location ? `✅ (${user.location})` : '❌ Missing');
    console.log('✓ Profile Picture:', (user.profilePicture && user.profilePicture !== 'https://via.placeholder.com/150') ? `✅ (${user.profilePicture})` : '❌ Missing or default');
    console.log('✓ Resume:', user.resume ? `✅ (${user.resume})` : '❌ Missing');
    console.log('✓ Skills:', (user.skills && user.skills.length > 0) ? `✅ (${user.skills.length} skills)` : '❌ Missing');
    console.log('✓ Education:', (user.education && user.education.length > 0) ? `✅ (${user.education.length} entries)` : '❌ Missing');
    console.log('✓ Experience:', (user.experience && user.experience.length > 0) ? `✅ (${user.experience.length} entries)` : '❌ Missing');

    // Calculate completion
    let completed = 0;
    const total = 8;

    if (user.name) completed++;
    if (user.email) completed++;
    if (user.phone) completed++;
    if (user.location) completed++;
    if (user.profilePicture && user.profilePicture !== 'https://via.placeholder.com/150') completed++;
    if (user.resume) completed++;
    if (user.skills && user.skills.length > 0) completed++;
    if ((user.education && user.education.length > 0) || (user.experience && user.experience.length > 0)) completed++;

    const percentage = Math.round((completed / total) * 100);

    console.log('\n==========================================');
    console.log(`Profile Completion: ${completed}/${total} = ${percentage}%`);
    console.log('==========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

checkProfile();
