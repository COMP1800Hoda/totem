import React from "react";
import { Link } from "react-router"; // Corrected import
import {
  FooterContainer,
  IconWrapper,
  IconStyle,
  HomeIcon,
  BookOpenIcon,
  HeadphonesIcon,
  SearchIcon,
  UserIcon,
} from "./Footer.styled";

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <IconWrapper>
        <Link to="/profile">
          <IconStyle>
          <UserIcon />
          <span>Profile</span>
          </IconStyle>
        </Link>
        <Link to="/search">
          <IconStyle>
          <SearchIcon />
          <span>Search</span>
          </IconStyle>
        </Link>
        <Link to="/audio">
          <IconStyle>
            <HeadphonesIcon />
            <span>Audio</span>
          </IconStyle>
        </Link>
        <Link to="/books">
          <IconStyle>
          <BookOpenIcon />
          <span>Books</span>
          </IconStyle>
        </Link>
        <Link to="/">
          <IconStyle>
          <HomeIcon />
          <span>Home</span>
          </IconStyle>
        </Link>
      </IconWrapper>
    </FooterContainer>
  );
};

export default Footer;
