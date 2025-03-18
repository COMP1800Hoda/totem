import React, { useState, useEffect } from "react";

import {
  BookContainer, BackButton, BookCard, BookCover, BookDetails,
  BookTitle, BookMeta, BookTags, Tag, Synopsis, BookInfo, BookContentImg,
  ThumbnailContainer, ThumbnailWrapper, UploadButton, FileNameContainer
} from "./preview_style";
import ImageKit from "imagekit";
import Parse from "../../database.js";

interface Creator {
  role: string;
  name: string;
  customRole?: string;
}

// Initialize ImageKit
const imagekit = new ImageKit({
  publicKey: "public_P17LRkYTu9e3UdN3WnyzbodiT1U=",
  urlEndpoint: "https://ik.imagekit.io/Comp3800Group12",
  privateKey: "private_PeSFDBIdeSuhtUZaec1saMxjqoU=",
});

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsUploading(true); // Set uploading state to true
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
            file: fileData, // Pass base64 string directly
            fileName: `content-${previewData.bookId}-${previewData.contentImages.indexOf(fileData) + 1}.jpg`, // Use a consistent filename
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
      setIsUploading(false); // Reset the uploading state
    }
  };

  // add one function to add storybook metadata to database
  const handleAddToDB = async () => {
    // Validate required fields
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

    // Log the data being saved for debugging
    console.log("Saving metadata to database:", {
      bookTitle: previewData.bookTitle,
      bookId: previewData.bookId,
      age: previewData.age,
      genres: previewData.genres,
      creators: previewData.creators,
      publisher: previewData.publisher,
      published: previewData.published,
      isbn: previewData.isbn,
      abstract: previewData.abstract,
      coverImageUrl: coverimageurl,
      contentImageUrl: contentimageurl,
    });

    const Storybook = Parse.Object.extend("StoryBook_Admin");
    const storybook = new Storybook();

    // Set metadata fields
    storybook.set("BookTitle", previewData.bookTitle);
    storybook.set("BookID", previewData.bookId);
    storybook.set("Age", previewData.age);
    storybook.set("Genre", previewData.genres);
    storybook.set("CreatedBy", previewData.creators);
    storybook.set("Publisher", previewData.publisher);
    storybook.set("Published", previewData.published);
    storybook.set("ISBN", previewData.isbn);
    storybook.set("Abstract", previewData.abstract);
    storybook.set("CoverImgUrl", coverimageurl);
    storybook.set("ContentImgUrl", contentimageurl);
    console.log(storybook);
    try {
      // Save the metadata to the database
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