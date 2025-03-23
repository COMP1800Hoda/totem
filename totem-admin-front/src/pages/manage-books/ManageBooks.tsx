import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Header } from '../../components/header/Header.tsx';
import { ManageBookTable } from '../../components/table/manage-book-table/ManageBookTable.tsx';

export const ManageBooks = () => {
  const queryClient = new QueryClient();
  return (
    <div id={'page-manage-books'} className={'page'}>
      <Header />
      <QueryClientProvider client={queryClient}>
        <ManageBookTable/>
      </QueryClientProvider>
    </div>
  );
};

export default ManageBooks;
