import styled from "styled-components";
import { COLORS } from '../../constants/colors.ts';

export const BookContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure the container takes the full height of the viewport */
  margin: 0;
  padding: 1em;
  background-color: ${COLORS.Lightest}; /* Light background color for the page */
  

  /* If you want the content to stretch and fill available space */
  main {
    flex: 1;
  }
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5em; // Space between icon and text
  z-index: 99;
  color: ${COLORS.Dark}; 
  margin-bottom: 1em;
  max-width: 5em;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1em;
  border-radius: 0.25em;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #f0f0f0; // Light gray background on hover
    color: #000; // Darker text on hover
  }

  &:active {
    background-color: ${COLORS.Lightest}; // Slightly darker background on click
  }

  &:focus {
    outline: none; // Remove default focus outline
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5); // Add a custom focus outline
  }
`;

export const BookCard = styled.div`
  display: flex;
  gap: 1em;
  padding: 1em;
  border-radius: 0.5em;
`;

export const BookCover = styled.img`
  margin-top: 0.8em;
  width: 7.5em;
  height: 13.5em;
  border-radius: 0.5em;
`;

export const BookDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const BookTitle = styled.h2`
  font-size: 1.2em;
  font-weight: bold;
  color: ${COLORS.Darkest}; // Book Title font color
`;

export const BookMeta = styled.p`
  font-size: 0.8em;
  color: ${COLORS.Darkest};
`;

export const BookTags = styled.div`
  display: flex;
  gap: 0.5em;
`;

export const Tag = styled.span`
  background: #ddd;
  padding: 0.25em 0.5em;
  border-radius: 0.2em;
  font-size: 0.8em;
  
  color: ${COLORS.Darkest}; // genre font color
  background: ${COLORS.Light}; // genre background color
`;

export const ReadButton = styled.button`
  width: 100%;
  margin-top: 1em;
  background: ${COLORS.Light};
  color: ${COLORS.Darkest};
  padding: 0.6em;
  border: 0.5px solid ${COLORS.Darkest}; 
  border-radius: 0.5em;
  cursor: pointer;
`;

export const Synopsis = styled.div`
  margin-top: 0.9em;
  color: ${COLORS.Darkest}; // Synopsis color
`;

export const BookInfo = styled.div`
  margin-top: 1em;
  font-size: 0.9em;
  color: ${COLORS.Dark}; // ISBN color
`;
export const AuthorInfo = styled.div`
  margin-top: 1em;
  font-size: 0.9em;
  color: ${COLORS.Darkest}; // Author & illustrators font color
`;

export const PublisherInfo = styled.div`
  font-size: 0.9em;
  margin-top: 1em;
  color: ${COLORS.Darkest}; // Publisher & contributed by font color
`;

export const ShowMoreButton = styled.button`
  background: ${COLORS.Lightest}; 
  border: 0.5px solid ${COLORS.Darkest}; 
  color: ${COLORS.Darkest}; 
  cursor: pointer;
  font-size: 0.8em; // Smaller font size
  padding: 0.25em 0.5em; // Compact padding
  border-radius: 0.25em; // Rounded corners
  transition: background 0.2s ease, color 0.2s ease;
  &:hover {
    background: ${COLORS.Light}; 
    color: ${COLORS.Darkest}; 
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.05em rgba(0, 123, 255, 0.25); // Focus ring for accessibility
  }

  &:active {
    background: ${COLORS.Light}; 
  }
`;

export const FooterWrapper = styled.footer`
  & > * {
    margin: 0 -1em; /* Apply negative margin to all direct children */
  }
`;