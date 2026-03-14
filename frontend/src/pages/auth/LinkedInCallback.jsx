import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/slices/authSlice';
import axios from 'axios';
import { FaLinkedin } from 'react-icons/fa';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const LinkedInCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (!code) {
      setError('No authorization code received from LinkedIn.');
      return;
    }

    axios.post(`${API_URL}/auth/linkedin/callback`, { code })
      .then(res => {
        if (res.data.status === 'success') {
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          dispatch(setCredentials({ user: res.data.user, token: res.data.token }));
          const route = res.data.user.role === 'employer' ? '/employer/dashboard'
            : res.data.user.role === 'admin' ? '/admin/dashboard'
            : '/jobseeker/dashboard';
          navigate(route);
        }
      })
      .catch(() => setError('LinkedIn login failed. Please try again.'));
  }, [navigate, dispatch]);

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
        <FaLinkedin className="text-[#0077B5] text-5xl mx-auto mb-4" />
        <p className="text-red-600 font-semibold mb-4">{error}</p>
        <button onClick={() => navigate('/login')} className="bg-indigo-600 text-white px-6 py-2 rounded-xl">Back to Login</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <FaLinkedin className="text-[#0077B5] text-6xl mx-auto mb-4 animate-pulse" />
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#0077B5] mx-auto mb-4"></div>
        <p className="text-gray-600 font-semibold text-lg">Signing you in with LinkedIn...</p>
      </div>
    </div>
  );
};

export default LinkedInCallback;
