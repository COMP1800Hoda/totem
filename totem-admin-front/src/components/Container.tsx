import React, { ReactNode } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  padding: 16px;
  width: 100%;
  max-width: 800px;
`;

interface ContainerProps extends React.HTMLProps<HTMLDivElement> {
  children?: ReactNode | string;
}

export const Container: React.FC<ContainerProps> = ({ children, ...props }) => {
  return <StyledContainer {...props}>{children}</StyledContainer>;
};