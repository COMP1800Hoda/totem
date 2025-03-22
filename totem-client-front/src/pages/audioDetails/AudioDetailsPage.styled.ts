import styled from "styled-components";
import { COLORS } from '../../constants/colors.ts';

export const AudioContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure the container takes the full height of the viewport */
  padding: 0;
  margin: 0;
  background-color: ${COLORS.Lightest}; /* Light background color for the page */
  color: red; 
`;

export const AudioTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
`;

export const AudioMetadata = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 10px;
`;

export const AudioPlayer = styled.audio`
  margin-top: 15px;
  width: 100%;
  max-width: 400px;
`;