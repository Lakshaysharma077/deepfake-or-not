import React from "react";
import Navbar from "../componenets/Navbar";
import { Link } from "react-router-dom";

export default function Features() {
  const features = [
    {
      title: "Advanced AI Detection",
      description: "Our cutting-edge AI models analyze media files with over 95% accuracy to identify deepfake content.",
      icon: "🤖",
      details: [
        "Deep learning algorithms",
        "Real-time analysis",
        "High accuracy rate",
        "Continuous model updates"
      ]
    },
    {
      title: "Multiple Media Support",
      description: "Support for various media formats including images and videos with comprehensive analysis.",
      icon: "🎥",
      details: [
        "Image formats (JPG, PNG)",
        "Video formats (MP4, MOV)",
        "Batch processing",
        "High-resolution support"
      ]
    },
    {
      title: "User-Friendly Interface",
      description: "Intuitive dashboard and simple upload process for quick and easy deepfake detection.",
      icon: "🎯",
      details: [
        "Drag-and-drop upload",
        "Progress tracking",
        "Detailed reports",
        "Easy-to-read results"
      ]
    },
    {
      title: "Secure Processing",
      description: "End-to-end encryption and secure processing to protect your media files and data.",
      icon: "🔒",
      details: [
        "Data encryption",
        "Secure storage",
        "Privacy protection",
        "Compliance standards"
      ]
    },
    {
      title: "API Integration",
      description: "Seamless integration with your existing systems through our powerful REST API.",
      icon: "⚡",
      details: [
        "RESTful API",
        "Developer documentation",
        "SDK support",
        "Custom integration"
      ]
    },
    {
      title: "Detailed Reports",
      description: "Comprehensive analysis reports with visual indicators and confidence scores.",
      icon: "📊",
      details: [
        "Confidence scores",
        "Visual indicators",
        "Detailed analysis",
        "Export options"
      ]
    }
  ];

  const stats = [
    { number: "95%", label: "Detection Accuracy" },
    { number: "50ms", label: "Average Processing Time" },
    { number: "10M+", label: "Files Analyzed" },
    { number: "99.9%", label: "Uptime" }
  ];

  return (
    <div className="min-h-screen bg-[#081b29]">
      <Navbar />
      <div className="h-20" /> {/* Spacer for fixed navbar */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Features</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the powerful features that make DeepFake Detector the leading solution for identifying manipulated media.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-[#0d2d44] rounded-2xl p-6 text-center border border-[#00abf0]/20 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl md:text-4xl font-bold text-[#00abf0] mb-2">{stat.number}</div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-[#0d2d44] rounded-2xl p-8 border border-[#00abf0]/20 hover:border-[#00abf0]/40 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-lg hover:shadow-[#00abf0]/20 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-full bg-[#00abf0]/10 flex items-center justify-center mb-6 text-3xl">
                {feature.icon}
              </div>
              <h2 className="text-2xl font-semibold text-white mb-4">{feature.title}</h2>
              <p className="text-gray-400 mb-6">{feature.description}</p>
              
              <ul className="space-y-3">
                {feature.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-start">
                    <svg className="w-5 h-5 text-[#00abf0] mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Removed sign-up CTA section */}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(50px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-fade-in.delay-1000 {
          animation-delay: 1s;
        }

        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
} 