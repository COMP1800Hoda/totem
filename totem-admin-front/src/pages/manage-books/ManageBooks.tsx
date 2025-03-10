import { Form } from 'react-bootstrap';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Header } from '../../components/header/Header.tsx';
import { Container } from '../../components/Container.tsx';
import { MainTitle } from '../../components/text/MainTitle.tsx';
// import { SearchContainer } from './ManageBooks.styled.ts';
import { ManageBookTable } from '../../components/table/manage-book-table/ManageBookTable.tsx';
import { SearchContainer } from './ManageBooks.styled.ts';

export const ManageBooks = () => {
  const queryClient = new QueryClient();
  return (
    <div id={'page-manage-books'} className={'page'}>
      <Header />
      <div id="top-container">
        <Container>
          <MainTitle text={`Manage Books`} />
          <SearchContainer>
            <Form.Select size={'sm'} aria-label="select search type" defaultValue={"title"}>
              <option value="title">Title</option>
              <option value="bookid">Book ID</option>
              <option value="genre">Genre</option>
              <option value="contributed">Contributed by</option>
            </Form.Select>
            <Form.Control size="sm" type="text" placeholder="Search by keywords" />
          </SearchContainer>
        </Container>
      </div>
      <div id="table-container">
        <QueryClientProvider client={queryClient}>
          <ManageBookTable/>
        </QueryClientProvider>
      </div>
    </div>
  );
};

export default ManageBooks;
