import styled from 'styled-components';
import { COLORS } from '../../constants/colors.ts';

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure the container takes the full height of the viewport */
  margin: 0;
  background-color: ${COLORS.Lightest}; /* Light background color for the page */
  color: ${COLORS.Dark}; /* Dark text color */

  /* If you want the content to stretch and fill available space */
  main {
    flex: 1;
  }
`;

interface BookGridProps {
  layoutType: 'twoColumns' | 'threeColumns';
}

// Grid layout for books
export const BookGrid = styled.div<BookGridProps>`
  display: grid;
  direction: rtl;
  grid-template-columns: ${(props) =>
    props.layoutType === 'threeColumns' ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)'};
  gap: 1em;
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

export const SearchInput = styled.input`
  padding: 0.5em;
  font-size: 16px;
  width: 300px;
  margin-right: 10px;
  border-radius: 5px;
  border: 1px solid ${COLORS.Light};
`;

export const SearchButton = styled.button`
    margin-top: 0.5em;
  padding: 0.5em 1em;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid ${COLORS.Darkest};
  background-color: ${COLORS.Light};
  color: ${COLORS.Darkest};
`;

export const SearchResults = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 1.25em;
`;

export const SearchResultItem = styled.li`
  padding: 0.25em;
  border-bottom: 0.1em solid #ddd;
  min-width: 0;
`;

export const Content = styled.div`
  @media (min-width: 800px) {
    width: 45vw;
    max-width: 80vw;
    margin: 0 auto;
  }
`;