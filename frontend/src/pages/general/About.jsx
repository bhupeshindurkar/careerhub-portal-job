import React from 'react';
import { FaRocket, FaUsers, FaAward, FaHeart } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">About CareerHub Pro</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Connecting talented professionals with amazing opportunities since 2024
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To revolutionize the job search experience by creating meaningful connections
              between job seekers and employers through innovative technology and personalized service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaRocket className="text-primary-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">
                Cutting-edge technology for better job matching
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-blue-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600">
                Building a strong network of professionals
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaAward className="text-green-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-gray-600">
                Committed to delivering the best experience
              </p>
            </div>

            <div className="text-center">
              <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-red-600 text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Passion</h3>
              <p className="text-gray-600">
                Passionate about helping people succeed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold text-primary-600 mb-2">10,000+</h3>
              <p className="text-gray-600">Active Jobs</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-primary-600 mb-2">50,000+</h3>
              <p className="text-gray-600">Job Seekers</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-primary-600 mb-2">5,000+</h3>
              <p className="text-gray-600">Companies</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-primary-600 mb-2">95%</h3>
              <p className="text-gray-600">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Built By</h2>
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-primary-600 mb-2">BHUPESH INDURKAR</h3>
            <p className="text-xl text-gray-700 mb-4">Full Stack Developer</p>
            <p className="text-gray-600 mb-6">
              Specialized in MERN Stack Development with a passion for creating
              innovative and user-friendly web applications that solve real-world problems.
            </p>
            <div className="flex justify-center gap-4">
              <span className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full">React.js</span>
              <span className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full">Node.js</span>
              <span className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full">MongoDB</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
