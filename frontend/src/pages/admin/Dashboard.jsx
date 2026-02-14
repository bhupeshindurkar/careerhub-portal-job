import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaBriefcase, FaBuilding, FaChartLine } from 'react-icons/fa';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Users</p>
                <p className="text-3xl font-bold text-primary-600">5,234</p>
              </div>
              <FaUsers className="text-primary-600 text-3xl" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Jobs</p>
                <p className="text-3xl font-bold text-blue-600">1,456</p>
              </div>
              <FaBriefcase className="text-blue-600 text-3xl" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Companies</p>
                <p className="text-3xl font-bold text-green-600">342</p>
              </div>
              <FaBuilding className="text-green-600 text-3xl" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Applications</p>
                <p className="text-3xl font-bold text-purple-600">12,456</p>
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
                to="/admin/users"
                className="block w-full bg-primary-600 text-white py-3 rounded-lg text-center font-semibold hover:bg-primary-700 transition"
              >
                Manage Users
              </Link>
              <button className="block w-full bg-gray-200 text-gray-700 py-3 rounded-lg text-center font-semibold hover:bg-gray-300 transition">
                View Reports
              </button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
            <p className="text-gray-600">Latest system activities and user registrations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
