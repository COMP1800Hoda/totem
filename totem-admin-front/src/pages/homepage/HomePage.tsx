import { Header } from '../../components/header/Header.tsx';
import { Container } from '../../components/Container.tsx';
import { MainTitle } from '../../components/text/MainTitle.tsx';
import { Menu } from '../../components/menu/Menu.tsx';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  checkTokenAndRedirect,
  getToken,
} from '../../components/utils/tokenUtils.js';

export const HomePage = () => {
  checkTokenAndRedirect();
  const username = 'admin';
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isCheckingToken, setIsCheckingToken] = useState(true); // prevent rendering before token check

  useEffect(() => {
    const checkToken = async () => {
      await checkTokenAndRedirect();
      setIsCheckingToken(false); // Set to false after token check
    };
  }, []);

  useEffect(() => {
    if (isCheckingToken) return; // Prevent rendering until token check is complete
    const token = getToken(); // Get the token from local storage

    fetch('http://localhost:8080/main', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch admins');
        }
        return response.json();
      })
      .catch((error) => {
        setError(error.message);
        console.log('Error:', error);
      });
  }, [isCheckingToken]);

  //Check if the token is being checked or if there is an error
  // if (isCheckingToken) return null; // Prevent rendering UI until token check is complete
  if (error) navigate('/'); // Redirect to login if there's an error

  return (
    <div id={'page-home'} className={'page'}>
      <Header />
      <Container>
        <MainTitle text={`Welcome, ${username}`} />
        <Menu />
      </Container>
    </div>
  );
};

export default HomePage;
