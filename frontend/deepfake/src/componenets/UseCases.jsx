import React from "react";
import Navbar from "../componenets/Navbar";
import { Link } from "react-router-dom";

export default function UseCases() {
  const useCases = [
    {
      title: "Media & Journalism",
      description: "Verify the authenticity of news content and prevent the spread of misinformation through manipulated media.",
      icon: "📰",
      features: [
        "Fact-checking news content",
        "Verifying source authenticity",
        "Preventing fake news spread",
        "Maintaining journalistic integrity"
      ]
    },
    {
      title: "Social Media",
      description: "Protect social media platforms from deepfake content and maintain a safe online environment.",
      icon: "🌐",
      features: [
        "Content moderation",
        "User safety protection",
        "Platform integrity",
        "Community trust building"
      ]
    },
    {
      title: "Law Enforcement",
      description: "Assist in criminal investigations by identifying manipulated evidence and maintaining legal integrity.",
      icon: "👮",
      features: [
        "Evidence verification",
        "Forensic analysis",
        "Legal documentation",
        "Case investigation support"
      ]
    },
    {
      title: "Corporate Security",
      description: "Protect businesses from fraud and maintain secure communication channels.",
      icon: "🏢",
      features: [
        "Fraud prevention",
        "Secure communications",
        "Brand protection",
        "Employee verification"
      ]
    },
    {
      title: "Education & Research",
      description: "Support academic research and education about deepfake technology and its implications.",
      icon: "🎓",
      features: [
        "Academic research",
        "Educational tools",
        "Technology awareness",
        "Student projects"
      ]
    },
    {
      title: "Entertainment Industry",
      description: "Protect intellectual property and verify content authenticity in the entertainment sector.",
      icon: "🎬",
      features: [
        "Content verification",
        "IP protection",
        "Talent security",
        "Production integrity"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#081b29]">
      <Navbar />
      <div className="h-20" /> {/* Spacer for fixed navbar */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Use Cases</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how DeepFake Detector can be applied across various industries and scenarios to combat manipulated media.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div 
              key={index}
              className="bg-[#0d2d44] rounded-2xl p-8 border border-[#00abf0]/20 hover:border-[#00abf0]/40 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-lg hover:shadow-[#00abf0]/20 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-full bg-[#00abf0]/10 flex items-center justify-center mb-6 text-3xl">
                {useCase.icon}
              </div>
              <h2 className="text-2xl font-semibold text-white mb-4">{useCase.title}</h2>
              <p className="text-gray-400 mb-6">{useCase.description}</p>
              
              <ul className="space-y-3">
                {useCase.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <svg className="w-5 h-5 text-[#00abf0] mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">{feature}</span>
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