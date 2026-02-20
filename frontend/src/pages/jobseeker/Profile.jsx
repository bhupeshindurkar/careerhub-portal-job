import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaGraduationCap, FaBriefcase, FaCode, FaCamera, FaUpload, FaFileAlt, FaTrash, FaLinkedin, FaGithub, FaGlobe, FaMapMarkerAlt, FaPhone, FaEnvelope, FaDownload } from 'react-icons/fa';
import userService from '../../redux/services/userService';
import { setCredentials } from '../../redux/slices/authSlice';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [saving, setSaving] = useState(false);
  
  // Load saved data from localStorage (user-specific) - MUST be before any returns
  const [profilePicture, setProfilePicture] = useState(() => {
    if (!user?.email) return 'https://via.placeholder.com/150';
    
    const userSpecificKey = `profilePicture_${user.email}`;
    const savedPicture = localStorage.getItem(userSpecificKey);
    
    // If user has uploaded picture, use it
    if (savedPicture && savedPicture !== 'https://via.placeholder.com/150') {
      return savedPicture;
    }
    
    // Otherwise use user's profile picture from registration or default avatar
    return user?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&size=200&background=6366f1&color=fff&bold=true`;
  });
  
  const [resumeName, setResumeName] = useState(() => {
    if (!user?.email) return '';
    const userSpecificKey = `resumeName_${user.email}`;
    return localStorage.getItem(userSpecificKey) || '';
  });

  const [formData, setFormData] = useState(() => {
    if (!user?.email) {
      return {
        name: '',
        email: '',
        phone: '',
        location: '',
        bio: '',
        linkedin: '',
        github: '',
        portfolio: '',
        currentRole: '',
        experience: '',
      };
    }
    
    // First check localStorage for saved profile data (user-specific)
    const savedData = localStorage.getItem(`profileFormData_${user.email}`);
    if (savedData) {
      return JSON.parse(savedData);
    }
    // Otherwise use user registration data
    return {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      location: user?.location || '',
      bio: user?.bio || '',
      linkedin: user?.linkedin || '',
      github: user?.github || '',
      portfolio: user?.portfolio || '',
      currentRole: user?.currentRole || '',
      experience: user?.experience || '',
    };
  });

  const [education, setEducation] = useState(() => {
    if (!user?.email) return [];
    const savedEducation = localStorage.getItem(`profileEducation_${user.email}`);
    if (savedEducation) {
      return JSON.parse(savedEducation);
    }
    return [];
  });

  const [experience, setExperience] = useState(() => {
    if (!user?.email) return [];
    const savedExperience = localStorage.getItem(`profileExperience_${user.email}`);
    if (savedExperience) {
      return JSON.parse(savedExperience);
    }
    return [];
  });

  const [skills, setSkills] = useState(() => {
    if (!user?.email) return [];
    const savedSkills = localStorage.getItem(`profileSkills_${user.email}`);
    if (savedSkills) {
      return JSON.parse(savedSkills);
    }
    return [];
  });
  
  const [newSkill, setNewSkill] = useState('');
  
  // Clean up old non-user-specific data on mount
  useEffect(() => {
    if (user?.email) {
      const oldKeys = ['profilePicture', 'resumeName', 'resumeFile', 'profileFormData', 'profileEducation', 'profileExperience', 'profileSkills'];
      oldKeys.forEach(key => {
        const userSpecificKey = `${key}_${user.email}`;
        if (!localStorage.getItem(userSpecificKey)) {
          localStorage.removeItem(key);
        }
      });
    }
  }, [user?.email]);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      toast.error('Please login to view profile');
      navigate('/login');
    }
  }, [user, navigate]);

  // Save to localStorage whenever data changes (user-specific keys)
  useEffect(() => {
    if (user?.email) {
      localStorage.setItem(`profilePicture_${user.email}`, profilePicture);
    }
  }, [profilePicture, user?.email]);

  useEffect(() => {
    if (user?.email) {
      localStorage.setItem(`resumeName_${user.email}`, resumeName);
    }
  }, [resumeName, user?.email]);

  useEffect(() => {
    if (user?.email) {
      localStorage.setItem(`profileFormData_${user.email}`, JSON.stringify(formData));
    }
  }, [formData, user?.email]);
  
  // Don't render if no user (AFTER all hooks)
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      
      // Prepare data to send to backend
      const profileData = {
        name: formData.name,
        phone: formData.phone,
        location: formData.location,
        profilePicture: profilePicture,
        resume: resumeName || null,
        skills: skills,
        education: education,
        experience: experience
      };

      // Save to database
      const response = await userService.updateProfile(profileData);
      
      if (response.status === 'success') {
        // Update Redux store with new user data
        const updatedUser = {
          ...user,
          ...response.user
        };
        dispatch(setCredentials({ user: updatedUser, token: localStorage.getItem('token') }));
        
        // Also save to localStorage for backup
        if (user?.email) {
          localStorage.setItem(`profileFormData_${user.email}`, JSON.stringify(formData));
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
        
        toast.success('✅ Profile saved to database successfully!');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('❌ Failed to save profile: ' + (error.response?.data?.message || error.message));
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('❌ File size should be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        toast.error('❌ Please upload an image file');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        if (user?.email) {
          localStorage.setItem(`profilePicture_${user.email}`, reader.result);
        }
        toast.success('✅ Profile picture uploaded!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('❌ Resume size should be less than 10MB');
        return;
      }
      if (!file.name.match(/\.(pdf|doc|docx)$/)) {
        toast.error('❌ Please upload PDF or DOC file only');
        return;
      }
      
      // Save file to localStorage as base64 (user-specific)
      const reader = new FileReader();
      reader.onloadend = () => {
        if (user?.email) {
          localStorage.setItem(`resumeFile_${user.email}`, reader.result);
          localStorage.setItem(`resumeName_${user.email}`, file.name);
          setResumeName(file.name);
          toast.success('✅ Resume uploaded successfully!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadResume = () => {
    const resumeFile = user?.email ? localStorage.getItem(`resumeFile_${user.email}`) : null;
    if (resumeFile) {
      const link = document.createElement('a');
      link.href = resumeFile;
      link.download = resumeName || 'resume.pdf';
      link.click();
      toast.success('📥 Resume downloaded!');
    } else {
      toast.error('❌ No resume uploaded yet');
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);
      setNewSkill('');
      toast.info('✅ Skill added! Click Save to persist.');
    } else if (skills.includes(newSkill.trim())) {
      toast.warning('⚠️ Skill already exists!');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(updatedSkills);
    toast.info('🗑️ Skill removed! Click Save to persist.');
  };

  // Education handlers
  const handleAddEducation = () => {
    const newEducation = {
      id: Date.now(),
      degree: '',
      field: '',
      institution: '',
      year: '',
      grade: ''
    };
    setEducation([...education, newEducation]);
    toast.info('📝 Fill education details below');
  };

  const handleRemoveEducation = (id) => {
    const updatedEducation = education.filter(edu => edu.id !== id);
    setEducation(updatedEducation);
    toast.info('🗑️ Education removed');
  };

  const handleEducationChange = (id, field, value) => {
    const updatedEducation = education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    setEducation(updatedEducation);
  };

  // Experience handlers
  const handleAddExperience = () => {
    const newExperience = {
      id: Date.now(),
      title: '',
      company: '',
      duration: '',
      description: ''
    };
    setExperience([...experience, newExperience]);
    toast.info('📝 Fill experience details below');
  };

  const handleRemoveExperience = (id) => {
    const updatedExperience = experience.filter(exp => exp.id !== id);
    setExperience(updatedExperience);
    toast.info('🗑️ Experience removed');
  };

  const handleExperienceChange = (id, field, value) => {
    const updatedExperience = experience.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    setExperience(updatedExperience);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Profile Picture */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile Picture Upload */}
            <div className="relative group">
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                <img 
                  src={profilePicture} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="absolute bottom-0 right-0 bg-white text-indigo-600 p-3 rounded-full cursor-pointer shadow-lg hover:bg-indigo-50 transition transform hover:scale-110">
                <FaCamera className="text-xl" />
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleProfilePictureChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-extrabold mb-2">{formData.name || 'Your Name'}</h1>
              <p className="text-xl text-indigo-100 mb-4">{formData.currentRole || 'Job Seeker'}</p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm">
                {formData.location && (
                  <span className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                    <FaMapMarkerAlt /> {formData.location}
                  </span>
                )}
                {formData.experience && (
                  <span className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                    <FaBriefcase /> {formData.experience} Experience
                  </span>
                )}
              </div>
            </div>

            {/* Resume Upload */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-white/30">
              <div className="text-center mb-4">
                <FaFileAlt className="text-5xl mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Resume</h3>
                {resumeName ? (
                  <div className="bg-green-500/20 border-2 border-green-300 rounded-xl p-3 mb-3">
                    <p className="text-sm font-bold text-white mb-1">✓ Uploaded</p>
                    <p className="text-xs text-indigo-100 break-all">{resumeName}</p>
                  </div>
                ) : (
                  <p className="text-sm text-indigo-100 mb-3">PDF, DOC (Max 10MB)</p>
                )}
              </div>
              
              <div className="space-y-3">
                <label className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold cursor-pointer hover:bg-indigo-50 transition flex items-center gap-2 justify-center shadow-lg w-full">
                  <FaUpload />
                  {resumeName ? 'Change Resume' : 'Upload Resume'}
                  <input 
                    type="file" 
                    accept=".pdf,.doc,.docx" 
                    onChange={handleResumeChange}
                    className="hidden"
                  />
                </label>
                
                {resumeName && (
                  <button
                    onClick={handleDownloadResume}
                    className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition flex items-center gap-2 justify-center shadow-lg w-full"
                  >
                    <FaDownload />
                    Download Resume
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden">
          <div className="flex border-b-2 border-gray-100">
            <button
              onClick={() => setActiveTab('personal')}
              className={`flex-1 py-5 px-6 font-bold transition ${
                activeTab === 'personal'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FaUser className="inline mr-2" />
              Personal Info
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`flex-1 py-5 px-6 font-bold transition ${
                activeTab === 'education'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FaGraduationCap className="inline mr-2" />
              Education
            </button>
            <button
              onClick={() => setActiveTab('experience')}
              className={`flex-1 py-5 px-6 font-bold transition ${
                activeTab === 'experience'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FaBriefcase className="inline mr-2" />
              Experience
            </button>
            <button
              onClick={() => setActiveTab('skills')}
              className={`flex-1 py-5 px-6 font-bold transition ${
                activeTab === 'skills'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <FaCode className="inline mr-2" />
              Skills
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {activeTab === 'personal' && (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-xl">
                    <FaUser />
                  </span>
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      <FaUser className="inline mr-2 text-indigo-600" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      <FaEnvelope className="inline mr-2 text-purple-600" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-xl font-medium text-gray-600"
                      disabled
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      <FaPhone className="inline mr-2 text-green-600" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 9876543210"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      <FaMapMarkerAlt className="inline mr-2 text-pink-600" />
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="City, State"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      <FaBriefcase className="inline mr-2 text-blue-600" />
                      Current Role
                    </label>
                    <input
                      type="text"
                      name="currentRole"
                      value={formData.currentRole}
                      onChange={handleChange}
                      placeholder="e.g., Full Stack Developer"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      <FaBriefcase className="inline mr-2 text-orange-600" />
                      Total Experience
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition font-medium"
                    >
                      <option value="">Select Experience</option>
                      <option value="Fresher">Fresher (0-1 years)</option>
                      <option value="1-2 years">1-2 years</option>
                      <option value="2-3 years">2-3 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="5-7 years">5-7 years</option>
                      <option value="7-10 years">7-10 years</option>
                      <option value="10+ years">10+ years</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Professional Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Write a brief description about yourself, your skills, and career goals..."
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition font-medium"
                  />
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-3 rounded-xl">
                    <FaGlobe />
                  </span>
                  Social Links
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      <FaLinkedin className="inline mr-2 text-blue-600" />
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/yourprofile"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      <FaGithub className="inline mr-2 text-gray-800" />
                      GitHub Profile
                    </label>
                    <input
                      type="url"
                      name="github"
                      value={formData.github}
                      onChange={handleChange}
                      placeholder="https://github.com/yourusername"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      <FaGlobe className="inline mr-2 text-green-600" />
                      Portfolio Website
                    </label>
                    <input
                      type="url"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleChange}
                      placeholder="https://yourportfolio.com"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition font-medium"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-10 py-4 rounded-xl font-bold hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition transform hover:scale-105 shadow-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? '💾 Saving...' : '💾 Save Changes'}
              </button>
            </form>
          )}

          {activeTab === 'education' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-xl">
                  <FaGraduationCap />
                </span>
                Education Details
              </h3>
              
              <div className="space-y-4 mb-6">
                {education.map((edu) => (
                  <div key={edu.id} className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl border-2 border-indigo-200">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-bold text-indigo-700">Education Entry</h4>
                      <button 
                        onClick={() => handleRemoveEducation(edu.id)}
                        type="button"
                        className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-lg transition"
                      >
                        <FaTrash />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Degree *</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)}
                          placeholder="e.g., Bachelor of Engineering"
                          className="w-full px-4 py-2 bg-white border-2 border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition font-medium"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Field of Study *</label>
                        <input
                          type="text"
                          value={edu.field}
                          onChange={(e) => handleEducationChange(edu.id, 'field', e.target.value)}
                          placeholder="e.g., Computer Science"
                          className="w-full px-4 py-2 bg-white border-2 border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition font-medium"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Institution *</label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => handleEducationChange(edu.id, 'institution', e.target.value)}
                          placeholder="e.g., Nagpur University"
                          className="w-full px-4 py-2 bg-white border-2 border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition font-medium"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Year *</label>
                        <input
                          type="text"
                          value={edu.year}
                          onChange={(e) => handleEducationChange(edu.id, 'year', e.target.value)}
                          placeholder="e.g., 2019-2023"
                          className="w-full px-4 py-2 bg-white border-2 border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition font-medium"
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Grade/CGPA *</label>
                        <input
                          type="text"
                          value={edu.grade}
                          onChange={(e) => handleEducationChange(edu.id, 'grade', e.target.value)}
                          placeholder="e.g., 8.5 CGPA or 85%"
                          className="w-full px-4 py-2 bg-white border-2 border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition font-medium"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                {education.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No education added yet. Click the button below to add your education.</p>
                )}
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={handleAddEducation}
                  type="button"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 transition transform hover:scale-105 shadow-lg"
                >
                  ➕ Add Education
                </button>
                
                {education.length > 0 && (
                  <button 
                    onClick={async () => {
                      try {
                        setSaving(true);
                        const profileData = {
                          education: education,
                          skills: skills,
                          experience: experience
                        };
                        const response = await userService.updateProfile(profileData);
                        if (response.status === 'success') {
                          const updatedUser = { ...user, ...response.user };
                          dispatch(setCredentials({ user: updatedUser, token: localStorage.getItem('token') }));
                          if (user?.email) {
                            localStorage.setItem(`profileEducation_${user.email}`, JSON.stringify(education));
                            localStorage.setItem('user', JSON.stringify(updatedUser));
                          }
                          toast.success('✅ Education saved to database!');
                        }
                      } catch (error) {
                        toast.error('❌ Failed to save: ' + (error.response?.data?.message || error.message));
                      } finally {
                        setSaving(false);
                      }
                    }}
                    type="button"
                    disabled={saving}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition transform hover:scale-105 shadow-lg disabled:opacity-50"
                  >
                    {saving ? '💾 Saving...' : '💾 Save Education'}
                  </button>
                )}
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-3 rounded-xl">
                  <FaBriefcase />
                </span>
                Work Experience
              </h3>
              
              <div className="space-y-4 mb-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-200">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-bold text-blue-700">Experience Entry</h4>
                      <button 
                        onClick={() => handleRemoveExperience(exp.id)}
                        type="button"
                        className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-lg transition"
                      >
                        <FaTrash />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Job Title *</label>
                        <input
                          type="text"
                          value={exp.title}
                          onChange={(e) => handleExperienceChange(exp.id, 'title', e.target.value)}
                          placeholder="e.g., Full Stack Developer"
                          className="w-full px-4 py-2 bg-white border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition font-medium"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Company *</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
                            placeholder="e.g., Tech Solutions Pvt Ltd"
                            className="w-full px-4 py-2 bg-white border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition font-medium"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-2">Duration *</label>
                          <input
                            type="text"
                            value={exp.duration}
                            onChange={(e) => handleExperienceChange(exp.id, 'duration', e.target.value)}
                            placeholder="e.g., 2023 - Present"
                            className="w-full px-4 py-2 bg-white border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition font-medium"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Description *</label>
                        <textarea
                          value={exp.description}
                          onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)}
                          placeholder="Describe your role, responsibilities, and achievements..."
                          rows="3"
                          className="w-full px-4 py-2 bg-white border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition font-medium"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                {experience.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No experience added yet. Click the button below to add your work experience.</p>
                )}
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={handleAddExperience}
                  type="button"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-xl font-bold hover:from-blue-700 hover:to-cyan-700 transition transform hover:scale-105 shadow-lg"
                >
                  ➕ Add Experience
                </button>
                
                {experience.length > 0 && (
                  <button 
                    onClick={async () => {
                      try {
                        setSaving(true);
                        const profileData = {
                          experience: experience,
                          education: education,
                          skills: skills
                        };
                        const response = await userService.updateProfile(profileData);
                        if (response.status === 'success') {
                          const updatedUser = { ...user, ...response.user };
                          dispatch(setCredentials({ user: updatedUser, token: localStorage.getItem('token') }));
                          if (user?.email) {
                            localStorage.setItem(`profileExperience_${user.email}`, JSON.stringify(experience));
                            localStorage.setItem('user', JSON.stringify(updatedUser));
                          }
                          toast.success('✅ Experience saved to database!');
                        }
                      } catch (error) {
                        toast.error('❌ Failed to save: ' + (error.response?.data?.message || error.message));
                      } finally {
                        setSaving(false);
                      }
                    }}
                    type="button"
                    disabled={saving}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition transform hover:scale-105 shadow-lg disabled:opacity-50"
                  >
                    {saving ? '💾 Saving...' : '💾 Save Experience'}
                  </button>
                )}
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-3 rounded-xl">
                  <FaCode />
                </span>
                Technical Skills
              </h3>
              
              {/* Add Skill */}
              <div className="mb-8 bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-2xl border-2 border-green-200">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                    placeholder="Enter a skill (e.g., React, Python, AWS)"
                    className="flex-1 px-4 py-3 bg-white border-2 border-green-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition font-medium"
                  />
                  <button
                    onClick={handleAddSkill}
                    type="button"
                    className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-3 rounded-xl font-bold hover:from-green-700 hover:to-teal-700 transition transform hover:scale-105 shadow-lg"
                  >
                    ➕ Add
                  </button>
                </div>
              </div>

              {/* Skills List */}
              <div className="flex flex-wrap gap-3 mb-6">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-green-100 to-teal-100 text-green-800 px-6 py-3 rounded-full font-bold text-lg flex items-center gap-3 border-2 border-green-300 shadow-md hover:shadow-lg transition"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      type="button"
                      className="text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full p-1 transition"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  </div>
                ))}
              </div>

              {skills.length === 0 && (
                <p className="text-center text-gray-500 py-8 mb-6">No skills added yet. Add your first skill above!</p>
              )}
              
              {skills.length > 0 && (
                <button 
                  onClick={async () => {
                    try {
                      setSaving(true);
                      const profileData = {
                        skills: skills,
                        education: education,
                        experience: experience
                      };
                      const response = await userService.updateProfile(profileData);
                      if (response.status === 'success') {
                        const updatedUser = { ...user, ...response.user };
                        dispatch(setCredentials({ user: updatedUser, token: localStorage.getItem('token') }));
                        if (user?.email) {
                          localStorage.setItem(`profileSkills_${user.email}`, JSON.stringify(skills));
                          localStorage.setItem('user', JSON.stringify(updatedUser));
                        }
                        toast.success('✅ Skills saved to database!');
                      }
                    } catch (error) {
                      toast.error('❌ Failed to save: ' + (error.response?.data?.message || error.message));
                    } finally {
                      setSaving(false);
                    }
                  }}
                  type="button"
                  disabled={saving}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition transform hover:scale-105 shadow-lg disabled:opacity-50"
                >
                  {saving ? '💾 Saving...' : '💾 Save Skills'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
