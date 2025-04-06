import React, { useRef, useState, useEffect } from 'react';
import { Header } from '../../components/header/Header.tsx';
import imagekit from '../../imagekit.js';
import Parse from '../../database.js';
import { checkTokenAndRedirect, getToken } from '../../utils/tokenUtils.js';

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
} from './fileUpload_style';
import { generateBookID } from '../../utils/generateBookId.ts';
import {
  FileData,
  ImagesDroppable,
} from '../../components/ImagesDroppable.tsx';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface PreviewData {
  bookTitle: string;
  bookId: string;
  age: string;
  language: string;
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
  //for JWT_authorization code
  // Check if the token is valid and redirect if not
  checkTokenAndRedirect();
  const navigate = useNavigate();
  const [isCheckingToken, setIsCheckingToken] = useState(true); // prevent rendering before token check

  const [bookTitle, setBookTitle] = useState<string>('');
  const [bookId, setBookId] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [language, setlanguage] = useState<string>('');
  const [genres, setGenres] = useState([
    'Action Adventure',
    'Historical Fiction',
  ]);

  // default creators
  const initialCreators = [{ role: 'Author', name: '', customRole: '' }];
  const initialRoles = [
    { value: 'Author', label: 'Author' },
    { value: 'Illustrator', label: 'Illustrator' },
  ];
  const [creators, setCreators] = useState(initialCreators);
  const [published, setPublished] = useState<string>('');
  const [publisher, setPublisher] = useState<string>('');
  const [isbn, setISBN] = useState<string>('');
  const [abstract, setAbstract] = useState<string>('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [files, setFiles] = useState<FileData[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const coverInputRef = useRef<HTMLInputElement | null>(null);

  //start of JWT_authorization code
  useEffect(() => {
    const checkToken = async () => {
      await checkTokenAndRedirect();
      setIsCheckingToken(false); // Set to false after token check
    };
    checkToken();
  }, []);

  useEffect(() => {
    const token = getToken(); // Get the token from local storage
    fetch('https://adminfinaldeployment-9gry1pfp.b4a.run/add-book', {
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
        console.log('Error:', error);
        navigate('/'); // Redirect to login if there's an error
      });
  });

  if (isCheckingToken) return null; // Prevent rendering UI until token check is complete
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
    setGenres([...genres, '']);
  };

  const handleRemoveGenre = (index: number): void => {
    setGenres(genres.filter((_, i) => i !== index));
  };

  const handleCreatorChange = (index: number, field: string, value: string) => {
    const newCreators = creators.map((creator, i) => {
      if (i === index) {
        if (field === 'customRole') {
          return { ...creator, customRole: value };
        }

        if (field === 'role' && value === 'Other') {
          return {
            ...creator,
            role: value,
            customRole: creator.customRole || '',
          };
        }

        return { ...creator, [field]: value };
      }
      return creator;
    });
    setCreators(newCreators);
  };

  const replaceOtherWithCustomRole = (
    creators: { role: string; name: string; customRole: string }[]
  ) => {
    return creators.map((creator) => {
      if (creator.role === 'Other' && creator.customRole) {
        return {
          ...creator,
          role: creator.customRole,
          customRole: '',
        };
      }
      return creator;
    });
  };

  const handleAddCreator = () => {
    const defaultRole =
      initialRoles.length > 0 ? initialRoles[0].value : 'Author';
    setCreators([...creators, { role: defaultRole, name: '', customRole: '' }]);
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

    const isCreatedByValid =
      creators.length > 0 && creators.every((creator) => creator.name !== '');
    if (!bookTitle || !bookId || !age || !isCreatedByValid) {
      alert('Please fill in all required fields');
      setIsUploading(false);
      return;
    }

    if (files.length === 0 || !coverImage) {
      alert('Please add cover and content images');
      setIsUploading(false);
      return;
    }

    const coverImageFolder = `/book-cover-images/${bookId}/`;

    const contentImagesFolder = `/book-images/${bookId}/`;

    const uploadPromises: Promise<void>[] = [];

    const contentImageNames: string[] = [];

    let coverImageUploaded;
    const contentUploaded: string[] = [];
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
                useUniqueFileName: false,
              });
              const coverimageUrl = response.url;
              coverImageUploaded = response.url;
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
                  useUniqueFileName: false,
                });

                if (!fileData.file) {
                  console.error('cannot find file');
                  return;
                }

                const imageName = fileData.file.name || '';
                console.log(imageName);
                contentImageNames.push(imageName);
                const imageUrl = response.url;
                contentUploaded.push(imageUrl);
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
          if (fileData.file) reader.readAsDataURL(fileData.file);
        }
      );
      uploadPromises.push(contentUploadPromise);
    }

    try {
      // Wait for all uploads to complete
      await Promise.all(uploadPromises);
      console.log('All files uploaded successfully');
      if (!coverImageUploaded || contentUploaded.length == 0) {
        console.log('Something wrong to handle images');
        setIsUploading(false);
        return;
      }

      // Update db
      const dbResult = await handleAddToDB({
        coverimageurl: coverImageUploaded,
        contentimageurl: contentUploaded,
        coverimagename: coverImage?.name ?? '',
        imageNames: contentImageNames,
      });
      if (!dbResult) {
        console.log('failed db upload');
        setIsUploading(false);
        return; // do not navigate
      }

      const metaData = {
        bookTitle: bookTitle,
        bookId: bookId,
      };
      localStorage.setItem('Metadata', JSON.stringify(metaData));

      navigate('/success');
    } catch (error) {
      console.error('Error during upload:', error);
      alert('An error occurred during the upload process. Please try again.');
      setIsUploading(false); // Reset the uploading state on error
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
    const updatedCreators = replaceOtherWithCustomRole(creators) || [];
    const updatedCreatorsNames = updatedCreators.map((author) => author.name);
    const Storybook = Parse.Object.extend('storybook');
    const storybook = new Storybook();
    const nextIndex = await Parse.Cloud.run('getNextIndex', {
      name: 'storybook',
    });

    storybook.set('index', nextIndex);
    storybook.set('storybook_title', bookTitle);
    storybook.set('storybook_id', bookId);
    storybook.set('language', language);
    storybook.set('Age', age);
    storybook.set('genre', genres);
    storybook.set('created_by', updatedCreators);
    storybook.set('created_by_names', updatedCreatorsNames);
    storybook.set('publisher', publisher);
    storybook.set('published', published);
    storybook.set('ISBN', isbn);
    storybook.set('storybook_description', abstract);
    storybook.set('cover_image_url', coverimageurl);
    storybook.set('storybook_image_url', contentimageurl);
    storybook.set('cover_image_name', coverimagename);
    storybook.set('storybook_image_name', imageNames);

    try {
      await storybook.save();
      console.log('Book metadata saved successfully!');
      return true;
    } catch (error) {
      console.log('Error saving metadata:', error);
      return false;
    }
  };

  const handlePreview = async () => {
    const isCreatedByValid =
      creators.length > 0 && creators.every((creator) => creator.name !== '');
    if (!bookTitle || !bookId || !age || !isCreatedByValid || !language) {
      alert('Please fill in all required fields');
      setIsUploading(false);
      return;
    }

    if (files.length === 0 || !coverImage) {
      alert('Please add cover and content images');
      setIsUploading(false);
      return;
    }

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
      const imageName = fileData?.file?.name || '';
      console.log(imageName);
      newImageNames.push(imageName);

      if (fileData?.file?.type.startsWith('image/')) {
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
      language,
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
      contentImageName: newImageNames,
    };

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

  const handleGenerate = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const id = await generateBookID();
    if (typeof id === 'string') {
      console.log('success to generate new id:', id);
      setBookId(id);
    }
  };

  return (
    <div>
      <div style={{ gap: '50px' }}>
        <Header />
      </div>
      <AppContainer>
        <UploadHeader>Add New Book</UploadHeader>
        <form onSubmit={handleSubmit}>
          <FormGroup className={'required'}>
            <label>Book Title</label>
            <Input
              type="text"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
            />
          </FormGroup>

          <FormGroup className={'required'}>
            <label>Book ID</label>
            <FormRow>
              <Input
                type="text"
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
                style={{ marginRight: '10px', width: '90%' }}
              />
              <GenerateButton className="w-auto px-3" onClick={handleGenerate}>
                Generate
              </GenerateButton>
            </FormRow>
            <div style={{ fontSize: '12px', marginTop: -20 }}>
              <span style={{ fontWeight: 'bold' }}>Book ID</span> consists of
              English letters, numbers, and underscores (e.g.,
              cropson_00390039). It is used as the folder path in the image CDN.
              <span style={{ fontWeight: 'bold', color: 'red' }}>
                {' '}
                Once generated, it cannot be changed.
              </span>{' '}
              Click “Generate” to create a random ID.
            </div>
          </FormGroup>

          <FormGroup className={'required'}>
            <label>Language</label>
            <div>
              <Select
                value={language}
                onChange={(e) => setlanguage(e.target.value)}
                style={{
                  width: window.innerWidth < 768 ? '100%' : '525px',
                  color: age === '' ? '#888' : 'black',
                }}
              >
                <option value="" disabled selected>
                  Select Language
                </option>
                <option value="فارسي">فارسي</option>
                <option value="English">English</option>
              </Select>
            </div>
          </FormGroup>

          <FormGroup className={'required'}>
            <label>Age</label>
            <div>
              <Select
                value={age}
                onChange={(e) => setAge(e.target.value)}
                style={{
                  width: window.innerWidth < 768 ? '100%' : '525px',
                  color: age === '' ? '#888' : 'black',
                }}
              >
                <option value="" disabled selected>
                  Select Age
                </option>
                <option value="0~2">0~2</option>
                <option value="3~4">3~4</option>
                <option value="5~6">5~6</option>
              </Select>
            </div>
          </FormGroup>

          <FormGroup>
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
                <Input
                  type="text"
                  value={genre}
                  onChange={(e) =>
                    handleGenreInputChange(index, e.target.value)
                  }
                  placeholder="Enter genre..."
                  style={{ marginRight: '10px' }}
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

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <AddButton
                className="w-auto px-3"
                type="button"
                onClick={handleAddGenre}
              >
                Add
              </AddButton>
            </div>
          </FormGroup>

          <FormGroup>
            <div className={'created_by_title required'}>
              <label>Created by</label>
              <div style={{ fontSize: '12px', marginTop: '1px' }}>
                <span>
                  If there are more than one creators, please click "Add"
                </span>
              </div>
            </div>
            {creators.map((creator, index) => (
              <div
                key={index}
                className="form-row"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '7px',
                }}
              >
                {creator.role === 'Other' ? (
                  <>
                    <Input
                      type="text"
                      placeholder="Custom role name"
                      value={creator.customRole || ''}
                      onChange={(e) =>
                        handleCreatorChange(index, 'customRole', e.target.value)
                      }
                      style={{ marginRight: '5px' }}
                    />
                    <Input
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
                    <Select
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
                    </Select>
                    <Input
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
                  <DeleteButton
                    type="button"
                    onClick={() => handleRemoveCreator(index)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </DeleteButton>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <AddButton
                className="w-auto px-3"
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
              placeholder="Published"
            />
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

        <FormGroup className={'required'}>
          <label>Book Cover</label>
          <Input
            type="file"
            ref={coverInputRef}
            onChange={handleCoverChange}
            accept="image/*"
            required
          />
        </FormGroup>

        <FormGroup className={'required'}>
          <label>Book Content images</label>
          <ImagesDroppable files={files} setFiles={setFiles} />
        </FormGroup>
        <ButtonRow>
          {!isUploading ? (
            <>
              <SubPreButton type="submit" onClick={handlePreview}>
                Preview
              </SubPreButton>
              <SubPreButton type="submit" onClick={handleSubmit}>
                Upload
              </SubPreButton>
            </>
          ) : (
            <Spinner />
          )}
        </ButtonRow>
      </AppContainer>
    </div>
  );
};

export default FileUpload;
