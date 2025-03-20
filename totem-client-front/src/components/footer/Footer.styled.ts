import styled from 'styled-components';
import { AiOutlineHome, AiOutlineBook, AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';
import { MdHeadset } from 'react-icons/md';

export const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  margin: 0;
  width: 100%;
  height: 50px; /* Reduced height for compact design */
  background-color: #ffffff;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 0; /* Adjusted padding */
  padding-left: 0;
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%; /* Prevents excessive stretching */
  max-width: 400px; /* Ensures proper alignment on mobile */
`;

export const IconStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #333;
  font-size: 10px; /* Adjusted label font size */

  &:hover {
    color: #007bff;
  }
`;

export const Label = styled.span`
  font-size: 10px; /* Smaller text for compact design */
  margin-top: 1px;
`;

export const HomeIcon = styled(AiOutlineHome)`
  font-size: 20px; /* Reduced icon size */
`;

export const BookOpenIcon = styled(AiOutlineBook)`
  font-size: 20px;
`;

export const HeadphonesIcon = styled(MdHeadset)`
  font-size: 20px;
`;

export const SearchIcon = styled(AiOutlineSearch)`
  font-size: 20px;
`;

export const UserIcon = styled(AiOutlineUser)`
  font-size: 20px;
`;
