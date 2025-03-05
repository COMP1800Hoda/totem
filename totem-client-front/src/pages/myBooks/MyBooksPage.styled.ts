import styled from 'styled-components';

interface BookGridProps {
  layoutType: 'twoColumns' | 'threeColumns';
}

// Main container for My Books Page
export const MyBooksContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure the container takes the full height of the viewport */
  padding: 0;
  margin: 0;
  background-color: #f8f8f8; /* Light background color for the page */
`;

// Grid layout for books
export const BookGrid = styled.div<BookGridProps>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.layoutType === 'threeColumns' ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)'};
  gap: 15px;
  margin-top: 0.5em;
  justify-content: center;
`;

// Book cover styling with dynamic size adjustments
export const BookCover = styled.img<BookGridProps>`
  width: ${(props) => (props.layoutType === 'threeColumns' ? '110px' : '150px')};
  height: ${(props) => (props.layoutType === 'threeColumns' ? '160px' : '225px')};
  object-fit: cover;
  border-radius: 6px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

// Book text container for title & author with dynamic font size
export const BookText = styled.div<BookGridProps>`
  margin-top: 5px;
  font-size: ${(props) => (props.layoutType === 'threeColumns' ? '14px' : '16px')};
  color: #333;
  text-align: center;
  line-height: 1.3;
`;
