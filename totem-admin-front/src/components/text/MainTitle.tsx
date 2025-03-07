import React from 'react';

import { StyledMainTitle } from './MainTitle.styled.ts';

interface MainTitleProps {
  text?: string;
}

export const MainTitle: React.FC<MainTitleProps> = ({ text = '' }) => {
  return <StyledMainTitle>{text}</StyledMainTitle>;
};