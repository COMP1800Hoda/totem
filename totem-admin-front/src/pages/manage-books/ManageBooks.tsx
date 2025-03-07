import { Header } from '../../components/header/Header.tsx';
import { Container } from '../../components/Container.tsx';
import { MainTitle } from '../../components/text/MainTitle.tsx';

export const ManageBooks = () => {
  return (
    <div id={'page-manage-books'} className={'page'}>
      <Header />
      <Container>
        <MainTitle text={`Manage Books`} />
      </Container>
    </div>
  );
};

export default ManageBooks;
