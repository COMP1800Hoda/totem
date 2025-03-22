import styled from 'styled-components';
import { COLORS } from '../../constants/colors.ts';

export const HeaderContainer = styled.header<{
  hideBorder?: boolean;
}>`
  position: fixed;
  z-index: 99;
  left: 0;
  top: 0;
  right: 0;
  width: 100%;
  height: 3.5em;
  background-color: ${COLORS.Lightest};
  border-bottom: ${({ hideBorder }) =>
          hideBorder
                  ? 'none'
                  : '1px solid ${COLORS.Light}'};
`;

export const Inner = styled.div`
  height: 3em;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2em;
  padding: 0 1.5em;
  color: ${COLORS.Dark};
`;

export const SearchContainer = styled.div`
  flex: 1;

`;