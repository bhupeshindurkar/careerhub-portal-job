/**
 * Seed Sample Jobs for Testing
 * Developed by: BHUPESH INDURKAR
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('./models/Job');
const User = require('./models/User');

dotenv.config();

// Sample Indian Companies Jobs
const sampleJobs = [
  {
    title: 'Senior React Developer',
    description: 'We are looking for an experienced React developer to join our team. You will be responsible for developing and maintaining web applications using React.js and related technologies.',
    requirements: 'Strong knowledge of React.js, Redux, JavaScript ES6+, HTML5, CSS3. Experience with RESTful APIs and Git.',
    jobType: 'Full-time',
    experience: '3-5 years',
    salary: { min: 800000, max: 1500000, currency: 'INR' },
    location: 'Mumbai, Maharashtra',
    skillsRequired: ['React', 'Redux', 'JavaScript', 'HTML', 'CSS'],
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    status: 'active',
    numberOfOpenings: 2
  },
  {
    title: 'Full Stack Developer - MERN',
    description: 'Join our dynamic team as a Full Stack Developer. Work on exciting projects using MongoDB, Express, React, and Node.js.',
    requirements: 'Experience with MERN stack, RESTful APIs, Git, and Agile methodologies. Good problem-solving skills.',
    jobType: 'Full-time',
    experience: '2-4 years',
    salary: { min: 600000, max: 1200000, currency: 'INR' },
    location: 'Bangalore, Karnataka',
    skillsRequired: ['MongoDB', 'Express', 'React', 'Node.js', 'JavaScript'],
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    status: 'active',
    numberOfOpenings: 3
  },
  {
    title: 'Frontend Developer',
    description: 'Looking for a talented Frontend Developer to create amazing user experiences. Work with modern frameworks and tools.',
    requirements: 'Proficiency in HTML, CSS, JavaScript, React or Vue.js. Understanding of responsive design and cross-browser compatibility.',
    jobType: 'Full-time',
    experience: '1-3 years',
    salary: { min: 400000, max: 800000, currency: 'INR' },
    location: 'Pune, Maharashtra',
    skillsRequired: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'],
    deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    status: 'active',
    numberOfOpenings: 2
  },
  {
    title: 'Node.js Backend Developer',
    description: 'We need a skilled Backend Developer to build scalable server-side applications using Node.js and Express.',
    requirements: 'Strong experience with Node.js, Express, MongoDB/PostgreSQL, RESTful APIs, and microservices architecture.',
    jobType: 'Full-time',
    experience: '2-5 years',
    salary: { min: 700000, max: 1300000, currency: 'INR' },
    location: 'Hyderabad, Telangana',
    skillsRequired: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST API'],
    deadline: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000),
    status: 'active',
    numberOfOpenings: 2
  },
  {
    title: 'Python Developer',
    description: 'Join our team as a Python Developer. Work on data analysis, automation, and web development projects.',
    requirements: 'Strong Python skills, experience with Django/Flask, databases, and version control systems.',
    jobType: 'Full-time',
    experience: '2-4 years',
    salary: { min: 500000, max: 1000000, currency: 'INR' },
    location: 'Delhi NCR',
    skillsRequired: ['Python', 'Django', 'Flask', 'SQL', 'Git'],
    deadline: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
    status: 'active',
    numberOfOpenings: 1
  },
  {
    title: 'UI/UX Designer',
    description: 'Creative UI/UX Designer needed to design beautiful and intuitive user interfaces for web and mobile applications.',
    requirements: 'Proficiency in Figma, Adobe XD, Sketch. Understanding of user-centered design principles and prototyping.',
    jobType: 'Full-time',
    experience: '2-4 years',
    salary: { min: 500000, max: 900000, currency: 'INR' },
    location: 'Bangalore, Karnataka',
    skillsRequired: ['Figma', 'Adobe XD', 'UI Design', 'UX Design', 'Prototyping'],
    deadline: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000),
    status: 'active',
    numberOfOpenings: 1
  },
  {
    title: 'DevOps Engineer',
    description: 'Looking for a DevOps Engineer to manage our infrastructure, CI/CD pipelines, and cloud deployments.',
    requirements: 'Experience with AWS/Azure, Docker, Kubernetes, Jenkins, and infrastructure as code tools.',
    jobType: 'Full-time',
    experience: '3-6 years',
    salary: { min: 900000, max: 1800000, currency: 'INR' },
    location: 'Mumbai, Maharashtra',
    skillsRequired: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Linux'],
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    status: 'active',
    numberOfOpenings: 2
  },
  {
    title: 'Data Scientist',
    description: 'Join our data team as a Data Scientist. Work on machine learning models and data analysis projects.',
    requirements: 'Strong knowledge of Python, machine learning algorithms, statistics, and data visualization tools.',
    jobType: 'Full-time',
    experience: '2-5 years',
    salary: { min: 800000, max: 1600000, currency: 'INR' },
    location: 'Bangalore, Karnataka',
    skillsRequired: ['Python', 'Machine Learning', 'TensorFlow', 'Pandas', 'SQL'],
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    status: 'active',
    numberOfOpenings: 1
  },
  {
    title: 'Mobile App Developer - React Native',
    description: 'Develop cross-platform mobile applications using React Native for iOS and Android.',
    requirements: 'Experience with React Native, JavaScript, mobile app development, and app store deployment.',
    jobType: 'Full-time',
    experience: '2-4 years',
    salary: { min: 600000, max: 1200000, currency: 'INR' },
    location: 'Pune, Maharashtra',
    skillsRequired: ['React Native', 'JavaScript', 'iOS', 'Android', 'Redux'],
    deadline: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000),
    status: 'active',
    numberOfOpenings: 2
  },
  {
    title: 'Software Engineer Intern',
    description: 'Internship opportunity for Computer Science students. Learn and work on real-world projects.',
    requirements: 'Basic knowledge of programming, data structures, and algorithms. Willingness to learn.',
    jobType: 'Internship',
    experience: 'Fresher',
    salary: { min: 15000, max: 25000, currency: 'INR' },
    location: 'Remote',
    skillsRequired: ['JavaScript', 'Python', 'Git', 'Problem Solving'],
    deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    status: 'active',
    numberOfOpenings: 5
  },
  {
    title: 'Java Developer',
    description: 'Experienced Java Developer needed for enterprise application development.',
    requirements: 'Strong Java skills, Spring Boot, Hibernate, microservices, and SQL databases.',
    jobType: 'Full-time',
    experience: '3-6 years',
    salary: { min: 800000, max: 1500000, currency: 'INR' },
    location: 'Chennai, Tamil Nadu',
    skillsRequired: ['Java', 'Spring Boot', 'Hibernate', 'SQL', 'Microservices'],
    deadline: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
    status: 'active',
    numberOfOpenings: 2
  },
  {
    title: 'Digital Marketing Specialist',
    description: 'Looking for a Digital Marketing Specialist to manage our online marketing campaigns.',
    requirements: 'Experience with SEO, SEM, social media marketing, Google Analytics, and content marketing.',
    jobType: 'Full-time',
    experience: '2-4 years',
    salary: { min: 400000, max: 800000, currency: 'INR' },
    location: 'Delhi NCR',
    skillsRequired: ['SEO', 'SEM', 'Social Media', 'Google Analytics', 'Content Marketing'],
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    status: 'active',
    numberOfOpenings: 1
  }
];

const seedJobs = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Find or create a default employer
    let employer = await User.findOne({ role: 'employer' });
    
    if (!employer) {
      employer = await User.create({
        name: 'Tech Recruiter',
        email: 'employer@test.com',
        password: 'test123',
        role: 'employer',
        companyName: 'Tech Solutions India',
        industry: 'Information Technology',
        isVerified: true
      });
      console.log('Default employer created');
    }

    // Clear existing jobs
    await Job.deleteMany({});
    console.log('Existing jobs cleared');

    // Add company reference to all jobs
    const jobsWithCompany = sampleJobs.map(job => ({
      ...job,
      company: employer._id,
      postedDate: new Date()
    }));

    // Insert sample jobs
    const insertedJobs = await Job.insertMany(jobsWithCompany);
    console.log(`✅ ${insertedJobs.length} sample jobs added successfully!`);

    console.log('\n📋 Sample Jobs:');
    insertedJobs.forEach((job, index) => {
      console.log(`${index + 1}. ${job.title} - ${job.location}`);
    });

    console.log('\n🎉 Database seeded successfully!');
    console.log('\n👤 Test Employer Account:');
    console.log('Email: employer@test.com');
    console.log('Password: test123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedJobs();
