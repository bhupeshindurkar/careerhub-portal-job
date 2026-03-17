import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaUsers, FaBriefcase, FaUserTie, FaChartLine, FaClock,
  FaCheckCircle, FaBuilding, FaFileAlt, FaArrowUp, FaShieldAlt,
  FaTachometerAlt, FaCog, FaBell, FaEye
} from 'react-icons/fa';
import axios from 'axios';
import Loader from '../../components/common/Loader';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const UserAvatar = ({ user }) => {
  const [imgError, setImgError] = useState(false);
  const hasImg = user.profilePicture && !imgError &&
    !user.profilePicture.includes('placeholder') &&
    !user.profilePicture.includes('ui-avatars');
  return (
    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-base flex-shrink-0 overflow-hidden ring-2 ring-indigo-200">
      {hasImg
        ? <img src={user.profilePicture} alt={user.name} className="w-full h-full object-cover" onError={() => setImgError(true)} />
        : <span>{user.name?.charAt(0).toUpperCase()}</span>}
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, sub, gradient, delay }) => (
  <div className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-2xl transform hover:-translate-y-1 hover:shadow-3xl transition-all duration-300 ${gradient}`}
    style={{ animationDelay: delay }}>
    <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -mr-8 -mt-8" />
    <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-white/5 -ml-6 -mb-6" />
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
          <Icon className="text-2xl" />
        </div>
        <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full text-xs font-semibold">
          <FaArrowUp className="text-xs" /> Live
        </div>
      </div>
      <p className="text-white/80 text-sm font-medium mb-1">{label}</p>
      <p className="text-5xl font-black tracking-tight">{value}</p>
      <p className="text-white/70 text-xs mt-2 flex items-center gap-1">
        <FaClock className="text-xs" /> {sub}
      </p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [latestUsers, setLatestUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const now = new Date();

  useEffect(() => { fetchDashboardData(); }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_URL}/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(res.data.stats);
      setLatestUsers(res.data.latestUsers);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  const statCards = [
    { icon: FaUsers,    label: 'Total Users',     value: stats?.totalUsers || 0,        sub: `+${stats?.recentUsers || 0} this week`,      gradient: 'bg-gradient-to-br from-violet-600 to-indigo-700' },
    { icon: FaUserTie,  label: 'Job Seekers',      value: stats?.totalJobSeekers || 0,   sub: 'Active candidates',                           gradient: 'bg-gradient-to-br from-cyan-500 to-blue-600' },
    { icon: FaBuilding, label: 'Employers',        value: stats?.totalEmployers || 0,    sub: 'Registered companies',                        gradient: 'bg-gradient-to-br from-emerald-500 to-teal-600' },
    { icon: FaBriefcase,label: 'Total Jobs',       value: stats?.totalJobs || 0,         sub: `+${stats?.recentJobs || 0} this week`,        gradient: 'bg-gradient-to-br from-orange-500 to-pink-600' },
    { icon: FaFileAlt,  label: 'Applications',     value: stats?.totalApplications || 0, sub: 'Total submissions',                           gradient: 'bg-gradient-to-br from-rose-500 to-red-600' },
    { icon: FaChartLine,label: 'Active Jobs',      value: stats?.activeJobs || 0,        sub: 'Currently open',                              gradient: 'bg-gradient-to-br from-purple-500 to-fuchsia-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 px-6 py-10">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay:'1s'}} />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-white/10 backdrop-blur-sm p-2 rounded-xl">
                  <FaTachometerAlt className="text-white text-xl" />
                </div>
                <span className="text-white/60 text-sm font-medium uppercase tracking-widest">Admin Panel</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
                Control Center
              </h1>
              <p className="text-white/60 text-base">
                {now.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-3 text-center">
                <p className="text-white/60 text-xs uppercase tracking-wider">Platform</p>
                <p className="text-white font-bold text-lg">CareerHub Pro</p>
              </div>
              <div className="bg-green-500/20 border border-green-400/30 backdrop-blur-sm rounded-2xl px-5 py-3 text-center">
                <div className="flex items-center gap-2 justify-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <p className="text-green-300 font-bold text-sm">Online</p>
                </div>
                <p className="text-green-400/70 text-xs">All systems go</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {statCards.map((s, i) => (
            <StatCard key={i} {...s} delay={`${i * 100}ms`} />
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Latest Registrations */}
          <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-500/20 p-2 rounded-xl">
                  <FaUsers className="text-indigo-400 text-lg" />
                </div>
                <div>
                  <h2 className="text-white font-bold text-lg">Latest Registrations</h2>
                  <p className="text-gray-500 text-xs">Most recent signups</p>
                </div>
              </div>
              <Link to="/admin/users"
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition">
                <FaEye /> View All
              </Link>
            </div>
            <div className="divide-y divide-gray-800">
              {latestUsers.slice(0, 6).map((user) => (
                <div key={user._id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-800/50 transition">
                  <div className="flex items-center gap-3">
                    <UserAvatar user={user} />
                    <div>
                      <p className="text-white font-semibold text-sm">{user.name}</p>
                      <p className="text-gray-500 text-xs">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      user.role === 'admin' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      user.role === 'employer' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                      'bg-green-500/20 text-green-400 border border-green-500/30'
                    }`}>
                      {user.role}
                    </span>
                    <p className="text-gray-600 text-xs hidden md:block">
                      {new Date(user.createdAt).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel */}
          <div className="flex flex-col gap-4">

            {/* Quick Actions */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-purple-500/20 p-2 rounded-xl">
                  <FaCog className="text-purple-400 text-lg" />
                </div>
                <h2 className="text-white font-bold text-lg">Quick Actions</h2>
              </div>
              <div className="space-y-3">
                <Link to="/admin/users"
                  className="flex items-center gap-3 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-4 rounded-xl font-semibold transition shadow-lg text-sm">
                  <FaUsers /> Manage Users
                  <span className="ml-auto bg-white/20 text-xs px-2 py-0.5 rounded-full">{stats?.totalUsers || 0}</span>
                </Link>
                <Link to="/admin/companies"
                  className="flex items-center gap-3 w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-3 px-4 rounded-xl font-semibold transition shadow-lg text-sm">
                  <FaBuilding /> Manage Companies
                  <span className="ml-auto bg-white/20 text-xs px-2 py-0.5 rounded-full">{stats?.totalEmployers || 0}</span>
                </Link>
                <Link to="/admin/reports"
                  className="flex items-center gap-3 w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3 px-4 rounded-xl font-semibold transition shadow-lg text-sm">
                  <FaChartLine /> View Reports
                  <span className="ml-auto bg-white/20 text-xs px-2 py-0.5 rounded-full">{stats?.totalApplications || 0}</span>
                </Link>
              </div>
            </div>

            {/* Platform Health */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-green-500/20 p-2 rounded-xl">
                  <FaShieldAlt className="text-green-400 text-lg" />
                </div>
                <h2 className="text-white font-bold text-lg">Platform Health</h2>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'API Server', status: 'Operational', color: 'green' },
                  { label: 'Database', status: 'Connected', color: 'green' },
                  { label: 'Auth Service', status: 'Active', color: 'green' },
                  { label: 'File Storage', status: 'Online', color: 'green' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-green-400 text-xs font-semibold">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-800">
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>Uptime</span>
                  <span className="text-green-400 font-bold">99.9%</span>
                </div>
                <div className="mt-2 bg-gray-800 rounded-full h-1.5">
                  <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-1.5 rounded-full" style={{width:'99.9%'}} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
