import React from 'react';
import { IconMenu2 } from '@tabler/icons-react';

import { HeaderContainer, Inner } from './Header.styled.ts';
import { COLORS } from '../../constants/colors.ts';
import { useNavigate } from 'react-router-dom';

interface HeaderSearchProps {}

export const Header: React.FC<HeaderSearchProps> = ({}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/main'); // This will navigate to the homepage ('/')
  };
  return (
    <HeaderContainer hideBorder={false}>
      <Inner>
        <h1 style={{ fontSize: 20, cursor: 'pointer' }} onClick={handleClick}>
          Totem
        </h1>
        <IconMenu2 color={COLORS.darkGray} size={24} stroke={1.5} />
      </Inner>
    </HeaderContainer>
  );
};
