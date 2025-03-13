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
  background-color: var(--color-background);
  border-bottom: ${({ hideBorder }) =>
          hideBorder
                  ? 'none'
                  : '1px solid lightgray'};
`;

export const Inner = styled.div`
  height: 56px;
  width: 100%;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
`;
