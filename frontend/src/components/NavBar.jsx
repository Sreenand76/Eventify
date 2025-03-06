import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
 
  // Fetch currentUser and password from localStorage
  const currentUser = localStorage.getItem("currentUser");
  const password = localStorage.getItem("password");

  // Check if both email and password match the desired values
  const isAdmin = (currentUser === "manas@gmail.com" && password === "9037");



  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <a href="/" className="text-white text-xl">My App</a>
        <div>
        <>
              <a href="/login" className="text-white mr-4">Login</a>
              <a href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Sign Up</a>
            </>       
          {isAdmin && (
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg mr-4">
            Add Event
          </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
