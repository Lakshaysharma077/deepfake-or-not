// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-20 bg-[#0a1e3f]">
      <div className="px-[10%] py-5 flex items-center justify-between">
        {/* Logo / Title */}
        <Link to="/" className="text-2xl font-semibold text-white">
          DeepFake Detector
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link
            to="/"
            className="text-white hover:text-[#00abf0] transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/features"
            className="text-white hover:text-[#00abf0] transition-colors duration-300"
          >
            Features
          </Link>
          <Link
            to="/use-cases"
            className="text-white hover:text-[#00abf0] transition-colors duration-300"
          >
            Use Cases
          </Link>
          <Link
            to="/contact"
            className="text-white hover:text-[#00abf0] transition-colors duration-300"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex items-center text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#081b29]/95 backdrop-blur-sm px-[10%] py-4 space-y-4 absolute w-full left-0 top-full z-30 animate-fade-in">
          <Link
            to="/"
            className="block text-white hover:text-[#00abf0] transition-colors duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/features"
            className="block text-white hover:text-[#00abf0] transition-colors duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Features
          </Link>
          <Link
            to="/use-cases"
            className="block text-white hover:text-[#00abf0] transition-colors duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Use Cases
          </Link>
          <Link
            to="/contact"
            className="block text-white hover:text-[#00abf0] transition-colors duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
