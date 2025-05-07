import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../componenets/Navbar";
import Webcam from "react-webcam";

export default function Homepage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState('');
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef();
  const webcamRef = useRef(null);
  const [showCamera, setShowCamera] = useState(false);

  const handleFileChange = (e) => {
    setError('');
    const chosen = e.target.files?.[0];
    if (!chosen) return;
    setFile(chosen);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(chosen);
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    fetch(imageSrc)
      .then(res => res.blob())
      .then(blob => {
        const newFile = new File([blob], "captured-image.png", { type: "image/png" });
        setFile(newFile);
        setPreview(imageSrc);
        setShowCamera(false);
      });
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please select an image first.');
      return;
    }
    setLoading(true);
    setResult('');
    setConfidence(null);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch('http://localhost:9000/analyze-image', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        const lbl = (data.result || '').toString().toUpperCase();
        let display = lbl.includes('FAKE') || lbl === 'LABEL_1' ? 'FAKE' : 'REAL';
        setResult(display);
        setConfidence(data.confidence);
      } else {
        setError(data.error || 'Analysis failed.');
      }
    } catch (e) {
      setError('Network error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-[#333] font-['Poppins']">
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6">DeepFake Detector</h1>
          <p className="text-xl max-w-[600px] mx-auto mb-8">
            Advanced AI-powered solution to detect manipulated media and protect digital authenticity
          </p>
        </div>
      </section>

      {/* Upload Section (always visible) */}
      <section id="uploadSection" className="text-center bg-white py-16">
        <h2 className="text-3xl font-bold mb-6 text-[#081b29]">Upload Image for Analysis</h2>
        <div className="max-w-md mx-auto">
          {/* Upload Area */}
          <div
            onClick={() => inputRef.current.click()}
            className="border-2 border-dashed border-[#00abf0] rounded-lg p-8 mb-6 cursor-pointer hover:bg-[#00abf0]/5 transition"
          >
            {preview ? (
              <div className="relative">
                <img src={preview} alt="preview" className="max-h-64 mx-auto rounded-lg" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreview(null);
                    setFile(null);
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-6xl text-[#00abf0] mb-4">📤</div>
                <p className="text-gray-700">Click or drag & drop to upload</p>
                <p className="text-sm text-gray-500 mt-2">Supports JPG, PNG, JPEG</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={inputRef}
              className="hidden"
            />
          </div>

          {/* Camera Controls */}
          <div className="mb-6">
            {!showCamera ? (
              <button
                onClick={() => setShowCamera(true)}
                className="btn w-full"
              >
                Use Camera
              </button>
            ) : (
              <div className="space-y-4">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/png"
                  className="w-full rounded-lg"
                />
                <div className="flex gap-4">
                  <button
                    onClick={capture}
                    className="btn flex-1"
                  >
                    Take Photo
                  </button>
                  <button
                    onClick={() => setShowCamera(false)}
                    className="btn flex-1 bg-gray-500 hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={loading || !file}
            className={`btn w-full ${loading || !file ? 'bg-gray-400 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Analyzing...' : 'Analyze Image'}
          </button>

          {/* Results */}
          {result && (
            <div className="mt-6 p-4 rounded-lg bg-white border border-[#00abf0]">
              <h3 className="text-xl font-semibold mb-2">Analysis Results</h3>
              <p className="text-lg">Result: <span className={result === 'FAKE' ? 'text-red-500' : 'text-green-500'}>{result}</span></p>
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 rounded-lg bg-red-50 text-red-600">
              {error}
            </div>
          )}
        </div>

        {/* How It Works Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold mb-10 text-left md:text-center text-[#081b29]">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#f7f9fa] rounded-xl shadow p-8 text-center">
              <h3 className="font-bold text-lg mb-2">Step 1</h3>
              <p>Create an account and gain access to our detection tools.</p>
            </div>
            <div className="bg-[#f7f9fa] rounded-xl shadow p-8 text-center">
              <h3 className="font-bold text-lg mb-2">Step 2</h3>
              <p>Upload you image file for analysis.</p>
            </div>
            <div className="bg-[#f7f9fa] rounded-xl shadow p-8 text-center">
              <h3 className="font-bold text-lg mb-2">Step 3</h3>
              <p>Receive results indicating the likelihood of the content being a deepfake.</p>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-16 bg-[#f4f6f8]">
          <h2 className="text-3xl font-bold mb-10 text-left md:text-center text-[#081b29]">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#f7f9fa] rounded-xl shadow p-8 text-center">
              <h3 className="font-bold text-lg mb-2">High Accuracy Detection</h3>
              <p>Our AI algorithms provide a probability score to assess the authenticity of media content.</p>
            </div>
            <div className="bg-[#f7f9fa] rounded-xl shadow p-8 text-center">
              <h3 className="font-bold text-lg mb-2">Background image detector</h3>
              <p>Integrated tools to eliminate background noise, enhancing detection accuracy.</p>
            </div>
            <div className="bg-[#f7f9fa] rounded-xl shadow p-8 text-center">
              <h3 className="font-bold text-lg mb-2">Enterprise-Ready</h3>
              <p>API access and multi-user dashboards designed for business and organization use.</p>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold mb-10 text-left md:text-center text-[#081b29]">Use Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#f7f9fa] rounded-xl shadow p-8 text-center">
              <h3 className="font-bold text-lg mb-2">Media Verification</h3>
              <p>Journalists and media outlets use our tool to verify video/audio content before publishing.</p>
            </div>
            <div className="bg-[#f7f9fa] rounded-xl shadow p-8 text-center">
              <h3 className="font-bold text-lg mb-2">Corporate Security</h3>
              <p>Businesses monitor digital impersonation and protect brand identity using our detection technology.</p>
            </div>
            <div className="bg-[#f7f9fa] rounded-xl shadow p-8 text-center">
              <h3 className="font-bold text-lg mb-2">Academic & Research</h3>
              <p>Used in AI research and ethics studies to examine generative content threats.</p>
            </div>
          </div>
        </section>
      </section>

      {/* Features Section */}
      <section className="py-16 px-[10%] bg-white">
        <h2 className="text-3xl font-bold mb-12 text-[#081b29] text-center">Features</h2>
        <div className="features">
          <div className="feature">
            <h3 className="text-xl font-semibold mb-3 text-[#081b29]">Advanced AI Detection</h3>
            <p className="text-[#555]">State-of-the-art deep learning models for accurate deepfake detection</p>
          </div>
          <div className="feature">
            <h3 className="text-xl font-semibold mb-3 text-[#081b29]">Real-time Analysis</h3>
            <p className="text-[#555]">Quick and efficient processing of images and videos</p>
          </div>
          <div className="feature">
            <h3 className="text-xl font-semibold mb-3 text-[#081b29]">User-Friendly Interface</h3>
            <p className="text-[#555]">Simple and intuitive design for easy navigation</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#081b29] text-white mt-8">
        <div className="footer-container">
          <div className="footer-column">
            <h3 className="text-xl font-semibold mb-4 text-[#00abf0]">DeepFake Detector</h3>
            <p>Protecting digital authenticity with advanced AI technology</p>
          </div>
          <div className="footer-column">
            <h4 className="text-xl font-semibold mb-4 text-[#00abf0]">Quick Links</h4>
            <ul>
              <li><Link to="/" className="text-white hover:text-[#00abf0] transition-colors">Home</Link></li>
              <li><Link to="/features" className="text-white hover:text-[#00abf0] transition-colors">Features</Link></li>
              <li><Link to="/use-cases" className="text-white hover:text-[#00abf0] transition-colors">Use Cases</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4 className="text-xl font-semibold mb-4 text-[#00abf0]">Contact</h4>
            <ul>
              <li>Email: support@deepfakedetector.com</li>
              <li>Phone: +1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom py-4 bg-[#061520] text-center">
          <p>&copy; 2024 DeepFake Detector. All rights reserved.</p>
        </div>
      </footer>

      <style jsx>{`
        .hero {
          background: url('https://image.cnbcfm.com/api/v1/image/106341604-1579261030301thumbnailreports_deepfakevideo_clean_03.jpg?v=1579261049') no-repeat center center/cover;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-align: center;
          padding: 0 10%;
          animation: fadeIn 2s ease-in-out forwards 1s;
        }

        .btn {
          display: inline-block;
          padding: 12px 25px;
          background: #00abf0;
          color: #fff;
          border-radius: 5px;
          text-decoration: none;
          font-weight: 600;
          transition: background 0.3s;
          border: none;
          cursor: pointer;
        }

        .btn:hover {
          background: #008ecf;
        }

        .features {
          display: flex;
          flex-wrap: wrap;
          gap: 30px;
          justify-content: space-between;
        }

        .feature {
          flex: 1;
          min-width: 250px;
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .feature:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 15px rgba(0,0,0,0.2);
        }

        .footer-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          padding: 40px 10%;
        }

        .footer-column {
          flex: 1;
          min-width: 250px;
          margin: 15px 0;
        }

        .footer-column ul {
          list-style: none;
          padding: 0;
        }

        .footer-column ul li {
          margin-bottom: 10px;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .features {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
