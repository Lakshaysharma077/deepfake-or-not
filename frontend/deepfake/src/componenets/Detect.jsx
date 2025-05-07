import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import Navbar from '../componenets/Navbar';
import { motion, AnimatePresence } from 'framer-motion';

export default function Detect() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState('');
  const [confidence, setConfidence] = useState(null);
  const [modelAccuracy, setModelAccuracy] = useState('');
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

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    fetch(imageSrc)
      .then(res => res.blob())
      .then(blob => {
        const newFile = new File([blob], "captured-image.png", { type: "image/png" });
        setFile(newFile);
        setPreview(imageSrc);
        setShowCamera(false);
      });
  }, [webcamRef]);

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
        setModelAccuracy(data.model_accuracy);
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
    <div className="font-sans text-gray-800 min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />
      <div className="h-20" /> {/* Spacer for fixed navbar */}

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-16 overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 shadow-2xl rounded-3xl mx-2 md:mx-auto max-w-6xl mt-8">
        <svg className="absolute left-0 top-0 w-full h-full opacity-20" viewBox="0 0 1440 320">
          <path fill="#fff" fillOpacity="0.3" d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,133.3C840,107,960,85,1080,101.3C1200,117,1320,171,1380,197.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
        </svg>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-4">
            Deepfake Detection
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-white/90">
            Upload an image or capture a photo to analyze it with our advanced AI detection system.
        </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow py-16 px-4">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Upload/Camera Section */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6">
              <div className="space-y-6">
                {/* Upload Area */}
          <div
            onClick={() => inputRef.current.click()}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition group"
          >
                  <AnimatePresence mode="wait">
            {preview ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative w-full"
                      >
                        <img src={preview} alt="preview" className="max-h-64 mx-auto rounded-lg shadow-md" />
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
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                      >
                        <div className="text-6xl text-gray-400 mb-4 group-hover:text-blue-500 transition">📤</div>
                        <p className="text-gray-600 group-hover:text-blue-600 transition">Click or drag & drop to upload</p>
                        <p className="text-sm text-gray-400 mt-2">Supports JPG, PNG, JPEG</p>
                      </motion.div>
            )}
                  </AnimatePresence>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={inputRef}
              className="hidden"
            />
          </div>

                {/* Camera Controls */}
                <div className="flex flex-col space-y-4">
          {!showCamera ? (
            <button
              onClick={() => setShowCamera(true)}
                      className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200"
            >
              Use Camera
            </button>
          ) : (
            <div className="space-y-4">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/png"
                        className="w-full rounded-lg shadow-lg"
              />
                      <div className="flex space-x-4">
              <button
                onClick={capture}
                          className="flex-1 py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
              >
                Take Photo
              </button>
              <button
                onClick={() => setShowCamera(false)}
                          className="flex-1 py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
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
                  className={`w-full py-3 px-4 rounded-lg font-semibold text-white ${
                    loading || !file
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                  } transition-all duration-200`}
          >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Analyzing...
                    </span>
                  ) : (
                    'Analyze Image'
                  )}
          </button>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center"
                  >
                    {error}
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <AnimatePresence>
          {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden ${
                  result === 'FAKE' ? 'border-l-4 border-red-500' : 'border-l-4 border-green-500'
                }`}
              >
                <div className="p-6">
                  <div className="text-center">
                    <div className="text-6xl mb-4">
                      {result === 'FAKE' ? '❌' : '✅'}
                    </div>
              <h2 className="text-2xl font-bold mb-2">
                      {result === 'FAKE' ? 'Deepfake Detected' : 'Image is Authentic'}
              </h2>
                    <p className="text-gray-600 mb-6">
                      Our AI model predicts this image is{' '}
                      <span className={`font-semibold ${result === 'FAKE' ? 'text-red-600' : 'text-green-600'}`}>
                        {result === 'FAKE' ? 'a deepfake' : 'authentic'}
                      </span>
              </p>

              {confidence !== null && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-xl text-gray-700">AI Confidence Level</p>
                          <div className="flex items-center">
                            <span className={`text-3xl font-bold ${result === 'FAKE' ? 'text-red-600' : 'text-green-600'}`}>
                              {confidence}
                            </span>
                            <span className="text-2xl font-bold text-gray-500 ml-1">%</span>
                          </div>
                        </div>
                        <div className="relative">
                          <div className="w-full h-8 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                    <motion.div
                              className={`h-full ${
                                result === 'FAKE' 
                                  ? 'bg-gradient-to-r from-red-500 via-red-400 to-red-500' 
                                  : 'bg-gradient-to-r from-green-500 via-green-400 to-green-500'
                              }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${confidence}%` }}
                              transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-base font-bold text-white drop-shadow-lg">
                              {confidence}% Confidence
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                          <span className="font-medium">0%</span>
                          <span className="font-medium">25%</span>
                          <span className="font-medium">50%</span>
                          <span className="font-medium">75%</span>
                          <span className="font-medium">100%</span>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">
                            Our AI model is {confidence >= 80 ? 'highly' : confidence >= 60 ? 'moderately' : 'somewhat'} confident in this prediction
                          </p>
                  </div>
                </div>
              )}

              {modelAccuracy && (
                      <p className="text-sm text-gray-500 mt-4">
                  Model Accuracy: {modelAccuracy}
                </p>
              )}
            </div>
                </div>
              </motion.div>
          )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-8 text-center">
        © {new Date().getFullYear()} DeepGuard AI. All rights reserved.
      </footer>
    </div>
  );
}
