import styled from 'styled-components';
import { AiOutlineHome, AiOutlineBook, AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';
import { MdHeadset } from 'react-icons/md';
import { COLORS } from '../../constants/colors.ts';

export const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  margin: 0;
  width: 100%;
  height: 10vh; /* 5% of the viewport height */
  background-color: ${COLORS.Lightest};
  border-top: 0.05px solid ${COLORS.Light}; /* 0.1% of the viewport width */
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 0;
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80vw; /* 80% of the viewport width */
  max-width: 40em; /* Limits the maximum width */
  padding: 10% 0;
`;

export const IconStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: ${COLORS.Dark};
  font-size: 1em; /* Font size based on 2% of the viewport width */

  &:hover {
    color: ${COLORS.Darkest};
  }
`;

export const Label = styled.span`
  font-size: 0.75em; /* Font size based on 1.5% of the viewport width */
  margin-top: 0.5em; /* Vertical spacing based on viewport height */
`;

export const HomeIcon = styled(AiOutlineHome)`
  font-size: 1.5em;
`;

export const BookOpenIcon = styled(AiOutlineBook)`
  font-size: 1.5em;
`;

export const HeadphonesIcon = styled(MdHeadset)`
  font-size: 1.5em;
`;

export const SearchIcon = styled(AiOutlineSearch)`
  font-size: 1.5em;
`;

export const UserIcon = styled(AiOutlineUser)`
  font-size: 1.5em;
`;
