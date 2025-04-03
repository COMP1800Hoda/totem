import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Header } from '../../components/header/Header.tsx';
import { ManageBookTable } from '../../components/table/manage-book-table/ManageBookTable.tsx';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkTokenAndRedirect, getToken } from '../../utils/tokenUtils.js';

const ManageBooks = () => {
  checkTokenAndRedirect();
  const queryClient = new QueryClient();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isCheckingToken, setIsCheckingToken] = useState(true); // prevent rendering before token check

  useEffect(() => {
    const checkToken = async () => {
      checkTokenAndRedirect();
      setIsCheckingToken(false); // Set to false after token check
    };
    checkToken();
  }, []);

  useEffect(() => {
    if (isCheckingToken) return; // Prevent rendering until token check is complete

    const token = getToken(); // Get the token from local storage

    // Log the token only once when the component is mounted

    fetch('https://totemadmin-fkrivn3y.b4a.run/manage-books', {
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
  }, [isCheckingToken]); // Ensure useEffect runs only on mount

  //Check if the token is being checked or if there is an error
  if (isCheckingToken) return null; // Prevent rendering UI until token check is complete
  if (error) navigate('/'); // Redirect to login if there's an error

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
