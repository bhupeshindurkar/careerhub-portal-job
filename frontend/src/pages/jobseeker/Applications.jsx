import React from 'react';
import { FaFileAlt, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Applications = () => {
  const applications = [
    {
      id: 1,
      jobTitle: 'Frontend Developer',
      company: 'Tech Corp',
      appliedDate: '2024-01-15',
      status: 'pending',
    },
    {
      id: 2,
      jobTitle: 'Full Stack Developer',
      company: 'Innovation Labs',
      appliedDate: '2024-01-10',
      status: 'shortlisted',
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FaClock className="text-yellow-500" />;
      case 'shortlisted':
        return <FaCheckCircle className="text-green-500" />;
      case 'rejected':
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaFileAlt className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'shortlisted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Applications</h1>

        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {app.jobTitle}
                  </h3>
                  <p className="text-lg text-gray-700 mb-3">{app.company}</p>
                  <p className="text-gray-600">
                    Applied on: {new Date(app.appliedDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {getStatusIcon(app.status)}
                  <span
                    className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(
                      app.status
                    )}`}
                  >
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Applications;
