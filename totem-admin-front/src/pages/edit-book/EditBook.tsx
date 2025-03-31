import React, {useEffect, useRef, useState} from "react";
import {Header} from '../../components/header/Header.tsx';
import imagekit from "../../imagekit.js";
import Parse from "../../database.js";
import {
  AddButton,
  AppContainer,
  ButtonRow,
  DeleteButton,
  FormGroup,
  FormRow,
  GenerateButton,
  Input,
  Select,
  SubPreButton,
  TextArea,
  UploadHeader,
} from './EditBook.styled.ts';
import {generateBookID} from "../../utils/generateBookId.ts";
import {ImagesDroppable} from "./ImagesDroppable.tsx";
import {Spinner} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router";
import {Storybook} from "../../types/Storybook.ts";
import {fetchStorybookById} from "../../api/fetchStorybookById.ts";
import {deleteRemovedImages} from "../book-details/deleteRemovedImages.ts";

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


const EditBook: React.FC = () => {
  // get original information
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Storybook | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (typeof id !== 'string') return;
      try {
        const result = await fetchStorybookById(id);
        setBook(result);

        // Populate state from fetched result
        setBookTitle(result.storybook_title || "");
        setBookId(result.storybook_id || "");
        setAge(result.Age || "0~2");
        setGenres(result.genre || []);
        setCreators(result.created_by || [{ role: "Author", name: "", customRole: "" }]);
        setPublisher(result.publisher || "");
        setPublished(result.published || "");
        setISBN(result.ISBN || "");
        setAbstract(result.storybook_description || "");

        if (result.storybook_image_url?.length && result.storybook_image_name?.length) {
          const fileDataList: FileData[] = result.storybook_image_url.map((url: string, idx: number) => ({
            url,
            name: result.storybook_image_name[idx],
          }));
          setFiles(fileDataList);
        }

        // Cover image URL (just store the URL, don't convert to File)
        if (result.cover_image_url && result.cover_image_name) {
          setCoverImageUrl(result.cover_image_url);
        }



      } catch (error: unknown) {
        console.error(error);
        setError('Error fetching book details. Please try again.');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);



  const [bookTitle, setBookTitle] = useState<string>("");
  const [bookId, setBookId] = useState<string>("");
  const [age, setAge] = useState<string>("0~2");
  const [genres, setGenres] = useState([
    "Action Adventure",
    "Historical Fiction",
  ]);
  const navigate = useNavigate();

  // default creators
  const initialCreators = [
    {role: "Author", name: "", customRole: ""},
  ];
  const initialRoles = [
    {value: "Author", label: "Author"},
    {value: "Illustrator", label: "Illustrator"},
  ];
  const [creators, setCreators] = useState(initialCreators);
  const [roles, setRoles] = useState(initialRoles);
  const [published, setPublished] = useState<string>("");
  const [publisher, setPublisher] = useState<string>("");
  const [isbn, setISBN] = useState<string>("");
  const [abstract, setAbstract] = useState<string>("");
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [files, setFiles] = useState<FileData[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const coverInputRef = useRef<HTMLInputElement | null>(null);
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
          return {...creator, customRole: value};
        }

        if (field === "role" && value === "Other") {
          return {
            ...creator,
            role: value,
            customRole: creator.customRole || "",
          };
        }

        return {...creator, [field]: value};
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
    setCreators([...creators, {role: defaultRole, name: "", customRole: ""}]);
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
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsUploading(true);

    // check validation
    const isCreatedByValid = creators.length > 0 && creators.every(creator => creator.name !== '');
    if (!bookTitle || !bookId || !age || !isCreatedByValid) {
      alert("Please fill in all required fields");
      setIsUploading(false);
      return;
    }

    if (files.length === 0 || (!coverImage && !book?.cover_image_url)) {
      alert("Please add cover and content images");
      setIsUploading(false);
      return;
    }

    const coverImageFolder = `/book-cover-images/${bookId}/`;
    const contentImagesFolder = `/book-images/${bookId}/`;

    const uploadPromises: Promise<void>[] = [];

    // === Handle Content Images  ===
    const newContentImageNames: string[] = [];
    const newContentImageUrls: string[] = [];

    for (const fileData of files) {
      if (!fileData.file) {
        // reuse previous images
        newContentImageNames.push(fileData.name);
        newContentImageUrls.push(fileData.url);
      } else {
        try {
          const base64Data = await convertFileToBase64(fileData.file); // 별도 함수
          const response = await imagekit.upload({
            file: base64Data,
            fileName: fileData.name,
            folder: contentImagesFolder,
            tags: [bookId],
          });

          newContentImageNames.push(fileData.name);
          newContentImageUrls.push(response.url);
        } catch (error) {
          console.error("Error uploading image:", error);
          alert(`Upload failed: ${fileData.name}`);
          setIsUploading(false);
          return;
        }
      }
    }
    // === Handle removed image===
    await deleteRemovedImages({
      storybookId: bookId,
      oldImageNames: [book?.cover_image_name ?? ''],
      newImageNames: [coverImage?.name ?? book?.cover_image_name ?? ''],
      folderPath: `/book-cover-images/${bookId}`,
    });

    // === Handle Cover Image ===
    let coverImageUploaded = book?.cover_image_url ?? null;
    let coverImageName = book?.cover_image_name ?? '';

    if (coverImage && book?.cover_image_name && book.cover_image_name !== coverImage.name) {
      try {
        const fileId = await imagekit
          .listFiles({
            searchQuery: `name = "${book.cover_image_name}" AND folder = "${coverImageFolder}"`,
          })
          .then(res => res[0]?.fileId);

        if (fileId) {
          await imagekit.deleteFile(fileId);
          console.log("Old cover image deleted:", book.cover_image_name);
        }
      } catch (err) {
        console.warn("⚠Failed to delete old cover image:", err);
      }
    }

    try {
      await Promise.all(uploadPromises);

      // DB update
      const dbResult = await handleAddToDB({
        coverimageurl: coverImageUploaded!,
        contentimageurl: newContentImageUrls,
        coverimagename: coverImageName,
        imageNames: newContentImageNames,
      });

      if (!dbResult) {
        console.log("Failed to update DB");
        setIsUploading(false);
        return;
      }

      localStorage.setItem("Metadata", JSON.stringify({ bookTitle, bookId }));
      navigate("/success");

    } catch (error) {
      console.error("Error during upload:", error);
      alert("An error occurred during upload.");
      setIsUploading(false);
    }
  };

  const handleAddToDB = async ({
     coverimageurl,
     contentimageurl,
     coverimagename,
     imageNames,
   }: {
    coverimageurl: string;
    contentimageurl: string[];
    coverimagename: string;
    imageNames: string[];
  }) => {
    const updatedCreators = replaceOtherWithCustomRole(creators);
    const Storybook = Parse.Object.extend("storybook");
    let storybook;

    if (book?.objectId) {
      // Edit original book
      const query = new Parse.Query(Storybook);
      storybook = await query.get(book.objectId);
    } else {
      console.error('Cannot find the book id to update from DB');
      return;
    }

    // Update fields
    storybook.set("storybook_title", bookTitle);
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

    try {
      await storybook.save();
      console.log("Book metadata saved successfully!");
      return true;
    } catch (error) {
      console.log("Error saving metadata:", error);
      return false;
    }
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

    localStorage.setItem('previewBook', JSON.stringify(previewData));
    navigate('/preview');
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      <div style={{gap: "50px"}}><Header/></div>
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
                className={"disabled"}
                type="text"
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
                style={{marginRight: "10px", width: "90%"}}
                disabled
              />
              <GenerateButton className={"disabled"} onClick={()=>{}} disabled>Generate</GenerateButton>
            </FormRow>
            <div style={{fontSize: "12px"}}>
              <span style={{fontWeight: "bold"}}>Book ID</span> consists of English letters, numbers, and
              underscores
              (e.g., cropson_00390039).
              It is used as the folder path in the image CDN.<span style={{fontWeight: "bold"}}> Once generated, it cannot be changed.</span> Click
              “Generate” to create a random ID.
            </div>
          </FormGroup>

          <FormGroup className={"required"}>
            <label>Age</label>
            <Select
              value={age}
              onChange={(e) => setAge(e.target.value)}
              style={{width: "530px"}}
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
                  style={{marginRight: "10px"}}
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

            <div style={{display: "flex", justifyContent: "flex-end"}}>
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
                      style={{marginRight: "5px"}}
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
                      style={{marginRight: "5px"}}
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
                      style={{marginRight: "3px"}}
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
            <div style={{display: "flex", justifyContent: "flex-end"}}>
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
              placeholder="Published"/>
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

          <div style={{ position: 'relative', marginBottom: '10px' }}>
            <input
              id="coverUpload"
              type="file"
              ref={coverInputRef}
              onChange={handleCoverChange}
              accept="image/*"
              required
              style={{ display: 'none' }}
            />
            <label
              htmlFor="coverUpload"
              style={{
                padding: "10px 20px",
                backgroundColor: "var(--color-primary)",
                border: "1px solid #ccc",
                borderRadius: "5px",
                color:"#fff",
                margin: "5px 0",
                cursor: "pointer",
                display: "inline-block"
              }}
            >
              Select New
            </label>
            {coverImage && <span style={{ marginLeft: '15px' }}>{coverImage.name}</span>}
          </div>

          {coverImageUrl && !coverImage && (
            <>
              Previous book cover: <br/>
              <img
                src={coverImageUrl}
                alt="Current Cover"
                style={{ maxWidth: '150px', marginTop: '10px' }}
              />
              <br/><br/>
            </>
          )}
        </FormGroup>

        <FormGroup className={"required"}>
          <label>Book Content images</label>
          <ImagesDroppable
            files={files}
            setFiles={setFiles}
          />
        </FormGroup>
        <ButtonRow>
          {!isUploading ? (
            <>
              {/*<SubPreButton type="submit" onClick={handlePreview}>Preview</SubPreButton>*/}
              <SubPreButton type="submit" onClick={handleSubmit}>
                Edit
              </SubPreButton></>
          ) : (<Spinner/>)}
        </ButtonRow>
      </AppContainer>
    </div>
  )
};

export default EditBook;