import styled from 'styled-components';
import { COLORS } from '../../constants/colors.ts';

/* Main container */
export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10vh 5% 5% 5%;
  font-family: Arial, sans-serif;
  background: ${COLORS.Lightest};
  min-height: 100vh;
  color: ${COLORS.Dark};
`;

/* Top Navigation Bar */
export const TopNavBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 8vh;
  background: ${COLORS.Lightest};
  display: flex;
  align-items: center;
  padding-left: 2%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

export const NavButton = styled.button`
  background: none;
  border: none;
  color: ${COLORS.Dark};
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
  border: 1px solid ${COLORS.Dark}; /* Thinner border */
  border-radius: 8px;
  background: none;
  color: ${COLORS.Dark};
  margin-bottom: 10px;

  &:focus {
    outline: none;
    border-color: ${COLORS.Darkest};
  }
`;

/* Buttons */
export const Button = styled.button<{ cancel?: boolean }>`
  width: 100%; /* Full width for stacked buttons */
  padding: 10px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid ${({ cancel }) => (cancel ? '${COLORS.Dark}' : '${COLORS.Darkest}')}; /* Thinner border */
  background: ${({ cancel }) => (cancel ? 'none' : '#decbb7')};
  color: ${({ cancel }) => (cancel ? '${COLORS.Dark}' : '${COLORS.Darkest}')};
  font-weight: ${({ cancel }) => (cancel ? 'normal' : 'bold')};
  cursor: pointer;
  margin-bottom: 10px; /* Space between buttons */

  &:hover {
    background: ${({ cancel }) => (cancel ? '${COLORS.Lightest}' : '${COLORS.Darkest}')};
    color: ${({ cancel }) => (cancel ? '${COLORS.Dark}' : '${COLORS.Lightest}')};
  }
`;
