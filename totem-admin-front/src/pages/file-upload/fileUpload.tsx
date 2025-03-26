import React, { useState, useRef, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Header } from '../../components/header/Header.tsx';
import imagekit from "../../imagekit.js";
import Parse from "../../database.js";
import DraggingIcon from "../../assets/draggingdot.svg";
import {
    AppContainer, UploadHeader, FormRow, ButtonRow, FormGroup, Input, Select,
    TextArea, SubPreButton, FileInputContainer, FullWidthLabel,Icon, AddButton, 
    DeleteButton, PreviewContainer, PreviewRemoveButton,GenerateButton,
} from './fileUpload_style';
import {generateBookID} from "../../utils/generateBookId.ts";

interface FileData {
    file: File;
    name: string;
    size: string;
    url: string; 
}

interface PreviewData {
    bookTitle: string;
    bookId: string;
    age: string;
    genres: string[];
    creators: { role: string; name: string; customRole: string }[];
    publisher: string;
    published: string;
    isbn: string;
    abstract: string;
    coverImage: string | null;
    contentImages: string[];
    coverImageName: string;
    contentImageName: string[];
}


const FileUpload: React.FC = () => {
    const [bookTitle, setBookTitle] = useState<string>("");
    const [bookId, setBookId] = useState<string>("");
    const [age, setAge] = useState<string>("0~2");
    const [genres, setGenres] = useState([
        "Action Adventure",
        "Historical Fiction",
    ]);

    // default creators
    const initialCreators = [
        { role: "Author", name: "", customRole: "" },
    ];
    const initialRoles = [
        { value: "Author", label: "Author" },
        { value: "Illustrator", label: "Illustrator" },
    ];
    const [creators, setCreators] = useState(initialCreators);
    const [roles, setRoles] = useState(initialRoles);
    const [published, setPublished] = useState<string>("");
    const [publisher, setPublisher] = useState<string>("");
    const [isbn, setISBN] = useState<string>("");
    const [abstract, setAbstract] = useState<string>("");
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [files, setFiles] = useState<FileData[]>([]);
    const [folderName, setFolderName] = useState<string | null>(null);
    const [coverimageurl, setUrl] = useState<string | null>(null);
    const [contentimageurl, setimageUrl] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const coverInputRef = useRef<HTMLInputElement | null>(null);
    const contentInputRef = useRef<HTMLInputElement | null>(null);
    const [previewData, setPreviewData] = useState<PreviewData | null>(null);
    const [imageNames, setImageNames] = useState<string[]>([]);
    const [coverimagename, setCoverImagename] = useState<string | null>(null);
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
        setGenres([...genres, ""]); 
    };

    const handleRemoveGenre = (index: number): void => {
        setGenres(genres.filter((_, i) => i !== index));
    };

    const handleCreatorChange = (index: number, field: string, value: string) => {
        const newCreators = creators.map((creator, i) => {
          if (i === index) {
           
            if (field === "customRole") {
              return { ...creator, customRole: value };
            }
           
            if (field === "role" && value === "Other") {
              return {
                ...creator,
                role: value,
                customRole: creator.customRole || "",
              };
            }
           
            return { ...creator, [field]: value };
          }
          return creator;
        });
        setCreators(newCreators);
      };

    const replaceOtherWithCustomRole = (creators: { role: string; name: string; customRole: string }[]) => {
        return creators.map((creator) => {
            if (creator.role === "Other" && creator.customRole) {
                return {
                    ...creator,
                    role: creator.customRole, 
                    customRole: "",
                };
            }
            return creator;
        });
    };

    const handleAddCreator = () => {
        const defaultRole = roles.length > 0 ? roles[0].value : "Author";
        setCreators([...creators, { role: defaultRole, name: "", customRole: "" }]);
    };

    const handleRemoveCreator = (index: number) => {
        setCreators(creators.filter((_, i) => i !== index));
    };
    //Handle cover image
    const handleCoverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setCoverImage(event.target.files[0]);
        }
    };

    //Handle drag and drop effect 
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault(); // Prevent default behavior (prevent file from being opened)
        event.currentTarget.classList.add('drag-over');
    };

    const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        // Optional: Add visual cues or classes
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.currentTarget.classList.remove('drag-over'); // Remove the visual cue on leaving drag area
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.currentTarget.classList.remove('drag-over');

        const files = event.dataTransfer.files;
        handleFileChange(files); // Pass the FileList directly
    };

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            handleFileChange(event.target.files);
        }
        // Reset the value of the input to allow for re-upload of the same file if necessary
        event.target.value = '';
    };


    const handleFileChange = (files: FileList) => {
        console.log("Selecting files");

        if (files.length > 0) {
            const filesArray = Array.from(files);

            const firstFile = filesArray[0];
            const isFolderUpload = firstFile.webkitRelativePath !== "";

            if (isFolderUpload) {
                setFolderName(bookId);
            } else {
                setFolderName(null);
            }


            const updatedFilesData = filesArray.map((file) => ({
                file: file,
                name: file.name,
                size: `${(file.size / 1024).toFixed(2)}kb`,
                url: URL.createObjectURL(file),
            }));

            setFiles((prevFiles) => [...prevFiles, ...updatedFilesData]);
        }
    };


    const onDragEnd = (result: { destination: any; source: any; }) => {
        const { destination, source } = result;
        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const newFiles = Array.from(files);
        const [moved] = newFiles.splice(source.index, 1);
        newFiles.splice(destination.index, 0, moved);

        setFiles(newFiles);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsUploading(true);
        if (
          !bookTitle ||
          !bookId ||
          !age ||
          // !genres ||
          !creators
          // !publisher ||
          // !published ||
          // !isbn ||
          // !abstract
        ) {
          alert("Please fill in all required fields");
          setIsUploading(false);
          return;
        }

        const coverImageFolder = `/book-cover-images/${bookId}/`;

        const contentImagesFolder = `/book-images/${bookId}/`;

        const uploadPromises: Promise<void>[] = [];
        
        const contentImageNames: string[] = [];
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
                            setUrl(coverimageUrl);
                            const covername = coverImage.name;
                            setCoverImagename(covername);
                            console.log("Cover image uploaded successfully. URL:", coverimageUrl);
                            resolve();
                        } catch (error) {
                            console.error("Error uploading cover image:", error);
                            alert(`Error uploading cover image: ${(error as Error).message}`);
                            reject(error);
                        }
                    }
                };
                reader.onerror = (error) => {
                    console.error("Error reading cover image:", error);
                    alert("Error reading cover image");
                    reject(error);
                };
                reader.readAsDataURL(coverImage);
            });
            uploadPromises.push(coverUploadPromise);
        }

        // Upload content images
        for (const fileData of files) {
            const contentUploadPromise = new Promise<void>(async (resolve, reject) => {
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

                            const imageName = fileData.file.name;
                            console.log(imageName);
                            contentImageNames.push(imageName);
                            setImageNames(contentImageNames);
                            const imageUrl = response.url;
                            setimageUrl((prevUrls) => [...prevUrls, imageUrl]);
                            console.log("Content image uploaded successfully. URL:", imageUrl);
                            resolve();
                        } catch (error) {
                            console.error(`Error uploading content image ${fileData.name}:`, error);
                            alert(
                                `Error uploading content image ${fileData.name}: ${(error as Error).message}`
                            );
                            reject(error);
                        }
                    }
                };
                reader.onerror = (error) => {
                    console.error(`Error reading content image ${fileData.name}:`, error);
                    alert(`Error reading content image ${fileData.name}`);
                    reject(error);
                };
                reader.readAsDataURL(fileData.file);
            });
            uploadPromises.push(contentUploadPromise);
        }

        try {
            // Wait for all uploads to complete
            await Promise.all(uploadPromises);
            console.log("All files uploaded successfully");
            if (
              !coverimageurl ||
              !contentimageurl
            ) {
              console.log("Something wrong to handle images");
              setIsUploading(false);
              return;
            }

            const dbResult = await handleAddToDB();
            if (!dbResult) {
              console.log('failed db upload')
              setIsUploading(false);
              return; // do not navigate
            }

            const metaData = {
                bookTitle: bookTitle,
                bookId: bookId
            };
            localStorage.setItem('Metadata', JSON.stringify(metaData));

            window.location.href = '/success';
        } catch (error) {
            console.error("Error during upload:", error);
            alert("An error occurred during the upload process. Please try again.");
            setIsUploading(false); // Reset the uploading state on error
        }
    };

    
    const handleAddToDB = async () => {
        const updatedCreators = replaceOtherWithCustomRole(creators);
        console.log(updatedCreators)
        const Storybook = Parse.Object.extend("storybook");
        const storybook = new Storybook();
        const nextIndex = await Parse.Cloud.run('getNextIndex', { name: 'storybook' });
        console.log("Generated index:", nextIndex);
        storybook.set("storybook_title", bookTitle);
        storybook.set("storybook_id", bookId);
        storybook.set("Age", age);
        storybook.set("genre", genres);
        storybook.set("created_by", updatedCreators);
        storybook.set("publisher", publisher);
        storybook.set("published", published);
        storybook.set("ISBN", isbn);
        storybook.set("storybook_description", abstract);
        storybook.set("cover_image_url", coverimageurl);
        storybook.set("storybook_image_url", contentimageurl);
        storybook.set("cover_image_name", coverimagename);
        storybook.set("storybook_image_name", imageNames);
        console.log(storybook);

        try {
            await storybook.save();
            console.log("Book metadata saved successfully!");
            return true;
        } catch (error) {
            console.log("Error saving metadata:", error);
            return false;
        }
    };
    
    const handleRemove = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };


    const handlePreview = async () => {
        console.log('Cover image state:', coverImage);

        if (!coverImage) {
            alert('Please upload a cover image.');
            return;
        }

        let coverImageBase64: string | null = null;

        if (coverImage.type.startsWith('image/')) {
            try {
                coverImageBase64 = await convertFileToBase64(coverImage);
                console.log('Base64 cover image:', coverImageBase64);
            } catch (error) {
                console.error('Error converting cover image to Base64:', error);
                alert('Failed to process the cover image. Please try again.');
                return;
            }
        }

        // Convert content images to Base64
        const contentImagesBase64: string[] = [];
        const newImageNames: string[] = [];

        for (const fileData of files) {
            const imageName = fileData.file.name;
            console.log(imageName);
            newImageNames.push(imageName);

            if (fileData.file.type.startsWith('image/')) {
                try {
                    const base64 = await convertFileToBase64(fileData.file);
                    contentImagesBase64.push(base64);
                    console.log('Base64 content image:', base64);
                } catch (error) {
                    console.error('Error converting content image to Base64:', error);
                    alert('Failed to process a content image. Please try again.');
                    return;
                }
            }
        }

        setImageNames(newImageNames);
        console.log('Stored image names:', newImageNames);
        
        const previewData: PreviewData = {
            bookTitle,
            bookId,
            age,
            genres,
            creators,
            publisher,
            published,
            isbn,
            abstract,
            coverImage: coverImageBase64,
            contentImages: contentImagesBase64,
            coverImageName: coverImage.name,
            contentImageName: newImageNames
        }

        console.log('Preview data:', previewData); // Debugging

        setPreviewData(previewData);
        localStorage.setItem('previewBook', JSON.stringify(previewData));
        window.location.href = '/preview';
    };

    const convertFileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });
    };

    const handleGenerate = async (e: { preventDefault: () => void; }) => {
      e.preventDefault();

      const id = await generateBookID()
      if (typeof id === "string") {
        console.log('success to generate new id:', id)
        setBookId(id);
      }
    }

    return (
        <div>
            <div style={{ gap: "50px" }}><Header /></div>
            <AppContainer>
                <UploadHeader>Add New Book</UploadHeader>
                <form onSubmit={handleSubmit}>
                    <FormGroup className={"required"}>
                        <label>Book Title</label>
                        <Input
                            type="text"
                            value={bookTitle}
                            onChange={(e) => setBookTitle(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup className={"required"}>
                        <label>Book ID</label>
                        <FormRow>
                            <Input
                                type="text"
                                value={bookId}
                                onChange={(e) => setBookId(e.target.value)}
                                style={{ marginRight: "10px", width: "90%" }}
                            />
                            <GenerateButton onClick={handleGenerate}>Generate</GenerateButton>
                        </FormRow>
                        <div style={{ fontSize: "12px" }}>
                            <span style={{ fontWeight: "bold" }}>Book ID</span> consists of English letters, numbers, and underscores (e.g., cropson_00390039).
                            It is used as the folder path in the image CDN.<span style={{ fontWeight: "bold" }}> Once generated, it cannot be changed.</span> Click “Generate” to create a random ID.
                        </div>
                    </FormGroup>

                    <FormGroup className={"required"}>
                        <label>Age</label>
                        <Select
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            style={{ width: "530px" }}
                        >
                            <option value="0~2">0~2</option>
                            <option value="3~4">3~4</option>
                            <option value="5~6">5~6</option>
                        </Select>
                    </FormGroup>

                    <FormGroup>
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
                                <Input
                                    type="text"
                                    value={genre}
                                    onChange={(e) => handleGenreInputChange(index, e.target.value)}
                                    placeholder="Enter genre..."
                                    style={{ marginRight: "10px" }}
                                />
                                <div className="input-with-icon">
                                    <DeleteButton
                                        type="button"
                                        onClick={() => handleRemoveGenre(index)}
                                        aria-label="Remove genre"
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </DeleteButton>
                                </div>
                            </div>
                        ))}

                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <AddButton
                                type="button"
                                onClick={handleAddGenre}
                            >
                                Add
                            </AddButton>
                        </div>
                    </FormGroup>

                    <FormGroup className={"required"}>
                        <label>Created by</label>
                        {creators.map((creator, index) => (
                            <div
                                key={index}
                                className="form-row"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginBottom: "7px",
                                }}
                            >
                                {creator.role === "Other" ? (
                                    <>
                                        <Input
                                            type="text"
                                            placeholder="Custom role name"
                                            value={creator.customRole || ""}
                                            onChange={(e) =>
                                                handleCreatorChange(index, "customRole", e.target.value)
                                            }
                                            style={{ marginRight: "5px" }}
                                        />
                                        <Input
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
                                        <Select
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
                                        </Select>
                                        <Input
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
                                    <DeleteButton
                                        type="button"
                                        onClick={() => handleRemoveCreator(index)}
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </DeleteButton>
                                </div>
                            </div>
                        ))}
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <AddButton
                                type="button"
                                onClick={handleAddCreator}
                            >
                                Add
                            </AddButton>
                        </div>
                    </FormGroup>


                    <FormGroup>
                        <label>Publisher</label>
                        <Input
                            type="text"
                            placeholder="Publisher"
                            value={publisher}
                            onChange={(e) => setPublisher(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>Published</label>
                        <Input
                            type="text"
                            value={published}
                            onChange={(e) => setPublished(e.target.value)}
                            placeholder="Published" />
                    </FormGroup>

                    <FormGroup>
                        <label>ISBN</label>
                        <Input
                            type="text"
                            value={isbn}
                            placeholder="ISBN"
                            onChange={(e) => setISBN(e.target.value)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>Abstract</label>
                        <TextArea
                            value={abstract}
                            placeholder="Abstract"
                            onChange={(e) => setAbstract(e.target.value)}
                        />
                    </FormGroup>
                </form>

                <FormGroup className={"required"}>
                    <label>Book Cover</label>
                    <Input
                        type="file"
                        ref={coverInputRef}
                        onChange={handleCoverChange}
                        accept="image/*"
                        required
                    />
                </FormGroup>
                <FormGroup className={"required"}>
                    <label>Book Content images</label>
                    <FullWidthLabel htmlFor="file-upload">
                        <FileInputContainer
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                        >
                            <Input
                                ref={contentInputRef}
                                id="file-upload"
                                type="file"
                                onChange={onInputChange}
                                style={{ display: "none" }}
                                accept="image/*"
                                multiple
                                required
                            />
                            <Icon className="fas fa-cloud-upload-alt" />
                            <span style={{ fontSize: "16px" }}>Drag and drop images to upload, or click to browse</span>
                        </FileInputContainer>
                    </FullWidthLabel>
                </FormGroup>

                <DragDropContext onDragEnd={onDragEnd}>
                    {files.length > 0 ? (
                        <Droppable droppableId="filesList" isDropDisabled={false} isCombineEnabled={false} ignoreContainerClipping={false}>
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={{ display: "flex", flexDirection: "column" }}
                                >
                                    {files.map((file, index) => (
                                        <Draggable key={file.name} draggableId={file.name} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <PreviewContainer>
                                                        <div style={{ display: "flex", alignItems: "center" }}>
                                                            <img src={DraggingIcon} alt="Dragging Icon" style={{ width: "24px", height: "24px" }} />
                                                            <span>{file.name}</span>
                                                        </div>
                                                        <div style={{ display: "flex", alignItems: "center" }}>
                                                            <span style={{ fontSize: "16px", marginRight: "10px" }}>
                                                                {file.size}{' '}
                                                            </span>
                                                            <PreviewRemoveButton
                                                                onClick={() => handleRemove(index)}
                                                            >
                                                                <i className="fa-solid fa-xmark"></i>
                                                            </PreviewRemoveButton>
                                                        </div>
                                                    </PreviewContainer>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ) : (
                        <div style={{ padding: 15, textAlign: "center", fontSize: "14px", marginBottom: 10 }}>
                            No images uploaded or selected. Please upload some images.
                        </div>
                    )}
                </DragDropContext>

                <ButtonRow>
                    <SubPreButton type="submit" onClick={handlePreview}>Preview</SubPreButton>
                    <SubPreButton type="submit" onClick={handleSubmit}>
                        Upload
                    </SubPreButton>
                </ButtonRow>
            </AppContainer>
        </div>
    );
};

export default FileUpload;