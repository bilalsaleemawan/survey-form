// Dashboard.js
import React from "react";
import { Link } from "react-router-dom";
import { FaPoll, FaUsers, FaChartLine } from "react-icons/fa"; // Replace FaSurvey with FaPoll

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Manage Surveys Card */}
        <Link to="/admin/surveylist" className="block">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition duration-300">
            <div className="flex items-center">
              <FaPoll className="text-3xl text-blue-600 mr-4" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-700">Manage Surveys</h2>
                <p className="text-gray-500">View, edit, and delete surveys.</p>
              </div>
            </div>
          </div>
        </Link>

        {/* View Responses Card */}
        <Link to="/admin/responses" className="block">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition duration-300">
            <div className="flex items-center">
              <FaUsers className="text-3xl text-green-600 mr-4" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-700">View Responses</h2>
                <p className="text-gray-500">Analyze survey responses.</p>
              </div>
            </div>
          </div>
        </Link>

        {/* Survey Analytics Card */}
        <Link to="/admin/analytics" className="block">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition duration-300">
            <div className="flex items-center">
              <FaChartLine className="text-3xl text-purple-600 mr-4" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-700">Survey Analytics</h2>
                <p className="text-gray-500">Get detailed analytics reports.</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
