import React, { useEffect } from 'react';
import { Link } from 'react-router';

import {
  HeroTitle,
  MainContainer,
  Wrapper,
} from './HomePage.styled.ts';
import { Header } from '../../components/header/Header.tsx';
import { SearchContainer } from '../../components/header/Header.styled.ts';
import Footer from '../../components/footer/Footer.tsx';

const HomePage: React.FC = () => {
  // const [userName, setUserName] = React.useState<string | null>(null);

  useEffect(() => {

  }, []);

  return (
    <Wrapper id={'page-home'} className={'page'}>
      <Header />
      <MainContainer>
        <SearchContainer>
          <HeroTitle className="text-highlight">
            Hello, Totem!
          </HeroTitle>
          <p>
            Hi
          </p>
          {/*NOTE: When you navigate, use Link component instead of <a href=""/> */}
          <Link to={'/read'}>READ</Link>
        </SearchContainer>
        <Footer />
      </MainContainer>
    </Wrapper>
  );
};

export default HomePage;
