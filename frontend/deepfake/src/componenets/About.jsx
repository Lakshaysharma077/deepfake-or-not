import React from 'react';
import Navbar from '../componenets/Navbar';
import Img from "../assets/WhatsApp Image 2025-04-24 at 13.20.50.jpeg";

export default function AboutUs() {
  return (
    <div className="font-sans text-gray-800 min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-blue-600 text-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">About Our Project</h1>
          <p className="text-lg">
            Empowering users to detect fake, AI-generated, and manipulated images using advanced image analysis technology.
          </p>
        </div>
      </section>

      <section className="flex-grow bg-gray-50 py-16 px-6 md:px-20">
        <div className="max-w-4xl mx-auto bg-white shadow-lg p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Our Mission</h2>
          <p className="mb-6 text-gray-700">
            In today's digital world, it's easy to manipulate photos, making it hard to tell what's real and what’s not.
            Our mission is to make image verification simple, accessible, and trustworthy. Whether you're a journalist, content creator,
            or everyday user, our tool helps you verify the authenticity of images before sharing or trusting them.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-gray-800">How It Works</h2>
          <p className="mb-6 text-gray-700">
            We use modern techniques, including metadata analysis, AI models, and reverse image lookup to detect signs of image tampering.
            Just upload an image, and our tool will give you insights on whether the image might be real or fake.
          </p>

          <h2 className="text-2xl font-bold mb-4 text-gray-800">Why It Matters</h2>
          <p className="mb-10 text-gray-700">
            From fake news to AI-generated hoaxes, misinformation spreads fast. With this tool, we aim to promote transparency
            and truth in visual content online.
          </p>

          {/* Developer Card */}
          <div className="border-t pt-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Meet the Developer</h2>
            <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left">
              <img
                src={Img}
                alt="Developer"
                className="w-32 h-32 rounded-full mb-4 md:mb-0 md:mr-6 object-cover shadow-lg"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Mayank</h3>
                <p className="text-gray-600">
                  Developer | CSE Student | Passionate about AI & Cybersecurity
                </p>
              </div>
            </div>
          </div>

          {/* Contact Us / Get in Touch Section */}
          <div className="mt-12 border-t pt-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Get in Touch</h2>
            <p className="mb-6 text-gray-600">
              Have feedback or collaboration ideas? Reach out to us!
            </p>
            <a
              href="mailto:mayank@example.com"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-gray-400 py-8 text-center">
        © {new Date().getFullYear()} Image Detector. All rights reserved.
      </footer>
    </div>
  );
}
