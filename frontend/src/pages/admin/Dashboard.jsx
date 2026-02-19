import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaBriefcase, FaUserTie, FaChartLine, FaClock, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import Loader from '../../components/common/Loader';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [latestUsers, setLatestUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setStats(response.data.stats);
      setLatestUsers(response.data.latestUsers);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your platform.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <FaUsers className="text-3xl" />
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90">Total Users</p>
                <p className="text-4xl font-bold">{stats?.totalUsers || 0}</p>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <FaClock className="mr-2" />
              <span>+{stats?.recentUsers || 0} this week</span>
            </div>
          </div>

          {/* Job Seekers */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <FaUserTie className="text-3xl" />
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90">Job Seekers</p>
                <p className="text-4xl font-bold">{stats?.totalJobSeekers || 0}</p>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <FaCheckCircle className="mr-2" />
              <span>Active candidates</span>
            </div>
          </div>

          {/* Total Jobs */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <FaBriefcase className="text-3xl" />
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90">Total Jobs</p>
                <p className="text-4xl font-bold">{stats?.totalJobs || 0}</p>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <FaClock className="mr-2" />
              <span>+{stats?.recentJobs || 0} this week</span>
            </div>
          </div>

          {/* Applications */}
          <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl shadow-xl p-6 text-white transform hover:scale-105 transition">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <FaChartLine className="text-3xl" />
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90">Applications</p>
                <p className="text-4xl font-bold">{stats?.totalApplications || 0}</p>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <FaCheckCircle className="mr-2" />
              <span>Total submissions</span>
            </div>
          </div>
        </div>

        {/* Latest Users & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Latest Registrations */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Latest Registrations</h2>
              <Link to="/admin/users" className="text-indigo-600 hover:text-indigo-700 font-semibold">
                View All →
              </Link>
            </div>
            
            <div className="space-y-4">
              {latestUsers.slice(0, 5).map((user) => (
                <div key={user._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.role === 'admin' ? 'bg-red-100 text-red-700' :
                      user.role === 'employer' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {user.role}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to="/admin/users"
                className="block w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl text-center font-semibold hover:from-indigo-700 hover:to-purple-700 transition shadow-lg"
              >
                Manage Users
              </Link>
              <Link
                to="/admin/companies"
                className="block w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl text-center font-semibold hover:from-blue-700 hover:to-cyan-700 transition shadow-lg"
              >
                Manage Companies
              </Link>
              <button className="block w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl text-center font-semibold hover:from-green-700 hover:to-emerald-700 transition shadow-lg">
                View Reports
              </button>
            </div>

            {/* System Info */}
            <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
              <p className="text-sm font-semibold text-gray-700 mb-2">System Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
