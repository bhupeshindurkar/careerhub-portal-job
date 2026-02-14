import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getJobs, reset } from '../../redux/slices/jobSlice';
import Loader from '../../components/common/Loader';
import { FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave, FaClock, FaSearch, FaGlobe } from 'react-icons/fa';

const Jobs = () => {
  const dispatch = useDispatch();
  const { jobs, isLoading, totalPages, currentPage } = useSelector((state) => state.jobs);

  const [filters, setFilters] = useState({
    search: '',
    company: '',
    jobType: '',
    location: '',
    country: '',
    experience: '',
  });

  useEffect(() => {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    const companyParam = urlParams.get('company');
    const locationParam = urlParams.get('location');
    
    if (searchParam || companyParam || locationParam) {
      setFilters({
        ...filters,
        search: searchParam || '',
        company: companyParam || '',
        location: locationParam || ''
      });
      dispatch(getJobs({
        search: searchParam || '',
        company: companyParam || '',
        location: locationParam || ''
      }));
    } else {
      dispatch(getJobs(filters));
    }
    return () => dispatch(reset());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getJobs(filters));
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-12 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-40 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Professional Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
              🔥 {jobs?.length || 15}+ LIVE JOBS
            </span>
          </div>
          <h1 className="text-6xl font-extrabold text-white mb-4 drop-shadow-2xl">
            Discover Your Dream Job
          </h1>
          <p className="text-xl text-indigo-200 max-w-3xl mx-auto leading-relaxed">
            Connect with top companies and find opportunities that match your skills and aspirations
          </p>
        </div>

        {/* Enhanced Search and Filters */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-12 border-2 border-white/20">
          <form onSubmit={handleSearch} className="space-y-6">
            {/* First Row - Main Search */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-white mb-2">
                  Job Title / Keywords
                  <span className="text-xs font-normal text-indigo-200 ml-2">(e.g., Software Engineer, Java, Python, Data Analyst)</span>
                </label>
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-300 text-lg" />
                  <input
                    type="text"
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                    placeholder="Search by job title, skills, or keywords..."
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border-2 border-white/30 rounded-xl text-white placeholder-indigo-200 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition font-medium backdrop-blur-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-2">
                  Company Name
                  <span className="text-xs font-normal text-indigo-200 ml-2">(e.g., TCS, Infosys, Google)</span>
                </label>
                <div className="relative">
                  <FaBriefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-300 text-lg" />
                  <input
                    type="text"
                    name="company"
                    value={filters.company}
                    onChange={handleFilterChange}
                    placeholder="Search by company name..."
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border-2 border-white/30 rounded-xl text-white placeholder-indigo-200 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition font-medium backdrop-blur-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-2">
                  Job Type
                </label>
                <select
                  name="jobType"
                  value={filters.jobType}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-4 bg-white/10 border-2 border-white/30 rounded-xl text-white focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition font-medium backdrop-blur-sm"
                >
                  <option value="" className="bg-gray-800">All Types</option>
                  <option value="Full-time" className="bg-gray-800">Full-time</option>
                  <option value="Part-time" className="bg-gray-800">Part-time</option>
                  <option value="Internship" className="bg-gray-800">Internship</option>
                  <option value="Remote" className="bg-gray-800">Remote</option>
                  <option value="Contract" className="bg-gray-800">Contract</option>
                </select>
              </div>
            </div>

            {/* Second Row - Location & Country */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-bold text-white mb-2">
                  City / Location
                  <span className="text-xs font-normal text-indigo-200 ml-2">(e.g., Mumbai, Bangalore, Nagpur)</span>
                </label>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-300 text-lg" />
                  <input
                    type="text"
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                    placeholder="Search by city or location..."
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border-2 border-white/30 rounded-xl text-white placeholder-indigo-200 focus:ring-2 focus:ring-pink-400 focus:border-transparent transition font-medium backdrop-blur-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-2">
                  Country
                </label>
                <div className="relative">
                  <FaGlobe className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300 text-lg" />
                  <select
                    name="country"
                    value={filters.country}
                    onChange={handleFilterChange}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border-2 border-white/30 rounded-xl text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent transition font-medium backdrop-blur-sm"
                  >
                    <option value="" className="bg-gray-800">All Countries</option>
                    <option value="India" className="bg-gray-800">🇮🇳 India</option>
                    <option value="USA" className="bg-gray-800">🇺🇸 USA</option>
                    <option value="UK" className="bg-gray-800">🇬🇧 UK</option>
                    <option value="Canada" className="bg-gray-800">🇨🇦 Canada</option>
                    <option value="Australia" className="bg-gray-800">🇦🇺 Australia</option>
                    <option value="Germany" className="bg-gray-800">🇩🇪 Germany</option>
                    <option value="Singapore" className="bg-gray-800">🇸🇬 Singapore</option>
                    <option value="UAE" className="bg-gray-800">🇦🇪 UAE</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-2">
                  Experience Level
                </label>
                <select
                  name="experience"
                  value={filters.experience}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-4 bg-white/10 border-2 border-white/30 rounded-xl text-white focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition font-medium backdrop-blur-sm"
                >
                  <option value="" className="bg-gray-800">All Levels</option>
                  <option value="Fresher" className="bg-gray-800">Fresher (0-1 years)</option>
                  <option value="Junior" className="bg-gray-800">Junior (1-3 years)</option>
                  <option value="Mid" className="bg-gray-800">Mid-Level (3-5 years)</option>
                  <option value="Senior" className="bg-gray-800">Senior (5+ years)</option>
                </select>
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-bold hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 transition transform hover:scale-105 shadow-2xl flex items-center justify-center gap-2 mt-7"
              >
                <FaSearch />
                Search Jobs
              </button>
            </div>
            
            {/* Popular Companies Quick Filter with Contact Info */}
            <div className="pt-4 border-t-2 border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <span className="text-lg">🔥</span> Popular Companies (Click to Filter Jobs):
                </span>
                {filters.company && (
                  <button
                    type="button"
                    onClick={() => {
                      setFilters({...filters, company: ''});
                      dispatch(getJobs({...filters, company: ''}));
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition transform hover:scale-105 flex items-center gap-2"
                  >
                    ✕ Clear Company Filter
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'TCS', email: 'careers@tcs.com', hr: 'hr.tcs@tcs.com' },
                  { name: 'Infosys', email: 'careers@infosys.com', hr: 'hr@infosys.com' },
                  { name: 'Wipro', email: 'careers@wipro.com', hr: 'hr.wipro@wipro.com' },
                  { name: 'Tech Mahindra', email: 'careers@techmahindra.com', hr: 'hr@techmahindra.com' },
                  { name: 'HCL', email: 'careers@hcl.com', hr: 'hr.hcl@hcl.com' },
                  { name: 'Accenture', email: 'careers@accenture.com', hr: 'hr@accenture.com' },
                  { name: 'Persistent Systems', email: 'careers@persistent.com', hr: 'hr@persistent.com' },
                  { name: 'LTI Mindtree', email: 'careers@ltimindtree.com', hr: 'hr@ltimindtree.com' },
                  { name: 'Cybage', email: 'careers@cybage.com', hr: 'hr@cybage.com' },
                  { name: 'Bitwise', email: 'careers@bitwiseglobal.com', hr: 'hr@bitwiseglobal.com' },
                  { name: 'Codeprism', email: 'careers@codeprism.in', hr: 'hr@codeprism.in' },
                  { name: 'Trigent Software', email: 'careers@trigent.com', hr: 'hr@trigent.com' },
                  { name: 'Softenger', email: 'careers@softenger.com', hr: 'hr@softenger.com' },
                  { name: 'Quadrant Technologies', email: 'careers@quadranttechnologies.com', hr: 'hr@quadranttechnologies.com' }
                ].map((company) => (
                  <div
                    key={company.name}
                    className={`bg-gradient-to-br p-5 rounded-2xl border-3 transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:scale-105 active:scale-95 ${
                      filters.company === company.name 
                        ? 'from-indigo-100 via-purple-100 to-pink-100 border-indigo-600 shadow-2xl ring-4 ring-indigo-300' 
                        : 'from-white via-indigo-50 to-purple-50 border-indigo-300 hover:border-indigo-600 hover:shadow-2xl'
                    }`}
                    onClick={() => {
                      const newFilters = {...filters, company: company.name};
                      setFilters(newFilters);
                      dispatch(getJobs(newFilters));
                      // Scroll to top to see results
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <h3 className="font-bold text-gray-900 mb-3 text-lg hover:text-indigo-600 transition flex items-center gap-2 justify-between">
                      <span className="flex items-center gap-2">
                        <span className="text-2xl">🏢</span>
                        {company.name}
                      </span>
                      {filters.company === company.name && (
                        <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-bold animate-pulse">
                          ✓ SELECTED
                        </span>
                      )}
                    </h3>
                    <div className="space-y-2">
                      <div className="bg-blue-50 p-3 rounded-lg hover:bg-blue-100 transition shadow-sm">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-bold text-blue-700">📧 Careers Email:</span>
                        </div>
                        <a 
                          href={`mailto:${company.email}`}
                          className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium block mt-1 break-all"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {company.email}
                        </a>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg hover:bg-purple-100 transition shadow-sm">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-bold text-purple-700">👤 HR Email:</span>
                        </div>
                        <a 
                          href={`mailto:${company.hr}`}
                          className="text-sm text-purple-600 hover:text-purple-800 hover:underline font-medium block mt-1 break-all"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {company.hr}
                        </a>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t-2 border-indigo-200">
                      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold text-center py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition">
                        👆 CLICK TO FILTER JOBS
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Locations Quick Filter */}
            <div className="flex flex-wrap gap-3 pt-2">
              <span className="text-sm font-bold text-gray-700 flex items-center gap-2">
                <span className="text-lg">📍</span> Popular Locations:
              </span>
              {['Nagpur', 'Mumbai', 'Bangalore', 'Pune', 'Hyderabad', 'Delhi', 'Chennai', 'Noida', 'Gurgaon'].map((location) => (
                <button
                  key={location}
                  type="button"
                  onClick={() => {
                    setFilters({...filters, location});
                    dispatch(getJobs({...filters, location}));
                  }}
                  className="text-sm bg-gradient-to-r from-pink-100 to-rose-100 hover:from-pink-200 hover:to-rose-200 text-pink-700 hover:text-pink-800 px-4 py-2 rounded-full transition transform hover:scale-105 font-semibold shadow-sm hover:shadow-md"
                >
                  {location}
                </button>
              ))}
            </div>
          </form>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {jobs && jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job._id} className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition border-2 border-white/20 transform hover:-translate-y-2 hover:scale-[1.02]">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <Link to={`/jobs/${job._id}`}>
                      <h3 className="text-3xl font-bold text-white hover:text-yellow-300 mb-3 transition drop-shadow-lg">
                        {job.title}
                      </h3>
                    </Link>
                    <p className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 px-5 py-2 rounded-full text-white shadow-lg">
                        🏢 {job.company?.companyName || job.company?.name}
                      </span>
                    </p>

                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30">
                        <FaMapMarkerAlt className="text-pink-300" />
                        <span className="font-medium text-white">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30">
                        <FaBriefcase className="text-blue-300" />
                        <span className="font-medium text-white">{job.jobType}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30">
                        <FaMoneyBillWave className="text-green-300" />
                        <span className="font-medium text-white">₹{job.salary.min.toLocaleString()} - ₹{job.salary.max.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30">
                        <FaClock className="text-orange-300" />
                        <span className="font-medium text-white">{new Date(job.postedDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {job.skillsRequired?.slice(0, 5).map((skill, index) => (
                        <span
                          key={index}
                          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg border border-white/30"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.skillsRequired?.length > 5 && (
                        <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-bold border border-white/30">
                          +{job.skillsRequired.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>

                  <Link
                    to={`/jobs/${job._id}`}
                    className="ml-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-8 py-4 rounded-xl hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 transition transform hover:scale-110 shadow-2xl font-bold text-lg"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20">
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 max-w-2xl mx-auto border-2 border-white/20">
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-3xl font-bold text-white mb-4">No Jobs Found</h3>
                <p className="text-lg text-indigo-200 mb-6">
                  We couldn't find any jobs matching your criteria. Try adjusting your filters or search terms.
                </p>
                <button
                  onClick={() => {
                    setFilters({ search: '', company: '', jobType: '', location: '', country: '', experience: '' });
                    dispatch(getJobs({}));
                  }}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:from-yellow-500 hover:to-orange-600 transition transform hover:scale-105 shadow-xl"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
