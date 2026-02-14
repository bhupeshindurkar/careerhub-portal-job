# CareerHub Pro - Professional Job Portal

**Developed by: BHUPESH INDURKAR**  
**Full Stack Developer**

## 🚀 Overview

CareerHub Pro is a comprehensive job portal application built with modern web technologies. It features user authentication, advanced job filtering, application tracking, employer dashboard, and admin panel.

## 🛠️ Tech Stack

### Frontend
- React.js 18
- Redux Toolkit (State Management)
- React Router v6
- Tailwind CSS
- Axios
- React Hook Form

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt
- Multer (File Upload)
- Nodemailer

## 📁 Project Structure

```
careerhub-pro/
├── backend/          # Node.js + Express API
└── frontend/         # React.js Application
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (Local or Atlas)
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/careerhub
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
CLIENT_URL=http://localhost:3000
```

Start backend:
```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm start
```

## 🌟 Features

### For Job Seekers
- ✅ User Registration & Login
- ✅ Profile Management (Education, Experience, Skills)
- ✅ Resume Upload
- ✅ Advanced Job Search & Filters
- ✅ Job Application Tracking
- ✅ Save Jobs
- ✅ Application Status Updates

### For Employers
- ✅ Company Profile Management
- ✅ Post Job Listings
- ✅ Manage Jobs (Edit, Close, Delete)
- ✅ View Applications
- ✅ Shortlist/Reject Candidates
- ✅ Schedule Interviews

### For Admins
- ✅ User Management
- ✅ Company Verification
- ✅ Analytics Dashboard
- ✅ Reports & Statistics

## 🔐 API Endpoints

### Authentication
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user
- GET `/api/auth/me` - Get current user
- POST `/api/auth/forgot-password` - Forgot password

### Jobs
- GET `/api/jobs` - Get all jobs (with filters)
- GET `/api/jobs/:id` - Get job details
- POST `/api/jobs` - Create job (Employer)
- PUT `/api/jobs/:id` - Update job
- DELETE `/api/jobs/:id` - Delete job

### Applications
- POST `/api/applications` - Apply for job
- GET `/api/applications/user` - Get user applications
- GET `/api/applications/job/:jobId` - Get job applications
- PUT `/api/applications/:id` - Update application status

### Users
- GET `/api/users/profile` - Get user profile
- PUT `/api/users/profile` - Update profile
- POST `/api/users/upload-resume` - Upload resume

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
vercel --prod
```

### Backend (Render/Railway)
```bash
cd backend
# Push to GitHub
# Connect to Render/Railway
# Add environment variables
# Deploy
```

### Database (MongoDB Atlas)
1. Create cluster on MongoDB Atlas
2. Get connection string
3. Update MONGODB_URI in .env

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: 640px, 768px, 1024px, 1280px
- Fully responsive on all devices

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 📄 License

MIT License - Free to use for personal and commercial projects

## 👨‍💻 Developer

**BHUPESH INDURKAR**  
Full Stack Developer  
Specialized in MERN Stack Development

---

**Note:** This is a production-ready application with industry-standard practices and security measures.
