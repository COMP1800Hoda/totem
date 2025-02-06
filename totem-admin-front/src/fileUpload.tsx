import React, { useState } from 'react';
import './fileUpload.css';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      setFile(fileList[0]);  // Capture the first file
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();  // Prevent the form from submitting traditionally
    if (file) {
      console.log('Uploading:', file);
      // Implement the logic to handle file upload here
    } else {
      alert('Please select a file first.');
    }
  };

  return (
    <div className="App">
      <div className="file-input-container">
        <i className="fas fa-cloud-upload-alt icon"></i>
        <p>{file ? `File ready to upload: ${file.name}` : "No file chosen, yet!"}</p>
        <label htmlFor="file-upload" className="custom-file-choose">
          CHOOSE A FILE
        </label>
        <input id="file-upload" type="file" onChange={handleFileChange} style={{ display: 'none' }}/>
      </div>
      <div>
      <button className="custom-file-upload" onClick={handleSubmit}>Upload</button>
      </div>
    </div>
  );
};

export default FileUpload;
