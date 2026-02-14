import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaLinkedin, FaGithub, FaGlobe, FaUserCircle } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent successfully! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-6 py-2 rounded-full text-sm font-bold mb-4">
            GET IN TOUCH
          </span>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Developer Profile Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl shadow-2xl p-8 text-white">
              <div className="text-center">
                <div className="w-24 h-24 bg-white rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-xl">
                  <span className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    BI
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2">BHUPESH INDURKAR</h3>
                <p className="text-indigo-100 font-semibold mb-1">Full Stack Developer</p>
                <p className="text-sm text-indigo-200 mb-4">MERN Stack Specialist</p>
                <div className="flex justify-center gap-3 mb-4">
                  <a
                    href="https://bhupesh-indurkar-portfolio.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/20 hover:bg-white/30 p-3 rounded-xl transition"
                  >
                    <FaGlobe className="text-xl" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/bhupesh-indurkar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/20 hover:bg-white/30 p-3 rounded-xl transition"
                  >
                    <FaLinkedin className="text-xl" />
                  </a>
                  <a
                    href="https://github.com/bhupesh-indurkar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/20 hover:bg-white/30 p-3 rounded-xl transition"
                  >
                    <FaGithub className="text-xl" />
                  </a>
                </div>
                <div className="text-sm text-indigo-100">
                  <p>2+ Years Experience</p>
                  <p>15+ Projects Delivered</p>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition border border-gray-100">
              <div className="flex items-start">
                <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-4 rounded-2xl mr-4">
                  <FaEnvelope className="text-indigo-600 text-2xl" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2">Email</h3>
                  <a 
                    href="mailto:bhupeshindurkar@gmail.com" 
                    className="text-indigo-600 hover:text-indigo-700 font-medium hover:underline break-all"
                  >
                    bhupeshindurkar@gmail.com
                  </a>
                  <p className="text-gray-500 text-sm mt-2">📧 Response within 24 hours</p>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition border border-gray-100">
              <div className="flex items-start">
                <div className="bg-gradient-to-br from-pink-100 to-rose-100 p-4 rounded-2xl mr-4">
                  <FaMapMarkerAlt className="text-pink-600 text-2xl" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2">Location</h3>
                  <p className="text-gray-600 font-medium">
                    Nagpur, Maharashtra<br />
                    India
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    🌐 Available for remote work
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
              <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Send us a Message</h2>
                <p className="text-gray-600">Fill out the form below and we'll get back to you within 24 hours.</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaUserCircle className="text-indigo-500 text-lg" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition font-medium"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaEnvelope className="text-indigo-500 text-lg" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition font-medium"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition font-medium"
                    placeholder="What is this about?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition font-medium resize-none"
                    placeholder="Tell us more about your inquiry..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                  <FaPaperPlane />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <span className="inline-block bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-6 py-2 rounded-full text-sm font-bold mb-4">
              FAQ
            </span>
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-lg">Quick answers to common questions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-8 border border-blue-100 hover:shadow-xl transition">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">How do I post a job?</h3>
              <p className="text-gray-600 leading-relaxed">
                Register as an employer, complete your company profile, and click on "Post Job" from your dashboard. It's quick and easy!
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-8 border border-purple-100 hover:shadow-xl transition">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Is the service free?</h3>
              <p className="text-gray-600 leading-relaxed">
                Job seekers can use all features for free. Employers have access to basic features with premium options available.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg p-8 border border-green-100 hover:shadow-xl transition">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">How do I apply for jobs?</h3>
              <p className="text-gray-600 leading-relaxed">
                Create a profile, upload your resume, browse jobs, and click "Apply" on any job listing that interests you.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl shadow-lg p-8 border border-orange-100 hover:shadow-xl transition">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Can I edit my application?</h3>
              <p className="text-gray-600 leading-relaxed">
                Once submitted, applications cannot be edited. However, you can withdraw and reapply if the job is still active.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
