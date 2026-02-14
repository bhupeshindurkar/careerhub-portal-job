import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaEye, FaUsers } from 'react-icons/fa';

const ManageJobs = () => {
  const jobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      location: 'Mumbai',
      jobType: 'Full-time',
      applicants: 45,
      status: 'active',
      postedDate: '2024-01-15',
    },
    {
      id: 2,
      title: 'Backend Developer',
      location: 'Bangalore',
      jobType: 'Full-time',
      applicants: 32,
      status: 'active',
      postedDate: '2024-01-10',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Manage Jobs</h1>
          <Link
            to="/employer/post-job"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
          >
            Post New Job
          </Link>
        </div>

        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                  <div className="flex gap-4 text-gray-600 mb-4">
                    <span>{job.location}</span>
                    <span>•</span>
                    <span>{job.jobType}</span>
                    <span>•</span>
                    <span>Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-700">
                    <FaUsers className="text-primary-600" />
                    <span className="font-semibold">{job.applicants} Applications</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link
                    to={`/employer/applicants/${job.id}`}
                    className="p-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                    title="View Applicants"
                  >
                    <FaEye />
                  </Link>
                  <button
                    className="p-3 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition"
                    title="Edit Job"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="p-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                    title="Delete Job"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageJobs;
