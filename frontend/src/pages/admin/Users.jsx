import React, { useState, useEffect } from 'react';
import {
  FaUser, FaBuilding, FaTrash, FaEdit, FaFilePdf, FaSearch,
  FaTimes, FaSave, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaLinkedin, FaGithub, FaGlobe, FaBriefcase, FaFileAlt, FaEye
} from 'react-icons/fa';
import { jsPDF } from 'jspdf';
import adminService from '../../redux/services/adminService';
import Alert from '../../components/common/Alert';
import Loader from '../../components/common/Loader';

// Avatar component - shows image or initial letter
const UserAvatar = ({ user, size = 'sm' }) => {
  const [imgError, setImgError] = useState(false);
  const hasImg = user.profilePicture && !imgError &&
    !user.profilePicture.includes('placeholder') &&
    !user.profilePicture.includes('ui-avatars');
  const dim = size === 'lg' ? 'w-14 h-14 text-2xl' : 'w-10 h-10 text-base';
  return (
    <div className={`${dim} rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0 overflow-hidden`}>
      {hasImg ? (
        <img src={user.profilePicture} alt={user.name} className="w-full h-full object-cover" onError={() => setImgError(true)} />
      ) : (
        <span>{user.name?.charAt(0).toUpperCase()}</span>
      )}
    </div>
  );
};

const Users = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [search, setSearch] = useState('');
  const [editUser, setEditUser] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [viewUser, setViewUser] = useState(null);

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAllUsers();
      setUsers(data.users || []);
    } catch (error) {
      setAlert({ type: 'error', message: error.response?.data?.message || 'Failed to fetch users' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId, userName) => {
    if (!window.confirm(`"${userName}" ko delete karna chahte hain?`)) return;
    try {
      await adminService.deleteUser(userId);
      setAlert({ type: 'success', message: 'User deleted successfully' });
      fetchUsers();
    } catch (error) {
      setAlert({ type: 'error', message: error.response?.data?.message || 'Delete failed' });
    }
  };

  const openEdit = (user) => {
    setEditUser(user);
    setEditForm({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      location: user.location || '',
      bio: user.bio || '',
      currentRole: user.currentRole || '',
      linkedin: user.linkedin || '',
      github: user.github || '',
      portfolio: user.portfolio || '',
      companyName: user.companyName || '',
      industry: user.industry || '',
      role: user.role || 'jobseeker',
    });
  };

  const handleEditSave = async () => {
    try {
      setSaving(true);
      await adminService.updateUser(editUser._id, editForm);
      setAlert({ type: 'success', message: 'User updated successfully' });
      setEditUser(null);
      fetchUsers();
    } catch (error) {
      setAlert({ type: 'error', message: error.response?.data?.message || 'Update failed' });
    } finally {
      setSaving(false);
    }
  };

  const handleDownloadPDF = async (user) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let y = 20;

    // Load profile image via canvas (works with Cloudinary CORS)
    let profileImgData = null;
    if (user.profilePicture && !user.profilePicture.includes('placeholder') && !user.profilePicture.includes('ui-avatars')) {
      try {
        profileImgData = await new Promise((resolve) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          // Add Cloudinary transformation for smaller size
          let imgUrl = user.profilePicture;
          if (imgUrl.includes('cloudinary.com')) {
            imgUrl = imgUrl.replace('/upload/', '/upload/w_150,h_150,c_fill,f_jpg/');
          }
          img.onload = () => {
            try {
              const canvas = document.createElement('canvas');
              canvas.width = 150; canvas.height = 150;
              const ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0, 150, 150);
              resolve(canvas.toDataURL('image/jpeg', 0.8));
            } catch { resolve(null); }
          };
          img.onerror = () => resolve(null);
          img.src = imgUrl;
        });
      } catch { profileImgData = null; }
    }

    // Header
    doc.setFillColor(67, 56, 202);
    doc.rect(0, 0, pageWidth, profileImgData ? 60 : 50, 'F');

    // Profile image in header
    if (profileImgData) {
      try {
        doc.addImage(profileImgData, 'JPEG', 10, 8, 44, 44);
      } catch (e) { profileImgData = null; }
    }

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    const textX = profileImgData ? 60 : pageWidth / 2;
    const textAlign = profileImgData ? 'left' : 'center';
    doc.text(user.name || 'USER PROFILE', textX, profileImgData ? 24 : 22, { align: textAlign });
    doc.setFontSize(10);
    doc.text(user.email || '', textX, profileImgData ? 34 : 32, { align: textAlign });
    doc.text('CareerHub Pro - Admin Export', textX, profileImgData ? 44 : 42, { align: textAlign });
    y = profileImgData ? 72 : 62;

    const section = (title) => {
      if (y > 260) { doc.addPage(); y = 20; }
      doc.setFillColor(238, 242, 255);
      doc.rect(10, y, pageWidth - 20, 8, 'F');
      doc.setTextColor(67, 56, 202);
      doc.setFontSize(13);
      doc.text(title, 14, y + 6);
      y += 14;
    };

    const field = (label, value) => {
      if (!value) return;
      if (y > 270) { doc.addPage(); y = 20; }
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.setFont(undefined, 'bold');
      doc.text(`${label}:`, 14, y);
      doc.setFont(undefined, 'normal');
      const lines = doc.splitTextToSize(String(value), pageWidth - 65);
      doc.text(lines, 55, y);
      y += lines.length * 6 + 2;
    };

    section('PERSONAL INFORMATION');
    field('Name', user.name);
    field('Email', user.email);
    field('Phone', user.phone);
    field('Location', user.location);
    field('Role', user.role);
    field('Current Role', user.currentRole);
    field('Joined', user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN') : '');
    y += 5;

    if (user.bio) {
      section('PROFESSIONAL BIO');
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.setFont(undefined, 'normal');
      const bioLines = doc.splitTextToSize(user.bio, pageWidth - 28);
      doc.text(bioLines, 14, y);
      y += bioLines.length * 5 + 10;
    }

    if (user.skills && user.skills.length > 0) {
      section('SKILLS');
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.setFont(undefined, 'normal');
      const skillLines = doc.splitTextToSize(user.skills.join(' • '), pageWidth - 28);
      doc.text(skillLines, 14, y);
      y += skillLines.length * 5 + 10;
    }

    if (user.education && user.education.length > 0) {
      section('EDUCATION');
      user.education.forEach(edu => {
        if (y > 260) { doc.addPage(); y = 20; }
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'bold');
        doc.text(edu.degree || 'Degree', 14, y); y += 5;
        doc.setFont(undefined, 'normal');
        doc.text(`${edu.institute || edu.institution || ''} | ${edu.year || ''}`, 14, y); y += 8;
      });
    }

    if (user.experience && user.experience.length > 0) {
      section('WORK EXPERIENCE');
      user.experience.forEach(exp => {
        if (y > 260) { doc.addPage(); y = 20; }
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'bold');
        doc.text(exp.role || exp.title || 'Role', 14, y); y += 5;
        doc.setFont(undefined, 'normal');
        doc.text(`${exp.company || ''} | ${exp.duration || ''}`, 14, y); y += 8;
      });
    }

    if (user.linkedin || user.github || user.portfolio) {
      section('SOCIAL LINKS');
      field('LinkedIn', user.linkedin);
      field('GitHub', user.github);
      field('Portfolio', user.portfolio);
    }

    if (user.companyName) {
      section('COMPANY INFO');
      field('Company', user.companyName);
      field('Industry', user.industry);
    }

    // Footer on all pages
    const pages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pages; i++) {
      doc.setPage(i);
      doc.setFillColor(67, 56, 202);
      doc.rect(0, pageHeight - 18, pageWidth, 18, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.text('CareerHub Pro | Admin Export | Developed by BHUPESH INDURKAR', pageWidth / 2, pageHeight - 7, { align: 'center' });
    }

    const cleanName = (user.name || 'User').replace(/\s+/g, '_');
    doc.save(`${cleanName}.pdf`);
  };

  const filteredUsers = users.filter(u => {
    const matchTab =
      activeTab === 'all' ? true :
      activeTab === 'jobseekers' ? u.role === 'jobseeker' :
      activeTab === 'employers' ? u.role === 'employer' : true;
    const matchSearch = !search ||
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.location?.toLowerCase().includes(search.toLowerCase()) ||
      u.phone?.includes(search);
    return matchTab && matchSearch;
  });

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
          <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-semibold text-sm">
            Total: {filteredUsers.length}
          </span>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, phone, location..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow mb-6 flex border-b overflow-hidden">
          {['all', 'jobseekers', 'employers'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 font-semibold capitalize transition ${
                activeTab === tab ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab === 'all' ? 'All Users' : tab === 'jobseekers' ? 'Job Seekers' : 'Employers'}
              <span className="ml-2 text-xs opacity-75">
                ({users.filter(u =>
                  tab === 'all' ? true :
                  tab === 'jobseekers' ? u.role === 'jobseeker' :
                  u.role === 'employer'
                ).length})
              </span>
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {['User', 'Contact', 'Role / Company', 'Skills', 'Joined', 'Actions'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-gray-400">No users found</td>
                  </tr>
                ) : filteredUsers.map(user => (
                  <tr key={user._id} className="hover:bg-gray-50 transition">
                    {/* User */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <UserAvatar user={user} size="sm" />
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
                          {user.currentRole && <p className="text-xs text-gray-500">{user.currentRole}</p>}
                          {user.location && (
                            <p className="text-xs text-gray-400 flex items-center gap-1">
                              <FaMapMarkerAlt className="text-indigo-400" /> {user.location}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-4 py-4">
                      <p className="text-sm text-gray-700 flex items-center gap-1">
                        <FaEnvelope className="text-indigo-400 flex-shrink-0" />
                        <span className="truncate max-w-[160px]">{user.email}</span>
                      </p>
                      {user.phone && (
                        <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                          <FaPhone className="text-green-400 flex-shrink-0" /> {user.phone}
                        </p>
                      )}
                      <div className="flex gap-2 mt-1">
                        {user.linkedin && <a href={user.linkedin} target="_blank" rel="noreferrer"><FaLinkedin className="text-blue-500 text-sm" /></a>}
                        {user.github && <a href={user.github} target="_blank" rel="noreferrer"><FaGithub className="text-gray-700 text-sm" /></a>}
                        {user.portfolio && <a href={user.portfolio} target="_blank" rel="noreferrer"><FaGlobe className="text-green-500 text-sm" /></a>}
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-4 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        user.role === 'admin' ? 'bg-red-100 text-red-700' :
                        user.role === 'employer' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {user.role}
                      </span>
                      {user.companyName && (
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                          <FaBuilding className="text-blue-400" /> {user.companyName}
                        </p>
                      )}
                      {user.industry && <p className="text-xs text-gray-400">{user.industry}</p>}
                    </td>

                    {/* Skills */}
                    <td className="px-4 py-4">
                      <div className="flex flex-wrap gap-1 max-w-[150px]">
                        {user.skills?.slice(0, 3).map((s, i) => (
                          <span key={i} className="bg-indigo-50 text-indigo-700 text-xs px-2 py-0.5 rounded-full">{s}</span>
                        ))}
                        {user.skills?.length > 3 && (
                          <span className="text-xs text-gray-400">+{user.skills.length - 3}</span>
                        )}
                        {(!user.skills || user.skills.length === 0) && (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </div>
                      {user.resume && (
                        <a href={user.resume} target="_blank" rel="noreferrer" className="text-xs text-indigo-600 flex items-center gap-1 mt-1 hover:underline">
                          <FaFileAlt /> Resume
                        </a>
                      )}
                    </td>

                    {/* Joined */}
                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {new Date(user.createdAt).toLocaleDateString('en-IN')}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setViewUser(user)}
                          className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition"
                          title="View Details"
                        >
                          <FaEye className="text-sm" />
                        </button>
                        {user.role !== 'admin' && (
                          <>
                            <button
                              onClick={() => openEdit(user)}
                              className="p-2 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-200 transition"
                              title="Edit User"
                            >
                              <FaEdit className="text-sm" />
                            </button>
                            <button
                              onClick={() => handleDownloadPDF(user)}
                              className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                              title="Download PDF"
                            >
                              <FaFilePdf className="text-sm" />
                            </button>
                            <button
                              onClick={() => handleDelete(user._id, user.name)}
                              className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                              title="Delete User"
                            >
                              <FaTrash className="text-sm" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* View Details Modal */}
      {viewUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <UserAvatar user={viewUser} size="lg" />
                <div>
                  <h2 className="text-xl font-bold text-white">{viewUser.name}</h2>
                  <p className="text-indigo-200 text-sm">{viewUser.email}</p>
                </div>
              </div>
              <button onClick={() => setViewUser(null)} className="text-white hover:text-indigo-200">
                <FaTimes className="text-xl" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  ['Role', viewUser.role],
                  ['Phone', viewUser.phone],
                  ['Location', viewUser.location],
                  ['Current Role', viewUser.currentRole],
                  ['Company', viewUser.companyName],
                  ['Industry', viewUser.industry],
                  ['Joined', viewUser.createdAt ? new Date(viewUser.createdAt).toLocaleDateString('en-IN') : ''],
                ].map(([label, val]) => val ? (
                  <div key={label} className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-500 font-semibold uppercase">{label}</p>
                    <p className="text-sm text-gray-800 font-medium mt-1">{val}</p>
                  </div>
                ) : null)}
              </div>

              {viewUser.bio && (
                <div className="bg-indigo-50 rounded-xl p-4">
                  <p className="text-xs text-indigo-600 font-semibold uppercase mb-2">Bio</p>
                  <p className="text-sm text-gray-700">{viewUser.bio}</p>
                </div>
              )}

              {viewUser.skills?.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase mb-2">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {viewUser.skills.map((s, i) => (
                      <span key={i} className="bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full">{s}</span>
                    ))}
                  </div>
                </div>
              )}

              {viewUser.education?.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase mb-2">Education</p>
                  {viewUser.education.map((edu, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-3 mb-2">
                      <p className="font-semibold text-sm">{edu.degree}</p>
                      <p className="text-xs text-gray-500">{edu.institute || edu.institution} | {edu.year}</p>
                    </div>
                  ))}
                </div>
              )}

              {viewUser.experience?.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase mb-2">Experience</p>
                  {viewUser.experience.map((exp, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-3 mb-2">
                      <p className="font-semibold text-sm">{exp.role || exp.title}</p>
                      <p className="text-xs text-gray-500">{exp.company} | {exp.duration}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                {viewUser.linkedin && <a href={viewUser.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-blue-600 text-sm hover:underline"><FaLinkedin /> LinkedIn</a>}
                {viewUser.github && <a href={viewUser.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-700 text-sm hover:underline"><FaGithub /> GitHub</a>}
                {viewUser.portfolio && <a href={viewUser.portfolio} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-green-600 text-sm hover:underline"><FaGlobe /> Portfolio</a>}
                {viewUser.resume && <a href={viewUser.resume} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-indigo-600 text-sm hover:underline"><FaFileAlt /> Resume</a>}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => { setViewUser(null); openEdit(viewUser); }}
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                >
                  <FaEdit /> Edit User
                </button>
                <button
                  onClick={() => handleDownloadPDF(viewUser)}
                  className="flex-1 bg-red-600 text-white py-2 rounded-xl font-semibold hover:bg-red-700 transition flex items-center justify-center gap-2"
                >
                  <FaFilePdf /> Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-t-2xl flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Edit User: {editUser.name}</h2>
              <button onClick={() => setEditUser(null)} className="text-white hover:text-indigo-200">
                <FaTimes className="text-xl" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Full Name', key: 'name', type: 'text' },
                  { label: 'Email', key: 'email', type: 'email' },
                  { label: 'Phone', key: 'phone', type: 'text' },
                  { label: 'Location', key: 'location', type: 'text' },
                  { label: 'Current Role', key: 'currentRole', type: 'text' },
                  { label: 'LinkedIn', key: 'linkedin', type: 'text' },
                  { label: 'GitHub', key: 'github', type: 'text' },
                  { label: 'Portfolio', key: 'portfolio', type: 'text' },
                  { label: 'Company Name', key: 'companyName', type: 'text' },
                  { label: 'Industry', key: 'industry', type: 'text' },
                ].map(({ label, key, type }) => (
                  <div key={key}>
                    <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">{label}</label>
                    <input
                      type={type}
                      value={editForm[key] || ''}
                      onChange={e => setEditForm({ ...editForm, [key]: e.target.value })}
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">Bio</label>
                <textarea
                  value={editForm.bio || ''}
                  onChange={e => setEditForm({ ...editForm, bio: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">Role</label>
                <select
                  value={editForm.role || 'jobseeker'}
                  onChange={e => setEditForm({ ...editForm, role: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm"
                >
                  <option value="jobseeker">Job Seeker</option>
                  <option value="employer">Employer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleEditSave}
                  disabled={saving}
                  className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <FaSave /> {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={() => setEditUser(null)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
