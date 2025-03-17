import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
  BookContainer, BackButton, BookCard, BookCover, BookDetails,
  BookTitle, BookMeta, BookTags, Tag, ReadButton, Synopsis, BookInfo,
  AuthorInfo, PublisherInfo, ShowMoreButton
} from './BookDetailsPage.styled';
import Modal from '../../components/modal'; // Import the Modal component

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
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<BookProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State for modal

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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!book) return <p>Book not found.</p>;

  const authors = book.created_by || [];

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
          {authors.length > 0 && (
            <AuthorInfo>
              {authors.slice(0, 2).map((author, index) => (
                <p key={index}>{author.role}: {author.name}</p>
              ))}
              {authors.length > 2 && (
                <ShowMoreButton onClick={toggleModal}>
                  Show all ...
                </ShowMoreButton>
              )}
            </AuthorInfo>
          )}
        </BookDetails>
      </BookCard>
      <ReadButton>Read this book</ReadButton>
      <Synopsis>
        <p>{book.storybook_description}</p>
      </Synopsis>
      <BookInfo>
        <p>ISBN: {book.ISBN || "N/A"}</p>
      </BookInfo>

      {/* Modal for showing all authors */}
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <h3>Authors and Illustrators</h3>
        {authors.map((author, index) => (
          <p key={index}>{author.role}: {author.name}</p>
        ))}
      </Modal>
    </BookContainer>
  );
};

export default BookPage;