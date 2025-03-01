import React, { useState, useRef } from "react";
import ImageKit from "imagekit";
import Parse from "./database.js";
import "./fileUpload.css";

interface FileData {
  file: File;
  name: string;
  size: string;
  url: string; // For image previews
}
// initializeParse();

// Initialize ImageKit
const imagekit = new ImageKit({
  publicKey: "public_P17LRkYTu9e3UdN3WnyzbodiT1U=",
  urlEndpoint: "https://ik.imagekit.io/Comp3800Group12",
  privateKey: "private_PeSFDBIdeSuhtUZaec1saMxjqoU=",
});

const FileUpload: React.FC = () => {
  const [bookTitle, setBookTitle] = useState<string>("");
  const [bookId, setBookId] = useState<string>("");
  const [age, setAge] = useState<string>("");

  // const [type, setType] = useState<string>('');

  const [genres, setGenres] = useState([
    "Action Adventure",
    "Historical Fiction",
  ]);

  // const [newGenre, setNewGenre] = useState('');
  // default creators
  const initialCreators = [
    { role: "Author", name: "John Doe", customRole: "" },
  ];
  const initialRoles = [
    { value: "Author", label: "Author" },
    { value: "Illustrator", label: "Illustrator" },
  ];
  const [creators, setCreators] = useState(initialCreators);

  // don't have setRoles function
  const [roles, setRoles] = useState(initialRoles);
  const [publisher, setPublisher] = useState<string>("");
  const [isbn, setISBN] = useState<string>("");
  const [abstract, setAbstract] = useState<string>("");
  const [coverImage, setCoverImage] = useState<File | null>(null);

  // const [contentImages, setContentImages] = useState<File[]>([]);

  const [files, setFiles] = useState<FileData[]>([]);
  const [folderName, setFolderName] = useState<string | null>(null);

  const coverInputRef = useRef<HTMLInputElement | null>(null);
  const contentInputRef = useRef<HTMLInputElement | null>(null);

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
    setGenres([...genres, ""]); // Add an empty genre
  };

  const handleRemoveGenre = (index: number): void => {
    setGenres(genres.filter((_, i) => i !== index));
  };

  const handleCreatorChange = (index: number, field: string, value: string) => {
    const newCreators = creators.map((creator, i) => {
      if (i === index) {
        // If the field is 'customRole', update the customRole field
        if (field === "customRole") {
          return { ...creator, customRole: value }; // Update customRole without changing the role
        }
        // If the role is changed to 'Other', initialize customRole if it doesn't exist
        if (field === "role" && value === "Other") {
          return {
            ...creator,
            role: value,
            customRole: creator.customRole || "",
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
    const defaultRole = roles.length > 0 ? roles[0].value : "Author";
    setCreators([...creators, { role: defaultRole, name: "", customRole: "" }]);
  };

  const handleRemoveCreator = (index: number) => {
    setCreators(creators.filter((_, i) => i !== index));
  };

  const handleCoverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setCoverImage(event.target.files[0]);
    }
  };

  // const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files) {
  //     setContentImages(Array.from(event.target.files));
  //   }
  // };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Selecting files");
    const fileList = event.target.files;
    console.log(fileList);

    if (fileList && fileList.length > 0) {
      const filesArray = Array.from(fileList);

      const firstFile = filesArray[0];
      const isFolderUpload = firstFile.webkitRelativePath !== "";

      if (isFolderUpload) {
        const folderPath = firstFile.webkitRelativePath.split("/");
        const extractedFolderName =
          folderPath.length > 0 ? folderPath[0] : null;
        setFolderName(extractedFolderName);
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

    // uncomment later
    // if (files.length === 0) {
    //   alert("Please fill in all required fields and upload images.");
    //   return;
    // }

    // Upload cover image
    // if (coverImage) {
    //   const reader = new FileReader();
    //   reader.onload = async (loadEvent) => {
    //     const base64Data = loadEvent.target?.result as string;
    //     if (base64Data) {
    //       try {
    //         await imagekit.upload({
    //           file: base64Data,
    //           fileName: coverImage.name,
    //           folder: `/${bookId}/`,
    //           tags: [bookId],
    //         });
    //         console.log('Cover image uploaded successfully');
    //       } catch (error) {
    //         console.error('Error uploading cover image:', error);
    //       }
    //     }
    //   };
    //   reader.readAsDataURL(coverImage);
    // }

    // Upload content images
    // for (const file of contentImages) {
    //   const reader = new FileReader();
    //   reader.onload = async (loadEvent) => {
    //     const base64Data = loadEvent.target?.result as string;
    //     if (base64Data) {
    //       try {
    //         await imagekit.upload({
    //           file: base64Data,
    //           fileName: file.name,
    //           folder: `/${bookId}/`,
    //           folder: uploadPath,
    //           tags: [bookId],
    //         });
    //         console.log(`Content image ${file.name} uploaded successfully`);
    //       } catch (error) {
    //         console.error(`Error uploading content image ${file.name}:`, error);
    //       }
    //     }
    //   };
    //   reader.readAsDataURL(file);
    // }
    const uploadPath = folderName ? `/${folderName}/` : "/";

    for (const fileData of files) {
      const reader = new FileReader();

      reader.onload = async (loadEvent) => {
        const base64Data = loadEvent.target?.result as string;
        if (base64Data) {
          try {
            const result = await imagekit.upload({
              file: base64Data,
              fileName: fileData.name,
              folder: uploadPath,
              tags: [`${folderName}`],
            });
            console.log("Upload successful", result);
            alert(`File ${fileData.name} uploaded successfully!`);
          } catch (error) {
            console.error("Error uploading file:", error);
            alert(
              `Upload failed for ${fileData.name}: ${(error as Error).message}`
            );
          }
        }
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        alert(`Error reading file: ${fileData.name}`);
      };

      reader.readAsDataURL(fileData.file);
    }

    alert("Book uploaded successfully!");
  };

  // Function to handle file removal
  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index)); // Remove file by index
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
      !isbn ||
      !abstract
    ) {
      console.log("Please fill in all required fields");
      return;
    }

    const Storybook = Parse.Object.extend("storybookTesting");
    const storybook = new Storybook();
    storybook.set("bookTitle", bookTitle);
    storybook.set("bookId", bookId);
    storybook.set("age", age);
    storybook.set("genres", genres);
    storybook.set("creators", creators);
    storybook.set("publisher", publisher);
    storybook.set("isbn", isbn);
    storybook.set("abstract", abstract);

    try {
      await storybook.save();
      console.log("Book metadata saved successfully!");
    } catch (error) {
      console.log("Error saving metadata:", error);
    }
  };

  return (
    <div className="App">
      <h2>Upload New Book</h2>
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
            style={{ width: "500px" }}
          >
            <option value="3">0~2</option>
            <option value="4">3~4</option>
            <option value="5">5~6</option>
          </select>
        </div>
        {/* <div className="form-group">
          <label>Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)} style={{ width: '500px' }}>
            <option value="Fiction">Fiction</option>
            <option value="type1">type1</option>
            <option value="type2">type2</option>
          </select>
        </div> */}
        <div className="form-group">
          <label>Genre</label>
          {genres.map((genre, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <input
                type="text"
                value={genre}
                onChange={(e) => handleGenreInputChange(index, e.target.value)}
                placeholder="Enter genre..."
                style={{ marginRight: "15px" }}
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

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={handleAddGenre}
              className="Addbutton"
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
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              {creator.role === "Other" ? (
                <>
                  <input
                    type="text"
                    placeholder="Custom role name"
                    value={creator.customRole || ""}
                    onChange={(e) =>
                      handleCreatorChange(index, "customRole", e.target.value)
                    }
                    style={{ marginRight: "5px" }}
                  />
                  <input
                    type="text"
                    placeholder="Name"
                    value={creator.name}
                    onChange={(e) =>
                      handleCreatorChange(index, "name", e.target.value)
                    }
                  />
                </>
              ) : (
                <>
                  <select
                    value={creator.role}
                    onChange={(e) =>
                      handleCreatorChange(index, "role", e.target.value)
                    }
                    style={{ marginRight: "5px" }}
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
                      handleCreatorChange(index, "name", e.target.value)
                    }
                    style={{ marginRight: "3px" }}
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
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={handleAddCreator}
              className="Addbutton"
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
          <input type="text" placeholder="Published" />
        </div>
        {/* <div className="form-group">
          <label>Published by</label>
          <input
            type="text"
            placeholder="Published by"
          //disabled
          />
        </div> */}
        <div className="form-group">
          <label>ISBN</label>
          <input
            type="text"
            value={isbn}
            placeholder="ISBN"
            onChange={(e) => setISBN(e.target.value)}
          />
        </div>
        {/* <div className="form-group">
          <label>Contributed by</label>
          <input
            type="text"
            placeholder="Contributed by"

          />
        </div> */}
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
            style={{ display: "none" }}
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
              <div style={{ display: "flex", alignItems: "center" }}>
                <span style={{ fontSize: "16px", marginRight: "10px" }}>
                  {file.size}{" "}
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
      <div>
        <button type="submit" onClick={handleAddToDB}>
          Add to DB
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
