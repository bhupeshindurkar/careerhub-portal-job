# CareerHub Pro - Complete Project Documentation

## 🚀 Project Overview

**CareerHub Pro** is a full-stack job portal web application that connects job seekers with employers. The platform features role-based access control, real-time dashboard analytics, and a modern, responsive user interface.

---

## 📱 Live Application

**Production URL:** https://careerhub-portal-job.vercel.app

**Backend API:** https://careerhub-backend-sxue.onrender.com

**GitHub Repository:** https://github.com/bhupeshindurkar/careerhub-portal-job

---

## 👤 Demo Accounts

### Admin Account
- **Email:** bhupeshindurkar6@gmail.com
- **Password:** Bhupesh@123
- **Access:** Full admin dashboard, user management, analytics, system control

### Alternative Admin
- **Email:** admin@test.com
- **Password:** Admin@2024

### Job Seeker Account
- **Email:** jobseeker@test.com
- **Password:** test123
- **Access:** Browse jobs, apply for positions, manage applications, profile management

### Employer Account
- **Email:** employer@test.com
- **Password:** test123
- **Access:** Post jobs, manage job listings, view applicants, company profile

---

## 🎯 Key Features

### For Job Seekers
✅ User Registration & Authentication
✅ Browse Job Listings with Search & Filter
✅ Apply for Jobs
✅ Track Application Status
✅ Save Favorite Jobs
✅ Profile Management with Resume Upload
✅ Personalized Dashboard

### For Employers
✅ Company Registration
✅ Post Job Openings
✅ Manage Job Listings (Edit/Delete)
✅ View & Manage Applications
✅ Applicant Tracking System
✅ Company Profile Management
✅ Analytics Dashboard

### For Administrators
✅ Real-time Dashboard with Analytics
✅ User Management (View, Delete, Role Management)
✅ View All Jobs & Applications
✅ System Monitoring
✅ Latest User Registrations Tracking
✅ Platform Statistics

---

## 💻 Technology Stack

### Frontend
- **Framework:** React.js 18
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Icons:** React Icons
- **Notifications:** React Toastify
- **Deployment:** Vercel

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas (Cloud)
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcrypt.js
- **Security:** Helmet, CORS, Rate Limiting
- **File Upload:** Multer + Cloudinary
- **Deployment:** Render.com

### Database Schema
- **Users Collection:** User profiles, authentication, roles
- **Jobs Collection:** Job listings, company details
- **Applications Collection:** Job applications, status tracking
- **Companies Collection:** Employer company information

---

## 🏗️ Project Architecture

### Frontend Structure
```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable components
│   │   ├── employer/        # Employer-specific components
│   │   └── jobseeker/       # Job seeker components
│   ├── pages/
│   │   ├── admin/           # Admin pages
│   │   ├── auth/            # Authentication pages
│   │   ├── employer/        # Employer pages
│   │   ├── jobseeker/       # Job seeker pages
│   │   └── general/         # Public pages
│   ├── redux/
│   │   ├── services/        # API services
│   │   ├── slices/          # Redux slices
│   │   └── store.js         # Redux store
│   └── utils/               # Utility functions
```

### Backend Structure
```
backend/
├── config/
│   ├── database.js          # MongoDB connection
│   └── cloudinary.js        # File upload config
├── controllers/             # Business logic
├── middleware/              # Auth & validation
├── models/                  # Database schemas
├── routes/                  # API endpoints
├── utils/                   # Helper functions
└── server.js                # Entry point
```

---

## 🔐 Security Features

✅ JWT-based Authentication
✅ Password Hashing with bcrypt
✅ Role-based Access Control (RBAC)
✅ Protected API Routes
✅ CORS Configuration
✅ Rate Limiting (100 requests per 15 minutes)
✅ Helmet Security Headers
✅ Input Validation & Sanitization
✅ Environment Variables for Sensitive Data

---

## 📊 Admin Dashboard Features

### Real-time Statistics
- Total Users Count
- Job Seekers Count
- Total Jobs Posted
- Total Applications
- Weekly Growth Metrics

### User Management
- View All Users (Paginated)
- Filter by Role (Job Seeker, Employer, Admin)
- Delete Users
- View User Details
- Track Registration Dates

### Latest Activity
- Recent User Registrations
- New Job Postings
- Recent Applications
- System Status Monitoring

---

## 🎨 Design Features

### UI/UX Highlights
✅ Modern Gradient Design
✅ Responsive Layout (Mobile, Tablet, Desktop)
✅ Professional Color Scheme (Indigo, Purple, Pink)
✅ Smooth Animations & Transitions
✅ Loading States & Error Handling
✅ Toast Notifications
✅ Intuitive Navigation
✅ Accessibility Compliant

### Navbar Features
- Gradient Background (Indigo → Purple → Pink)
- Professional Logo with Icon
- Tagline: "Find Your Dream Job"
- User Avatar with Initials
- Role-based Menu Items
- Mobile-responsive Hamburger Menu

---

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Password reset

### Jobs
- `GET /api/jobs` - Get all jobs (with filters)
- `GET /api/jobs/:id` - Get single job
- `POST /api/jobs` - Create job (Employer/Admin)
- `PUT /api/jobs/:id` - Update job (Employer/Admin)
- `DELETE /api/jobs/:id` - Delete job (Employer/Admin)

### Applications
- `POST /api/applications` - Apply for job
- `GET /api/applications/user` - Get user applications
- `GET /api/applications/job/:jobId` - Get job applications
- `PUT /api/applications/:id` - Update application status
- `DELETE /api/applications/:id` - Withdraw application

### Admin
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/users` - Get all users (paginated)
- `DELETE /api/users/:id` - Delete user

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `POST /api/users/save-job/:jobId` - Save/unsave job
- `GET /api/users/saved-jobs` - Get saved jobs

---

## 🌐 Deployment Details

### Frontend Deployment (Vercel)
- **Platform:** Vercel
- **Build Command:** `npm run build`
- **Output Directory:** `build`
- **Environment Variables:**
  - `REACT_APP_API_URL`: Backend API URL
  - `CI`: false (to ignore warnings)

### Backend Deployment (Render)
- **Platform:** Render.com
- **Instance Type:** Free Tier
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Environment Variables:**
  - `NODE_ENV`: production
  - `PORT`: 10000
  - `MONGODB_URI`: MongoDB Atlas connection string
  - `JWT_SECRET`: Secret key for JWT
  - `JWT_EXPIRE`: 7d
  - `CLIENT_URL`: Frontend URL

### Database (MongoDB Atlas)
- **Provider:** MongoDB Atlas (Free Tier)
- **Cluster:** Cluster0
- **Region:** AWS - US East
- **Database Name:** careerhub
- **Network Access:** 0.0.0.0/0 (Allow all IPs)

---

## 📈 Performance Optimizations

✅ Code Splitting with React.lazy
✅ Image Optimization
✅ API Response Caching
✅ Lazy Loading Components
✅ Minified Production Build
✅ CDN Delivery (Vercel)
✅ Database Indexing
✅ Efficient Query Optimization

---

## 🐛 Known Limitations

⚠️ **Backend Cold Start:** Render free tier has 30-60 second cold start on first request
⚠️ **File Upload:** Limited to 10MB per file
⚠️ **Email Service:** Currently disabled (optional feature)
⚠️ **OAuth:** Demo mode only (Google/LinkedIn not configured)

---

## 🔮 Future Enhancements

### Planned Features
- Real-time Chat between Employers & Job Seekers
- Video Interview Integration
- Advanced Search with AI Recommendations
- Email Notifications for Applications
- Resume Parser & Skill Matching
- Salary Insights & Analytics
- Company Reviews & Ratings
- Job Alerts & Notifications
- Multi-language Support
- Dark Mode Theme

---

## 👨‍💻 Developer Information

**Developer:** Bhupesh Indurkar
**Role:** Full Stack Developer
**Specialization:** MERN Stack (MongoDB, Express.js, React.js, Node.js)

**Contact:**
- Email: bhupeshindurkar6@gmail.com
- GitHub: https://github.com/bhupeshindurkar

---

## 📝 Installation & Setup (Local Development)

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (Local or Atlas)
- Git

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Backend Setup
```bash
cd backend
npm install
npm start
```

### Environment Variables

**Frontend (.env)**
```
REACT_APP_API_URL=http://localhost:5000/api
```

**Backend (.env)**
```
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

---

## 🎓 Learning Outcomes

This project demonstrates proficiency in:
- Full Stack Web Development
- RESTful API Design
- Database Design & Management
- Authentication & Authorization
- State Management (Redux)
- Responsive Web Design
- Cloud Deployment
- Git Version Control
- Agile Development Practices

---

## 📄 License

This project is developed for educational and portfolio purposes.

---

## 🙏 Acknowledgments

- React.js Community
- MongoDB Atlas
- Vercel & Render.com for hosting
- Tailwind CSS for styling framework
- All open-source contributors

---

**Last Updated:** February 19, 2026

**Version:** 1.0.0

**Status:** ✅ Production Ready

---

## 📞 Support

For any queries or issues, please contact:
- Email: bhupeshindurkar6@gmail.com
- GitHub Issues: https://github.com/bhupeshindurkar/careerhub-portal-job/issues

---

**© 2026 CareerHub Pro. Developed by Bhupesh Indurkar - Full Stack Developer**
