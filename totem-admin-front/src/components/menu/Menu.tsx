import React from 'react';

import { Container } from '../Container.tsx';
import { MenuItem, MenuItemTitle } from './Menu.styled.ts';
import { MenuSubItem } from './MenuSubItem.tsx';

interface MenuProps {}

const menuItems = [
  {
    title: 'Book Management',
    links: [
      { name: 'Manage Books', path: '/manage-books' },
      { name: 'Add New Book', path: '/add-book' },
    ],
  },
  {
    title: 'User Management',
    links: [
      { name: 'Manage Users', path: '/manage-users' },
      { name: 'Manage Admins', path: '/manage-admins' },
    ],
  },
  {
    title: 'Account Settings',
    links: [
      { name: 'Change Password', path: '/edit-password' },
      // when admin log out, it will return to log in page
      { name: 'Log Out', path: '/' },
    ],
  },
];

export const Menu: React.FC<MenuProps> = ({}) => {
  return (
    <Container>
      {menuItems.map((item) => (
        <div key={item.title}>
          <MenuItem>
            <MenuItemTitle>{item.title}</MenuItemTitle>
            {item.links.map((link) => (
              <MenuSubItem key={link.path} name={link.name} path={link.path} />
            ))}
          </MenuItem>
        </div>
      ))}
    </Container>
  );
};
