import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../componenets/Navbar'; // Make sure path is correct based on your folder structure

export default function Homepage() {
  return (
    <div className="font-sans text-gray-800">
      {/* — Navbar — */}
      <Navbar />

      {/* — Buy Me a Coffee Banner — */}
      <div className="bg-yellow-300">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between">
          <span className="font-medium">
            Like this tool? Support the developer to keep it free and updated!
          </span>
          <button className="mt-2 md:mt-0 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition">
            ☕ Buy Me A Coffee
          </button>
        </div>
      </div>

      {/* — Hero / Call to Action — */}
      <section className="bg-blue-600 mt-12">
        <div className="max-w-6xl mx-auto py-16 text-center text-white px-4">
          <h2 className="text-4xl font-bold mb-4">
            Detect Fake Images with Advanced AI Technology
          </h2>
          <p className="mb-8">
            Fake Image Detector is a powerful image forensics tool that helps you identify manipulated,
            AI-generated, and edited images with up to 99% accuracy. Free, instant, and no registration required.
          </p>
          <Link
            to="/signup"
            className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition"
          >
            Get Started →
          </Link>
        </div>
      </section>

      {/* — Upcomming Detection Features — */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <h3 className="text-3xl font-bold text-center mb-12">
          Upcomming Detection Features
        </h3>
        <div className="grid gap-8 md:grid-cols-4">
          {[
            {
              icon: '🕵️‍♂️',
              title: 'Metadata Analysis',
              desc: 'Examines image properties, dimensions, and format authenticity.',
            },
            {
              icon: '🔊',
              title: 'Noise Pattern Detection',
              desc: 'Analyzes natural vs artificial noise patterns in images.',
            },
            {
              icon: '📦',
              title: 'Compression Analysis',
              desc: 'Detects inconsistencies in image compression patterns.',
            },
            {
              icon: '⚠️',
              title: 'Error Level Analysis',
              desc: 'Visualizes manipulation traces through error mapping.',
            },
          ].map((f, i) => (
            <div
              key={i}
              className="p-6 bg-gradient-to-br from-blue-100 to-white rounded-xl shadow-lg text-center"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h4 className="font-semibold text-lg mb-2">{f.title}</h4>
              <p className="text-gray-600 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* — How to Use — */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">
            How to Use the Fake Image Detector
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: '🔐',
                title: '1. Log In',
                desc: 'Sign in or register to unlock the detection feature.',
              },
              {
                icon: '📤',
                title: '2. Upload Your Image',
                desc: 'Once logged in, you’ll be able to drag & drop or click to upload.',
              },
              {
                icon: '📊',
                title: '3. Review Results',
                desc: 'Get a detailed report with authenticity score, color analysis, and error mapping.',
              },
            ].map((step, i) => (
              <div key={i} className="p-6 bg-white rounded-xl shadow text-center">
                <div className="text-4xl mb-4">{step.icon}</div>
                <h4 className="font-semibold text-lg mb-2">{step.title}</h4>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* — Footer — */}
      <footer className="bg-gray-800 text-gray-400 py-8 text-center">
        © {new Date().getFullYear()} Fake Image Detector. All rights reserved.
      </footer>
    </div>
  );
}
