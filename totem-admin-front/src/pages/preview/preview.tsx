import React, { useState, useEffect } from 'react';
import {
  BookContainer,
  BackButton,
  BookCard,
  BookCover,
  BookDetails,
  BookTitle,
  BookMeta,
  BookTags,
  Tag,
  Synopsis,
  BookInfo,
  BookContentImg,
  ThumbnailContainer,
  ThumbnailWrapper,
  UploadButton,
  FileNameContainer,
} from './preview_style';
import Parse from '../../database.js';
import imagekit from '../../imagekit.js';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { checkTokenAndRedirect, getToken } from '../../utils/tokenUtils.js';

interface Creator {
  role: string;
  name: string;
  customRole?: string;
}

const PreviewPage: React.FC = () => {
  checkTokenAndRedirect(); // Check if the token is valid and redirect if not

  const previewData = JSON.parse(localStorage.getItem('previewBook') || '{}');
  const creators = previewData.creators || [];
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  //for JWT_authorization code
  const [isCheckingToken, setIsCheckingToken] = useState(true); // prevent rendering before token check

  //start of JWT_authorization code
  useEffect(() => {
    const checkToken = async () => {
      checkTokenAndRedirect();
      setIsCheckingToken(false); // Set to false after token check
    };
    checkToken();
  }, []);

  useEffect(() => {
    const token = getToken(); // Get the token from local storage
    fetch('https://totemadmin-fkrivn3y.b4a.run/preview', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch preview page');
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsUploading(true);

    let isCreatedByVaild = true;
    for (const creator of creators) {
      if (creator.name === '') {
        isCreatedByVaild = false;
      }
    }
    if (
      !previewData.bookTitle ||
      !previewData.bookId ||
      !previewData.age ||
      !isCreatedByVaild
    ) {
      alert('Please fill in all required fields');
      setIsUploading(false);
      return;
    }

    if (previewData.contentImages === 0 || !previewData.coverImage) {
      alert('Please add cover and content images');
      setIsUploading(false);
      return;
    }

    const coverImageFolder = `/book-cover-images/${previewData.bookId}/`;
    const contentImagesFolder = `/book-images/${previewData.bookId}/`;

    const uploadPromises: Promise<void>[] = [];

    let coverImageUrl: string | null = null;
    const contentImageUrls: string[] = [];

    // Upload cover image
    if (previewData.coverImage) {
      const coverUploadPromise = new Promise<void>(async (resolve, reject) => {
        try {
          const response = await imagekit.upload({
            file: previewData.coverImage,
            fileName: previewData.coverImageName,
            folder: coverImageFolder,
            tags: [previewData.bookId],
            useUniqueFileName: false,
          });
          coverImageUrl = response.url;
          console.log('Cover image uploaded successfully:', coverImageUrl);
          resolve();
        } catch (error) {
          console.error('Error uploading cover image:', error);
          alert('Error uploading cover image.');
          reject(error);
        }
      });
      uploadPromises.push(coverUploadPromise);
    }

    // Upload content images
    for (let i = 0; i < previewData.contentImages.length; i++) {
      const contentUploadPromise = new Promise<void>(
        async (resolve, reject) => {
          try {
            const response = await imagekit.upload({
              file: previewData.contentImages[i],
              fileName: previewData.contentImageName[i],
              folder: contentImagesFolder,
              tags: [previewData.bookId],
              useUniqueFileName: false,
            });
            contentImageUrls.push(response.url);
            console.log('Content image uploaded successfully:', response.url);
            resolve();
          } catch (error) {
            console.error('Error uploading content image:', error);
            alert(`Error uploading content image: ${(error as Error).message}`);
            reject(error);
          }
        }
      );
      uploadPromises.push(contentUploadPromise);
    }

    try {
      await Promise.all(uploadPromises);

      if (!coverImageUrl || contentImageUrls.length === 0) {
        throw new Error('Image upload failed. Skipping DB update.');
      }

      // Save to DB
      const dbResult = await handleAddToDB({
        coverimageurl: coverImageUrl,
        contentimageurl: contentImageUrls,
      });

      if (!dbResult) {
        alert('Metadata saving failed.');
        setIsUploading(false);
        return;
      }

      const metaData = {
        bookTitle: previewData.bookTitle,
        bookId: previewData.bookId,
      };
      localStorage.setItem('Metadata', JSON.stringify(metaData));
      navigate('/success');
    } catch (error) {
      console.error('Error during full upload/save flow:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddToDB = async ({
    coverimageurl,
    contentimageurl,
  }: {
    coverimageurl: string;
    contentimageurl: string[];
  }) => {
    const updatedCreators = replaceOtherWithCustomRole(previewData.creators);

    const Storybook = Parse.Object.extend('storybook');
    const storybook = new Storybook();
    const nextIndex = await Parse.Cloud.run('getNextIndex', {
      name: 'storybook',
    });

    storybook.set('index', nextIndex);
    storybook.set('storybook_title', previewData.bookTitle);
    storybook.set('storybook_id', previewData.bookId);
    storybook.set('Age', previewData.age);
    storybook.set('genre', previewData.genres);
    storybook.set('created_by', updatedCreators);
    storybook.set('publisher', previewData.publisher);
    storybook.set('published', previewData.published);
    storybook.set('ISBN', previewData.isbn);
    storybook.set('storybook_description', previewData.abstract);
    storybook.set('cover_image_url', coverimageurl);
    storybook.set('storybook_image_url', contentimageurl);
    storybook.set('cover_image_name', previewData.coverImageName);
    storybook.set('storybook_image_name', previewData.contentImageName);

    try {
      await storybook.save();
      console.log('Book metadata saved successfully!');
      return true;
    } catch (error) {
      console.error('Error saving metadata:', error);
      return false;
    }
  };

  return (
    <div style={{ justifyContent: 'center', display: 'flex' }}>
      <BookContainer>
        <BackButton onClick={() => navigate(-1)}>
          &lt; Return to Edit
        </BackButton>

        <BookCard>
          <BookCover src={previewData.coverImage} alt="Book Cover" />
          <BookDetails>
            <BookTitle>{previewData.bookTitle}</BookTitle>
            <BookMeta>BookId: {previewData.bookId}</BookMeta>
            {creators.map((creator: Creator, index: number) => (
              <BookMeta key={index}>
                {creator.customRole || creator.role}: {creator.name}
              </BookMeta>
            ))}
            <BookTags>
              <Tag>Age: {previewData.age}</Tag>
              {previewData.genres
                .filter((genre: string) => genre)
                .map((genre: string, index: number) => (
                  <Tag key={index}>{genre}</Tag>
                ))}
            </BookTags>
          </BookDetails>
        </BookCard>

        <Synopsis>
          <p>Abstract:</p>
          <div>{previewData.abstract}</div>
        </Synopsis>

        <BookInfo>
          <p>Publisher: {previewData.publisher}</p>
          <p>Published: {previewData.published}</p>
          <p>ISBN: {previewData.isbn}</p>
        </BookInfo>

        <ThumbnailContainer>
          {previewData.contentImages.map((image: string, index: number) => {
            const fileName = previewData.contentImageName[index];
            return (
              <ThumbnailWrapper key={index}>
                <BookContentImg src={image} alt={`Content ${fileName}`} />
                <FileNameContainer>{fileName}</FileNameContainer>
              </ThumbnailWrapper>
            );
          })}
        </ThumbnailContainer>

        {isUploading ? (
          <Spinner />
        ) : (
          <UploadButton onClick={handleSubmit} disabled={isUploading}>
            Upload
          </UploadButton>
        )}
      </BookContainer>
    </div>
  );
};

export default PreviewPage;
