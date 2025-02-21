import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure the container takes the full height of the viewport */
  padding: 0;
  margin: 0;
  background-color: #f8f8f8; /* Light background color for the page */
`;

export const Section = styled.section`
  padding: 1.5em;
  margin-bottom: 24px;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  h2 {
    font-size: 18px;
  }

  a {
    font-size: 14px;
    text-decoration: none;
    color: #007bff;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const BookThumbnail = styled.img`
  width: 120px;
  height: 180px;
  margin-right: 8px;
  border-radius: 8px;
  object-fit: cover;
`;

export const AudioThumbnail = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 8px;
  border-radius: 8px;
  object-fit: cover;
`;

export const Banner = styled.div`
  background-color: #fff3cd;
  color: #856404;
  padding: 1em;
  margin-top: 5em;
  margin-bottom: 16px;
  text-align: center;
  border-radius: 5px;
  border: 1px solid #ffeeba;
`;

export const RestoreButton = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
