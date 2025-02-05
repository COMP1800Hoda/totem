import styled from 'styled-components';
import { Button } from 'react-bootstrap';

import { Container } from '../../components/Container.tsx';

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-bottom: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MainContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 8vw;
  max-width: 1600px;

  //@media (max-width: 48em) {
  //}
  
  button {
    border: 5px solid purple;
  }
`;

export const HeroTitle = styled.h2`
  font-size: 2rem;
  
  & p {
    font-size: 1.5rem;
  }

`;

export const NameButton = styled(Button)`
  background-color: pink;
`
