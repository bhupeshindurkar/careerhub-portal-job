import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const contactService = {
  // Send contact form message
  sendMessage: async (formData) => {
    const response = await axios.post(`${API_URL}/contact`, formData);
    return response.data;
  }
};

export default contactService;
