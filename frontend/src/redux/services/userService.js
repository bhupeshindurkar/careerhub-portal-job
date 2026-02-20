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

// Get user profile
const getProfile = async () => {
  const response = await axios.get(`${API_URL}/users/profile`, getAuthConfig());
  return response.data;
};

// Update user profile
const updateProfile = async (profileData) => {
  const response = await axios.put(`${API_URL}/users/profile`, profileData, getAuthConfig());
  return response.data;
};

const userService = {
  getProfile,
  updateProfile,
};

export default userService;
