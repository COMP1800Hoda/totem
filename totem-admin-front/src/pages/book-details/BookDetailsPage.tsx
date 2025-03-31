import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {FormGroup, Spinner} from 'react-bootstrap';
import { IconPencil, IconTrash} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { Modal as BootstrapModal, Button, Alert } from 'react-bootstrap';

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
  DeleteButton, EditButton,
  PublisherInfo,
  ShowMoreButton,
  Synopsis,
  Tag,
} from './BookDetailsPage.styled';
import Modal from '../../components/modal';
import { Header } from '../../components/header/Header';
import { fetchStorybookById } from '../../api/fetchStorybookById.ts';
import { Storybook } from '../../types/Storybook.ts';
import { Container } from '../../components/Container.tsx';
import { MainTitle } from '../../components/text/MainTitle.tsx';
import { deleteStorybook } from '../../api/deleteStorybook.ts';

const BookPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Storybook | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [alert, setAlert] = useState<{
    show: boolean;
    type: 'success' | 'danger';
    message: string;
  }>({
    show: false,
    type: 'success',
    message: '',
  });
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);

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

  const authors = book?.created_by || [];
  const navigate = useNavigate();

  const onClickDelete = async () => {
    if (!selectedBookId) return;
    try {
      setDeleting(true);
      await deleteStorybook(selectedBookId);
      setShowConfirmModal(false);
      setSuccessModalOpen(true);

      setTimeout(() => navigate('/manage-books'), 3000);
    } catch (err) {
      console.error(err);
      setAlert({
        show: true,
        type: 'danger',
        message: 'Failed to delete the book.',
      });
      setShowConfirmModal(false);
    } finally {
      setDeleting(false);
    }
  };

  const goToEditBook = (storybook_id: string) => {
    navigate(`/edit-book/${storybook_id}`);
  };


  if (loading || error || !book) {
    return (
      <div className="page">
        <Header />
        <BookContainer>
          {loading && <Spinner />}
          {error && <p>{error}</p>}
          {!loading && !book && <p>Cannot find book</p>}
        </BookContainer>
      </div>
    );
  }

  return (
    <div className="page">
      <Header />
      <BookContainer>
        <Container>
          <MainTitle text="Book Details" />
          <FormGroup>
            <EditButton
              type="button"
              className="btn"
              onClick={() => {
                goToEditBook(book?.storybook_id)
              }}
            >
              <IconPencil />
              <span>Edit</span>
            </EditButton>
            <DeleteButton
              type="button"
              className="btn btn-danger"
              onClick={() => {
                setSelectedBookId(book.storybook_id);
                setShowConfirmModal(true);
              }}
            >
              <IconTrash />
              <span>Remove</span>
            </DeleteButton>
          </FormGroup>
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
                <p>Contributed by: {book.contributed_by}</p>
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
          <Synopsis>
            <p>{book.storybook_description}</p>
          </Synopsis>
          <BookInfo>
            <p>ISBN: {book.ISBN || 'N/A'}</p>
            <p>Book index in DB: {book.index || 'N/A'}</p>
            <p>Book ID: {book.storybook_id || 'N/A'}</p>
          </BookInfo>

          {/* Modal for showing all authors */}
          <Modal
            isOpen={isModalOpen}
            onClose={toggleModal}
            className="modal-author"
          >
            <h3>Authors and Illustrators</h3>
            {authors.map((author, index) => (
              <p key={index}>
                {author.role}: {author.name}
              </p>
            ))}
          </Modal>
        </Container>
      </BookContainer>

      {/*Confirmation modal*/}
      <BootstrapModal
        className="bs-modal"
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        centered
      >
        <BootstrapModal.Header closeButton>
          <BootstrapModal.Title>Confirm Deletion</BootstrapModal.Title>
        </BootstrapModal.Header>

        <BootstrapModal.Body>
          Are you sure you want to remove this? <br />
          This action cannot be undone.
        </BootstrapModal.Body>

        <BootstrapModal.Footer>
          {deleting ? (
            <Spinner />
          ) : (
            <>
              <Button
                variant="secondary"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </Button>
              <Button variant="danger" onClick={onClickDelete}>
                Yes, delete it
              </Button>
            </>
          )}
        </BootstrapModal.Footer>
      </BootstrapModal>

      {/*Any alert message*/}
      {alert.show && (
        <Container>
          <Alert
            variant={alert.type}
            onClose={() => setAlert({ ...alert, show: false })}
            dismissible
          >
            {alert.message}
          </Alert>
        </Container>
      )}

      {/*Success modal*/}
      <BootstrapModal
        className="bs-modal"
        show={successModalOpen}
        backdrop="static"
        keyboard={false}
        centered
      >
        <BootstrapModal.Header>
          <BootstrapModal.Title>Success</BootstrapModal.Title>
        </BootstrapModal.Header>
        <BootstrapModal.Body>
          Book deleted successfully. <br />
          You will be redirected to manage books page
        </BootstrapModal.Body>
      </BootstrapModal>
    </div>
  );
};

export default BookPage;
