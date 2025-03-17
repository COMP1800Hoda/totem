import styled from "styled-components";

export const BookContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure the container takes the full height of the viewport */
  margin: 0;
  padding: 1em;
  background-color: #f8f8f8; /* Light background color for the page */

  /* If you want the content to stretch and fill available space */
  main {
    flex: 1;
  }
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  color: #555;
  margin-bottom: 1em;
  background: none;
  border: none;
  cursor: pointer;
`;

export const BookCard = styled.div`
  display: flex;
  gap: 1em;
  padding: 1em;
  background: white;
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
`;

export const BookMeta = styled.p`
  font-size: 0.8em;
  color: #555;
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
`;

export const ReadButton = styled.button`
  width: 100%;
  margin-top: 1em;
  background: #8b5a2b;
  color: white;
  padding: 0.6em;
  border: none; 
  border-radius: 0.5em;
  cursor: pointer;
`;

export const Synopsis = styled.div`
  margin-top: 0.9em;
`;

export const BookInfo = styled.div`
  margin-top: 1em;
  font-size: 0.9em;
  color: #666;
`;
export const AuthorInfo = styled.div`
  margin-top: 1em;
  font-size: 0.9em;
`;

export const PublisherInfo = styled.div`
  font-size: 0.9em;
  margin-top: 1em;
`;

export const ShowMoreButton = styled.button`
  background: #f0f0f0; // Light grey background
  border: 0.05em solid #ccc; // Grey border
  color: #333; // Dark grey text
  cursor: pointer;
  font-size: 0.8em; // Smaller font size
  padding: 0.25em 0.5em; // Compact padding
  border-radius: 0.25em; // Rounded corners
  transition: background 0.2s ease, color 0.2s ease;
  &:hover {
    background: #e0e0e0; // Slightly darker grey on hover
    color: #000; // Darker text on hover
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.05em rgba(0, 123, 255, 0.25); // Focus ring for accessibility
  }

  &:active {
    background: #d0d0d0; // Even darker grey when clicked
  }
`;

export const FooterWrapper = styled.footer`
  & > * {
    margin: 0 -1em; /* Apply negative margin to all direct children */
  }
`;