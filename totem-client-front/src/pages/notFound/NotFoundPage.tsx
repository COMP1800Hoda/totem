import { Header } from '../../components/header/Header.tsx';
import { Container } from '../../components/Container.tsx';

export const NotFoundPage = () => {
  return (
    <div id={'page-notfound'} className={'page'}>
      <Header />
      <Container>
        404 not found
      </Container>
    </div>
  );
};

export default NotFoundPage;
