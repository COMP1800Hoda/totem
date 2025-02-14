import React, { useState, useRef, useEffect } from 'react';
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
  const [folderName, setFolderName] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect (() => {
    if(fileInputRef.current){
      fileInputRef.current.setAttribute("webkitdirectory", "");
    }
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Selecting files");
    const fileList = event.target.files;
    console.log(fileList);

    if (fileList && fileList.length > 0) {
      const filesArray = Array.from(fileList); 

      const firstFile = filesArray[0];
      
      const isFolderUpload =firstFile.webkitRelativePath !== "";

      if(isFolderUpload){

        //extract folder name
        const folderPath = firstFile.webkitRelativePath.split("/");
        //check if the folder name is not empty. If not empty, set the folder name
        const extractedFolderName = folderPath.length > 0 ? folderPath[0] : null;
        setFolderName(extractedFolderName);
      } else {
        setFolderName(null);
      }
      setFiles(filesArray); 
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault(); 

    if (files.length > 0) {
      //get the url path for the folder in Imagekit.io
      const uploadPath = folderName ? `/${folderName}/` : "/";

      for (const file of files) {
        const reader = new FileReader();

        reader.onload = async (loadEvent) => {
          const base64Data = loadEvent.target?.result as string;
          if (base64Data) {
            try {
              const result = await imagekit.upload({
                file: base64Data, 
                fileName: file.name, 
                folder: uploadPath,
              
                tags: [`${folderName}`], 
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
          CHOOSE FOLDER
        </label>
        <input
          ref={fileInputRef}
          id="file-upload"
          type="file"
          multiple 
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>
      
        <button className="custom-file-upload" onClick={handleSubmit}>
          Upload
        </button>
      
    </div>

  );
};

export default FileUpload;
