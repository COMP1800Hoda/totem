import { Form } from 'react-bootstrap';

import { Header } from '../../components/header/Header.tsx';
import { Container } from '../../components/Container.tsx';
import { MainTitle } from '../../components/text/MainTitle.tsx';
import { SearchContainer } from './ManageBooks.styled.ts';

export const ManageBooks = () => {
  return (
    <div id={'page-manage-books'} className={'page'}>
      <Header />
      <div id="top-container" className={"container-mb"}>
        <Container>
          <MainTitle text={`Manage Books`} />
          <SearchContainer>
            <Form.Select size={'sm'} aria-label="select search type" defaultValue={"title"}>
              <option value="title">Title</option>
              <option value="bookid">Book ID</option>
              <option value="genre">Genre</option>
              <option value="contributed">Contributed by</option>
            </Form.Select>
            <Form.Control size="sm" type="text" placeholder="Large text" />
          </SearchContainer>

        </Container>

      </div>
    </div>
  );
};

export default ManageBooks;
