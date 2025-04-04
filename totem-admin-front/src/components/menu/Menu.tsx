import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { Container } from '../Container.tsx';
import { MenuItem, MenuItemTitle } from './Menu.styled.ts';
import { MenuSubItem } from './MenuSubItem.tsx';

/**
 * Add isSuperAdmin prop to determine if the user is a super admin.
 * If true, show the Manage Admins menu item.
 * @type {boolean}
 */
interface MenuProps {
  isSuperAdmin?: boolean;
}

export const Menu: React.FC<MenuProps> = ({ isSuperAdmin }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Remove the all local storage items
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
        /**
         * The Manage Users menu item is always included.
         * The Manage Admins menu item is conditionally included based on the isSuperAdmin prop.
         * If isSuperAdmin is true, the Manage Admins menu item will be displayed.
         */
        { name: 'Manage Users', path: '/manage-users' }, // Always included
        ...(isSuperAdmin
          ? [{ name: 'Manage Admins', path: '/manage-admins' }]
          : []), // Conditionally included
      ],
    },
    {
      title: 'Account Settings',
      links: [
        { name: 'Change Password', path: '/change-password' },
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
