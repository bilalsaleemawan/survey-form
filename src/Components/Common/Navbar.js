// Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';
import logo from '../../assets/images/logo.png';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const navigate = useNavigate();

  // Check if user is logged in (simplified)
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user")); // Assuming user info is stored in localStorage
    if (loggedInUser) {
      setUser(loggedInUser); // Set user if logged in
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user from localStorage
    setUser(null); // Reset user state
    navigate("/login"); // Redirect to login page
  };

  // Determine the Home link destination based on user role
  const getHomeLink = () => {
    if (user) {
      return user.role === 'admin' ? '/admin' : '/user';
    }
    return '/';
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        {/* Logo and Title */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-8" />
          <div className="text-white text-2xl font-bold cursor-pointer">Survey Form</div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to={getHomeLink()} className="text-white hover:text-blue-200 transition">Home</Link>
          {user && user.role === 'admin' && (
            <Link to="/admin" className="text-white hover:text-blue-200 transition">Admin</Link>
          )}
          {user && user.role !== 'admin' && (
            <Link to="/user" className="text-white hover:text-blue-200 transition">Dashboard</Link>
          )}
          {user ? (
            <div className="relative group">
              <button
                className="text-white flex items-center"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              >
                <FaUserCircle size={30} />
              </button>
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                  <div className="px-4 py-2 text-sm text-gray-700">
                    {user.username} <br />
                    {user.email}
                  </div>
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile Settings</Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-blue-200 transition">Login</Link>
              <Link to="/register" className="text-white hover:text-blue-200 transition">Register</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                // Close Icon
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                // Hamburger Icon
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2">
          <div className="flex flex-col space-y-2">
            <Link to={getHomeLink()} className="block text-white hover:text-blue-200 transition" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            {user && user.role === 'admin' && (
              <Link to="/admin" className="block text-white hover:text-blue-200 transition" onClick={() => setIsMobileMenuOpen(false)}>Admin</Link>
            )}
            {user && user.role !== 'admin' && (
              <Link to="/user" className="block text-white hover:text-blue-200 transition" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
            )}
            {user ? (
              <>
                <Link to="/profile" className="block text-white hover:text-blue-200 transition" onClick={() => setIsMobileMenuOpen(false)}>Profile Settings</Link>
                <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="block text-white hover:text-blue-200 transition">Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-white hover:text-blue-200 transition" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                <Link to="/register" className="block text-white hover:text-blue-200 transition" onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
