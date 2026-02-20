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

// Get job seeker dashboard data
const getJobSeekerDashboard = async () => {
  const response = await axios.get(`${API_URL}/dashboard/jobseeker`, getAuthConfig());
  return response.data;
};

const dashboardService = {
  getJobSeekerDashboard,
};

export default dashboardService;
