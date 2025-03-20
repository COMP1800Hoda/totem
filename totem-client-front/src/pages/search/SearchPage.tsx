import React, { useState } from 'react';
import { Header } from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { useNavigate } from 'react-router';
import { useSearch } from './SearchPageLogic.ts';
import {
  SearchContainer,
  SearchInput,
  SearchButton,
  SearchResults,
  SearchResultItem,
  BookCover,
  BookText,
  BookGrid
} from './SearchPage.styled';

const SearchPage: React.FC = () => {
  const { searchQuery, setSearchQuery, searchResults, handleSearch } = useSearch();
  const [layoutType, setLayoutType] = useState<'twoColumns' | 'threeColumns'>('threeColumns');
  const navigate = useNavigate();

  const goToBook = (bookId: string) => navigate(`/books/${bookId}`);
  const toggleLayout = () => setLayoutType(prev => (prev === 'threeColumns' ? 'twoColumns' : 'threeColumns'));

  return (
    <SearchContainer>
      <Header />

      <div style={{ padding: '20px', marginTop: '80px', textAlign: 'center' }}>
        <h1>Search Page</h1>

        {/* Search input */}
        <div>
          <SearchInput
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for books or audio..."
          />
          <SearchButton onClick={handleSearch}>Search</SearchButton>
        </div>

        {/* Layout Toggle Button */}
        <button onClick={toggleLayout} style={{ margin: '20px', padding: '10px 20px', cursor: 'pointer' }}>
          Toggle {layoutType === 'threeColumns' ? 'Two' : 'Three'} Columns
        </button>

        {/* Display search results */}
        <SearchResults>
          {searchResults.length > 0 ? (
            <BookGrid layoutType={layoutType}>
              {searchResults.map((book) => (
                <SearchResultItem key={book.objectId} onClick={() => goToBook(book.objectId)}>
                  <BookCover src={book.cover_image_url} alt={book.storybook_title} layoutType={layoutType} />
                  <BookText layoutType={layoutType}>
                    <strong>{book.storybook_title}</strong>
                    <br />
                    {book.author}
                  </BookText>
                </SearchResultItem>
              ))}
            </BookGrid>
          ) : (
            <p>No results found. Try searching for something else.</p>
          )}
        </SearchResults>
      </div>

      <Footer />
    </SearchContainer>
  );
};

export default SearchPage;
