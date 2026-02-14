import React from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaCheckCircle, FaTimesCircle, FaEye } from 'react-icons/fa';

const ApplicationCard = ({ application, onWithdraw }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FaClock className="text-yellow-500" />;
      case 'viewed':
        return <FaEye className="text-blue-500" />;
      case 'shortlisted':
        return <FaCheckCircle className="text-green-500" />;
      case 'rejected':
        return <FaTimesCircle className="text-red-500" />;
      case 'hired':
        return <FaCheckCircle className="text-green-600" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'viewed':
        return 'bg-blue-100 text-blue-800';
      case 'shortlisted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'hired':
        return 'bg-green-200 text-green-900';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <Link to={`/jobs/${application.job?._id}`}>
            <h3 className="text-xl font-semibold text-gray-900 hover:text-primary-600 mb-2">
              {application.job?.title}
            </h3>
          </Link>
          <p className="text-gray-600 mb-2">
            {application.job?.company?.companyName || application.job?.company?.name}
          </p>
          <p className="text-sm text-gray-500">
            Applied on: {new Date(application.appliedDate).toLocaleDateString()}
          </p>
          {application.matchScore && (
            <p className="text-sm text-primary-600 font-semibold mt-2">
              Match Score: {application.matchScore}%
            </p>
          )}
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            {getStatusIcon(application.status)}
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(application.status)}`}>
              {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {application.interviewDate && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-4">
          <p className="text-sm font-semibold text-blue-800">
            Interview Scheduled: {new Date(application.interviewDate).toLocaleString()}
          </p>
          {application.interviewLink && (
            <a
              href={application.interviewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              Join Interview
            </a>
          )}
        </div>
      )}

      {application.notes && (
        <div className="bg-gray-50 p-3 rounded mb-4">
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> {application.notes}
          </p>
        </div>
      )}

      <div className="flex gap-3">
        <Link
          to={`/jobs/${application.job?._id}`}
          className="flex-1 bg-primary-600 text-white py-2 rounded-lg text-center hover:bg-primary-700 transition"
        >
          View Job
        </Link>
        {application.status === 'pending' && onWithdraw && (
          <button
            onClick={() => onWithdraw(application._id)}
            className="flex-1 bg-red-100 text-red-600 py-2 rounded-lg hover:bg-red-200 transition"
          >
            Withdraw
          </button>
        )}
      </div>
    </div>
  );
};

export default ApplicationCard;
