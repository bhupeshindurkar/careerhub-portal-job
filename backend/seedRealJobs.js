require('dotenv').config();
const mongoose = require('mongoose');
const Job = require('./models/Job');
const User = require('./models/User');

const realJobs = [
  {
    title: 'Senior Software Engineer',
    description: 'We are looking for a Senior Software Engineer to join our team at Google India. You will be responsible for designing, developing, and maintaining scalable software solutions. Work with cutting-edge technologies and collaborate with talented engineers worldwide.',
    requirements: 'Bachelor degree in Computer Science or related field, 5+ years of software development experience, Strong proficiency in Java Python or C++, Experience with distributed systems and cloud technologies, Excellent problem-solving and communication skills',
    jobType: 'Full-time',
    experience: '5+ years',
    salary: { min: 2500000, max: 3500000, currency: 'INR' },
    location: 'Bangalore, Karnataka',
    skillsRequired: ['Java', 'Python', 'Cloud Computing', 'Distributed Systems'],
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    numberOfOpenings: 3
  },
  {
    title: 'Full Stack Developer',
    description: 'Join Microsoft India as a Full Stack Developer and work on innovative products used by millions. Build scalable web applications using modern technologies and frameworks.',
    requirements: 'Bachelor degree in Computer Science, 3+ years of full stack development experience, Proficiency in React Node.js and databases, Experience with Azure or AWS, Strong understanding of software design patterns',
    jobType: 'Full-time',
    experience: '3-5 years',
    salary: { min: 1800000, max: 2800000, currency: 'INR' },
    location: 'Hyderabad, Telangana',
    skillsRequired: ['React', 'Node.js', 'Azure', 'MongoDB', 'TypeScript'],
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    numberOfOpenings: 5
  },
  {
    title: 'Frontend Developer',
    description: 'Amazon is hiring Frontend Developers to create exceptional user experiences. Work on high-traffic applications and contribute to products used by millions of customers.',
    requirements: 'Bachelor degree in Computer Science or equivalent, 2+ years of frontend development experience, Expert in React JavaScript HTML CSS, Experience with responsive design and performance optimization',
    jobType: 'Full-time',
    experience: '2-4 years',
    salary: { min: 1500000, max: 2200000, currency: 'INR' },
    location: 'Mumbai, Maharashtra',
    skillsRequired: ['React', 'JavaScript', 'HTML', 'CSS', 'Redux'],
    deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
    numberOfOpenings: 4
  },
  {
    title: 'Software Developer',
    description: 'TCS is looking for talented Software Developers to join our digital transformation team. Work on enterprise applications and cutting-edge technologies.',
    requirements: 'Bachelor degree in Computer Science/IT, 1-3 years of experience in software development, Knowledge of Java .NET or Python, Good understanding of SDLC, Excellent communication skills',
    jobType: 'Full-time',
    experience: '1-3 years',
    salary: { min: 600000, max: 1000000, currency: 'INR' },
    location: 'Pune, Maharashtra',
    skillsRequired: ['Java', 'Spring Boot', 'SQL', 'REST APIs', 'Agile'],
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    numberOfOpenings: 10
  },
  {
    title: 'Senior Java Developer',
    description: 'Infosys is seeking experienced Java Developers to work on enterprise-level applications. Lead development teams and mentor junior developers.',
    requirements: 'Bachelor/Master degree in Computer Science, 5+ years of Java development experience, Strong knowledge of Spring Framework, Experience with microservices architecture, Leadership and mentoring skills',
    jobType: 'Full-time',
    experience: '5+ years',
    salary: { min: 1200000, max: 1800000, currency: 'INR' },
    location: 'Bangalore, Karnataka',
    skillsRequired: ['Java', 'Spring Boot', 'Microservices', 'Docker', 'Kubernetes'],
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    numberOfOpenings: 6
  },
  {
    title: 'Python Developer',
    description: 'Join Wipro as a Python Developer and work on AI/ML projects. Develop scalable backend systems and data processing pipelines.',
    requirements: 'Bachelor degree in Computer Science, 2-4 years of Python development experience, Experience with Django or Flask, Knowledge of databases and APIs, Understanding of data structures and algorithms',
    jobType: 'Full-time',
    experience: '2-4 years',
    salary: { min: 800000, max: 1400000, currency: 'INR' },
    location: 'Chennai, Tamil Nadu',
    skillsRequired: ['Python', 'Django', 'Flask', 'PostgreSQL', 'REST APIs'],
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    numberOfOpenings: 8
  },
  {
    title: 'MERN Stack Developer',
    description: 'Swiggy is hiring MERN Stack Developers to build and scale our food delivery platform. Work on high-impact features used by millions of users daily.',
    requirements: 'Bachelor degree in Computer Science, 2-4 years of MERN stack experience, Strong proficiency in MongoDB Express React Node.js, Experience with real-time applications, Passion for building great user experiences',
    jobType: 'Full-time',
    experience: '2-4 years',
    salary: { min: 1200000, max: 2000000, currency: 'INR' },
    location: 'Bangalore, Karnataka',
    skillsRequired: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Redis'],
    deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
    numberOfOpenings: 5
  },
  {
    title: 'Backend Engineer',
    description: 'Flipkart is looking for Backend Engineers to build scalable and reliable systems. Work on microservices architecture and handle millions of transactions.',
    requirements: 'Bachelor/Master degree in Computer Science, 3+ years of backend development experience, Proficiency in Java Python or Go, Experience with distributed systems, Strong problem-solving skills',
    jobType: 'Full-time',
    experience: '3-5 years',
    salary: { min: 1500000, max: 2500000, currency: 'INR' },
    location: 'Bangalore, Karnataka',
    skillsRequired: ['Java', 'Microservices', 'Kafka', 'MySQL', 'Redis'],
    deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
    numberOfOpenings: 4
  },
  {
    title: 'React Native Developer',
    description: 'Join Paytm as a React Native Developer and build mobile applications for millions of users. Work on payment solutions and fintech products.',
    requirements: 'Bachelor degree in Computer Science, 2+ years of React Native experience, Strong JavaScript and mobile development skills, Experience with iOS and Android platforms, Knowledge of payment gateway integration',
    jobType: 'Full-time',
    experience: '2-4 years',
    salary: { min: 1000000, max: 1800000, currency: 'INR' },
    location: 'Noida, Uttar Pradesh',
    skillsRequired: ['React Native', 'JavaScript', 'Redux', 'Firebase', 'REST APIs'],
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    numberOfOpenings: 3
  },
  {
    title: 'Data Scientist',
    description: 'IBM India is seeking Data Scientists to work on AI and machine learning projects. Analyze large datasets and build predictive models.',
    requirements: 'Master degree in Computer Science Statistics or related field, 3+ years of data science experience, Proficiency in Python R and SQL, Experience with machine learning frameworks, Strong statistical and analytical skills',
    jobType: 'Full-time',
    experience: '3-5 years',
    salary: { min: 1500000, max: 2500000, currency: 'INR' },
    location: 'Bangalore, Karnataka',
    skillsRequired: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'Statistics'],
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    numberOfOpenings: 4
  },
  {
    title: 'Machine Learning Engineer',
    description: 'Accenture is hiring ML Engineers to develop and deploy machine learning models. Work on cutting-edge AI solutions for global clients.',
    requirements: 'Bachelor/Master degree in Computer Science or AI, 2-4 years of ML engineering experience, Strong programming skills in Python, Experience with deep learning frameworks, Knowledge of MLOps and model deployment',
    jobType: 'Full-time',
    experience: '2-4 years',
    salary: { min: 1200000, max: 2000000, currency: 'INR' },
    location: 'Pune, Maharashtra',
    skillsRequired: ['Python', 'TensorFlow', 'PyTorch', 'Docker', 'AWS'],
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    numberOfOpenings: 5
  },
  {
    title: 'DevOps Engineer',
    description: 'Oracle is looking for DevOps Engineers to manage cloud infrastructure and CI/CD pipelines. Automate deployment processes and ensure system reliability.',
    requirements: 'Bachelor degree in Computer Science, 3+ years of DevOps experience, Proficiency in AWS Azure or GCP, Experience with Docker Kubernetes Jenkins, Strong scripting skills Python Bash',
    jobType: 'Full-time',
    experience: '3-5 years',
    salary: { min: 1200000, max: 2000000, currency: 'INR' },
    location: 'Hyderabad, Telangana',
    skillsRequired: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform'],
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    numberOfOpenings: 4
  },
  {
    title: 'Cloud Architect',
    description: 'Cognizant is seeking Cloud Architects to design and implement cloud solutions. Lead cloud migration projects and optimize infrastructure.',
    requirements: 'Bachelor/Master degree in Computer Science, 5+ years of cloud architecture experience, Expert in AWS Azure or GCP, Experience with cloud security and compliance, Strong leadership and communication skills',
    jobType: 'Full-time',
    experience: '5+ years',
    salary: { min: 1800000, max: 3000000, currency: 'INR' },
    location: 'Chennai, Tamil Nadu',
    skillsRequired: ['AWS', 'Azure', 'Cloud Architecture', 'Security', 'Terraform'],
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    numberOfOpenings: 3
  },
  {
    title: 'UI/UX Designer',
    description: 'Adobe India is hiring UI/UX Designers to create beautiful and intuitive user interfaces. Work on creative tools used by designers worldwide.',
    requirements: 'Bachelor degree in Design or related field, 3+ years of UI/UX design experience, Proficiency in Figma Adobe XD Sketch, Strong portfolio showcasing design work, Understanding of user-centered design principles',
    jobType: 'Full-time',
    experience: '3-5 years',
    salary: { min: 1000000, max: 1800000, currency: 'INR' },
    location: 'Noida, Uttar Pradesh',
    skillsRequired: ['Figma', 'Adobe XD', 'UI Design', 'UX Research', 'Prototyping'],
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    numberOfOpenings: 2
  },
  {
    title: 'Graduate Engineer Trainee',
    description: 'HCL Technologies is hiring fresh graduates for our GET program. Receive comprehensive training and work on real projects with experienced mentors.',
    requirements: 'Bachelor degree in Computer Science/IT 2023/2024 batch, Good academic record, Basic programming knowledge, Willingness to learn new technologies, Good communication skills',
    jobType: 'Full-time',
    experience: 'Fresher',
    salary: { min: 350000, max: 500000, currency: 'INR' },
    location: 'Multiple Locations',
    skillsRequired: ['Programming', 'Problem Solving', 'Communication', 'Teamwork'],
    deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    numberOfOpenings: 50
  },
  {
    title: 'Junior Software Developer',
    description: 'Tech Mahindra is looking for Junior Developers to join our development team. Learn from industry experts and grow your career.',
    requirements: 'Bachelor degree in Computer Science/IT, 0-1 years of experience, Knowledge of any programming language, Understanding of basic data structures, Eagerness to learn and adapt',
    jobType: 'Full-time',
    experience: 'Fresher',
    salary: { min: 400000, max: 600000, currency: 'INR' },
    location: 'Pune, Maharashtra',
    skillsRequired: ['Java', 'Python', 'SQL', 'HTML', 'CSS'],
    deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
    numberOfOpenings: 30
  },
  {
    title: 'Product Manager',
    description: 'Zomato is hiring Product Managers to drive product strategy and execution. Work on features that impact millions of food lovers.',
    requirements: 'Bachelor/Master degree in any field, 4+ years of product management experience, Strong analytical and problem-solving skills, Experience with data-driven decision making, Excellent communication and leadership skills',
    jobType: 'Full-time',
    experience: '4-6 years',
    salary: { min: 2000000, max: 3500000, currency: 'INR' },
    location: 'Gurugram, Haryana',
    skillsRequired: ['Product Strategy', 'Analytics', 'User Research', 'Agile', 'SQL'],
    deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
    numberOfOpenings: 2
  },
  {
    title: 'QA Automation Engineer',
    description: 'Capgemini is seeking QA Automation Engineers to ensure software quality. Design and implement automated testing frameworks.',
    requirements: 'Bachelor degree in Computer Science, 2-4 years of QA automation experience, Proficiency in Selenium TestNG or similar tools, Experience with CI/CD pipelines, Strong attention to detail',
    jobType: 'Full-time',
    experience: '2-4 years',
    salary: { min: 800000, max: 1400000, currency: 'INR' },
    location: 'Mumbai, Maharashtra',
    skillsRequired: ['Selenium', 'Java', 'TestNG', 'Jenkins', 'API Testing'],
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    numberOfOpenings: 6
  }
];

const seedRealJobs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    // Create company mapping with real company names
    const companies = [
      { name: 'Google India', email: 'careers@google.com' },
      { name: 'Microsoft India', email: 'careers@microsoft.com' },
      { name: 'Amazon India', email: 'careers@amazon.com' },
      { name: 'Tata Consultancy Services', email: 'careers@tcs.com' },
      { name: 'Infosys', email: 'careers@infosys.com' },
      { name: 'Wipro', email: 'careers@wipro.com' },
      { name: 'Swiggy', email: 'careers@swiggy.com' },
      { name: 'Flipkart', email: 'careers@flipkart.com' },
      { name: 'Paytm', email: 'careers@paytm.com' },
      { name: 'IBM India', email: 'careers@ibm.com' },
      { name: 'Accenture', email: 'careers@accenture.com' },
      { name: 'Oracle India', email: 'careers@oracle.com' },
      { name: 'Cognizant', email: 'careers@cognizant.com' },
      { name: 'Adobe India', email: 'careers@adobe.com' },
      { name: 'HCL Technologies', email: 'careers@hcl.com' },
      { name: 'Tech Mahindra', email: 'careers@techmahindra.com' },
      { name: 'Zomato', email: 'careers@zomato.com' },
      { name: 'Capgemini', email: 'careers@capgemini.com' }
    ];

    // Create or find employer accounts for each company
    const employerAccounts = [];
    for (const company of companies) {
      let employer = await User.findOne({ email: company.email });
      if (!employer) {
        employer = await User.create({
          name: company.name,
          email: company.email,
          password: 'Company@123',
          role: 'employer',
          companyName: company.name,
          isVerified: true
        });
        console.log(`Created employer account for ${company.name}`);
      }
      employerAccounts.push(employer);
    }

    await Job.deleteMany({});
    console.log('Existing jobs deleted');

    // Map each job to its respective company
    const jobsWithEmployer = realJobs.map((job, index) => ({
      ...job,
      company: employerAccounts[index]._id,
      postedBy: employerAccounts[index]._id,
      status: 'active',
      applications: []
    }));

    const insertedJobs = await Job.insertMany(jobsWithEmployer);
    
    console.log('\n==========================================');
    console.log(`✅ Successfully added ${insertedJobs.length} real jobs!`);
    console.log('==========================================\n');
    
    console.log('Sample Jobs:');
    insertedJobs.slice(0, 5).forEach(job => {
      console.log(`\n${job.title}`);
      console.log(`Location: ${job.location}`);
      console.log(`Salary: ₹${(job.salary.min/100000).toFixed(1)}-${(job.salary.max/100000).toFixed(1)} LPA`);
      console.log(`Experience: ${job.experience}`);
      console.log(`Openings: ${job.numberOfOpenings}`);
    });
    
    console.log('\n==========================================');
    console.log('✅ Real jobs database ready!');
    console.log(`Total Jobs: ${insertedJobs.length}`);
    console.log('==========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

seedRealJobs();
