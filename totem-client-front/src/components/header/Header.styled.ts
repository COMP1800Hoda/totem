import styled from 'styled-components';

export const HeaderContainer = styled.header<{
  hideBorder?: boolean;
}>`
  position: fixed;
  z-index: 99;
  left: 0;
  top: 0;
  right: 0;
  width: 100%;
  height: 56px;
  background-color: white;
  border-bottom: ${({ hideBorder }) =>
          hideBorder
                  ? 'none'
                  : '1px solid lightgray'};
`;

export const Inner = styled.div`
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
`;

export const SearchContainer = styled.div`
  flex: 1;

`;