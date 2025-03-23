import React from 'react';
import { IconMenu2 } from '@tabler/icons-react';

import { HeaderContainer, Inner } from './Header.styled.ts';
import { COLORS } from '../../constants/colors.ts';

interface HeaderSearchProps {
}

export const Header: React.FC<HeaderSearchProps> = ({
}) => {
  return (
    <HeaderContainer hideBorder={false}>
      <Inner>
        <a href="/main">
          <h1 style={{ fontSize: 20 }}>Totem</h1>
        </a>
        <IconMenu2 color={COLORS.darkGray} size={24} stroke={1.5} />
      </Inner>
    </HeaderContainer>
  );
};
