import styled from 'styled-components';
import { COLORS } from '../../constants/colors.ts';

interface BookGridProps {
  layoutType: 'twoColumns' | 'threeColumns';
}

// Main container for My Books Page
export const BooksContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure the container takes the full height of the viewport */
  padding: 0;
  margin: 0;
  background-color: ${COLORS.Lightest}; 
  color: ${COLORS.Dark};
`;

// Grid layout for books
export const BookGrid = styled.div<BookGridProps>`
  display: grid;
  direction: rtl;
  grid-template-columns: ${(props) =>
    props.layoutType === 'threeColumns' ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)'};
  gap: 15px;
  margin-top: 0.5em;
  justify-content: center;
`;

// Book cover styling with dynamic size adjustments
export const BookCover = styled.img<BookGridProps>`
  width: ${(props) => (props.layoutType === 'threeColumns' ? '6.75em' : '9.5em')};
  height: ${(props) => (props.layoutType === 'threeColumns' ? '10em' : '15em')};
  object-fit: contain;
  border-radius: 0.5em;
  box-shadow: 0 0.25em 0.4em rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

// Book text container for title & author with dynamic font size
export const BookText = styled.div<BookGridProps>`
  margin-top: 5px;
  font-size: ${(props) => (props.layoutType === 'threeColumns' ? '14px' : '16px')};
  color: ${COLORS.Darkest};
  text-align: center;
  line-height: 1.3;
`;

export const Content = styled.div`
  @media (min-width: 800px) {     
    width: 45vw;
    max-width: 80vw;
    margin: 0 auto;
  }
`;