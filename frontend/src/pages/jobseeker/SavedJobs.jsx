import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave, FaBookmark } from 'react-icons/fa';

const SavedJobs = () => {
  const savedJobs = [
    {
      id: 1,
      title: 'Senior React Developer',
      company: 'Tech Solutions',
      location: 'Mumbai',
      jobType: 'Full-time',
      salary: { min: 800000, max: 1200000 },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Saved Jobs</h1>

        <div className="space-y-4">
          {savedJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <Link to={`/jobs/${job.id}`}>
                    <h3 className="text-2xl font-semibold text-gray-900 hover:text-primary-600 mb-2">
                      {job.title}
                    </h3>
                  </Link>
                  <p className="text-lg text-gray-700 mb-3">{job.company}</p>

                  <div className="flex flex-wrap gap-4 text-gray-600">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-primary-600" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <FaBriefcase className="mr-2 text-primary-600" />
                      {job.jobType}
                    </div>
                    <div className="flex items-center">
                      <FaMoneyBillWave className="mr-2 text-primary-600" />
                      ₹{job.salary.min.toLocaleString()} - ₹{job.salary.max.toLocaleString()}
                    </div>
                  </div>
                </div>

                <button className="text-primary-600 hover:text-primary-700">
                  <FaBookmark size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedJobs;
