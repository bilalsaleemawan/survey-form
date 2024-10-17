// src/Components/Layout/UserLayout.jsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { FaTachometerAlt, FaList, FaChartLine, FaUser } from 'react-icons/fa';

const UserLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">User Dashboard</h1>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            <li>
              <Link 
                to="/" 
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition duration-150 rounded-lg"
              >
                <FaTachometerAlt className="mr-3" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                to="/user/surveylist" 
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition duration-150 rounded-lg"
              >
                <FaList className="mr-3" />
                Surveys
              </Link>
            </li>
            <li>
              <Link 
                to="/user/analytics" 
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition duration-150 rounded-lg"
              >
                <FaChartLine className="mr-3" />
                Analytics
              </Link>
            </li>
            <li>
              <Link 
                to="/user/profile" 
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition duration-150 rounded-lg"
              >
                <FaUser className="mr-3" />
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-8 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
