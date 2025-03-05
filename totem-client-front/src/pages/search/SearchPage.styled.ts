import styled from 'styled-components';

export const SearchContainer = styled.div`
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

export const SearchInput = styled.input`
  padding: 0.5em;
  font-size: 16px;
  width: 300px;
  margin-right: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const SearchButton = styled.button`
    margin-top: 0.5em;
  padding: 0.5em 1em;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #007bff;
  color: white;
`;

export const SearchResults = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
`;

export const SearchResultItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

