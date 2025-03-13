import React from "react";
import { useParams } from "react-router";
import { 
  BookContainer, BackButton, BookCard, BookCover, BookDetails, 
  BookTitle, BookMeta, BookTags, Tag, ReadButton, Synopsis, BookInfo 
} from "./preview_style";

interface BookProps {
  id: string;
  title: string;
  author: string;
  illustrator: string;
  ageGroup: string;
  genre: string;
  synopsis: string;
  publishedIn: string;
  isbn: string;
  contributor: string;
  coverImage: string;
}


const PreviewPage: React.FC = () => {
//   const { id } = useParams<{ id: string }>(); // Get the book ID from the URL
//   const book = mockBooks.find((b) => b.id === id);

//   if (!book) {
//     return <p>Book not found.</p>;
//   }

  return (
    <BookContainer>
      <BackButton onClick={() => window.history.back()}>&lt; Back</BackButton>
      <BookCard>
        <BookCover/>
        <BookDetails>
          <BookTitle></BookTitle>
          <BookMeta>Author: </BookMeta>
          <BookMeta>Illustrator: </BookMeta>
          <BookTags>
            <Tag></Tag>
            <Tag></Tag>
          </BookTags>
        </BookDetails>
      </BookCard>
      
      <Synopsis>
        <p></p>
      </Synopsis>
      <BookInfo>
        <p>Published in: </p>
        <p>ISBN: </p>
        <p>Contributed by:</p>
      </BookInfo>
    </BookContainer>
  );
};

export default PreviewPage;