import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import Navbar from '../componenets/Navbar';

export default function Detect() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState('');
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
    <div className="font-sans text-gray-800 min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-blue-600 text-white py-16 text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Deepfake Image Detection</h1>
        <p className="max-w-2xl mx-auto text-lg">
          Upload an image or click a real-time photo and let our AI tell you if it’s real or fake.
        </p>
      </section>

      <main className="flex-grow bg-gray-50 py-16 px-4">
        <div className="max-w-lg mx-auto space-y-8">

          <div
            onClick={() => inputRef.current.click()}
            className="border-2 border-dashed border-gray-400 bg-white rounded-lg h-64 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition"
          >
            {preview ? (
              <img src={preview} alt="preview" className="max-h-full rounded-md" />
            ) : (
              <>
                <div className="text-5xl text-gray-400 mb-2">📤</div>
                <p className="text-gray-600">Click or drag & drop to upload</p>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={inputRef}
              className="hidden"
            />
          </div>

          {!showCamera ? (
            <button
              onClick={() => setShowCamera(true)}
              className="w-full py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
            >
              Use Camera
            </button>
          ) : (
            <div className="space-y-4">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/png"
                className="w-full rounded-lg shadow"
              />
              <button
                onClick={capture}
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
              >
                Take Photo
              </button>
              <button
                onClick={() => setShowCamera(false)}
                className="w-full py-2 bg-gray-400 text-white font-semibold rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className={`w-full py-3 rounded-md font-semibold text-white transition ${
              loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Analyzing...' : 'Analyze Image'}
          </button>

          {error && <div className="text-red-600 text-center font-medium">{error}</div>}

          {result && (
            <div
              className={`text-center py-6 rounded-lg ${
                result === 'FAKE'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-green-100 text-green-700'
              }`}
            >
              <h2 className="text-2xl font-bold mb-2">
                {result === 'FAKE' ? '❌ Deepfake Detected' : '✅ Image is Real'}
              </h2>
              <p className="text-md">
                Our AI model predicts this image is{' '}
                <strong>{result === 'FAKE' ? 'a deepfake' : 'authentic'}</strong>.
              </p>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-gray-800 text-gray-400 py-6 text-center">
        © {new Date().getFullYear()} Image Detector. All rights reserved.
      </footer>
    </div>
  );
}
