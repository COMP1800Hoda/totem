import styled from "styled-components";
import { COLORS } from '../../constants/colors.ts';

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure the container takes the full height of the viewport */
  padding: 0;
  margin: 0;
  background-color: ${COLORS.Lightest}; /* Light background color for the page */
  color: ${COLORS.Darkest}; /* Dark text color */
`;

export const Section = styled.section`
  padding: 2.5vh;
  margin-bottom: 5vh;
`;

export const Padding = styled.div`
  height: 10vh;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 1em;

  h2 {
    font-size: 1em; /* Adjusted font size based on viewport width */
    color: ${COLORS.Darkest}; 
  }

  a {
    font-size: 1em; /* Adjusted font size based on viewport width */
    text-decoration: none;
    color: ${COLORS.Dark};

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const BookThumbnail = styled.img`
  width: 5em; /* Width is 8% of the viewport width */
  height: 8em; /* Height is 13% of the viewport height */
  margin-right: 1em; /* Margin based on viewport width */
  border-radius: 8px; /* Border radius based on viewport width */
  object-fit: cover;
`;

export const AudioThumbnail = styled.img`
  width: 8em; /* Width is 8% of the viewport width */
  height: 8em; /* Height is 8% of the viewport width */
  margin-right: 1vw; /* Margin based on viewport width */
  border-radius: 1vw; /* Border radius based on viewport width */
  object-fit: cover;
`;

export const Banner = styled.div`
  background-color: #fff3cd;
  color: #856404;
  padding: 2vh;
  margin-top: 5vh;
  margin-bottom: 2vh;
  text-align: center;
  border-radius: 0.5vw;
  border: 0.1vw solid #ffeeba;
`;

export const RestoreButton = styled.button`
  margin-left: 2vw;
  padding: 1vh 2vw;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0.5vw;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;