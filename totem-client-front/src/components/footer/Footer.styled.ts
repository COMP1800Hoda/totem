// Footer.styled.ts
import styled from 'styled-components';
import { Home, BookOpen, User } from 'lucide-react';

export const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-top: 1px solid lightgray;
`;

export const IconWrapper = styled.div`
  display: flex;
  gap: 40px;
`;

export const IconStyle = styled.div`
  font-size: 32px;
  cursor: pointer;
`;

// Exporting the Icons as components
export const HomeIcon = styled(Home)`
  font-size: 40px;
`;

export const BookOpenIcon = styled(BookOpen)`
  font-size: 40px;
`;

export const UserIcon = styled(User)`
  font-size: 40px;
`;
