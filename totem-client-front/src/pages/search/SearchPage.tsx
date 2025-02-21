import React from 'react';
import { Header } from '../../components/header/Header';  // Adjust the import paths as needed
import Footer from '../../components/footer/Footer';
import { SearchContainer } from './SearchPage.styled';

const SearchPage: React.FC = () => {
     return (
    <SearchContainer>
      <Header />
        <div style={{ padding: '20px', marginTop: '80px', textAlign: 'center' }}>
        <h1>This is the search page.</h1>
        </div>
        <Footer />
    </SearchContainer>
  );

};

export default SearchPage;
