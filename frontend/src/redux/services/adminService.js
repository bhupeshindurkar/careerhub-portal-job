import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Get auth token
const getAuthConfig = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get all users
const getAllUsers = async () => {
  const response = await axios.get(`${API_URL}/users`, getAuthConfig());
  return response.data;
};

// Delete user
const deleteUser = async (userId) => {
  const response = await axios.delete(`${API_URL}/users/${userId}`, getAuthConfig());
  return response.data;
};

// Get all jobs (admin view)
const getAllJobs = async () => {
  const response = await axios.get(`${API_URL}/jobs`, getAuthConfig());
  return response.data;
};

// Delete job
const deleteJob = async (jobId) => {
  const response = await axios.delete(`${API_URL}/jobs/${jobId}`, getAuthConfig());
  return response.data;
};

// Get dashboard stats
const getDashboardStats = async () => {
  const response = await axios.get(`${API_URL}/admin/stats`, getAuthConfig());
  return response.data;
};

const adminService = {
  getAllUsers,
  deleteUser,
  getAllJobs,
  deleteJob,
  getDashboardStats,
};

export default adminService;
