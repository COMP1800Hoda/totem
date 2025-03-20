import React from "react";
import { useParams } from "react-router";
import { 
  BookContainer, BackButton, BookCard, BookCover, BookDetails, 
  BookTitle, BookMeta, BookTags, Tag, ReadButton, Synopsis, BookInfo 
} from "./BookDetailsPage.styled";

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

const mockBooks: BookProps[] = [
  {
    id: "1",
    title: "Example Book",
    author: "John Doe",
    illustrator: "Jane Smith",
    ageGroup: "Age 4-6",
    genre: "Fantasy",
    synopsis: "This is a story about...",
    publishedIn: "Iran",
    isbn: "964-505-078-2",
    contributor: "شابيز",
    coverImage: "/path-to-image.jpg",
  }, 
  {
    id: "2",
    title: "Example Book",
    author: "John Doe",
    illustrator: "Jane Smith",
    ageGroup: "Age 4-6",
    genre: "Fantasy",
    synopsis: "This is a story about...",
    publishedIn: "Iran",
    isbn: "964-505-078-2",
    contributor: "شابيز",
    coverImage: "/path-to-image.jpg",
  },
  {
    id: "2",
    title: "Example Book",
    author: "John Doe",
    illustrator: "Jane Smith",
    ageGroup: "Age 4-6",
    genre: "Fantasy",
    synopsis: "This is a story about...",
    publishedIn: "Iran",
    isbn: "964-505-078-2",
    contributor: "شابيز",
    coverImage: "/path-to-image.jpg",
  },
  {
    id: "3",
    title: "Example Book",
    author: "John Doe",
    illustrator: "Jane Smith",
    ageGroup: "Age 4-6",
    genre: "Fantasy",
    synopsis: "This is a story about...",
    publishedIn: "Iran",
    isbn: "964-505-078-2",
    contributor: "شابيز",
    coverImage: "/path-to-image.jpg",
  },
  {
    id: "4",
    title: "Example Book",
    author: "John Doe",
    illustrator: "Jane Smith",
    ageGroup: "Age 4-6",
    genre: "Fantasy",
    synopsis: "This is a story about...",
    publishedIn: "Iran",
    isbn: "964-505-078-2",
    contributor: "شابيز",
    coverImage: "/path-to-image.jpg",
  },
  {
    id: "5",
    title: "Example Book",
    author: "John Doe",
    illustrator: "Jane Smith",
    ageGroup: "Age 4-6",
    genre: "Fantasy",
    synopsis: "This is a story about...",
    publishedIn: "Iran",
    isbn: "964-505-078-2",
    contributor: "شابيز",
    coverImage: "/path-to-image.jpg",
  },
  {
    id: "6",
    title: "Example Book",
    author: "John Doe",
    illustrator: "Jane Smith",
    ageGroup: "Age 4-6",
    genre: "Fantasy",
    synopsis: "This is a story about...",
    publishedIn: "Iran",
    isbn: "964-505-078-2",
    contributor: "شابيز",
    coverImage: "/path-to-image.jpg",
  },
];

const BookPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the book ID from the URL
  const book = mockBooks.find((b) => b.id === id);

  if (!book) {
    return <p>Book not found.</p>;
  }

  return (
    <BookContainer>
      <BackButton onClick={() => window.history.back()}>&lt; Back</BackButton>
      <BookCard>
        <BookCover src={book.coverImage} alt="Book Cover" />
        <BookDetails>
          <BookTitle>{book.title}</BookTitle>
          <BookMeta>Author: {book.author}</BookMeta>
          <BookMeta>Illustrator: {book.illustrator}</BookMeta>
          <BookTags>
            <Tag>{book.ageGroup}</Tag>
            <Tag>{book.genre}</Tag>
          </BookTags>
        </BookDetails>
      </BookCard>
      <ReadButton>Read this book</ReadButton>
      <Synopsis>
        <p>{book.synopsis}</p>
      </Synopsis>
      <BookInfo>
        <p>Published in: {book.publishedIn}</p>
        <p>ISBN: {book.isbn}</p>
        <p>Contributed by: {book.contributor}</p>
      </BookInfo>
    </BookContainer>
  );
};

export default BookPage;
