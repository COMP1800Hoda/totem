import styled from "styled-components";

export const BookContainer = styled.div`
  background-color: #f8f8f8; 
  display: flex;
  justify-content: center;
  >div {
    max-width: 600px;
  }

  h3{
    font-size: unset;
    font-weight: bold;
  }
  p {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }
  
  * {
    text-align: right;
  }
  
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5em;
  z-index: 99;
  color: #555;
  margin-bottom: 1em;
  max-width: 5em;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1em;
  border-radius: 0.25em;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #f0f0f0; 
    color: #000;
  }

  &:active {
    background-color: #e0e0e0;
  }

  &:focus {
    outline: none; 
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5); 
  }
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
  object-fit: contain;
`;

export const BookDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 200px;

  button {
    margin-top: 4px;
    width: 72px;
  }
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
  justify-content: flex-end;
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

export const DeleteButton = styled.button`
  margin-top: 30px;
  align-items: center;
  width: 100px;
  text-align: center;
  font-size: 13px;
  padding: 6px;
  font-weight: 500;
  margin-bottom: 20px;
  background-color: var(--color-danger);
  span{
    position: relative;
    top:1px;
    margin-left: 4px;
  }
  
  svg {
    width: 22px;
    height: 22px;
    stroke-width: 1px;
  }
`

