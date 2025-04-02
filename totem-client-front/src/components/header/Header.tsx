import React from 'react';

import { HeaderContainer, Inner } from './Header.styled.ts';
interface HeaderSearchProps {}

export const Header: React.FC<HeaderSearchProps> = ({}) => {
  return (
    <HeaderContainer hideBorder={false}>
      <Inner>
        <h1>Totem Logo</h1>
      </Inner>
    </HeaderContainer>
  );
};
