// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-600">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo / Title */}
        <Link to="/" className="text-white text-2xl font-bold">
          Fake Image Detector
        </Link>

        {/* Nav Links */}
        <div className="space-x-6 flex items-center">
          <Link
            to="/"
            className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition"
          >
            Home
          </Link>
          <Link
            to="/About"
            className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition"
          >
            About Us
          </Link>
          <Link
            to="/signup"
            className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
);
}
