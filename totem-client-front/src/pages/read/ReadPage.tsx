import React, { useEffect } from 'react';

import {
  HeroTitle,
  MainContainer, NameButton,
  Wrapper,
} from './ReadPage.styled.ts';
import { Header } from '../../components/header/Header.tsx';
import { SearchContainer } from '../../components/header/Header.styled.ts';
import { Link } from 'react-router';
import { Button, Stack } from 'react-bootstrap';

const ReadPage: React.FC = () => {
  const [userName, setUserName] = React.useState<string | null>(null);
  const onButtonClick = (text: string) => {
    setUserName(text);
  }

  useEffect(() => {

  }, []);

  return (
    <Wrapper id={'page-home'} className={'page'}>
      <Header />
      <MainContainer>
        <SearchContainer>
          <HeroTitle className="text-highlight">
            Read
          </HeroTitle>
          {/*NOTE: When you navigate, use Link component instead of <a href=""/> */}
          <Link to={'/'}>Home</Link>


        {/*  Bootstrap example */}
          <Stack direction="horizontal" gap={2}>
            {/*basic bootstrap button example*/}
            <Button variant="primary" onClick={() => onButtonClick('Heesun')}>
              {userName ?? "TEST ME"}
            </Button>
            {/* Styling example (you can simply do styling by using styled-components (see ReadPage.styled.ts) */}
            <NameButton onClick={() => onButtonClick('Scott')}>
              {userName ?? "TEST ME"}
            </NameButton>
          </Stack>
        </SearchContainer>
      </MainContainer>
    </Wrapper>
  );
};

export default ReadPage;
