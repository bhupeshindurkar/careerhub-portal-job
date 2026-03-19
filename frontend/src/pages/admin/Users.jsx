import React, { useState, useEffect } from 'react';
import {
  FaTrash, FaEdit, FaFilePdf, FaSearch, FaTimes, FaSave,
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub,
  FaGlobe, FaFileAlt, FaEye, FaUsers, FaUserTie, FaBuilding, FaShieldAlt
} from 'react-icons/fa';
import { jsPDF } from 'jspdf';
import adminService from '../../redux/services/adminService';
import Loader from '../../components/common/Loader';

const API_BASE = process.env.REACT_APP_API_URL || 'https://careerhub-backend-sxue.onrender.com/api';

const fetchImageBase64 = async (url) => {
  if (!url || url.includes('placeholder') || url.includes('ui-avatars')) return null;
  try {
    const res = await fetch(`${API_BASE}/users/image-proxy?url=${encodeURIComponent(url)}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.base64 || null;
  } catch { return null; }
};

const UserAvatar = ({ user, size = 'sm' }) => {
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    if (!user.profilePicture || user.profilePicture.includes('placeholder') || user.profilePicture.includes('ui-avatars')) return;
    fetchImageBase64(user.profilePicture).then(b64 => { if (b64) setImgSrc(b64); });
  }, [user.profilePicture]);

  const dim = size === 'lg' ? 'w-16 h-16 text-2xl' : 'w-10 h-10 text-sm';
  return (
    <div className={`${dim} rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0 overflow-hidden ring-2 ring-indigo-500/30`}>
      {imgSrc ? (
        <img src={imgSrc} alt={user.name} className="w-full h-full object-cover" />
      ) : (
        <span>{user.name?.charAt(0).toUpperCase()}</span>
      )}
    </div>
  );
};

const roleBadge = (role) => {
  if (role === 'admin') return 'bg-red-500/20 text-red-400 border border-red-500/30';
  if (role === 'employer') return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
  return 'bg-green-500/20 text-green-400 border border-green-500/30';
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
    } catch (e) {
      setAlert({ type: 'error', message: 'Failed to fetch users' });
    } finally { setLoading(false); }
  };

  const handleDelete = async (userId, userName) => {
    if (!window.confirm(`Delete "${userName}"?`)) return;
    try {
      await adminService.deleteUser(userId);
      setAlert({ type: 'success', message: 'User deleted' });
      fetchUsers();
    } catch { setAlert({ type: 'error', message: 'Delete failed' }); }
  };

  const openEdit = (user) => {
    setEditUser(user);
    setEditForm({
      name: user.name || '', email: user.email || '', phone: user.phone || '',
      location: user.location || '', bio: user.bio || '', currentRole: user.currentRole || '',
      linkedin: user.linkedin || '', github: user.github || '', portfolio: user.portfolio || '',
      companyName: user.companyName || '', industry: user.industry || '', role: user.role || 'jobseeker',
    });
  };

  const handleEditSave = async () => {
    try {
      setSaving(true);
      await adminService.updateUser(editUser._id, editForm);
      setAlert({ type: 'success', message: 'User updated' });
      setEditUser(null); fetchUsers();
    } catch { setAlert({ type: 'error', message: 'Update failed' }); }
    finally { setSaving(false); }
  };

  const handleDownloadPDF = async (user) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let y = 0;

    // --- fetch image via backend proxy (avoids CORS issues with Cloudinary) ---
    let imgData = null;
    if (user.profilePicture && !user.profilePicture.includes('placeholder') && !user.profilePicture.includes('ui-avatars')) {
      imgData = await fetchImageBase64(user.profilePicture);
    }

    // --- HEADER ---
    doc.setFillColor(49, 46, 129); // deep indigo
    doc.rect(0, 0, pageWidth, 58, 'F');

    // profile image circle area
    if (imgData) {
      try { doc.addImage(imgData, 'JPEG', 8, 6, 46, 46); } catch { imgData = null; }
    }

    // name + meta
    const hx = imgData ? 60 : 14;
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20); doc.setFont(undefined, 'bold');
    doc.text(user.name || '', hx, 20);
    doc.setFontSize(10); doc.setFont(undefined, 'normal');
    if (user.currentRole) doc.text(user.currentRole, hx, 30);
    doc.text(user.email || '', hx, 38);
    if (user.phone) doc.text(user.phone, hx, 46);
    doc.setFontSize(8);
    doc.text('CareerHub Pro  |  Admin Export', pageWidth - 10, 54, { align: 'right' });

    y = 68;

    // helpers
    const checkPage = (needed = 10) => { if (y + needed > pageHeight - 20) { doc.addPage(); y = 16; } };

    const sectionHeader = (title) => {
      checkPage(14);
      doc.setFillColor(238, 242, 255);
      doc.rect(10, y, pageWidth - 20, 9, 'F');
      doc.setDrawColor(99, 102, 241);
      doc.rect(10, y, 3, 9, 'F');
      doc.setTextColor(49, 46, 129);
      doc.setFontSize(10); doc.setFont(undefined, 'bold');
      doc.text(title, 16, y + 6.5);
      y += 13;
    };

    const row = (label, value) => {
      if (!value && value !== 0) return;
      const val = String(value);
      checkPage(8);
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100); doc.setFont(undefined, 'bold');
      doc.text(label + ':', 14, y);
      doc.setTextColor(30, 30, 30); doc.setFont(undefined, 'normal');
      const lines = doc.splitTextToSize(val, pageWidth - 68);
      doc.text(lines, 58, y);
      y += lines.length * 5.5 + 1.5;
    };

    const bodyText = (text) => {
      if (!text) return;
      const lines = doc.splitTextToSize(String(text), pageWidth - 28);
      lines.forEach(line => { checkPage(6); doc.setFontSize(9); doc.setTextColor(40, 40, 40); doc.setFont(undefined, 'normal'); doc.text(line, 14, y); y += 5.5; });
      y += 3;
    };

    // --- PERSONAL INFO ---
    sectionHeader('PERSONAL INFORMATION');
    row('Name', user.name);
    row('Email', user.email);
    row('Phone', user.phone);
    row('Location', user.location);
    row('Role', user.role);
    row('Current Role', user.currentRole);
    row('Joined', user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN') : '');
    y += 4;

    // --- BIO ---
    if (user.bio) {
      sectionHeader('PROFESSIONAL BIO');
      bodyText(user.bio);
    }

    // --- SKILLS ---
    if (user.skills?.length > 0) {
      sectionHeader('SKILLS');
      // draw skill chips
      let sx = 14;
      user.skills.forEach(skill => {
        const sw = doc.getTextWidth(skill) + 8;
        if (sx + sw > pageWidth - 14) { sx = 14; y += 9; checkPage(9); }
        doc.setFillColor(224, 231, 255);
        doc.roundedRect(sx, y - 5, sw, 7, 2, 2, 'F');
        doc.setTextColor(67, 56, 202); doc.setFontSize(8); doc.setFont(undefined, 'bold');
        doc.text(skill, sx + 4, y);
        sx += sw + 4;
      });
      y += 10;
    }

    // --- EDUCATION ---
    if (user.education?.length > 0) {
      sectionHeader('EDUCATION');
      user.education.forEach((e, i) => {
        checkPage(18);
        doc.setFontSize(9); doc.setFont(undefined, 'bold'); doc.setTextColor(30, 30, 30);
        doc.text(e.degree || 'Degree', 14, y); y += 5.5;
        doc.setFont(undefined, 'normal'); doc.setTextColor(80, 80, 80);
        const inst = [e.institute || e.institution, e.field, e.year].filter(Boolean).join('  |  ');
        if (inst) { doc.text(inst, 14, y); y += 5; }
        if (e.grade || e.percentage) { doc.text(`Grade/Percentage: ${e.grade || e.percentage}`, 14, y); y += 5; }
        if (i < user.education.length - 1) { doc.setDrawColor(220, 220, 220); doc.line(14, y, pageWidth - 14, y); y += 4; }
      });
      y += 4;
    }

    // --- EXPERIENCE ---
    if (user.experience?.length > 0) {
      sectionHeader('WORK EXPERIENCE');
      user.experience.forEach((e, i) => {
        checkPage(20);
        doc.setFontSize(9); doc.setFont(undefined, 'bold'); doc.setTextColor(30, 30, 30);
        doc.text(e.role || e.title || 'Role', 14, y); y += 5.5;
        doc.setFont(undefined, 'normal'); doc.setTextColor(80, 80, 80);
        const comp = [e.company, e.duration].filter(Boolean).join('  |  ');
        if (comp) { doc.text(comp, 14, y); y += 5; }
        if (e.description) {
          const dl = doc.splitTextToSize(e.description, pageWidth - 28);
          dl.forEach(l => { checkPage(6); doc.text(l, 14, y); y += 5; });
        }
        if (i < user.experience.length - 1) { doc.setDrawColor(220, 220, 220); doc.line(14, y, pageWidth - 14, y); y += 4; }
      });
      y += 4;
    }

    // --- SOCIAL LINKS ---
    if (user.linkedin || user.github || user.portfolio) {
      sectionHeader('SOCIAL LINKS');
      row('LinkedIn', user.linkedin);
      row('GitHub', user.github);
      row('Portfolio', user.portfolio);
      y += 4;
    }

    // --- COMPANY INFO (employer) ---
    if (user.companyName) {
      sectionHeader('COMPANY INFORMATION');
      row('Company', user.companyName);
      row('Industry', user.industry);
      row('Company Size', user.companySize);
      row('Website', user.companyWebsite);
      if (user.companyDescription) { checkPage(10); bodyText(user.companyDescription); }
      y += 4;
    }

    // --- RESUME LINK ---
    if (user.resume && user.resume.startsWith('http')) {
      sectionHeader('RESUME');
      doc.setFontSize(9); doc.setTextColor(67, 56, 202); doc.setFont(undefined, 'normal');
      doc.text(user.resume, 14, y); y += 8;
    }

    // --- FOOTER on every page ---
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFillColor(49, 46, 129);
      doc.rect(0, pageHeight - 14, pageWidth, 14, 'F');
      doc.setTextColor(255, 255, 255); doc.setFontSize(7); doc.setFont(undefined, 'normal');
      doc.text('CareerHub Pro  |  Admin Export  |  Developed by BHUPESH INDURKAR', pageWidth / 2, pageHeight - 5, { align: 'center' });
      doc.text(`Page ${i} of ${totalPages}`, pageWidth - 10, pageHeight - 5, { align: 'right' });
    }

    doc.save(`${(user.name || 'User').replace(/\s+/g, '_')}_Profile.pdf`);
  };

  const filteredUsers = users.filter(u => {
    const matchTab = activeTab === 'all' ? true : activeTab === 'jobseekers' ? u.role === 'jobseeker' : u.role === 'employer';
    const matchSearch = !search || u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase()) || u.location?.toLowerCase().includes(search.toLowerCase()) || u.phone?.includes(search);
    return matchTab && matchSearch;
  });

  if (loading) return <Loader />;

  const counts = { all: users.length, jobseekers: users.filter(u => u.role === 'jobseeker').length, employers: users.filter(u => u.role === 'employer').length };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 px-6 py-10">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white/10 backdrop-blur-sm p-2 rounded-xl"><FaUsers className="text-white text-xl" /></div>
              <span className="text-white/60 text-sm font-medium uppercase tracking-widest">Admin Panel</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">User Management</h1>
            <p className="text-white/60 mt-1">Manage all registered users on the platform</p>
          </div>
          <div className="flex gap-3">
            {[
              { icon: FaUsers, label: 'Total', val: counts.all, color: 'from-violet-600 to-indigo-600' },
              { icon: FaUserTie, label: 'Seekers', val: counts.jobseekers, color: 'from-cyan-600 to-blue-600' },
              { icon: FaBuilding, label: 'Employers', val: counts.employers, color: 'from-emerald-600 to-teal-600' },
            ].map(({ icon: Icon, label, val, color }) => (
              <div key={label} className={`bg-gradient-to-br ${color} rounded-2xl px-4 py-3 text-center shadow-xl`}>
                <Icon className="text-white/70 text-lg mx-auto mb-1" />
                <p className="text-white font-black text-2xl">{val}</p>
                <p className="text-white/70 text-xs">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {alert && (
          <div className={`mb-4 px-5 py-3 rounded-xl font-semibold text-sm flex items-center justify-between ${alert.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
            {alert.message}
            <button onClick={() => setAlert(null)}><FaTimes /></button>
          </div>
        )}

        {/* Search + Tabs */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input type="text" placeholder="Search by name, email, phone, location..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-gray-900 border border-gray-700 text-white placeholder-gray-500 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm" />
          </div>
          <div className="flex bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
            {[['all','All'], ['jobseekers','Seekers'], ['employers','Employers']].map(([key, label]) => (
              <button key={key} onClick={() => setActiveTab(key)}
                className={`px-5 py-3 text-sm font-semibold transition ${activeTab === key ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
                {label} <span className="ml-1 opacity-60">({counts[key]})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  {['User', 'Contact', 'Role', 'Skills', 'Joined', 'Actions'].map(h => (
                    <th key={h} className="px-5 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredUsers.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-16 text-gray-600">No users found</td></tr>
                ) : filteredUsers.map(user => (
                  <tr key={user._id} className="hover:bg-gray-800/50 transition">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <UserAvatar user={user} size="sm" />
                        <div>
                          <p className="font-semibold text-white text-sm">{user.name}</p>
                          {user.currentRole && <p className="text-xs text-gray-500">{user.currentRole}</p>}
                          {user.location && <p className="text-xs text-gray-600 flex items-center gap-1"><FaMapMarkerAlt className="text-indigo-500" />{user.location}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm text-gray-300 flex items-center gap-1"><FaEnvelope className="text-indigo-400 flex-shrink-0" /><span className="truncate max-w-[150px]">{user.email}</span></p>
                      {user.phone && <p className="text-sm text-gray-400 flex items-center gap-1 mt-1"><FaPhone className="text-green-400 flex-shrink-0" />{user.phone}</p>}
                      <div className="flex gap-2 mt-1">
                        {user.linkedin && <a href={user.linkedin} target="_blank" rel="noreferrer"><FaLinkedin className="text-blue-400 text-sm" /></a>}
                        {user.github && <a href={user.github} target="_blank" rel="noreferrer"><FaGithub className="text-gray-400 text-sm" /></a>}
                        {user.portfolio && <a href={user.portfolio} target="_blank" rel="noreferrer"><FaGlobe className="text-green-400 text-sm" /></a>}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${roleBadge(user.role)}`}>{user.role}</span>
                      {user.companyName && <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><FaBuilding className="text-blue-400" />{user.companyName}</p>}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1 max-w-[140px]">
                        {user.skills?.slice(0, 3).map((s, i) => <span key={i} className="bg-indigo-500/20 text-indigo-300 text-xs px-2 py-0.5 rounded-full border border-indigo-500/20">{s}</span>)}
                        {user.skills?.length > 3 && <span className="text-xs text-gray-500">+{user.skills.length - 3}</span>}
                        {(!user.skills || user.skills.length === 0) && <span className="text-xs text-gray-600">—</span>}
                      </div>
                      {user.resume && <a href={user.resume} target="_blank" rel="noreferrer" className="text-xs text-indigo-400 flex items-center gap-1 mt-1 hover:underline"><FaFileAlt />Resume</a>}
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-500 whitespace-nowrap">{new Date(user.createdAt).toLocaleDateString('en-IN')}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setViewUser(user)} className="p-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition" title="View"><FaEye className="text-sm" /></button>
                        {user.role !== 'admin' && <>
                          <button onClick={() => openEdit(user)} className="p-2 bg-indigo-500/20 text-indigo-400 rounded-lg hover:bg-indigo-500/30 transition" title="Edit"><FaEdit className="text-sm" /></button>
                          <button onClick={() => handleDownloadPDF(user)} className="p-2 bg-rose-500/20 text-rose-400 rounded-lg hover:bg-rose-500/30 transition" title="PDF"><FaFilePdf className="text-sm" /></button>
                          <button onClick={() => handleDelete(user._id, user.name)} className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition" title="Delete"><FaTrash className="text-sm" /></button>
                        </>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* View Modal */}
      {viewUser && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-6 rounded-t-2xl flex items-center justify-between border-b border-gray-700">
              <div className="flex items-center gap-4">
                <UserAvatar user={viewUser} size="lg" />
                <div>
                  <h2 className="text-xl font-bold text-white">{viewUser.name}</h2>
                  <p className="text-indigo-300 text-sm">{viewUser.email}</p>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold mt-1 inline-block ${roleBadge(viewUser.role)}`}>{viewUser.role}</span>
                </div>
              </div>
              <button onClick={() => setViewUser(null)} className="text-gray-400 hover:text-white p-2 rounded-xl hover:bg-gray-700 transition"><FaTimes /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[['Phone', viewUser.phone], ['Location', viewUser.location], ['Current Role', viewUser.currentRole], ['Company', viewUser.companyName], ['Industry', viewUser.industry], ['Joined', viewUser.createdAt ? new Date(viewUser.createdAt).toLocaleDateString('en-IN') : '']].map(([label, val]) => val ? (
                  <div key={label} className="bg-gray-800 border border-gray-700 rounded-xl p-3">
                    <p className="text-xs text-gray-500 font-semibold uppercase">{label}</p>
                    <p className="text-sm text-white font-medium mt-1">{val}</p>
                  </div>
                ) : null)}
              </div>
              {viewUser.bio && <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4"><p className="text-xs text-indigo-400 font-semibold uppercase mb-2">Bio</p><p className="text-sm text-gray-300">{viewUser.bio}</p></div>}
              {viewUser.skills?.length > 0 && <div><p className="text-xs text-gray-500 font-semibold uppercase mb-2">Skills</p><div className="flex flex-wrap gap-2">{viewUser.skills.map((s, i) => <span key={i} className="bg-indigo-500/20 text-indigo-300 text-xs px-3 py-1 rounded-full border border-indigo-500/20">{s}</span>)}</div></div>}
              {viewUser.education?.length > 0 && <div><p className="text-xs text-gray-500 font-semibold uppercase mb-2">Education</p>{viewUser.education.map((e, i) => <div key={i} className="bg-gray-800 border border-gray-700 rounded-xl p-3 mb-2"><p className="font-semibold text-sm text-white">{e.degree}</p><p className="text-xs text-gray-500">{e.institute || e.institution} | {e.year}</p></div>)}</div>}
              {viewUser.experience?.length > 0 && <div><p className="text-xs text-gray-500 font-semibold uppercase mb-2">Experience</p>{viewUser.experience.map((e, i) => <div key={i} className="bg-gray-800 border border-gray-700 rounded-xl p-3 mb-2"><p className="font-semibold text-sm text-white">{e.role || e.title}</p><p className="text-xs text-gray-500">{e.company} | {e.duration}</p></div>)}</div>}
              <div className="flex gap-3 flex-wrap">
                {viewUser.linkedin && <a href={viewUser.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-blue-400 text-sm hover:underline"><FaLinkedin />LinkedIn</a>}
                {viewUser.github && <a href={viewUser.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-300 text-sm hover:underline"><FaGithub />GitHub</a>}
                {viewUser.portfolio && <a href={viewUser.portfolio} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-green-400 text-sm hover:underline"><FaGlobe />Portfolio</a>}
                {viewUser.resume && <a href={viewUser.resume} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-indigo-400 text-sm hover:underline"><FaFileAlt />Resume</a>}
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => { setViewUser(null); openEdit(viewUser); }} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"><FaEdit />Edit User</button>
                <button onClick={() => handleDownloadPDF(viewUser)} className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2"><FaFilePdf />Download PDF</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editUser && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-6 rounded-t-2xl flex items-center justify-between border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-500/20 p-2 rounded-xl"><FaEdit className="text-indigo-400 text-lg" /></div>
                <h2 className="text-xl font-bold text-white">Edit: {editUser.name}</h2>
              </div>
              <button onClick={() => setEditUser(null)} className="text-gray-400 hover:text-white p-2 rounded-xl hover:bg-gray-700 transition"><FaTimes /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[{label:'Full Name',key:'name'},{label:'Email',key:'email',type:'email'},{label:'Phone',key:'phone'},{label:'Location',key:'location'},{label:'Current Role',key:'currentRole'},{label:'LinkedIn',key:'linkedin'},{label:'GitHub',key:'github'},{label:'Portfolio',key:'portfolio'},{label:'Company Name',key:'companyName'},{label:'Industry',key:'industry'}].map(({ label, key, type = 'text' }) => (
                  <div key={key}>
                    <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">{label}</label>
                    <input type={type} value={editForm[key] || ''} onChange={e => setEditForm({ ...editForm, [key]: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm placeholder-gray-600" />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Bio</label>
                <textarea value={editForm.bio || ''} onChange={e => setEditForm({ ...editForm, bio: e.target.value })} rows={3}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Role</label>
                <select value={editForm.role || 'jobseeker'} onChange={e => setEditForm({ ...editForm, role: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 text-white rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm">
                  <option value="jobseeker">Job Seeker</option>
                  <option value="employer">Employer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={handleEditSave} disabled={saving}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 disabled:opacity-50">
                  <FaSave />{saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button onClick={() => setEditUser(null)} className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-300 py-3 rounded-xl font-semibold transition">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
