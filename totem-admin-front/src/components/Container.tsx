import React, { ReactNode } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  padding: 16px;
  width: 100%;
  max-width: 1600px;
`;

interface ContainerProps {
  children?: ReactNode | string;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};