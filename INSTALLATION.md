# CareerHub Pro - Installation Guide

**Developed by: BHUPESH INDURKAR**  
**Full Stack Developer | MERN Stack Specialist**

## 📦 Complete Installation Steps

### Step 1: Install Prerequisites

#### Install Node.js
- Download from: https://nodejs.org/
- Recommended version: v16 or higher
- Verify installation:
  ```bash
  node --version
  npm --version
  ```

#### Install MongoDB

**Option A: Local MongoDB**
- Download from: https://www.mongodb.com/try/download/community
- Install and start MongoDB service
- Default connection: `mongodb://localhost:27017`

**Option B: MongoDB Atlas (Cloud - Recommended)**
- Sign up at: https://www.mongodb.com/cloud/atlas
- Create free cluster
- Get connection string

### Step 2: Clone or Download Project

```bash
git clone <repository-url>
cd careerhub-pro
```

### Step 3: Backend Installation

```bash
cd backend
npm install
```

**Create `.env` file in backend folder:**

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/careerhub
JWT_SECRET=careerhub_secret_key_2024_bhupesh_indurkar
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
CLIENT_URL=http://localhost:3000
```

**Start Backend Server:**

```bash
npm run dev
```

✅ Backend running on: http://localhost:5000

### Step 4: Frontend Installation

Open new terminal:

```bash
cd frontend
npm install
```

**Create `.env` file in frontend folder:**

```env
REACT_APP_API_URL=http://localhost:5000/api
```

**Start Frontend:**

```bash
npm start
```

✅ Frontend running on: http://localhost:3000

### Step 5: Create Uploads Folder

```bash
cd backend
mkdir uploads
```

## 🎯 Quick Start Commands

### Start Both Servers

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm start
```

## 🧪 Test the Application

### 1. Open Browser
Navigate to: http://localhost:3000

### 2. Register New Account
- Click "Sign Up"
- Choose "Job Seeker" or "Employer"
- Fill in details
- Submit

### 3. Login
- Use registered credentials
- Access dashboard

### 4. Test Features

**For Job Seekers:**
- Browse jobs
- View job details
- Apply for jobs
- Update profile
- Track applications

**For Employers:**
- Post new job
- Manage jobs
- View applicants
- Update company profile

## 📧 Email Setup (Gmail)

### Enable Gmail App Password

1. Go to Google Account Settings
2. Security → 2-Step Verification (Enable it)
3. Security → App passwords
4. Select "Mail" and "Other (Custom name)"
5. Generate password
6. Copy password to `.env` file as `EMAIL_PASS`

## 🗄️ Database Setup

### Local MongoDB

```bash
# Start MongoDB service
mongod

# Create database (automatic on first connection)
# Database name: careerhub
```

### MongoDB Atlas

1. Create account at mongodb.com/cloud/atlas
2. Create free cluster
3. Create database user
4. Whitelist IP: 0.0.0.0/0 (allow all)
5. Get connection string
6. Update MONGODB_URI in .env

## 🔧 Troubleshooting

### Port Already in Use

**Backend (Port 5000):**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

**Frontend (Port 3000):**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### MongoDB Connection Error

1. Check if MongoDB is running
2. Verify MONGODB_URI in .env
3. Check network connectivity
4. For Atlas: Verify IP whitelist

### Module Not Found Error

```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### CORS Error

1. Check CLIENT_URL in backend .env
2. Verify it matches frontend URL
3. Restart backend server

## 📱 Access Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## 🎨 Default Test Accounts

After installation, you can create test accounts:

**Job Seeker:**
- Email: jobseeker@test.com
- Password: test123

**Employer:**
- Email: employer@test.com
- Password: test123
- Company: Test Company

**Admin:**
- Email: admin@test.com
- Password: admin123

## 📊 Project Structure

```
careerhub-pro/
├── backend/
│   ├── config/          # Database & config
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth & upload
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── utils/           # Helper functions
│   ├── .env             # Environment variables
│   ├── package.json     # Dependencies
│   └── server.js        # Entry point
│
└── frontend/
    ├── public/          # Static files
    ├── src/
    │   ├── components/  # Reusable components
    │   ├── pages/       # Page components
    │   ├── redux/       # State management
    │   ├── App.jsx      # Main app
    │   └── index.js     # Entry point
    ├── .env             # Environment variables
    └── package.json     # Dependencies
```

## 🚀 Next Steps

1. ✅ Complete installation
2. ✅ Test all features
3. ✅ Customize branding
4. ✅ Add your content
5. ✅ Deploy to production

## 💡 Tips

- Use MongoDB Compass for database visualization
- Use Postman for API testing
- Check browser console for errors
- Monitor backend terminal for logs

## 📞 Support

**Developer:** BHUPESH INDURKAR  
**Role:** Full Stack Developer  
**Expertise:** MERN Stack, React.js, Node.js, MongoDB

---

**Happy Coding! 🎉**

Built with ❤️ by BHUPESH INDURKAR
