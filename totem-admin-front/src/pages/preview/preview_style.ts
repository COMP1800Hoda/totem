import styled from "styled-components";

export const BookContainer = styled.div`
  // display: flex;
  // flex-direction: column;
  width: 570px;
  justify-content: center;
  min-height: 100vh; /* Ensure the container takes the full height of the viewport */
  padding: 1em;
  margin: 0;
  background-color: #F8F0E9; /* Light background color for the page */

  /* If you want the content to stretch and fill available space */
  // main {
  //   flex: 1;
   
  // }
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  color: #555;
  margin-bottom: 16px;
  background: none;
  border: none;
  cursor: pointer;
  width: 100%;
`;

export const BookCard = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  width:auto;
  
`;

export const BookCover = styled.img`
  width: 100px;
  height: 150px;
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

export const UploadButton = styled.button`
  width: 100%;
  margin-top: 16px;
  background: #DECBB7;
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


export const ThumbnailContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); 
  gap: 0; /* Remove gap between items */
  padding: 0; /* Remove padding */
  margin: 0; /* Remove margin */
`;


export const ThumbnailWrapper = styled.div`
  flex: 0 0 auto;
  width: 100px;
  border: none
  padding: 0;
  text-align: center;
`;


export const BookContentImg = styled.img`
  width: 100%;
  height: auto;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05); // Slightly enlarge on hover
  }
  `;

 export const FileNameContainer = styled.p`
  word-break: break-word; /* Break long words */
  overflow-wrap: break-word; /* Ensure wrapping */
  white-space: normal; /* Allow text to wrap */
  max-width: 150px; /* Adjust based on your layout */
  margin: 0; /* Remove default margin */
  font-size: 10px;
`;

