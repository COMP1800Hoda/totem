import { Header } from '../../components/header/Header.tsx';
import { Container } from '../../components/Container.tsx';
import { MainTitle } from '../../components/text/MainTitle.tsx';
import { Menu } from '../../components/menu/Menu.tsx';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { checkTokenAndRedirect, getToken } from '../../utils/tokenUtils.js';

export const HomePage = () => {
  checkTokenAndRedirect();
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('admin'); // Initialize username state
  const [error, setError] = useState<string | null>(null);
  const [isCheckingToken, setIsCheckingToken] = useState(true); // prevent rendering before token check
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false); // Initialize isSuperAdmin state

  useEffect(() => {
    const checkToken = async () => {
      await checkTokenAndRedirect();
      setIsCheckingToken(false); // Set to false after token check
    };
    checkToken();
  }, []);

  useEffect(() => {
    if (isCheckingToken) return; // Prevent rendering until token check is complete
    const token = getToken(); // Get the token from local storage

    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const userName = decodedToken?.email;
        setUsername(userName || 'admin'); // Set the username state
        const superAdmin = decodedToken?.adminRole === 'Super Admin'; // Check if the user is a super admin
        setIsSuperAdmin(superAdmin);
        // Get the role from the decoded token
      } catch (error) {
        console.log('Error decoding token:', error);
        navigate('/'); // Redirect to login if token decoding fails
      }

      fetch('https://totemchildrenstorybookadmin-1g9u4lon.b4a.run/main', {
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
    } else {
      console.log('No token found in local storage');
      setError('No token found'); // Handle case where token is not found
      navigate('/'); // Redirect to login if no token is found
    }
  }, [isCheckingToken]);

  //Check if the token is being checked or if there is an error
  if (isCheckingToken) return null; // Prevent rendering UI until token check is complete
  if (error) navigate('/'); // Redirect to login if there's an error
  return (
    <div id={'page-home'} className={'page'}>
      <Header />
      <Container style={{ margin: '0 auto' }}>
        <MainTitle text={`Welcome, ${username}`} />
        <Menu isSuperAdmin={isSuperAdmin} />
      </Container>
    </div>
  );
};

export default HomePage;
