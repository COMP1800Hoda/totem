import styled from "styled-components";

export const BookContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure the container takes the full height of the viewport */
  padding: 1em;
  margin: 0;
  background-color: #F8F0E9; /* Light background color for the page */

  /* If you want the content to stretch and fill available space */
  main {
    flex: 1;
  }
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  color: #555;
  margin-bottom: 16px;
  background: none;
  border: none;
  cursor: pointer;
`;

export const BookCard = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  background: white;
  border-radius: 8px;
`;

export const BookCover = styled.img`
  width: 100px;
  height: auto;
  border-radius: 8px;
`;

export const BookDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const BookTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
`;

export const BookMeta = styled.p`
  font-size: 14px;
  color: #555;
`;

export const BookTags = styled.div`
  display: flex;
  gap: 8px;
`;

export const Tag = styled.span`
  background: #ddd;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
`;

export const ReadButton = styled.button`
  width: 100%;
  margin-top: 16px;
  background: #8b5a2b;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const Synopsis = styled.div`
  margin-top: 16px;
`;

export const BookInfo = styled.div`
  margin-top: 16px;
  font-size: 14px;
  color: #666;
`;