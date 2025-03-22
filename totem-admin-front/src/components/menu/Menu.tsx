import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import Cookies from 'js-cookie';
import { Container } from '../Container.tsx';
import { MenuItem, MenuItemTitle } from './Menu.styled.ts';
import { MenuSubItem } from './MenuSubItem.tsx';

interface MenuProps {}

export const Menu: React.FC<MenuProps> = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('authToken'); // Remove the token from cookies
    navigate('/'); // Redirect to login page
    console.log('navigating to login page');
  };

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
        {
          name: 'Log Out',
          path: '#',
          onClick: handleLogout, // Attach logout handler
        },
      ],
    },
  ];

  return (
    <Container>
      {menuItems.map((item) => (
        <div key={item.title}>
          <MenuItem>
            <MenuItemTitle>{item.title}</MenuItemTitle>
            {item.links.map((link) =>
              link.onClick ? (
                <MenuSubItem
                  key={link.name}
                  name={link.name}
                  path={link.path}
                  onClick={link.onClick} // Handle logout click
                />
              ) : (
                <MenuSubItem
                  key={link.path}
                  name={link.name}
                  path={link.path}
                />
              )
            )}
          </MenuItem>
        </div>
      ))}
    </Container>
  );
};
