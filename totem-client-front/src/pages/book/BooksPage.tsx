import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { BooksContainer, BookGrid, BookCover, BookText } from './BooksPage.styled';
import { Header } from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

// Sample book data (replace with dynamic data if needed)
const books = [
  { id: '1', cover: 'https://placehold.co/150x225?text=Book+1', title: 'Book Title 1', author: 'Author 1' },
  { id: '2', cover: 'https://placehold.co/150x225?text=Book+2', title: 'Book Title 2', author: 'Author 2' },
  { id: '3', cover: 'https://placehold.co/150x225?text=Book+3', title: 'Book Title 3', author: 'Author 3' },
  { id: '4', cover: 'https://placehold.co/150x225?text=Book+4', title: 'Book Title 4', author: 'Author 4' },
  { id: '5', cover: 'https://placehold.co/150x225?text=Book+5', title: 'Book Title 5', author: 'Author 5' },
  { id: '6', cover: 'https://placehold.co/150x225?text=Book+6', title: 'Book Title 6', author: 'Author 6' },
];

const BooksPage: React.FC = () => {
  const [layoutType, setLayoutType] = useState<'twoColumns' | 'threeColumns'>('threeColumns');
  const navigate = useNavigate();

  // Toggle handler for layout
  const toggleLayout = () => {
    setLayoutType(layoutType === 'threeColumns' ? 'twoColumns' : 'threeColumns');
  };

  // Navigate to MyBooks page for a specific book
  const goToBook = (bookId: string) => {
    navigate(`/books/${bookId}`);
  };

  return (
    <BooksContainer>
      <Header />
      <div style={{ padding: '20px', marginTop: '80px', textAlign: 'center' }}>
        <h1>This is the Books page.</h1>
        <button
          onClick={toggleLayout}
          style={{ margin: '20px', padding: '10px 20px', cursor: 'pointer' }}
        >
          Toggle {layoutType === 'threeColumns' ? 'Two' : 'Three'} Columns
        </button>
      </div>
      <BookGrid layoutType={layoutType}>
        {books.map((book) => (
          <div
            key={book.id}
            style={{ textAlign: 'center', cursor: 'pointer' }}
            onClick={() => goToBook(book.id)} // Navigate to the specific book
          >
            <BookCover src={book.cover} alt={book.title} layoutType={layoutType} />
            <BookText layoutType={layoutType}>
              <strong>{book.title}</strong>
              <br />
              {book.author}
            </BookText>
          </div>
        ))}
      </BookGrid>
      <Footer />
    </BooksContainer>
  );
};

export default BooksPage;
