import styled from "styled-components";

export const AudioContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure the container takes the full height of the viewport */
  padding: 1em;
  margin: 0;
  background-color: #f8f8f8; /* Light background color for the page */
`;

export const AudioTitle = styled.h1`
  font-size: 1.5em;
  margin-bottom: 10px;
`;

export const AudioMetadata = styled.div`
  font-size: 1em;
  color: #555;
  margin-bottom: 0.7em;
`;

export const AudioPlayer = styled.audio`
  margin-top: 1em;
  width: 100%;
  max-width: 25em;
`;
export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5em; // Space between icon and text
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
    background-color: #f0f0f0; // Light gray background on hover
    color: #000; // Darker text on hover
  }

  &:active {
    background-color: #e0e0e0; // Slightly darker background on click
  }

  &:focus {
    outline: none; // Remove default focus outline
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5); // Add a custom focus outline
  }
`;

export const FooterWrapper = styled.footer`
  & > * {
    margin: 0 -1em; /* Apply negative margin to all direct children */
  }
`;