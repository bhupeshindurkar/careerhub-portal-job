import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave, FaClock, FaBookmark } from 'react-icons/fa';

const JobCard = ({ job, onSave }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          {job.company?.companyLogo && (
            <img
              src={job.company.companyLogo}
              alt={job.company.companyName}
              className="w-12 h-12 rounded-lg mr-4 object-cover"
            />
          )}
          <div>
            <Link to={`/jobs/${job._id}`}>
              <h3 className="text-xl font-semibold text-gray-900 hover:text-primary-600">
                {job.title}
              </h3>
            </Link>
            <p className="text-gray-600">{job.company?.companyName || job.company?.name}</p>
          </div>
        </div>
        <button
          onClick={() => onSave && onSave(job._id)}
          className="text-gray-400 hover:text-primary-600 transition"
        >
          <FaBookmark size={20} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4 text-sm text-gray-600">
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
          ₹{job.salary?.min?.toLocaleString()} - ₹{job.salary?.max?.toLocaleString()}
        </div>
        <div className="flex items-center">
          <FaClock className="mr-2 text-primary-600" />
          {new Date(job.postedDate).toLocaleDateString()}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.skillsRequired?.slice(0, 4).map((skill, index) => (
          <span
            key={index}
            className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-medium"
          >
            {skill}
          </span>
        ))}
        {job.skillsRequired?.length > 4 && (
          <span className="text-gray-500 text-xs">+{job.skillsRequired.length - 4} more</span>
        )}
      </div>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{job.applicantsCount || 0} applicants</span>
        <Link
          to={`/jobs/${job._id}`}
          className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
