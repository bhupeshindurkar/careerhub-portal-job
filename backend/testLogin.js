/**
 * Test Admin Login
 */

const axios = require('axios');

const testLogin = async () => {
  try {
    console.log('Testing admin login...');
    
    const response = await axios.post('https://careerhub-backend-sxue.onrender.com/api/auth/login', {
      email: 'admin@careerhub.com',
      password: 'Admin@123'
    });

    console.log('✅ Login successful!');
    console.log('==========================================');
    console.log('Token:', response.data.token);
    console.log('User:', response.data.user);
    console.log('==========================================');
  } catch (error) {
    console.log('❌ Login failed!');
    console.log('Error:', error.response?.data || error.message);
  }
};

testLogin();
