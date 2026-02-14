import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const LinkedInCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const error = searchParams.get('error');
      const errorDescription = searchParams.get('error_description');

      if (error) {
        toast.error(`❌ LinkedIn authentication failed: ${errorDescription || error}`);
        navigate('/login');
        return;
      }

      if (code) {
        try {
          toast.info('🔄 Processing LinkedIn authentication...');
          
          // Send code to backend
          const response = await axios.post(`${API_URL}/auth/linkedin/callback`, {
            code,
            redirectUri: window.location.origin + '/auth/linkedin/callback'
          });

          if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            
            toast.success('✅ LinkedIn login successful!');
            
            const dashboardRoute = response.data.user.role === 'jobseeker' 
              ? '/jobseeker/dashboard' 
              : response.data.user.role === 'employer' 
              ? '/employer/dashboard' 
              : '/admin/dashboard';
            
            navigate(dashboardRoute);
          }
        } catch (error) {
          console.error('LinkedIn callback error:', error);
          toast.error('❌ LinkedIn authentication failed. Please try again.');
          navigate('/login');
        }
      } else {
        toast.error('❌ No authorization code received');
        navigate('/login');
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border-2 border-white/20 text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold text-white mb-2">Processing LinkedIn Login...</h2>
        <p className="text-indigo-200">Please wait while we authenticate your account</p>
      </div>
    </div>
  );
};

export default LinkedInCallback;
