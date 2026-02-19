import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { FaBriefcase, FaUser, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'jobseeker':
        return '/jobseeker/dashboard';
      case 'employer':
        return '/employer/dashboard';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/';
    }
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="bg-white p-2 rounded-xl shadow-lg group-hover:scale-110 transition transform">
                <FaBriefcase className="text-indigo-600 text-2xl" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white tracking-tight">
                  CareerHub <span className="text-yellow-300">Pro</span>
                </span>
                <span className="text-xs text-white/80 -mt-1">Find Your Dream Job</span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/jobs" className="text-white hover:text-yellow-300 transition font-semibold flex items-center gap-2">
              <FaBriefcase className="text-sm" />
              Find Jobs
            </Link>
            
            {user ? (
              <>
                <Link to={getDashboardLink()} className="text-white hover:text-yellow-300 transition font-semibold">
                  Dashboard
                </Link>
                {user.role === 'employer' && (
                  <Link to="/employer/post-job" className="text-white hover:text-yellow-300 transition font-semibold">
                    Post Job
                  </Link>
                )}
                <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-white/30">
                  <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-white font-semibold">Hi, {user.name.split(' ')[0]}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-white text-indigo-600 px-5 py-2 rounded-lg hover:bg-yellow-300 hover:text-indigo-700 transition font-semibold shadow-lg"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-yellow-300 transition font-semibold">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-indigo-600 px-6 py-2 rounded-lg hover:bg-yellow-300 hover:text-indigo-700 transition font-semibold shadow-lg transform hover:scale-105"
                >
                  Sign Up Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2 hover:bg-white/20 rounded-lg transition">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-white/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/jobs"
              className="block px-4 py-3 text-indigo-600 hover:bg-indigo-50 rounded-lg font-semibold"
              onClick={() => setIsOpen(false)}
            >
              Find Jobs
            </Link>
            {user ? (
              <>
                <Link
                  to={getDashboardLink()}
                  className="block px-4 py-3 text-indigo-600 hover:bg-indigo-50 rounded-lg font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <div className="px-4 py-2 text-gray-600 text-sm">
                  Logged in as <span className="font-semibold text-indigo-600">{user.name}</span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-3 text-indigo-600 hover:bg-indigo-50 rounded-lg font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up Free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
