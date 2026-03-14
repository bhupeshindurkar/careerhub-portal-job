import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getAuthConfig = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

const getDashboardStats = async () => {
  const response = await axios.get(`${API_URL}/admin/stats`, getAuthConfig());
  return response.data;
};

const getAllUsers = async () => {
  const response = await axios.get(`${API_URL}/admin/users`, getAuthConfig());
  return response.data;
};

const getUserById = async (userId) => {
  const response = await axios.get(`${API_URL}/admin/users/${userId}`, getAuthConfig());
  return response.data;
};

const updateUser = async (userId, data) => {
  const response = await axios.put(`${API_URL}/admin/users/${userId}`, data, getAuthConfig());
  return response.data;
};

const deleteUser = async (userId) => {
  const response = await axios.delete(`${API_URL}/admin/users/${userId}`, getAuthConfig());
  return response.data;
};

const getAllJobs = async () => {
  const response = await axios.get(`${API_URL}/jobs`, getAuthConfig());
  return response.data;
};

const deleteJob = async (jobId) => {
  const response = await axios.delete(`${API_URL}/jobs/${jobId}`, getAuthConfig());
  return response.data;
};

const adminService = {
  getDashboardStats,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getAllJobs,
  deleteJob,
};

export default adminService;
