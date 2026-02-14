import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaMapMarkerAlt, FaBriefcase, FaUsers, FaCheckCircle, FaRocket, FaBuilding, FaLinkedin, FaGithub, FaGlobe } from 'react-icons/fa';

const Home = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    keyword: '',
    location: '',
    company: ''
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchData.keyword) params.append('search', searchData.keyword);
    if (searchData.location) params.append('location', searchData.location);
    if (searchData.company) params.append('company', searchData.company);
    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white py-28 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-yellow-300 rounded-full opacity-40 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-pink-300 rounded-full opacity-50 animate-pulse animation-delay-4000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="mb-8 animate-fadeIn">
              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-6 py-3 rounded-full text-sm font-bold shadow-lg transform hover:scale-105 transition">
                <span className="animate-pulse">🚀</span>
                India's #1 Professional Job Portal
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight animate-fadeIn">
              Find Your <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">Dream Career</span>
              <br />
              <span className="text-4xl md:text-6xl">With CareerHub Pro</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-200 max-w-3xl mx-auto leading-relaxed animate-fadeIn">
              Connect with <span className="font-bold text-yellow-300">top companies</span> across India. 
              <br />Your next opportunity is just a search away.
            </p>
            
            {/* Professional Search Bar */}
            <form onSubmit={handleSearch} className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-sm bg-white/95 border border-gray-100 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center bg-gray-50 rounded-xl px-4 py-3 border-2 border-transparent focus-within:border-primary-500 focus-within:bg-white transition">
                  <FaSearch className="text-primary-600 mr-3 text-lg" />
                  <input
                    type="text"
                    placeholder="Job title, keywords..."
                    value={searchData.keyword}
                    onChange={(e) => setSearchData({...searchData, keyword: e.target.value})}
                    className="w-full outline-none text-gray-700 bg-transparent font-medium"
                  />
                </div>
                <div className="flex items-center bg-gray-50 rounded-xl px-4 py-3 border-2 border-transparent focus-within:border-primary-500 focus-within:bg-white transition">
                  <FaBuilding className="text-primary-600 mr-3 text-lg" />
                  <input
                    type="text"
                    placeholder="Company name..."
                    value={searchData.company}
                    onChange={(e) => setSearchData({...searchData, company: e.target.value})}
                    className="w-full outline-none text-gray-700 bg-transparent font-medium"
                  />
                </div>
                <div className="flex items-center bg-gray-50 rounded-xl px-4 py-3 border-2 border-transparent focus-within:border-primary-500 focus-within:bg-white transition">
                  <FaMapMarkerAlt className="text-primary-600 mr-3 text-lg" />
                  <input
                    type="text"
                    placeholder="Location..."
                    value={searchData.location}
                    onChange={(e) => setSearchData({...searchData, location: e.target.value})}
                    className="w-full outline-none text-gray-700 bg-transparent font-medium"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
                >
                  <FaSearch />
                  Search Jobs
                </button>
              </div>
              <div className="flex flex-wrap gap-2 justify-center items-center">
                <span className="text-sm font-semibold text-gray-600">🔥 Trending:</span>
                {['React Developer', 'Full Stack', 'Python', 'UI/UX Designer', 'DevOps'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSearchData({...searchData, keyword: tag})}
                    className="text-sm bg-gradient-to-r from-gray-100 to-gray-200 hover:from-primary-100 hover:to-primary-200 text-gray-700 hover:text-primary-700 px-4 py-2 rounded-full transition transform hover:scale-105 font-medium shadow-sm"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%), linear-gradient(-45deg, #000 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #000 75%), linear-gradient(-45deg, transparent 75%, #000 75%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
          }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Growing Platform</h2>
            <p className="text-xl text-gray-600">Join our community of job seekers and employers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-10 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 border border-blue-100">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <FaBriefcase className="text-white text-4xl" />
              </div>
              <h3 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">100+</h3>
              <p className="text-gray-700 font-semibold text-lg">Active Jobs</p>
              <p className="text-gray-500 text-sm mt-2">Updated regularly</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-10 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 border border-purple-100">
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <FaUsers className="text-white text-4xl" />
              </div>
              <h3 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">500+</h3>
              <p className="text-gray-700 font-semibold text-lg">Registered Users</p>
              <p className="text-gray-500 text-sm mt-2">Growing daily</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-10 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 border border-green-100">
              <div className="bg-gradient-to-br from-green-600 to-emerald-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <FaCheckCircle className="text-white text-4xl" />
              </div>
              <h3 className="text-5xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">50+</h3>
              <p className="text-gray-700 font-semibold text-lg">Successful Hires</p>
              <p className="text-gray-500 text-sm mt-2">And counting</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block bg-gradient-to-r from-primary-100 to-purple-100 text-primary-700 px-6 py-2 rounded-full text-sm font-bold mb-4">
              SIMPLE PROCESS
            </span>
            <h2 className="text-5xl font-extrabold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Get hired in 3 simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-1 bg-gradient-to-r from-primary-200 via-purple-200 to-pink-200"></div>
            
            <div className="text-center relative">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl transform hover:scale-110 transition relative z-10">
                <span className="text-4xl font-extrabold text-white">1</span>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Create Account</h3>
                <p className="text-gray-600 leading-relaxed">
                  Sign up as a job seeker or employer in just a few clicks. Quick and easy registration process.
                </p>
              </div>
            </div>

            <div className="text-center relative">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl transform hover:scale-110 transition relative z-10">
                <span className="text-4xl font-extrabold text-white">2</span>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Complete Profile</h3>
                <p className="text-gray-600 leading-relaxed">
                  Add your skills, experience, and upload your resume. Make your profile stand out.
                </p>
              </div>
            </div>

            <div className="text-center relative">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl transform hover:scale-110 transition relative z-10">
                <span className="text-4xl font-extrabold text-white">3</span>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Apply & Get Hired</h3>
                <p className="text-gray-600 leading-relaxed">
                  Browse jobs, apply with one click, and track your applications in real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl animate-bounce">
            <FaRocket className="text-5xl text-gray-900" />
          </div>
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6">Ready to Get Started?</h2>
          <p className="text-2xl mb-12 text-gray-200 max-w-3xl mx-auto">
            Join <span className="font-bold text-yellow-300">hundreds</span> of job seekers and employers today. Your dream job awaits!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/register"
              className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-10 py-5 rounded-2xl font-bold text-lg hover:from-yellow-500 hover:to-orange-500 transition transform hover:scale-105 shadow-2xl flex items-center justify-center gap-3"
            >
              <FaRocket />
              Sign Up Now - It's Free
            </Link>
            <Link
              to="/jobs"
              className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-gray-900 transition transform hover:scale-105 shadow-xl flex items-center justify-center gap-3"
            >
              <FaBriefcase />
              Browse 10,000+ Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Developer Credit & Portfolio */}
      <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">Crafted with Excellence</h3>
            <p className="text-lg mb-4">
              Developed by <strong className="text-primary-400 text-xl">BHUPESH INDURKAR</strong>
            </p>
            <p className="text-gray-300 mb-6">
              Full Stack Developer | MERN Stack Specialist | 2+ Years Experience | 15+ Projects Delivered
            </p>
            <div className="flex justify-center items-center gap-6 mb-4">
              <a
                href="https://bhupesh-indurkar-portfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 px-6 py-3 rounded-lg transition transform hover:scale-105"
              >
                <FaGlobe />
                <span>Visit Portfolio</span>
              </a>
              <a
                href="https://www.linkedin.com/in/bhupesh-indurkar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition transform hover:scale-105"
              >
                <FaLinkedin />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/bhupesh-indurkar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg transition transform hover:scale-105"
              >
                <FaGithub />
                <span>GitHub</span>
              </a>
            </div>
            <p className="text-sm text-gray-400">📍 Nagpur, Maharashtra, India</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
