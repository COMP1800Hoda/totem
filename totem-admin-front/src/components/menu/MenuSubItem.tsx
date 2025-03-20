import React from 'react';

import { StyledMenuSubItem } from './Menu.styled.ts';
import { Link } from 'react-router';
import { IconChevronRight } from '@tabler/icons-react';

interface MenuSubItemProps {
  name: string;
  path: string;
  onClick?: () => void;
}

export const MenuSubItem: React.FC<MenuSubItemProps> = ({
  name,
  path,
  onClick,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (onClick) {
      e.preventDefault(); // Prevent the default link navigation
      onClick();
    }
  };

  return (
    <StyledMenuSubItem>
      <Link to={path} onClick={handleClick}>
        <span>{name}</span>
        <IconChevronRight />
      </Link>
    </StyledMenuSubItem>
  );
};
