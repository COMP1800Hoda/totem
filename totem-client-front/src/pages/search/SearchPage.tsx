import React, { useState } from 'react';
import { Header } from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { useNavigate } from 'react-router';
import { useSearch } from './SearchPageLogic.ts';
import { COLORS } from '../../constants/colors.ts';
import {
  Content,
  SearchContainer,
  SearchInput,
  SearchButton,
  SearchResults,
  SearchResultItem,
  BookCover,
  BookText,
  BookGrid
} from './SearchPage.styled';
import {CreatedBy} from "../../types/Storybook.ts";

const SearchPage: React.FC = () => {
  const { searchQuery, setSearchQuery, searchResults, handleSearch } = useSearch();
  const [layoutType, setLayoutType] = useState<'twoColumns' | 'threeColumns'>('threeColumns');
  const [displayCount, setDisplayCount] = useState(12);
  const navigate = useNavigate();

  const goToBook = (storybook_id: string) => navigate(`/books/${storybook_id}`);
  const toggleLayout = () => setLayoutType(prev => (prev === 'threeColumns' ? 'twoColumns' : 'threeColumns'));
  
  const loadMoreBooks = () => {
    setDisplayCount(prevCount => prevCount + 12);
  };

  const displayedBooks = searchResults.slice(0, displayCount);
  const hasMore = displayCount < searchResults.length;

  return (
    <SearchContainer>
      <Header />
      <Content>
      <div style={{ padding: '1.25em', marginTop: '5em', textAlign: 'center' }}>
        <h1>Search Page</h1>

        {/* Search input */}
        <div>
          <SearchInput
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for books or audio..."
          />
          <SearchButton onClick={() => {
            handleSearch();
            setDisplayCount(12);
          }}>Search</SearchButton>
        </div>

        {/* Layout Toggle Button */}
        <button onClick={toggleLayout} style={{ margin: '1.25em', padding: '0.75em 1.25em', cursor: 'pointer', color: COLORS.Dark, backgroundColor: COLORS.Lightest , borderRadius: '6px', border: `2px solid ${COLORS.Dark}` }}>
          Toggle {layoutType === 'threeColumns' ? 'Two' : 'Three'} Columns
        </button>

        {/* Display search results */}
        <SearchResults>
          {displayedBooks.length > 0 ? (
            <>
              <BookGrid layoutType={layoutType}>
                {displayedBooks.map((book) => (
                  <SearchResultItem key={book.storybook_id} onClick={() => goToBook(book.storybook_id)}>
                    <BookCover src={book.cover_image_url} alt={book.storybook_title} layoutType={layoutType} />
                    <BookText layoutType={layoutType}>
                      <strong>{book.storybook_title}</strong>
                      <br/>
                      <span className="created_by">
                        {book.created_by?.map((person: CreatedBy) => person.name).join(', ')}
                      </span>
                    </BookText>
                  </SearchResultItem>
                ))}
              </BookGrid>
              
              {/* Load More button */}
              {hasMore && (
                <div style={{ textAlign: 'center', margin: '1.25em', marginBottom: '6.5em' }}>
                  <button
                    onClick={loadMoreBooks}
                    style={{ 
                      padding: '0.75em 1.25em', 
                      cursor: 'pointer', 
                      color: COLORS.Dark, 
                      backgroundColor: COLORS.Lightest,
                      borderRadius: '6px', 
                      border: `2px solid ${COLORS.Dark}` 
                    }}
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          ) : (
            <p>No results found. Try searching for something else.</p>
          )}
        </SearchResults>
      </div>
      </Content>
      <Footer />
    </SearchContainer>
  );
};

export default SearchPage;