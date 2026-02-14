import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../../redux/slices/authSlice';
import { toast } from 'react-toastify';
import { FaBriefcase, FaUser, FaBuilding, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUserCircle, FaIndustry } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'jobseeker',
    companyName: '',
    industry: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { name, email, password, confirmPassword, role, companyName, industry } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && user) {
      toast.success('Registration successful!');
      const dashboardRoute = user.role === 'jobseeker' 
        ? '/jobseeker/dashboard' 
        : '/employer/dashboard';
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

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    const userData = {
      name,
      email,
      password,
      role,
    };

    if (role === 'employer') {
      userData.companyName = companyName;
      userData.industry = industry;
    }

    dispatch(register(userData));
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
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">Create Account</h2>
          <p className="text-gray-600 text-lg">Join CareerHub Pro today</p>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: 'jobseeker' })}
            className={`p-6 border-2 rounded-2xl flex flex-col items-center transition transform hover:scale-105 ${
              role === 'jobseeker'
                ? 'border-indigo-600 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg'
                : 'border-gray-300 hover:border-indigo-300 bg-gray-50'
            }`}
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-3 ${
              role === 'jobseeker'
                ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}>
              <FaUser className="text-3xl" />
            </div>
            <span className={`font-bold text-lg ${
              role === 'jobseeker' ? 'text-indigo-700' : 'text-gray-700'
            }`}>Job Seeker</span>
            <span className="text-xs text-gray-500 mt-1">Find your dream job</span>
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: 'employer' })}
            className={`p-6 border-2 rounded-2xl flex flex-col items-center transition transform hover:scale-105 ${
              role === 'employer'
                ? 'border-purple-600 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg'
                : 'border-gray-300 hover:border-purple-300 bg-gray-50'
            }`}
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-3 ${
              role === 'employer'
                ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}>
              <FaBuilding className="text-3xl" />
            </div>
            <span className={`font-bold text-lg ${
              role === 'employer' ? 'text-purple-700' : 'text-gray-700'
            }`}>Employer</span>
            <span className="text-xs text-gray-500 mt-1">Hire top talent</span>
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaUserCircle className="text-indigo-500 text-lg" />
              </div>
              <input
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition font-medium"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaEnvelope className="text-indigo-500 text-lg" />
              </div>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition font-medium"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          {role === 'employer' && (
            <>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Company Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaBuilding className="text-purple-500 text-lg" />
                  </div>
                  <input
                    type="text"
                    name="companyName"
                    value={companyName}
                    onChange={onChange}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition font-medium"
                    placeholder="Your company name"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Industry *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaIndustry className="text-purple-500 text-lg" />
                  </div>
                  <input
                    type="text"
                    name="industry"
                    value={industry}
                    onChange={onChange}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition font-medium"
                    placeholder="e.g., IT, Healthcare, Finance"
                    required
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Password *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaLock className="text-indigo-500 text-lg" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={onChange}
                className="w-full pl-12 pr-14 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition font-medium"
                placeholder="Minimum 6 characters"
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

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Confirm Password *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaLock className="text-indigo-500 text-lg" />
              </div>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
                className="w-full pl-12 pr-14 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition font-medium"
                placeholder="Re-enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-indigo-600 transition"
              >
                {showConfirmPassword ? <FaEyeSlash className="text-xl" /> : <FaEye className="text-xl" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 font-bold hover:text-indigo-700 hover:underline transition">
              Sign in
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
    </div>
  );
};

export default Register;
