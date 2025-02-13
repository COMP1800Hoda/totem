import React, { useState } from 'react';
import ImageKit from 'imagekit';
import './fileUpload.css';

// Initialize ImageKit
const imagekit = new ImageKit({
  publicKey: "public_P17LRkYTu9e3UdN3WnyzbodiT1U=",
  urlEndpoint: "https://ik.imagekit.io/Comp3800Group12",
  privateKey: "private_PeSFDBIdeSuhtUZaec1saMxjqoU=",
});

const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]); 

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Selecting files");
    const fileList = event.target.files;
    console.log(fileList);

    if (fileList && fileList.length > 0) {
      const filesArray = Array.from(fileList); 
      setFiles(filesArray); 
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault(); 

    if (files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();

        reader.onload = async (loadEvent) => {
          const base64Data = loadEvent.target?.result as string;
          if (base64Data) {
            try {
              const result = await imagekit.upload({
                file: base64Data, 
                fileName: file.name, 
                tags: ["tag1", "tag2"], 
              });
              console.log("Upload successful", result);
              alert(`File ${file.name} uploaded successfully!`);
            } catch (error) {
              console.error("Error uploading file:", error);
              alert(`Upload failed for ${file.name}: ${(error as Error).message}`);
            }
          }
        };

        reader.onerror = (error) => {
          console.error("Error reading file:", error);
          alert(`Error reading file: ${file.name}`);
        };

        reader.readAsDataURL(file); 
      }
    } else {
      alert('Please select at least one file first.');
    }
  };

  return (
    <div className="App">
      <div className="file-input-container">
        <i className="fas fa-cloud-upload-alt icon"></i>
        <p>
          {files.length > 0
            ? `Files ready to upload: ${files.map((file) => file.name).join(', ')}`
            : "No files chosen, yet!"}
        </p>
        <label htmlFor="file-upload" className="custom-file-choose">
          CHOOSE FILES
        </label>
        <input
          id="file-upload"
          type="file"
          multiple 
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>
      <div>
        <button className="custom-file-upload" onClick={handleSubmit}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
