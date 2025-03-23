import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import {
  AuthorInfo,
  BookCard,
  BookContainer,
  BookCover,
  BookDetails,
  BookInfo,
  BookMeta,
  BookTags,
  BookTitle,
  PublisherInfo,
  ShowMoreButton,
  Synopsis,
  Tag
} from './BookDetailsPage.styled';
import Modal from '../../components/modal';
import {Header} from '../../components/header/Header';
import {fetchStorybookById} from "../../api/fetchStorybookById.ts";
import {Storybook} from "../../types/Storybook.ts";
import {Container} from "../../components/Container.tsx"; //

const BookPage: React.FC = () => {
  const {id} = useParams<{ id: string }>();
  const [book, setBook] = useState<Storybook | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State for modal

  useEffect(() => {
    (async () => {
      if (typeof id !== 'string')
        return;
      try {
        const result = await fetchStorybookById(id);
        setBook(result);
      } catch (error: unknown) {
        console.error(error)
        setError("Error fetching book details. Please try again.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  if (!id) return <p>Invalid book ID.</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!book) return <p>Book not found.</p>;

  const authors = book.created_by || [];

  return (
    <div className="page">
      <Header/>
      <BookContainer>
        <Container>
          {/*<BackButton onClick={() => window.history.back()}>&lt; Back</BackButton>*/}
          <BookCard style={{flexDirection: "row-reverse"}}>
            <BookCover src={book.cover_image_url} alt="Book Cover"/>
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
        </Container>
      </BookContainer>
    </div>
  );
};

export default BookPage;