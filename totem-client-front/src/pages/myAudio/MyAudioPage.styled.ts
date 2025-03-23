import styled from 'styled-components';
import { COLORS } from '../../constants/colors.ts';

export const MyAudioContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure the container takes the full height of the viewport */
  padding: 0;
  margin: 0;
  background-color: ${COLORS.Lightest}; /* Light background color for the page */
  color: ${COLORS.Dark}; /* Dark text color for the page */

  /* If you want the content to stretch and fill available space */
  main {
    flex: 1;
  }
`;

export const AudioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 1em;
  padding-top: 0.5em;
`;

export const AudioList = styled.div`
  display: block;
  padding: 20px;
`;

export const AudioItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
`;

export const AudioThumbnail = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  margin-bottom: 10px;
  border-radius: 6px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
`;