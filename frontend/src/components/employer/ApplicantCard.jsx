import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaDownload, FaCalendar } from 'react-icons/fa';

const ApplicantCard = ({ applicant, onStatusChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-start">
        <div className="flex items-start flex-1">
          <img
            src={applicant.applicant?.profilePicture || 'https://via.placeholder.com/80'}
            alt={applicant.applicant?.name}
            className="w-16 h-16 rounded-full mr-4 object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-semibold text-gray-900">
                {applicant.applicant?.name}
              </h3>
              {applicant.matchScore && (
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {applicant.matchScore}% Match
                </span>
              )}
            </div>

            <div className="text-gray-600 mb-3">
              <p className="text-sm">{applicant.applicant?.email}</p>
              <p className="text-sm">{applicant.applicant?.phone}</p>
              <p className="text-sm">{applicant.applicant?.location}</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {applicant.applicant?.skills?.slice(0, 5).map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>

            <p className="text-sm text-gray-500">
              Applied: {new Date(applicant.appliedDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 ml-4">
          <button
            onClick={() => onStatusChange(applicant._id, 'shortlisted')}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm"
          >
            <FaCheckCircle />
            Shortlist
          </button>
          <button
            onClick={() => onStatusChange(applicant._id, 'rejected')}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm"
          >
            <FaTimesCircle />
            Reject
          </button>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm">
            <FaCalendar />
            Schedule
          </button>
          <a
            href={applicant.resume || applicant.applicant?.resume}
            download
            className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition text-sm text-center"
          >
            <FaDownload />
            Resume
          </a>
        </div>
      </div>

      {applicant.coverLetter && (
        <div className="mt-4 bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Cover Letter:</h4>
          <p className="text-gray-700 text-sm">{applicant.coverLetter}</p>
        </div>
      )}
    </div>
  );
};

export default ApplicantCard;
