require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const testProfileUpdate = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    const email = 'bhupeshindurkar6@gmail.com';
    
    // Update profile with test data
    const user = await User.findOneAndUpdate(
      { email },
      {
        phone: '+91 9876543210',
        location: 'Mumbai, Maharashtra',
        profilePicture: 'https://ui-avatars.com/api/?name=Bhupesh+Indurkar&size=200&background=6366f1&color=fff&bold=true',
        resume: 'resume.pdf',
        skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express'],
        education: [{
          degree: 'Bachelor of Engineering',
          field: 'Computer Science',
          institution: 'Mumbai University',
          year: '2019-2023',
          grade: '8.5 CGPA'
        }],
        experience: [{
          title: 'Full Stack Developer',
          company: 'Tech Solutions',
          duration: '2023 - Present',
          description: 'Working on MERN stack projects'
        }]
      },
      { new: true }
    ).select('-password');

    if (user) {
      console.log('\n✅ Profile updated successfully!');
      console.log('\n--- Updated Profile ---');
      console.log('Name:', user.name);
      console.log('Email:', user.email);
      console.log('Phone:', user.phone);
      console.log('Location:', user.location);
      console.log('Skills:', user.skills);
      console.log('Education:', user.education.length, 'entries');
      console.log('Experience:', user.experience.length, 'entries');
      console.log('Resume:', user.resume);
      
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
    } else {
      console.log('❌ User not found!');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

testProfileUpdate();
