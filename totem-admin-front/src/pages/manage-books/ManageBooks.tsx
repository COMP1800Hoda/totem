import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from '../../components/header/Header.tsx';
import { ManageBookTable } from '../../components/table/manage-book-table/ManageBookTable.tsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  checkTokenAndRedirect,
  getToken,
} from '../../components/utils/tokenUtils.js';

const ManageBooks = () => {
  checkTokenAndRedirect();
  const queryClient = new QueryClient();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    //check token expiration using the utility function
    console.log('manage book1');
    checkTokenAndRedirect();

    console.log('manage book2');

    const token = getToken(); // Get the token from local storage

    // Log the token only once when the component is mounted

    if (!token) {
      navigate('/'); // Redirect if there's no token
      return;
    }

    fetch('http://localhost:8080/manage-books', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        return response.json();
      })
      .catch((error) => {
        setError(error.message);
        console.error('Error:', error);
      });
  }, [navigate]); // Ensure useEffect runs only on mount

  if (error) {
    return;
  }

  return (
    <div id={'page-manage-books'} className={'page'}>
      <Header />
      <QueryClientProvider client={queryClient}>
        <ManageBookTable />
      </QueryClientProvider>
    </div>
  );
};

export default ManageBooks;
