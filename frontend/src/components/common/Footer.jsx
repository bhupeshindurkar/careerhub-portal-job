import React from 'react';
import { Link } from 'react-router-dom';
import { FaBriefcase, FaLinkedin, FaGithub, FaGlobe, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FaBriefcase className="text-primary-500 text-2xl" />
              <span className="text-xl font-bold">CareerHub Pro</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your gateway to finding the perfect job. Connect with top employers and build your career across India.
            </p>
            <div className="mt-4">
              <p className="text-xs text-gray-500">Growing job portal platform</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/jobs" className="text-gray-400 hover:text-primary-400 transition">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary-400 transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-primary-400 transition">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-primary-400 transition">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="text-lg font-semibold mb-4">For Employers</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/employer/post-job" className="text-gray-400 hover:text-primary-400 transition">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/employer/dashboard" className="text-gray-400 hover:text-primary-400 transition">
                  Employer Dashboard
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-primary-400 transition">
                  Employer Signup
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Developed By</h3>
            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <p className="text-white font-bold mb-1">BHUPESH INDURKAR</p>
              <p className="text-primary-400 text-sm mb-2">Full Stack Developer</p>
              <p className="text-gray-400 text-xs mb-3">MERN Stack Specialist | 2+ Years Experience</p>
              <div className="flex items-center text-gray-400 text-xs mb-2">
                <FaMapMarkerAlt className="mr-2" />
                <span>Nagpur, Maharashtra</span>
              </div>
              <div className="flex items-center text-gray-400 text-xs">
                <FaEnvelope className="mr-2" />
                <a href="mailto:bhupeshindurkar@gmail.com" className="hover:text-primary-400">
                  bhupeshindurkar@gmail.com
                </a>
              </div>
            </div>
            <div className="flex space-x-3">
              <a 
                href="https://bhupesh-indurkar-portfolio.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-primary-600 hover:bg-primary-700 p-2 rounded transition"
                title="Portfolio"
              >
                <FaGlobe size={18} />
              </a>
              <a 
                href="https://www.linkedin.com/in/bhupesh-indurkar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 p-2 rounded transition"
                title="LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>
              <a 
                href="https://github.com/bhupesh-indurkar" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-gray-600 p-2 rounded transition"
                title="GitHub"
              >
                <FaGithub size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-2">
              © {new Date().getFullYear()} CareerHub Pro. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs">
              Developed by <a href="https://bhupesh-indurkar-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300">BHUPESH INDURKAR</a> | Full Stack Developer
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
