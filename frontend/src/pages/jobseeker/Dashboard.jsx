import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  FaBriefcase, FaFileAlt, FaBookmark, FaUser, FaChartLine, 
  FaClock, FaCheckCircle, FaEye, FaSearch,
  FaRocket, FaFire
} from 'react-icons/fa';
import dashboardService from '../../redux/services/dashboardService';
import Loader from '../../components/common/Loader';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch dashboard data
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await dashboardService.getJobSeekerDashboard();
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get greeting based on time
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header with Real-time Clock */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-4xl font-extrabold mb-2">{getGreeting()}, {user?.name}!</h1>
                <p className="text-indigo-100 text-lg">Ready to find your dream job today?</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{currentTime.toLocaleTimeString()}</div>
                <div className="text-indigo-200">{currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <Link
                to="/jobs"
                className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <FaSearch />
                Browse Jobs
              </Link>
              <Link
                to="/jobseeker/profile"
                className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-bold hover:bg-white/30 transition transform hover:scale-105 flex items-center gap-2"
              >
                <FaUser />
                Update Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition border border-blue-100 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-4 rounded-2xl shadow-lg">
                <FaUser className="text-white text-2xl" />
              </div>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">Active</span>
            </div>
            <p className="text-gray-600 text-sm font-semibold mb-1">Profile Completion</p>
            <p className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              {dashboardData?.profileCompletion?.percentage || 0}%
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-500" 
                style={{width: `${dashboardData?.profileCompletion?.percentage || 0}%`}}
              ></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition border border-purple-100 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 p-4 rounded-2xl shadow-lg">
                <FaFileAlt className="text-white text-2xl" />
              </div>
              <FaFire className="text-orange-500 text-2xl animate-pulse" />
            </div>
            <p className="text-gray-600 text-sm font-semibold mb-1">Applications</p>
            <p className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              {dashboardData?.stats?.totalApplications || 0}
            </p>
            <p className="text-sm text-gray-500">
              {dashboardData?.stats?.pendingApplications || 0} pending responses
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition border border-green-100 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-green-600 to-emerald-600 p-4 rounded-2xl shadow-lg">
                <FaBookmark className="text-white text-2xl" />
              </div>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">+3 New</span>
            </div>
            <p className="text-gray-600 text-sm font-semibold mb-1">Saved Jobs</p>
            <p className="text-4xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              {dashboardData?.stats?.savedJobsCount || 0}
            </p>
            <p className="text-sm text-gray-500">Your bookmarked jobs</p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition border border-orange-100 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-orange-600 to-yellow-600 p-4 rounded-2xl shadow-lg">
                <FaBriefcase className="text-white text-2xl" />
              </div>
              <FaTrophy className="text-yellow-500 text-2xl" />
            </div>
            <p className="text-gray-600 text-sm font-semibold mb-1">Interviews</p>
            <p className="text-4xl font-extrabold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-2">
              {dashboardData?.stats?.interviewsCount || 0}
            </p>
            <p className="text-sm text-gray-500">Shortlisted applications</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Application Status */}
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Recent Applications</h2>
              <Link to="/jobseeker/applications" className="text-indigo-600 font-semibold hover:text-indigo-700 flex items-center gap-2">
                View All <FaChartLine />
              </Link>
            </div>
            <div className="space-y-4">
              {dashboardData?.recentApplications && dashboardData.recentApplications.length > 0 ? (
                dashboardData.recentApplications.map((application) => (
                  <div key={application._id} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-3 rounded-xl">
                        <FaBriefcase className="text-white text-xl" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{application.job?.title || 'Job Title'}</h3>
                        <p className="text-sm text-gray-600">{application.job?.company || 'Company'}</p>
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${
                      application.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      application.status === 'shortlisted' ? 'bg-green-100 text-green-700' :
                      application.status === 'viewed' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {application.status === 'pending' && <FaClock />}
                      {application.status === 'shortlisted' && <FaCheckCircle />}
                      {application.status === 'viewed' && <FaEye />}
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No applications yet. Start applying to jobs!</p>
                  <Link to="/jobs" className="text-indigo-600 font-semibold hover:text-indigo-700 mt-2 inline-block">
                    Browse Jobs
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions & Notifications */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FaRocket className="text-indigo-600" />
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Link
                  to="/jobs"
                  className="block w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl text-center font-bold hover:from-indigo-700 hover:to-purple-700 transition transform hover:scale-105 shadow-lg"
                >
                  Browse Jobs
                </Link>
                <Link
                  to="/jobseeker/profile"
                  className="block w-full bg-gradient-to-r from-blue-100 to-indigo-100 text-indigo-700 py-3 rounded-xl text-center font-bold hover:from-blue-200 hover:to-indigo-200 transition"
                >
                  Update Profile
                </Link>
                <Link
                  to="/jobseeker/saved-jobs"
                  className="block w-full bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 py-3 rounded-xl text-center font-bold hover:from-green-200 hover:to-emerald-200 transition"
                >
                  Saved Jobs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
              <p className="text-sm text-gray-600 mb-3">Digital Agency • Pune</p>
              <div className="flex gap-2 mb-3">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Vue.js</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">CSS</span>
              </div>
              <p className="text-sm font-bold text-green-600">₹6-10 LPA</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
