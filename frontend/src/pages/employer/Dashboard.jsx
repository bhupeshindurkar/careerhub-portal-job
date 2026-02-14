import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaBriefcase, FaUsers, FaCheckCircle, FaChartLine } from 'react-icons/fa';

const EmployerDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome, {user?.companyName || user?.name}!
          </h1>
          <p className="text-gray-600 mt-2">Manage your job postings and applications</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Jobs</p>
                <p className="text-3xl font-bold text-primary-600">15</p>
              </div>
              <FaBriefcase className="text-primary-600 text-3xl" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Applications</p>
                <p className="text-3xl font-bold text-blue-600">248</p>
              </div>
              <FaUsers className="text-blue-600 text-3xl" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Shortlisted</p>
                <p className="text-3xl font-bold text-green-600">42</p>
              </div>
              <FaCheckCircle className="text-green-600 text-3xl" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Views</p>
                <p className="text-3xl font-bold text-purple-600">1,234</p>
              </div>
              <FaChartLine className="text-purple-600 text-3xl" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
            <div className="space-y-4">
              <Link
                to="/employer/post-job"
                className="block w-full bg-primary-600 text-white py-3 rounded-lg text-center font-semibold hover:bg-primary-700 transition"
              >
                Post New Job
              </Link>
              <Link
                to="/employer/manage-jobs"
                className="block w-full bg-gray-200 text-gray-700 py-3 rounded-lg text-center font-semibold hover:bg-gray-300 transition"
              >
                Manage Jobs
              </Link>
              <Link
                to="/employer/company-profile"
                className="block w-full bg-gray-200 text-gray-700 py-3 rounded-lg text-center font-semibold hover:bg-gray-300 transition"
              >
                Update Company Profile
              </Link>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Recent Applications</h2>
            <p className="text-gray-600 mb-4">Latest candidates who applied to your jobs</p>
            <Link
              to="/employer/manage-jobs"
              className="text-primary-600 font-semibold hover:text-primary-700"
            >
              View All Applications →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
