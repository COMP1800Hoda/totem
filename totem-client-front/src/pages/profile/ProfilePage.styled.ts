import styled from 'styled-components';

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure the container takes the full height of the viewport */
  padding: 0;
  margin: 0;
  background-color: #f8f8f8; /* Light background color for the page */

  /* If you want the content to stretch and fill available space */
  main {
    flex: 1;
  }
`;
