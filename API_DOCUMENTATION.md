# CareerHub Pro - API Documentation

**Developer: BHUPESH INDURKAR - Full Stack Developer**

Base URL: `http://localhost:5000/api`

## 🔐 Authentication

All protected routes require JWT token in header:
```
Authorization: Bearer <token>
```

---

## 📝 Authentication Endpoints

### Register User
```http
POST /api/auth/register
```

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "jobseeker",
  "companyName": "Tech Corp",
  "industry": "IT"
}
```

**Response:**
```json
{
  "status": "success",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "jobseeker"
  }
}
```

### Login
```http
POST /api/auth/login
```

**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Current User
```http
GET /api/auth/me
```
**Headers:** `Authorization: Bearer <token>`

### Forgot Password
```http
POST /api/auth/forgot-password
```

**Body:**
```json
{
  "email": "john@example.com"
}
```

---

## 💼 Job Endpoints

### Get All Jobs (Public)
```http
GET /api/jobs?search=developer&jobType=Full-time&location=Mumbai&page=1&limit=10
```

**Query Parameters:**
- `search` - Search in title/description
- `jobType` - Full-time, Part-time, Internship, Remote
- `location` - City/Location
- `experience` - Experience level
- `minSalary` - Minimum salary
- `maxSalary` - Maximum salary
- `skills` - Comma-separated skills
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Response:**
```json
{
  "status": "success",
  "jobs": [...],
  "totalPages": 5,
  "currentPage": 1,
  "total": 50
}
```

### Get Single Job
```http
GET /api/jobs/:id
```

### Create Job (Employer Only)
```http
POST /api/jobs
```
**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "title": "Senior React Developer",
  "description": "Job description here...",
  "requirements": "Requirements here...",
  "jobType": "Full-time",
  "experience": "3-5 years",
  "salary": {
    "min": 800000,
    "max": 1200000,
    "currency": "INR"
  },
  "location": "Mumbai",
  "skillsRequired": ["React", "Node.js", "MongoDB"],
  "deadline": "2024-12-31",
  "numberOfOpenings": 2
}
```

### Update Job
```http
PUT /api/jobs/:id
```
**Headers:** `Authorization: Bearer <token>`

### Delete Job
```http
DELETE /api/jobs/:id
```
**Headers:** `Authorization: Bearer <token>`

### Get Employer's Jobs
```http
GET /api/jobs/employer/my-jobs
```
**Headers:** `Authorization: Bearer <token>`

---

## 📄 Application Endpoints

### Apply for Job (Job Seeker Only)
```http
POST /api/applications
```
**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "jobId": "job_id_here",
  "coverLetter": "Cover letter text...",
  "resume": "resume_path_or_url"
}
```

### Get User's Applications
```http
GET /api/applications/user?status=pending
```
**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `status` - pending, viewed, shortlisted, rejected, hired

### Get Job Applications (Employer Only)
```http
GET /api/applications/job/:jobId
```
**Headers:** `Authorization: Bearer <token>`

### Update Application Status (Employer Only)
```http
PUT /api/applications/:id
```
**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "status": "shortlisted",
  "interviewDate": "2024-02-15T10:00:00Z",
  "interviewLink": "https://meet.google.com/abc-defg-hij",
  "notes": "Great candidate"
}
```

### Withdraw Application
```http
DELETE /api/applications/:id
```
**Headers:** `Authorization: Bearer <token>`

---

## 👤 User Endpoints

### Get Profile
```http
GET /api/users/profile
```
**Headers:** `Authorization: Bearer <token>`

### Update Profile
```http
PUT /api/users/profile
```
**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "name": "John Doe",
  "phone": "+91 9876543210",
  "location": "Mumbai",
  "skills": ["React", "Node.js"],
  "education": [{
    "degree": "B.Tech",
    "institute": "IIT Mumbai",
    "year": "2020",
    "percentage": "85%"
  }],
  "experience": [{
    "company": "Tech Corp",
    "role": "Developer",
    "duration": "2 years",
    "description": "Worked on React projects"
  }]
}
```

### Upload Resume
```http
POST /api/users/upload-resume
```
**Headers:** 
- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

**Body:** FormData with `resume` file

### Save/Unsave Job
```http
POST /api/users/save-job/:jobId
```
**Headers:** `Authorization: Bearer <token>`

### Get Saved Jobs
```http
GET /api/users/saved-jobs
```
**Headers:** `Authorization: Bearer <token>`

### Get All Users (Admin Only)
```http
GET /api/users?role=jobseeker&search=john
```
**Headers:** `Authorization: Bearer <token>`

### Delete User (Admin Only)
```http
DELETE /api/users/:id
```
**Headers:** `Authorization: Bearer <token>`

---

## 📊 Response Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## 🔒 Error Response Format

```json
{
  "status": "error",
  "message": "Error message here"
}
```

## 🧪 Testing with Postman

1. Import collection
2. Set base URL: `http://localhost:5000/api`
3. For protected routes:
   - Login first
   - Copy token
   - Add to Authorization header

## 📝 Notes

- All dates in ISO 8601 format
- Salary in INR (Indian Rupees)
- File uploads limited to 5MB
- Rate limit: 100 requests per 15 minutes

---

**API Documentation by BHUPESH INDURKAR**  
Full Stack Developer | MERN Stack Expert
