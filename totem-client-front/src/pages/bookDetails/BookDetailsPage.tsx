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


  if (!book) {
    return <p>Book not found.</p>;
  }

  return (
    <BookContainer>
      <BackButton onClick={() => navigate("/")}> &lt; Back</BackButton>
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
      <ReadButton onClick={() => navigate(`/read/${book.id}`)}>Read this book</ReadButton> /* Changed to use navigate */
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
