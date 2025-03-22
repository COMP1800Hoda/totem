import React from 'react';
import { Header } from '../../components/header/Header'; // Adjust the import paths as needed
import Footer from '../../components/footer/Footer';
import { SearchContainer, SearchInput, SearchButton, SearchResults, SearchResultItem } from './SearchPage.styled';
import { useSearch } from './SearchPageLogic.ts'; // Importing the custom hook

const SearchPage: React.FC = () => {
  const { searchQuery, setSearchQuery, searchResults, handleSearch } = useSearch();

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

        {/* Display search results */}
        <SearchResults>
          {searchResults.length > 0 ? (
            searchResults.map((result, index) => (
              <SearchResultItem key={index}>{result}</SearchResultItem>
            ))
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
