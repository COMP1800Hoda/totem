import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { BooksContainer, BookGrid, BookCover, BookText } from './BooksPage.styled';
import { Header } from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

// Define types for the book data
interface Book {
  objectId: string;
  cover_image_url: string;
  storybook_title: string;
  author: string;
}

const BooksPage: React.FC = () => {
  const [layoutType, setLayoutType] = useState<'twoColumns' | 'threeColumns'>('threeColumns');
  const [books, setBooks] = useState<Book[]>([]);
  const [limit] = useState(10);  // Limit set to 10 books initially
  const [skip, setSkip] = useState(0);   // Start from the first book
  const [hasMore, setHasMore] = useState(true); // Track if there are more books to load
  const navigate = useNavigate();

  // Fetch book details from API with pagination
  const fetchBooks = async () => {
    try {
      const response = await fetch(`https://parseapi.back4app.com/classes/storybook?limit=${limit}&skip=${skip}`, {
        method: "GET",
        headers: {
          "X-Parse-Application-Id": "XWNVzANvs7w6pYMl4fZWLCcikgXdMvCZhEnI48sH",
          "X-Parse-REST-API-Key": "mRZK1BOLh5EIaOR9Ircc2OhX5OU28aidSsZAtyJP",
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      if (data.results.length < limit) {
        setHasMore(false); // No more books to load
      }
      setBooks(data.results); // Set the first batch of books
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []); // Fetch books only once when the component mounts

  // Toggle handler for layout
  const toggleLayout = () => {
    setLayoutType(layoutType === 'threeColumns' ? 'twoColumns' : 'threeColumns');
  };

  // Navigate to MyBooks page for a specific book
  const goToBook = (bookId: string) => {
    navigate(`/books/${bookId}`);
  };

  // Load more books when the button is clicked
  const loadMoreBooks = async () => {
    try {
      const nextSkip = skip + limit;
      setSkip(nextSkip); // Update skip to load next batch
      const response = await fetch(`https://parseapi.back4app.com/classes/storybook?limit=${limit}&skip=${nextSkip}`, {
        method: "GET",
        headers: {
          "X-Parse-Application-Id": "XWNVzANvs7w6pYMl4fZWLCcikgXdMvCZhEnI48sH",
          "X-Parse-REST-API-Key": "mRZK1BOLh5EIaOR9Ircc2OhX5OU28aidSsZAtyJP",
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      if (data.results.length < limit) {
        setHasMore(false); // No more books to load
      }
      setBooks(prevBooks => [...prevBooks, ...data.results]); // Append next 10 books to the list
    } catch (error) {
      console.error('Error fetching more books:', error);
    }
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
            key={book.objectId}
            style={{ textAlign: 'center', cursor: 'pointer' }}
            onClick={() => goToBook(book.objectId)} // Navigate to the specific book
          >
            <BookCover src={book.cover_image_url} alt={book.storybook_title} layoutType={layoutType} />
            <BookText layoutType={layoutType}>
              <strong>{book.storybook_title}</strong>
              <br />
              {book.author}
            </BookText>
          </div>
        ))}
      </BookGrid>

      {/* Load More button */}
      {hasMore && (
// You can modify the styles of the button container to ensure it's positioned properly and not overlapped by the footer.
<div style={{ textAlign: 'center', margin: '20px', marginBottom: '100px' }}>
  <button
    onClick={loadMoreBooks}
    style={{ padding: '10px 20px', cursor: 'pointer' }}
  >
    Load More
  </button>
</div>

      )}

      <Footer />
    </BooksContainer>
  );
};

export default BooksPage;