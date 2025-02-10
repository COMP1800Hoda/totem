import styled from 'styled-components';

// Catalogue container
export const CatalogueContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  text-align: center;
`;

interface BookGridProps {
  isThreeColumns: boolean;
}

export const BookGrid = styled.div<BookGridProps>`
  display: grid;
  z-index: -5;
  grid-template-columns: ${(props) => (props.isThreeColumns ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)')};
  gap: 20px;
  justify-items: center;
  margin-top: 45px;
`;

// Individual book cover
export const BookCover = styled.img<BookGridProps>`
  width: ${(props) => (props.isThreeColumns ? '100px' : '150px')};  // Adjust width for 3 columns
  height: ${(props) => (props.isThreeColumns ? '150px' : '225px')};  // Adjust width for 3 columns
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  z-index: -3;
  &:hover {
    transform: scale(1.05);
  }
`;

export const ToggleButton = styled.button`
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 10;
  padding: 10px 20px;
  background-color: #4CAF50; /* Green */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #45a049; /* Darker green on hover */
  }

  &:focus {
    outline: none;
  }
`;
