import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setResult('');
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      alert('Please select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      setLoading(true);
      // No headers block—Axios will set multipart boundary correctly
      const response = await axios.post('http://localhost:8000/analyze-image', formData);
      setResult(response.data.result || 'No result received.');
    } catch (error) {
      console.error('Upload error:', error);
      setResult('❌ Error analyzing the image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', backgroundColor: '#121212', color: '#fff', minHeight: '100vh' }}>
      <h1>Deepfake or Not</h1>

      <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginBottom: '1rem' }} />
      {preview && <img src={preview} alt="Preview" style={{ maxWidth: '300px', marginBottom: '1rem', display: 'block' }} />}

      <button
        onClick={handleAnalyze}
        disabled={loading}
        style={{
          padding: '0.5rem 1rem',
          cursor: loading ? 'not-allowed' : 'pointer',
          backgroundColor: loading ? '#555' : '#1e90ff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>

      <div style={{ marginTop: '2rem' }}>
        <h2>Response:</h2>
        <pre>{result}</pre>
      </div>
    </div>
  );
}

export default App;
