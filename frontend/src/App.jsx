/**
 * CareerHub Pro - Main Application
 * Developed by: BHUPESH INDURKAR
 * Full Stack Developer
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import PrivateRoute from './components/common/PrivateRoute';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import GoogleCallback from './pages/auth/GoogleCallback';
import LinkedInCallback from './pages/auth/LinkedInCallback';

// General Pages
import Home from './pages/general/Home';
import Contact from './pages/general/Contact';
import About from './pages/general/About';
import NotFound from './pages/general/NotFound';

// Job Seeker Pages
import JobSeekerDashboard from './pages/jobseeker/Dashboard';
import Profile from './pages/jobseeker/Profile';
import Jobs from './pages/jobseeker/Jobs';
import JobDetails from './pages/jobseeker/JobDetails';
import Applications from './pages/jobseeker/Applications';
import SavedJobs from './pages/jobseeker/SavedJobs';

// Employer Pages
import EmployerDashboard from './pages/employer/Dashboard';
import PostJob from './pages/employer/PostJob';
import ManageJobs from './pages/employer/ManageJobs';
import Applicants from './pages/employer/Applicants';
import CompanyProfile from './pages/employer/CompanyProfile';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import Companies from './pages/admin/Companies';
import Reports from './pages/admin/Reports';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/google/callback" element={<GoogleCallback />} />
            <Route path="/auth/linkedin/callback" element={<LinkedInCallback />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />

            {/* Job Seeker Routes */}
            <Route path="/jobseeker/dashboard" element={<PrivateRoute role="jobseeker"><JobSeekerDashboard /></PrivateRoute>} />
            <Route path="/jobseeker/profile" element={<PrivateRoute role="jobseeker"><Profile /></PrivateRoute>} />
            <Route path="/jobseeker/applications" element={<PrivateRoute role="jobseeker"><Applications /></PrivateRoute>} />
            <Route path="/jobseeker/saved-jobs" element={<PrivateRoute role="jobseeker"><SavedJobs /></PrivateRoute>} />

            {/* Employer Routes */}
            <Route path="/employer/dashboard" element={<PrivateRoute role="employer"><EmployerDashboard /></PrivateRoute>} />
            <Route path="/employer/post-job" element={<PrivateRoute role="employer"><PostJob /></PrivateRoute>} />
            <Route path="/employer/manage-jobs" element={<PrivateRoute role="employer"><ManageJobs /></PrivateRoute>} />
            <Route path="/employer/applicants/:jobId" element={<PrivateRoute role="employer"><Applicants /></PrivateRoute>} />
            <Route path="/employer/company-profile" element={<PrivateRoute role="employer"><CompanyProfile /></PrivateRoute>} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<PrivateRoute role="admin"><AdminDashboard /></PrivateRoute>} />
            <Route path="/admin/users" element={<PrivateRoute role="admin"><Users /></PrivateRoute>} />
            <Route path="/admin/companies" element={<PrivateRoute role="admin"><Companies /></PrivateRoute>} />
            <Route path="/admin/reports" element={<PrivateRoute role="admin"><Reports /></PrivateRoute>} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;
