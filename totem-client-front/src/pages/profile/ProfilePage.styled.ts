import styled from 'styled-components';
import { COLORS } from '../../constants/colors.ts';

/* Main container */
export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10vh 5% 5% 5%; /* Ensures content is not blocked by TopNavBar */
  font-family: Arial, sans-serif;
  background: ${COLORS.Lightest};
  min-height: 100vh;
  color: ${COLORS.Darkest};
`;

export const Content = styled.div`
  width: 90%;

  @media (min-width: 768px) {
    width: 45vw;
    max-width: 80vw;
  }
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
`;

export const SectionTitle = styled.p`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 5px;
  color: ${COLORS.Dark};
`;

export const SectionContent = styled.p`
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
  color: ${COLORS.Darkest};
`;

/* Divider */
export const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 2px solid ${COLORS.Dark};
  margin: 10px 0;
`;

/* Row for Settings */
export const SettingsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  cursor: pointer;
`;

/* Footer */
export const Footer = styled.div`
  position: relative;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-size: 14px;
  color: ${COLORS.Dark};
  width: 100%;
`;