import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from "lucide-react";
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
  ReadButton,
  Synopsis,
  BookInfo,
  AuthorInfo,
  PublisherInfo,
  ShowMoreButton,
  FooterWrapper,
} from './BookDetailsPage.styled';
import Footer from '../../components/footer/Footer'; // Import the Footer component
import Modal from '../../components/modal'; // Import the Modal component
import { Header } from '../../components/header/Header';
import { Storybook } from '../../types/Storybook.ts';
import { fetchStorybookById } from '../../api/fetchStorybookById.ts'; // Import the Header component

const BookPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // Initialize useNavigate
  const [book, setBook] = useState<Storybook | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State for modal
  const location = useLocation();
  const fromPage = location.state?.from;


  useEffect(() => {
    (async () => {
      if (typeof id !== 'string') return;
      try {
        const result = await fetchStorybookById(id);
        setBook(result);
      } catch (error: unknown) {
        console.error(error);
        setError('Error fetching book details. Please try again.');
      } finally {
        setLoading(false);
      }
    })();
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
      <Header />
      
        <BackButton
          onClick={() => {
            if (fromPage === 'home') {
              navigate('/');
            } else if (fromPage === 'books') {
              navigate('/books');
            } else {
              navigate(-1); // fallback to browser history
            }
          }}
        >
          <ChevronLeft size={30} />
        </BackButton>

      <BookCard style={{ flexDirection: 'row-reverse' }}>
        <BookCover src={book.cover_image_url} alt="Book Cover" />
        <BookDetails>
          <BookTitle>{book.storybook_title}</BookTitle>
          <BookMeta>Published: {book.published}</BookMeta>
          <BookTags>
            {book.genre && book.genre.length > 0 ? (
              book.genre?.map((tag, index) => <Tag key={index}>{tag}</Tag>)
            ) : (
              <Tag>No genre available</Tag>
            )}
          </BookTags>
          <BookMeta>Language: {book.language}</BookMeta>
          <PublisherInfo>
            <p>Publisher: {book.publisher}</p>
          </PublisherInfo>
          {authors.length > 0 && (
            <AuthorInfo>
              {authors.slice(0, 2).map((author, index) => (
                <p key={index}>
                  {author.role}: {author.name}
                </p>
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
      <ReadButton onClick={() => navigate(`/read/${book.storybook_id}`, {
  state: { from: location.state?.from }} )}>
        Read this book
      </ReadButton>
      <Synopsis>
        <p>{book.storybook_description}</p>
      </Synopsis>
      <BookInfo>
        <p>ISBN: {book.ISBN || 'N/A'}</p>
      </BookInfo>

      {/* Modal for showing all authors */}
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <h3>Authors and Illustrators</h3>
        {authors.map((author, index) => (
          <p key={index}>
            {author.role}: {author.name}
          </p>
        ))}
      </Modal>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </BookContainer>
  );
};

export default BookPage;
