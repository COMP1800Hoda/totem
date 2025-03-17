import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { 
  BookContainer, BackButton, BookCard, BookCover, BookDetails, 
  BookTitle, BookMeta, BookTags, Tag, ReadButton, Synopsis, BookInfo,
  AuthorInfo, PublisherInfo
} from "./BookDetailsPage.styled";

interface Author {
  name: string;
  role: string;
}

interface BookProps {
  objectId: string;
  storybook_title: string;
  cover_image_url: string;
  genre: string[];
  language: string;
  published: string;
  storybook_description: string;
  contributed_by: string;
  ISBN: string;
  created_by: Author[];
  publisher: string;
}

const BookPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get book ID from URL
  const [book, setBook] = useState<BookProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(
          `https://parseapi.back4app.com/classes/storybook/${id}`, 
          {
            method: "GET",
            headers: {
              "X-Parse-Application-Id": "XWNVzANvs7w6pYMl4fZWLCcikgXdMvCZhEnI48sH",
              "X-Parse-REST-API-Key": "mRZK1BOLh5EIaOR9Ircc2OhX5OU28aidSsZAtyJP",
              "Content-Type": "application/json"
            }
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }

        const data = await response.json();
        setBook(data);
      } catch (error) {
        setError("Error fetching book details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!book) return <p>Book not found.</p>;

  return (
    <BookContainer>
      <BackButton onClick={() => window.history.back()}>&lt; Back</BackButton>
      <BookCard style={{ flexDirection: "row-reverse" }}>
        <BookCover src={book.cover_image_url} alt="Book Cover" />
        <BookDetails>
          <BookTitle>{book.storybook_title}</BookTitle>
          <BookMeta>Published: {book.published}</BookMeta>
          <BookTags>
            {book.genre.length > 0 ? (
              book.genre.map((tag, index) => <Tag key={index}>{tag}</Tag>)
            ) : (
              <Tag>No genre available</Tag>
            )}
          </BookTags>
          <BookMeta>Language: {book.language}</BookMeta>
          <PublisherInfo>
            <p>Publisher: {book.publisher}</p>
            <p>Contributed by: {book.contributed_by}</p>
          </PublisherInfo>
        </BookDetails>
      </BookCard>
      <ReadButton>Read this book</ReadButton>
      <Synopsis>
        <p>{book.storybook_description}</p>
      </Synopsis>
      <BookInfo>
        <p>ISBN: {book.ISBN || "N/A"}</p>
        {book.created_by && book.created_by.length > 0 && (
          <AuthorInfo>
            {book.created_by.map((author, index) => (
              <p key={index}>{author.role}: {author.name}</p>
            ))}
          </AuthorInfo>
        )}
      </BookInfo>
    </BookContainer>
  );
};

export default BookPage;
