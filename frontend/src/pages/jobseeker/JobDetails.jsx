import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getJob, reset } from '../../redux/slices/jobSlice';
import Loader from '../../components/common/Loader';
import { toast } from 'react-toastify';
import { FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave, FaClock, FaBuilding } from 'react-icons/fa';

const JobDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { job, isLoading } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.auth);
  const [showApplyModal, setShowApplyModal] = useState(false);

  useEffect(() => {
    dispatch(getJob(id));
    return () => dispatch(reset());
  }, [dispatch, id]);

  const handleApply = () => {
    if (!user) {
      toast.error('Please login to apply');
      navigate('/login');
      return;
    }
    setShowApplyModal(true);
  };

  if (isLoading || !job) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Header */}
          <div className="border-b pb-6 mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{job.title}</h1>
            <div className="flex items-center text-lg text-gray-700 mb-4">
              <FaBuilding className="mr-2 text-primary-600" />
              <span className="font-semibold">{job.company?.companyName || job.company?.name}</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-600">
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
              <div className="flex items-center">
                <FaClock className="mr-2 text-primary-600" />
                {new Date(job.postedDate).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Apply Button */}
          <div className="mb-8">
            <button
              onClick={handleApply}
              className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition text-lg"
            >
              Apply Now
            </button>
          </div>

          {/* Job Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
          </div>

          {/* Requirements */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
            <p className="text-gray-700 whitespace-pre-line">{job.requirements}</p>
          </div>

          {/* Skills Required */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Skills Required</h2>
            <div className="flex flex-wrap gap-2">
              {job.skillsRequired?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Additional Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <span className="font-semibold">Experience Required:</span> {job.experience}
              </div>
              <div>
                <span className="font-semibold">Number of Openings:</span> {job.numberOfOpenings || 1}
              </div>
              <div>
                <span className="font-semibold">Application Deadline:</span>{' '}
                {new Date(job.deadline).toLocaleDateString()}
              </div>
              <div>
                <span className="font-semibold">Total Applicants:</span> {job.applicantsCount || 0}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">Apply for this job</h3>
            <p className="text-gray-600 mb-6">
              Your application will be submitted with your current profile information.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  toast.success('Application submitted successfully!');
                  setShowApplyModal(false);
                }}
                className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowApplyModal(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
