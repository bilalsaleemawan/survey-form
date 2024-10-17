// src/Components/Dashboard/UserDashboard.jsx
import React from 'react';
import { FaClipboardList, FaChartPie, FaUserEdit } from 'react-icons/fa';

const UserDashboard = () => {
  return (
    <div>
      <h2 className="text-4xl font-bold text-gray-800">Welcome to your Dashboard</h2>
      <p className="mt-4 text-lg text-gray-600">Here you can manage all your surveys and view analytics.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow transition duration-300 hover:shadow-lg hover:border-gray-300">
          <div className="flex items-center">
            <FaClipboardList className="text-3xl text-blue-500" />
            <div className="ml-4">
              <h3 className="text-xl font-medium text-gray-800">Surveys</h3>
              <p className="mt-2 text-gray-600">Manage your surveys from here.</p>
            </div>
          </div>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow transition duration-300 hover:shadow-lg hover:border-gray-300">
          <div className="flex items-center">
            <FaChartPie className="text-3xl text-green-500" />
            <div className="ml-4">
              <h3 className="text-xl font-medium text-gray-800">Analytics</h3>
              <p className="mt-2 text-gray-600">View analytics for your surveys.</p>
            </div>
          </div>
        </div>
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow transition duration-300 hover:shadow-lg hover:border-gray-300">
          <div className="flex items-center">
            <FaUserEdit className="text-3xl text-purple-500" />
            <div className="ml-4">
              <h3 className="text-xl font-medium text-gray-800">Profile</h3>
              <p className="mt-2 text-gray-600">Edit your profile information.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
