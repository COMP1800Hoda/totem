import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  BookContainer, BackButton, BookCard, BookCover, BookDetails, 
  BookTitle, BookMeta, BookTags, Tag, ReadButton, Synopsis, BookInfo 
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
  const { id } = useParams<{ id: string }>(); // Get the book ID from the URL
  const navigate = useNavigate(); // Added useNavigate for navigation from ReadButton to ReadPage
  const book = mockBooks.find((b) => b.id === id);
        const data = await response.json();
        console.log(data);
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
      <BackButton onClick={() => navigate("/")}> &lt; Back</BackButton>
      <BookCard>
        <BookCover src={book.coverImage} alt="Book Cover" />
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
      <ReadButton onClick={() => navigate(`/read/${book.id}`)}>Read this book</ReadButton> /* Changed to use navigate */
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
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </BookContainer>
  );
};

export default BookPage;