import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaEye } from 'react-icons/fa';

const Companies = () => {
  const [activeTab, setActiveTab] = useState('pending');

  const companies = [
    {
      id: 1,
      companyName: 'Tech Solutions Inc',
      email: 'hr@techsolutions.com',
      industry: 'Information Technology',
      size: '51-200',
      status: 'pending',
      registeredDate: '2024-01-20',
    },
    {
      id: 2,
      companyName: 'Innovation Labs',
      email: 'contact@innovationlabs.com',
      industry: 'Software Development',
      size: '11-50',
      status: 'verified',
      registeredDate: '2024-01-15',
    },
  ];

  const filteredCompanies = companies.filter((company) => company.status === activeTab);

  const handleVerify = (id) => {
    console.log('Verify company:', id);
  };

  const handleReject = (id) => {
    console.log('Reject company:', id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Manage Companies</h1>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('pending')}
              className={`flex-1 py-4 px-6 font-semibold ${
                activeTab === 'pending'
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-gray-600'
              }`}
            >
              Pending Verification
            </button>
            <button
              onClick={() => setActiveTab('verified')}
              className={`flex-1 py-4 px-6 font-semibold ${
                activeTab === 'verified'
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-gray-600'
              }`}
            >
              Verified Companies
            </button>
            <button
              onClick={() => setActiveTab('rejected')}
              className={`flex-1 py-4 px-6 font-semibold ${
                activeTab === 'rejected'
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-gray-600'
              }`}
            >
              Rejected
            </button>
          </div>
        </div>

        {/* Companies List */}
        <div className="space-y-4">
          {filteredCompanies.map((company) => (
            <div key={company.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {company.companyName}
                  </h3>
                  <div className="text-gray-600 space-y-1">
                    <p>Email: {company.email}</p>
                    <p>Industry: {company.industry}</p>
                    <p>Company Size: {company.size} employees</p>
                    <p className="text-sm">
                      Registered: {new Date(company.registeredDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="p-3 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition">
                    <FaEye />
                  </button>
                  {company.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleVerify(company.id)}
                        className="p-3 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition"
                      >
                        <FaCheckCircle />
                      </button>
                      <button
                        onClick={() => handleReject(company.id)}
                        className="p-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                      >
                        <FaTimesCircle />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredCompanies.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-xl text-gray-600">No companies in this category</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Companies;
