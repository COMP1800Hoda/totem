import React, { useState, useRef, useEffect } from 'react';
import ImageKit from 'imagekit';
import Parse from '../../database';
import './fileUpload.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from '../../components/header/Header';
import { Container } from '../../components/Container.tsx';
import { useNavigate } from 'react-router-dom';
import {
  checkTokenAndRedirect,
  getToken,
} from '../../components/utils/tokenUtils.js';

interface FileData {
  file: File;
  name: string;
  size: string;
  url: string; // For image previews
}

// Initialize ImageKit
const imagekit = new ImageKit({
  publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT,
  privateKey: import.meta.env.VITE_IMAGEKIT_PRIVATE_KEY,
});

const FileUpload: React.FC = () => {
  //Start of code for JWT authorization
  checkTokenAndRedirect();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isCheckingToken, setIsCheckingToken] = useState(true); // prevent rendering before token check
  const [bookTitle, setBookTitle] = useState<string>('');
  const [bookId, setBookId] = useState<string>('');
  const [age, setAge] = useState<string>('0~2');
  const [genres, setGenres] = useState([
    'Action Adventure',
    'Historical Fiction',
  ]);

  // default creators
  const initialCreators = [
    { role: 'Author', name: 'John Doe', customRole: '' },
  ];
  const initialRoles = [
    { value: 'Author', label: 'Author' },
    { value: 'Illustrator', label: 'Illustrator' },
  ];
  const [creators, setCreators] = useState(initialCreators);
  const [roles, setRoles] = useState(initialRoles);
  const [published, setPublished] = useState<string>('');
  const [publisher, setPublisher] = useState<string>('');
  const [isbn, setISBN] = useState<string>('');
  const [abstract, setAbstract] = useState<string>('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [files, setFiles] = useState<FileData[]>([]);
  const [folderName, setFolderName] = useState<string | null>(null);
  const [coverimageurl, setUrl] = useState<string | null>(null);
  const [contentimageurl, setimageUrl] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const coverInputRef = useRef<HTMLInputElement | null>(null);
  const contentInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      await checkTokenAndRedirect();
      setIsCheckingToken(false); // Set to false after token check
    };
    checkToken();
  }, []);

  useEffect(() => {
    console.log('file upload before');
    const token = getToken(); // Get the token from local storage
    fetch('http://localhost:8080/add-book', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch admins');
        }
        return response.json();
      })
      .catch((error) => {
        setError(error.message);
        console.log('Error:', error);
      });

    console.log('file upload after');
  });

  useEffect(() => {
    if (isUploading && coverimageurl && contentimageurl.length > 0) {
      // Both coverimageurl and contentimageurl are updated
      handleAddToDB();
      setIsUploading(false); // Reset the uploading state
    }
  }, [coverimageurl, contentimageurl]);

  if (isCheckingToken) return null; // Prevent rendering UI until token check is complete
  if (error) navigate('/'); // Redirect to login if there's an error
  //end of JWT_authorization code

  //handle Genre
  const handleGenreInputChange = (index: number, value: string): void => {
    const newGenres = genres.map((genre, i) => {
      if (i === index) {
        return value;
      }
      return genre;
    });
    setGenres(newGenres);
  };

  const handleAddGenre = (): void => {
    setGenres([...genres, '']); // Add an empty genre
  };

  const handleRemoveGenre = (index: number): void => {
    setGenres(genres.filter((_, i) => i !== index));
  };

  const handleCreatorChange = (index: number, field: string, value: string) => {
    const newCreators = creators.map((creator, i) => {
      if (i === index) {
        // If the field is 'customRole', update the customRole field
        if (field === 'customRole') {
          return { ...creator, customRole: value }; // Update customRole without changing the role
        }
        // If the role is changed to 'Other', initialize customRole if it doesn't exist
        if (field === 'role' && value === 'Other') {
          return {
            ...creator,
            role: value,
            customRole: creator.customRole || '',
          };
        }
        // Handle updates to all other fields
        return { ...creator, [field]: value };
      }
      return creator;
    });
    setCreators(newCreators);
  };

  const handleAddCreator = () => {
    const defaultRole = roles.length > 0 ? roles[0].value : 'Author';
    setCreators([...creators, { role: defaultRole, name: '', customRole: '' }]);
  };

  const handleRemoveCreator = (index: number) => {
    setCreators(creators.filter((_, i) => i !== index));
  };

  const handleCoverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setCoverImage(event.target.files[0]);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Selecting files');
    const fileList = event.target.files;
    console.log(fileList);

    if (fileList && fileList.length > 0) {
      const filesArray = Array.from(fileList);

      const firstFile = filesArray[0];
      const isFolderUpload = firstFile.webkitRelativePath !== '';

      if (isFolderUpload) {
        setFolderName(bookId);
      } else {
        setFolderName(null);
      }

      const filesData = filesArray.map((file) => ({
        file: file, // Store the actual File object
        name: file.name,
        size: `${(file.size / 1024).toFixed(2)}kb`, // Convert size to KB
        url: URL.createObjectURL(file), // Generate preview URL
      }));

      setFiles(filesData);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsUploading(true); // Set uploading state to true

    // Folder for cover images
    const coverImageFolder = `/book-cover-images/${bookId}/`;

    // Folder for content images
    const contentImagesFolder = `/book-images/${bookId}/`;

    // Array to track upload promises
    const uploadPromises: Promise<void>[] = [];

    // Upload cover image
    if (coverImage) {
      const coverUploadPromise = new Promise<void>(async (resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (loadEvent) => {
          const base64Data = loadEvent.target?.result as string;
          if (base64Data) {
            try {
              const response = await imagekit.upload({
                file: base64Data,
                fileName: coverImage.name,
                folder: coverImageFolder,
                tags: [bookId],
              });
              const coverimageUrl = response.url;
              setUrl(coverimageUrl); // Update coverimageurl state
              console.log(
                'Cover image uploaded successfully. URL:',
                coverimageUrl
              );
              resolve();
            } catch (error) {
              console.error('Error uploading cover image:', error);
              alert(`Error uploading cover image: ${(error as Error).message}`);
              reject(error);
            }
          }
        };
        reader.onerror = (error) => {
          console.error('Error reading cover image:', error);
          alert('Error reading cover image');
          reject(error);
        };
        reader.readAsDataURL(coverImage);
      });
      uploadPromises.push(coverUploadPromise);
    }

    // Upload content images
    for (const fileData of files) {
      const contentUploadPromise = new Promise<void>(
        async (resolve, reject) => {
          const reader = new FileReader();
          reader.onload = async (loadEvent) => {
            const base64Data = loadEvent.target?.result as string;
            if (base64Data) {
              try {
                const response = await imagekit.upload({
                  file: base64Data,
                  fileName: fileData.name,
                  folder: contentImagesFolder,
                  tags: [bookId],
                });
                const imageUrl = response.url;
                setimageUrl((prevUrls) => [...prevUrls, imageUrl]); // Update contentimageurl state
                console.log(
                  'Content image uploaded successfully. URL:',
                  imageUrl
                );
                resolve();
              } catch (error) {
                console.error(
                  `Error uploading content image ${fileData.name}:`,
                  error
                );
                alert(
                  `Error uploading content image ${fileData.name}: ${(error as Error).message}`
                );
                reject(error);
              }
            }
          };
          reader.onerror = (error) => {
            console.error(
              `Error reading content image ${fileData.name}:`,
              error
            );
            alert(`Error reading content image ${fileData.name}`);
            reject(error);
          };
          reader.readAsDataURL(fileData.file);
        }
      );
      uploadPromises.push(contentUploadPromise);
    }

    try {
      // Wait for all uploads to complete
      await Promise.all(uploadPromises);
      console.log('All files uploaded successfully');
    } catch (error) {
      console.error('Error during upload:', error);
      alert('An error occurred during the upload process. Please try again.');
      setIsUploading(false); // Reset the uploading state on error
    }
  };

  // add one function to add storybook metadata to database
  const handleAddToDB = async () => {
    // just checking, you should change it and add more variables to check
    // should have an alert pop up to notify the admin
    if (
      !bookTitle ||
      !bookId ||
      !age ||
      !genres ||
      !creators ||
      !publisher ||
      !published ||
      !isbn ||
      !abstract ||
      !coverimageurl ||
      !contentimageurl
    ) {
      console.log('Please fill in all required fields');
      return;
    }

    const Storybook = Parse.Object.extend('StoryBook_Admin');
    const storybook = new Storybook();
    storybook.set('BookTitle', bookTitle);
    storybook.set('BookID', bookId);
    storybook.set('Age', age);
    storybook.set('Genre', genres);
    storybook.set('CreatedBy', creators);
    storybook.set('Publisher', publisher);
    storybook.set('Published', published);
    storybook.set('ISBN', isbn);
    storybook.set('Abstract', abstract);
    storybook.set('CoverImgUrl', coverimageurl);
    storybook.set('ContentImgUrl', contentimageurl);

    try {
      await storybook.save();
      console.log('Book metadata saved successfully!');
    } catch (error) {
      console.log('Error saving metadata:', error);
    }
  };
  // Function to handle file removal
  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index)); // Remove file by index
  };

  return (
    <div className="App container mt-4 px-4 ">
      <Header />
      <Container>
        <h2 className="upload_header mt-5">Upload New Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Book Title</label>
            <input
              type="text"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              //required
            />
          </div>

          <div className="form-group">
            <label>Book ID</label>
            <input
              type="text"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              //required
            />
          </div>
          <div className="form-group">
            <label>Age</label>
            <select
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="form-control w-auto px-4"
            >
              <option value="0~2">0~2</option>
              <option value="3~4">3~4</option>
              <option value="5~6">5~6</option>
            </select>
          </div>

          <div className="form-group">
            <label>Genre</label>
            {genres.map((genre, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '5px',
                }}
              >
                <input
                  type="text"
                  value={genre}
                  onChange={(e) =>
                    handleGenreInputChange(index, e.target.value)
                  }
                  placeholder="Enter genre..."
                  style={{ marginRight: '10px' }}
                />
                <div className="input-with-icon">
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => handleRemoveGenre(index)}
                    aria-label="Remove genre"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={handleAddGenre}
                className="Addbutton w-auto px-3"
              >
                Add
              </button>
            </div>
          </div>
          <div className="form-group">
            <label>Created by</label>
            {creators.map((creator, index) => (
              <div
                key={index}
                className="form-row"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '5px',
                }}
              >
                {creator.role === 'Other' ? (
                  <>
                    <input
                      type="text"
                      placeholder="Custom role name"
                      value={creator.customRole || ''}
                      onChange={(e) =>
                        handleCreatorChange(index, 'customRole', e.target.value)
                      }
                      style={{ marginRight: '5px' }}
                    />
                    <input
                      type="text"
                      placeholder="Name"
                      value={creator.name}
                      onChange={(e) =>
                        handleCreatorChange(index, 'name', e.target.value)
                      }
                    />
                  </>
                ) : (
                  <>
                    <select
                      value={creator.role}
                      onChange={(e) =>
                        handleCreatorChange(index, 'role', e.target.value)
                      }
                      style={{ marginRight: '5px' }}
                    >
                      <option value="">Select role</option>
                      <option value="Author">Author</option>
                      <option value="Poet">Poet</option>
                      <option value="Illustrator">Illustrator</option>
                      <option value="Book Cover Designer">
                        Book Cover Designer
                      </option>
                      <option value="Other">Other</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Name"
                      value={creator.name}
                      onChange={(e) =>
                        handleCreatorChange(index, 'name', e.target.value)
                      }
                      style={{ marginRight: '3px' }}
                    />
                  </>
                )}
                <div className="input-with-icon">
                  <button
                    className="delete-button"
                    type="button"
                    onClick={() => handleRemoveCreator(index)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={handleAddCreator}
                className="Addbutton w-auto px-3"
              >
                Add
              </button>
            </div>
          </div>
          <div className="form-group">
            <label>Publisher</label>
            <input
              type="text"
              placeholder="Publisher"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Published</label>
            <input
              type="text"
              value={published}
              onChange={(e) => setPublished(e.target.value)}
              placeholder="Published"
            />
          </div>

          <div className="form-group">
            <label>ISBN</label>
            <input
              type="text"
              value={isbn}
              placeholder="ISBN"
              onChange={(e) => setISBN(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Abstract</label>
            <textarea
              value={abstract}
              placeholder="Abstract"
              onChange={(e) => setAbstract(e.target.value)}
            />
          </div>
        </form>

        <div className="form-group">
          <label>Book Cover</label>
          <input
            type="file"
            ref={coverInputRef}
            onChange={handleCoverChange}
            accept="image/*"
            required
          />
        </div>
        <div className="form-group">
          <label>Book Content images</label>
          <div className="file-input-container">
            <i className="fas fa-cloud-upload-alt icon"></i>
            <label htmlFor="file-upload" className="custom-file-choose">
              Select Folder
            </label>

            <input
              ref={contentInputRef}
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              accept="image/*"
              multiple
              required
            />
          </div>
        </div>
        <div className="upload-container">
          {folderName && <p>Selected Folder: {folderName}</p>}
          <div>
            {files.map((file, index) => (
              <div key={index} className="preview-container">
                <span>{file.name}</span>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontSize: '16px', marginRight: '10px' }}>
                    {file.size}{' '}
                  </span>
                  <button
                    onClick={() => handleRemove(index)}
                    className="preview-remove-Button"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="button-row ">
          <button type="submit">Preview</button>
          <button type="submit" onClick={handleSubmit}>
            Upload
          </button>
        </div>
      </Container>
    </div>
  );
};

export default FileUpload;
