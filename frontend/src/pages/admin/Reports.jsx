import React from 'react';
import { FaDownload, FaChartLine, FaUsers, FaBriefcase } from 'react-icons/fa';

const Reports = () => {
  const stats = {
    monthlySignups: [
      { month: 'Jan', count: 450 },
      { month: 'Feb', count: 520 },
      { month: 'Mar', count: 680 },
      { month: 'Apr', count: 750 },
    ],
    topCompanies: [
      { name: 'Tech Corp', jobs: 45, applications: 1200 },
      { name: 'Innovation Labs', jobs: 32, applications: 890 },
      { name: 'Digital Solutions', jobs: 28, applications: 750 },
    ],
    popularCategories: [
      { category: 'Software Development', count: 450 },
      { category: 'Data Science', count: 320 },
      { category: 'UI/UX Design', count: 280 },
      { category: 'Marketing', count: 210 },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Reports & Analytics</h1>
          <button className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition">
            <FaDownload />
            Export Data
          </button>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Users</p>
                <p className="text-3xl font-bold text-primary-600">5,234</p>
                <p className="text-green-600 text-sm mt-1">↑ 12% from last month</p>
              </div>
              <FaUsers className="text-primary-600 text-4xl" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Jobs</p>
                <p className="text-3xl font-bold text-blue-600">1,456</p>
                <p className="text-green-600 text-sm mt-1">↑ 8% from last month</p>
              </div>
              <FaBriefcase className="text-blue-600 text-4xl" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Success Rate</p>
                <p className="text-3xl font-bold text-green-600">87%</p>
                <p className="text-green-600 text-sm mt-1">↑ 3% from last month</p>
              </div>
              <FaChartLine className="text-green-600 text-4xl" />
            </div>
          </div>
        </div>

        {/* Monthly Signups */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Monthly Signups</h2>
          <div className="space-y-4">
            {stats.monthlySignups.map((item, index) => (
              <div key={index} className="flex items-center">
                <span className="w-16 text-gray-600">{item.month}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-8">
                  <div
                    className="bg-primary-600 h-8 rounded-full flex items-center justify-end pr-4 text-white font-semibold"
                    style={{ width: `${(item.count / 800) * 100}%` }}
                  >
                    {item.count}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Companies */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Companies</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Jobs Posted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Applications
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stats.topCompanies.map((company, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{company.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{company.jobs}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{company.applications}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Popular Categories */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Job Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.popularCategories.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">{item.category}</span>
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full font-semibold">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
