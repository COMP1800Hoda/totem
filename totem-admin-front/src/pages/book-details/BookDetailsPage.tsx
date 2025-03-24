import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router';
import {Spinner} from "react-bootstrap";

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
  DeleteButton,
  PublisherInfo,
  ShowMoreButton,
  Synopsis,
  Tag
} from './BookDetailsPage.styled';
import Modal from '../../components/modal';
import {Header} from '../../components/header/Header';
import {fetchStorybookById} from "../../api/fetchStorybookById.ts";
import {Storybook} from "../../types/Storybook.ts";
import {Container} from "../../components/Container.tsx";
import {MainTitle} from "../../components/text/MainTitle.tsx";
import {IconTrash} from "@tabler/icons-react";

const BookPage: React.FC = () => {
  const {id} = useParams<{ id: string }>();
  const [book, setBook] = useState<Storybook | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  const authors = book?.created_by || [];

  const onClickDelete = () => {

  }

  if (loading || error || !book) {
    return (
      <div className="page">
        <Header/>
        <BookContainer>
          {loading && (<Spinner/>)}
          {error && (<p>{error}</p>)}
          {!book && (<p>Cannot find book</p>)}
        </BookContainer>
      </div>
    )
  }

  return (
    <div className="page">
      <Header/>
      <BookContainer>
        <Container>
          <MainTitle text="Book Details"/>
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
            <p>Book index in DB: {book.index || "N/A"}</p>
            <p>Book ID: {book.storybook_id || "N/A"}</p>
          </BookInfo>
          <DeleteButton
            type="button"
            className="btn btn-danger"
            onClick={onClickDelete}
          >
            <IconTrash/>
            <span>
              Remove
            </span>
          </DeleteButton>

          {/* Modal for showing all authors */}
          <Modal isOpen={isModalOpen} onClose={toggleModal} className="modal-author">
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