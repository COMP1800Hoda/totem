import React, { useState, useEffect } from "react";

import {
  BookContainer, BackButton, BookCard, BookCover, BookDetails,
  BookTitle, BookMeta, BookTags, Tag, Synopsis, BookInfo, BookContentImg,
  ThumbnailContainer, ThumbnailWrapper, UploadButton, FileNameContainer
} from "./preview_style";
import Parse from "../../database.js";
import imagekit from "../../imagekit.js";
interface Creator {
  role: string;
  name: string;
  customRole?: string;
}


const PreviewPage: React.FC = () => {
  const previewData = JSON.parse(localStorage.getItem('previewBook') || '{}');
  console.log(previewData);
  const creators = previewData.creators || [];
  const [isUploading, setIsUploading] = useState(false);
  const [coverimageurl, setUrl] = useState<string | null>(null);
  const [contentimageurl, setimageUrl] = useState<string[]>([]);
  const [isDataSaved, setIsDataSaved] = useState(false);

  useEffect(() => {
    if (coverimageurl && contentimageurl.length > 0 && !isDataSaved) {
      handleAddToDB();
      setIsDataSaved(true); 
    }
  }, [coverimageurl, contentimageurl, isDataSaved]);

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsUploading(true);
    setIsDataSaved(false);
    const coverImageFolder = `/book-cover-images/${previewData.bookId}/`;

    const contentImagesFolder = `/book-images/${previewData.bookId}/`;

    const uploadPromises: Promise<void>[] = [];

    // Upload cover image
    if (previewData.coverImage) {
      const coverUploadPromise = new Promise<void>(async (resolve, reject) => {
        try {
          const response = await imagekit.upload({
            file: previewData.coverImage,
            fileName: `${previewData.coverImageName}`,
            folder: coverImageFolder,
            tags: [previewData.bookId],
          });
          const coverimageUrl = response.url;
          setUrl(coverimageUrl);
          console.log("Cover image uploaded successfully. URL:", coverimageUrl);
          resolve();
        } catch (error) {
          console.error("Error uploading cover image:", error);
          alert(`Error uploading cover image: ${(error as Error).message}`);
          reject(error);
        }
      });
      uploadPromises.push(coverUploadPromise);
    }

    // Upload content images
    for (const fileData of previewData.contentImages) {
      const contentUploadPromise = new Promise<void>(async (resolve, reject) => {
        try {
          
          const response = await imagekit.upload({
            file: fileData, 
            fileName: `${previewData.bookId}-${previewData.contentImages.indexOf(fileData) + 1}.jpg`,
            folder: contentImagesFolder,
            tags: [previewData.bookId],
          });
          const imageUrl = response.url;
          setimageUrl((prevUrls) => [...prevUrls, imageUrl]);
          console.log("Content image uploaded successfully. URL:", imageUrl);
          resolve();
        } catch (error) {
          console.error(`Error uploading content image:`, error);
          alert(`Error uploading content image: ${(error as Error).message}`);
          reject(error);
        }
      });
      uploadPromises.push(contentUploadPromise);

    }

    try {
      // Wait for all uploads to complete
      await Promise.all(uploadPromises);

      console.log("All files uploaded and metadata saved successfully");
      alert("Book uploaded and metadata saved successfully!");
      const metaData = {
        bookTitle: previewData.bookTitle,
        bookId: previewData.bookId
      };
      localStorage.setItem('Metadata', JSON.stringify(metaData));

      
      window.location.href = '/success';
    } catch (error) {
      console.error("Error during upload:", error);
      alert("An error occurred during the upload process. Please try again.");
    } finally {
      setIsUploading(false); 
    }
  };

  
  const handleAddToDB = async () => {
    
    if (
      !previewData.bookTitle ||
      !previewData.bookId ||
      !previewData.age ||
      !previewData.genres ||
      !previewData.creators ||
      !previewData.publisher ||
      !previewData.published ||
      !previewData.isbn ||
      !previewData.abstract||
      !coverimageurl ||
      !contentimageurl


    ) {
      console.error("Please fill in all required fields");
      return;
    }
    const updatedCreators = replaceOtherWithCustomRole(previewData.creators);
    console.log(updatedCreators)

    
    console.log("Saving metadata to database:", {
      bookTitle: previewData.bookTitle,
      bookId: previewData.bookId,
      age: previewData.age,
      genres: previewData.genres,
      creators: updatedCreators,
      publisher: previewData.publisher,
      published: previewData.published,
      isbn: previewData.isbn,
      abstract: previewData.abstract,
      coverImageUrl: coverimageurl,
      contentImageUrl: contentimageurl,
    });

    const Storybook = Parse.Object.extend("storybook");
    const storybook = new Storybook();

    // Set metadata fields
    storybook.set("storybook_title", previewData.bookTitle);
    storybook.set("storybook_id", previewData.bookId);
    storybook.set("Age", previewData.age);
    storybook.set("genre", previewData.genres);
    storybook.set("created_by", updatedCreators);
    storybook.set("publisher", previewData.publisher);
    storybook.set("published", previewData.published);
    storybook.set("ISBN", previewData.isbn);
    storybook.set("storybook_description", previewData.abstract);
    storybook.set("cover_image_url", coverimageurl);
    storybook.set("storybook_image_url", contentimageurl);
    storybook.set("cover_image_name", previewData.coverImageName);
    storybook.set("storybook_image_name", previewData.contentImageName);
    console.log(storybook);
    try {
      
      await storybook.save();
      console.log("Book metadata saved successfully!");
    } catch (error) {
      console.error("Error saving metadata:", error);
    }
  };

  return (
    <div style={{ justifyContent: 'center', display: 'flex' }}>
      <BookContainer>

        <BackButton onClick={() => window.history.back()}>&lt; Return to Edit</BackButton>

        <BookCard>

          <BookCover src={previewData.coverImage} alt="Book Cover" />
          <BookDetails>
            <BookTitle>{previewData.bookTitle}</BookTitle>
            <BookMeta>BookId: {previewData.bookId} </BookMeta>
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
          <p>Publisher: {previewData.publisher} </p>
          <p>Published: {previewData.published}</p>
          <p>ISBN: {previewData.isbn} </p>
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
        <UploadButton onClick={handleSubmit}>Upload</UploadButton>

      </BookContainer >
    </div>
  );
};

export default PreviewPage;