import React from "react";
import { Link, Outlet } from "react-router-dom";

import { FaPlus, FaList, FaEye, FaChartPie, FaClipboardList} from "react-icons/fa"; // Import icons

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-4">Survey App</h2>
        <nav>
          <ul>
            <li className="mb-2 flex items-center">
              <FaPlus className="mr-2" /> {/* Create Survey Icon */}
              <Link to="create" className="text-white hover:underline">
                Create Survey
              </Link>
            </li>
            <li className="mb-2 flex items-center">
              <FaList className="mr-2" /> {/* Survey List Icon */}
              <Link to="surveylist" className="text-white hover:underline">
                Survey List
              </Link>
            </li>
            <li className="mb-2 flex items-center">
              <FaEye className="mr-2" /> {/* Survey Detail Icon */}
              <Link to="/surveys/:id" className="text-white hover:underline">
                Survey Detail
              </Link>
            </li>
            <li className="mb-2 flex items-center">
              <FaClipboardList className="mr-2" /> {/* Survey Responses Icon */}
              <Link to="responses/:id" className="text-white hover:underline">
                Survey Responses
              </Link>
            </li>
            <li className="mb-2 flex items-center">
              <FaChartPie className="mr-2" /> {/* Survey Analytics Icon */}
              <Link to="analytics/:id" className="text-white hover:underline">
                Survey Analytics
              </Link>
            </li>
            {/* Add more sidebar links as needed */}
          </ul>
        </nav>
      </aside>

      {/* Main Section */}
      <main className="flex-1 p-4">
        {/* Main content will be rendered here */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
