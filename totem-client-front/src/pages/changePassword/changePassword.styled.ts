import styled from 'styled-components';

/* Main container */
export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10vh 5% 5% 5%;
  font-family: Arial, sans-serif;
  background: #f8f0e9;
  min-height: 100vh;
  color: #8f857d;
`;

/* Top Navigation Bar */
export const TopNavBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 8vh;
  background: #f8f0e9;
  display: flex;
  align-items: center;
  padding-left: 2%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

export const NavButton = styled.button`
  background: none;
  border: none;
  color: #8f857d;
  cursor: pointer;
`;

/* Sections */
export const Section = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export const SectionTitle = styled.p`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
`;

export const TextBox = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #8f857d; /* Thinner border */
  border-radius: 8px;
  background: none;
  color: #8f857d;
  margin-bottom: 10px;

  &:focus {
    outline: none;
    border-color: #5c5552;
  }
`;

/* Buttons */
export const Button = styled.button<{ cancel?: boolean }>`
  width: 100%; /* Full width for stacked buttons */
  padding: 10px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid ${({ cancel }) => (cancel ? '#8f857d' : '#5c5552')}; /* Thinner border */
  background: ${({ cancel }) => (cancel ? 'none' : '#decbb7')};
  color: ${({ cancel }) => (cancel ? '#8f857d' : '#5c5552')};
  font-weight: ${({ cancel }) => (cancel ? 'normal' : 'bold')};
  cursor: pointer;
  margin-bottom: 10px; /* Space between buttons */

  &:hover {
    background: ${({ cancel }) => (cancel ? '#f8f0e9' : '#5c5552')};
    color: ${({ cancel }) => (cancel ? '#8f857d' : '#f8f0e9')};
  }
`;
