import React from 'react';
import { useParams } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaDownload } from 'react-icons/fa';

const Applicants = () => {
  const { jobId } = useParams();

  const applicants = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+91 9876543210',
      appliedDate: '2024-01-20',
      status: 'pending',
      matchScore: 85,
      skills: ['React', 'Node.js', 'MongoDB'],
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+91 9876543211',
      appliedDate: '2024-01-19',
      status: 'shortlisted',
      matchScore: 92,
      skills: ['React', 'TypeScript', 'Redux'],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Applicants for Job #{jobId}
        </h1>

        <div className="space-y-4">
          {applicants.map((applicant) => (
            <div key={applicant.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="text-2xl font-semibold text-gray-900">{applicant.name}</h3>
                    <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
                      Match: {applicant.matchScore}%
                    </span>
                  </div>

                  <div className="text-gray-600 mb-3">
                    <p>{applicant.email}</p>
                    <p>{applicant.phone}</p>
                    <p className="text-sm">Applied: {new Date(applicant.appliedDate).toLocaleDateString()}</p>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {applicant.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                    <FaCheckCircle />
                    Shortlist
                  </button>
                  <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
                    <FaTimesCircle />
                    Reject
                  </button>
                  <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    <FaDownload />
                    Resume
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

export default Applicants;
