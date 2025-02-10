import React from 'react';
import { Link } from 'react-router';  // Import Link from react-router-dom
import { FooterContainer, IconWrapper, IconStyle, HomeIcon, BookOpenIcon, UserIcon } from './Footer.styled';

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <IconWrapper>
        <Link to="/">
          <IconStyle><HomeIcon /></IconStyle>
        </Link>
        <Link to="/c">
          <IconStyle><BookOpenIcon /></IconStyle>
        </Link>
        <Link to="/p">
          <IconStyle><UserIcon /></IconStyle>
        </Link>
      </IconWrapper>
    </FooterContainer>
  );
};

export default Footer;
