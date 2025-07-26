import React, { useState } from 'react';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);

    // Create preview
    if (uploadedFile && uploadedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(uploadedFile);
    } else {
      setPreview(null);
    }
  };

  const handleUpload = () => {
    if (!file) {
      alert('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    // Example upload using fetch (POST)
    fetch('https://your-api-endpoint.com/upload', {
      method: 'POST',
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        console.log('Upload success:', data);
        alert('File uploaded successfully');
      })
      .catch(err => {
        console.error('Upload error:', err);
        alert('Upload failed');
      });
  };

  return (
    <div style={{ margin: 20 }}>
      <h2>React File Upload</h2>
      <input type="file" onChange={handleFileChange} />
      {preview && (
        <div>
          <p>Image Preview:</p>
          <img src={preview} alt="Preview" width="200" />
        </div>
      )}
      <br />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default FileUpload;
