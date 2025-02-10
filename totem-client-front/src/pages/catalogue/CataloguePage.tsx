import React, { useState } from 'react';
import { CatalogueContainer, BookGrid, BookCover, ToggleButton } from './CataloguePage.styled';
import { Header } from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { Grid } from 'lucide-react';  // Importing the Grid icon from Lucide

// Sample book covers (replace with dynamic data if needed)
const bookCovers = [
  'https://placehold.co/150x225?text=Book+1',
  'https://placehold.co/150x225?text=Book+2',
  'https://placehold.co/150x225?text=Book+3',
  'https://placehold.co/150x225?text=Book+4',
  'https://placehold.co/150x225?text=Book+5',
  'https://placehold.co/150x225?text=Book+6',
  'https://placehold.co/150x225?text=Book+7',
  'https://placehold.co/150x225?text=Book+8',
];

const CataloguePage: React.FC = () => {
  const [isThreeColumns, setIsThreeColumns] = useState(false);

  // Toggle handler
  const toggleColumns = () => {
    setIsThreeColumns(prev => !prev);
  };

  return (
    <CatalogueContainer>
      <Header />
      <ToggleButton onClick={toggleColumns}>
        <Grid /> {/* Using the Grid icon from Lucide */}
      </ToggleButton>
      <BookGrid isThreeColumns={isThreeColumns}>
        {bookCovers.map((cover, index) => (
          <BookCover key={index} src={cover} alt={`Book ${index + 1}`} isThreeColumns={isThreeColumns} />
        ))}
      </BookGrid>
      <Footer />
    </CatalogueContainer>
  );
};

export default CataloguePage;
