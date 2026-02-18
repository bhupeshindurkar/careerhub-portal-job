import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../../redux/slices/authSlice';
import { toast } from 'react-toastify';
import { FaBriefcase, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaLinkedin } from 'react-icons/fa';
import axios from 'axios';
import { initLinkedInAuth } from '../../utils/linkedinAuth';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [showLinkedInModal, setShowLinkedInModal] = useState(false);
  const [oauthStep, setOauthStep] = useState(1); // 1: Loading, 2: Account Selection, 3: Authorizing

  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // Initialize Google Sign-In (Commented out - Requires Google Cloud Console Setup)
  // useEffect(() => {
  //   if (window.google) {
  //     window.google.accounts.id.initialize({
  //       client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID || '1234567890-abcdefghijklmnop.apps.googleusercontent.com',
  //       callback: handleGoogleLogin,
  //     });

  //     window.google.accounts.id.renderButton(
  //       document.getElementById('googleSignInButton'),
  //       { 
  //         theme: 'outline', 
  //         size: 'large',
  //         width: '100%',
  //         text: 'continue_with'
  //       }
  //     );
  //   }
  // }, []);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && user) {
      const dashboardRoute = user.role === 'jobseeker' 
        ? '/jobseeker/dashboard' 
        : user.role === 'employer' 
        ? '/employer/dashboard' 
        : '/admin/dashboard';
      navigate(dashboardRoute);
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Password validation
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    dispatch(login({ email, password }));
  };

  // Handle Google Login - Demo Mode with Simulation
  const handleGoogleLogin = () => {
    const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    
    if (!googleClientId || googleClientId === 'YOUR_GOOGLE_CLIENT_ID_HERE') {
      // Demo Mode - Show simulation modal
      setShowGoogleModal(true);
      setOauthStep(1);
      
      // Step 1: Loading
      setTimeout(() => {
        setOauthStep(2);
      }, 1500);
      
      // Step 2: Account selection
      setTimeout(() => {
        setOauthStep(3);
      }, 3500);
      
      // Step 3: Authorizing and login
      setTimeout(() => {
        setShowGoogleModal(false);
        toast.success('✅ Google login successful!');
        dispatch(login({ email: 'jobseeker@test.com', password: 'test123' }));
      }, 5500);
    } else {
      // Real OAuth
      const redirectUri = encodeURIComponent(window.location.origin + '/auth/google/callback');
      const scope = encodeURIComponent('profile email');
      const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;
      window.location.href = googleAuthUrl;
    }
  };

  // Handle LinkedIn Login - Demo Mode with Simulation
  const handleLinkedInLogin = () => {
    const linkedinClientId = process.env.REACT_APP_LINKEDIN_CLIENT_ID;
    
    if (!linkedinClientId || linkedinClientId === 'YOUR_LINKEDIN_CLIENT_ID_HERE') {
      // Demo Mode - Show simulation modal
      setShowLinkedInModal(true);
      setOauthStep(1);
      
      // Step 1: Loading
      setTimeout(() => {
        setOauthStep(2);
      }, 1500);
      
      // Step 2: Account selection
      setTimeout(() => {
        setOauthStep(3);
      }, 3500);
      
      // Step 3: Authorizing and login
      setTimeout(() => {
        setShowLinkedInModal(false);
        toast.success('✅ LinkedIn login successful!');
        dispatch(login({ email: 'jobseeker@test.com', password: 'test123' }));
      }, 5500);
    } else {
      // Real OAuth
      const redirectUri = encodeURIComponent(window.location.origin + '/auth/linkedin/callback');
      const scope = encodeURIComponent('r_liteprofile r_emailaddress');
      const state = Math.random().toString(36).substring(7);
      const linkedinAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${linkedinClientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;
      window.location.href = linkedinAuthUrl;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-md w-full bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-10 relative z-10 border border-white/20">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl transform hover:scale-110 transition">
            <FaBriefcase className="text-white text-4xl" />
          </div>
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">Welcome Back</h2>
          <p className="text-gray-600 text-lg">Sign in to continue your journey</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaEnvelope className="text-indigo-500 text-lg" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition font-medium"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
              Password *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaLock className="text-indigo-500 text-lg" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={password}
                onChange={onChange}
                className="w-full pl-12 pr-14 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition font-medium"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-indigo-600 transition"
              >
                {showPassword ? <FaEyeSlash className="text-xl" /> : <FaEye className="text-xl" />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-3 block text-sm font-medium text-gray-700 cursor-pointer">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forgot-password" className="font-bold text-indigo-600 hover:text-indigo-700 transition">
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            {isLoading ? (
              <span className="flex flex-col items-center justify-center">
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
                <span className="text-xs mt-1 opacity-80">First login may take 30-60 seconds</span>
              </span>
            ) : (
              'Sign In'
            )}
          </button>
          
          {/* Loading Info */}
          {isLoading && (
            <div className="mt-4 bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-800 text-center font-medium">
                ⏳ Server is waking up... Please wait 30-60 seconds for first request
              </p>
            </div>
          )}
        </form>

        {/* Divider */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-semibold">Or continue with</span>
            </div>
          </div>
        </div>

        {/* Social Login Buttons */}
        <div className="mt-8 space-y-4">
          {/* Google Sign-In Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center px-6 py-4 border-2 border-gray-200 rounded-xl shadow-sm bg-white hover:bg-gray-50 transition group transform hover:scale-105"
          >
            <svg className="w-6 h-6 mr-3 group-hover:scale-110 transition" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-base font-bold text-gray-700">Continue with Google</span>
          </button>
          
          {/* LinkedIn Button */}
          <button
            type="button"
            onClick={handleLinkedInLogin}
            className="w-full flex items-center justify-center px-6 py-4 border-2 border-gray-200 rounded-xl shadow-sm bg-white hover:bg-gray-50 transition group transform hover:scale-105"
          >
            <FaLinkedin className="w-6 h-6 mr-3 text-[#0077B5] group-hover:scale-110 transition" />
            <span className="text-base font-bold text-gray-700">Continue with LinkedIn</span>
          </button>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-4 mt-4">
            <p className="text-xs text-center text-green-800 font-bold flex items-center justify-center gap-2 mb-2">
              <span className="text-lg">✅</span>
              <span>OAuth Demo Mode Active</span>
            </p>
            <p className="text-xs text-center text-green-700">
              Click buttons to test OAuth flow with demo account
            </p>
            <p className="text-xs text-center text-green-600 mt-2">
              To enable real OAuth: Add credentials in .env file (see OAUTH_SETUP_GUIDE.md)
            </p>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
          <p className="text-sm font-bold text-indigo-800 mb-3 flex items-center gap-2">
            <span className="text-lg">🎯</span> Demo Credentials:
          </p>
          <div className="text-sm text-indigo-700 space-y-2 font-medium">
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              <strong>Job Seeker:</strong> jobseeker@test.com / test123
            </p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <strong>Employer:</strong> employer@test.com / test123
            </p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
              <strong>Admin:</strong> admin@test.com / admin123
            </p>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 font-medium">
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-600 font-bold hover:text-indigo-700 hover:underline transition">
              Sign up now
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="mt-4 text-center">
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-700 font-medium transition">
            ← Back to Home
          </Link>
        </div>

        {/* Developer Credit */}
        <div className="mt-8 pt-6 border-t-2 border-gray-100 text-center">
          <p className="text-sm text-gray-600 font-medium">
            Developed by <strong className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">BHUPESH INDURKAR</strong>
          </p>
          <p className="text-xs text-gray-500 mt-2">Full Stack Developer | MERN Stack Specialist</p>
        </div>
      </div>

      {/* Google OAuth Simulation Modal */}
      {showGoogleModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative animate-fadeIn">
            {/* Google Logo */}
            <div className="flex justify-center mb-6">
              <svg className="w-16 h-16" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </div>

            {/* Step 1: Loading */}
            {oauthStep === 1 && (
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-4"></div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Connecting to Google</h3>
                <p className="text-gray-600">Please wait...</p>
              </div>
            )}

            {/* Step 2: Account Selection */}
            {oauthStep === 2 && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Choose an account</h3>
                <p className="text-sm text-gray-600 mb-6 text-center">to continue to CareerHub Pro</p>
                
                <div className="space-y-3">
                  <div className="border-2 border-gray-200 rounded-xl p-4 hover:bg-gray-50 cursor-pointer transition">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                        J
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Job Seeker</p>
                        <p className="text-sm text-gray-600">jobseeker@test.com</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 mt-6 text-center">
                  Demo Mode: Simulating Google OAuth
                </p>
              </div>
            )}

            {/* Step 3: Authorizing */}
            {oauthStep === 3 && (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Authorizing...</h3>
                <p className="text-gray-600">Logging you in to CareerHub Pro</p>
                <div className="mt-4">
                  <div className="animate-pulse flex space-x-2 justify-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animation-delay-200"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animation-delay-400"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* LinkedIn OAuth Simulation Modal */}
      {showLinkedInModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative animate-fadeIn">
            {/* LinkedIn Logo */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-[#0077B5] rounded-lg flex items-center justify-center">
                <FaLinkedin className="text-white text-4xl" />
              </div>
            </div>

            {/* Step 1: Loading */}
            {oauthStep === 1 && (
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#0077B5] mx-auto mb-4"></div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Connecting to LinkedIn</h3>
                <p className="text-gray-600">Please wait...</p>
              </div>
            )}

            {/* Step 2: Account Selection */}
            {oauthStep === 2 && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Sign in to LinkedIn</h3>
                <p className="text-sm text-gray-600 mb-6 text-center">to continue to CareerHub Pro</p>
                
                <div className="space-y-3">
                  <div className="border-2 border-gray-200 rounded-xl p-4 hover:bg-gray-50 cursor-pointer transition">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold text-xl">
                        J
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Job Seeker</p>
                        <p className="text-sm text-gray-600">Professional Profile</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-gray-500 mt-6 text-center">
                  Demo Mode: Simulating LinkedIn OAuth
                </p>
              </div>
            )}

            {/* Step 3: Authorizing */}
            {oauthStep === 3 && (
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Authorizing...</h3>
                <p className="text-gray-600">Logging you in to CareerHub Pro</p>
                <div className="mt-4">
                  <div className="animate-pulse flex space-x-2 justify-center">
                    <div className="w-2 h-2 bg-[#0077B5] rounded-full"></div>
                    <div className="w-2 h-2 bg-[#0077B5] rounded-full animation-delay-200"></div>
                    <div className="w-2 h-2 bg-[#0077B5] rounded-full animation-delay-400"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};


export default Login;
