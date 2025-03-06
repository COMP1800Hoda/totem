import React from 'react';

import { StyledMenuSubItem } from './Menu.styled.ts';
import { Link } from 'react-router';
import { IconChevronRight } from '@tabler/icons-react';

interface MenuSubItemProps {
  name: string;
  path: string;
}

export const MenuSubItem: React.FC<MenuSubItemProps> = ({ name, path }) => {
  return (
    <StyledMenuSubItem>
      <Link to={path}>
        <span>{name}</span>
        <IconChevronRight />
      </Link>
    </StyledMenuSubItem>
  );
};
