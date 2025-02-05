import React from 'react';
import { IconSearch } from '@tabler/icons-react';

import { HeaderContainer, Inner, SearchContainer } from './Header.styled.ts';
import { COLORS } from '../../constants/colors.ts';

interface HeaderSearchProps {
}

export const Header: React.FC<HeaderSearchProps> = ({
}) => {
  return (
    <HeaderContainer>
      <Inner>
        <h1>Totem Logo</h1>

        <SearchContainer>
          <IconSearch color={COLORS.primary} size={16} stroke={1.5} />
        </SearchContainer>
      </Inner>
    </HeaderContainer>
  );
};
