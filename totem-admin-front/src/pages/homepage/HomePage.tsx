import { Header } from '../../components/header/Header.tsx';
import { Container } from '../../components/Container.tsx';
import { MainTitle } from '../../components/text/MainTitle.tsx';
import { Menu } from '../../components/menu/Menu.tsx';

export const HomePage = () => {
  const username = 'admin';
  return (
    <div id={'page-home'} className={'page'}>
      <Header />
      <Container style={{margin: '0 auto'}}>
        <MainTitle text={`Welcome, ${username}`} />
        <Menu />
      </Container>
    </div>
  );
};

export default HomePage;
