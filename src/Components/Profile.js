import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Profile = () => {
  return (
   // In your Navbar component
<Link to="/profile" className="text-white hover:text-blue-200 transition">
  <FaUserCircle size={30} />
</Link>

  
  );
};

export default Profile;
