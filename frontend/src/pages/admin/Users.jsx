import React, { useState } from 'react';
import { FaUser, FaBuilding, FaTrash, FaBan, FaCheckCircle } from 'react-icons/fa';

const Users = () => {
  const [activeTab, setActiveTab] = useState('jobseekers');

  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'jobseeker',
      isVerified: true,
      createdAt: '2024-01-15',
    },
    {
      id: 2,
      name: 'Tech Corp',
      email: 'hr@techcorp.com',
      role: 'employer',
      isVerified: true,
      createdAt: '2024-01-10',
    },
  ];

  const filteredUsers = users.filter((user) => {
    if (activeTab === 'jobseekers') return user.role === 'jobseeker';
    if (activeTab === 'employers') return user.role === 'employer';
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Manage Users</h1>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('jobseekers')}
              className={`flex-1 py-4 px-6 font-semibold ${
                activeTab === 'jobseekers'
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-gray-600'
              }`}
            >
              <FaUser className="inline mr-2" />
              Job Seekers
            </button>
            <button
              onClick={() => setActiveTab('employers')}
              className={`flex-1 py-4 px-6 font-semibold ${
                activeTab === 'employers'
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-gray-600'
              }`}
            >
              <FaBuilding className="inline mr-2" />
              Employers
            </button>
          </div>
        </div>

        {/* Users List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.isVerified ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Verified
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-red-600 hover:text-red-900 mr-3">
                      <FaTrash />
                    </button>
                    <button className="text-yellow-600 hover:text-yellow-900">
                      <FaBan />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
