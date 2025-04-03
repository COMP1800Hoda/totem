import React, { useState, useEffect } from 'react';
import {
  SuceessContainer,
  SuccessHeader,
  Succestext,
  BookDetails,
  BookMeta,
  GobackButton,
  SuccessCard,
  IconCheckbox,
} from './success_style';
import { Header } from '../../components/header/Header.tsx';
import { useNavigate } from 'react-router';
import { checkTokenAndRedirect, getToken } from '../../utils/tokenUtils.js';

const SuccessPage: React.FC = () => {
  checkTokenAndRedirect(); // Check if the token is valid and redirect if not
  const navigate = useNavigate();
  //for JWT_authorization code
  const [isCheckingToken, setIsCheckingToken] = useState(true); // prevent rendering before token check

  //start of JWT_authorization code
  useEffect(() => {
    const checkToken = async () => {
      checkTokenAndRedirect();
      setIsCheckingToken(false); // Set to false after token check
    };
    checkToken();
  }, []);

  useEffect(() => {
    const token = getToken(); // Get the token from local storage
    fetch('https://totemchildrenstorybookadmin-1g9u4lon.b4a.run/success', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch success page');
        }
        return response.json();
      })
      .catch((error) => {
        console.log('Error:', error);
        navigate('/'); // Redirect to login if there's an error
      });
  });

  const [MetaData, setMetaData] = useState<any>({}); // State to store resolved metadata
  const [isLoading, setIsLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('Metadata') || '{}');
    console.log('Fetched Metadata:', data);
    setMetaData(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (Object.keys(MetaData || {}).length === 0) {
        console.log('No metadata found in local storage:', MetaData);
        navigate('/main');
      } else {
        console.log('Metadata found in local storage:', MetaData);
      }
    }
  }, [MetaData, navigate, isLoading]);

  if (isCheckingToken || isLoading) return null; // Prevent rendering UI until token check is complete
  //end of JWT_authorization code
  // localStorage.removeItem('Metadata'); // Clear metadata after use
  return (
    <SuceessContainer>
      <div>
        <Header />
      </div>
      <SuccessCard>
        <IconCheckbox>
          <IconCheckbox className="far fa-check-square" />
        </IconCheckbox>

        <SuccessHeader>
          <h2>Success</h2>
        </SuccessHeader>
        <Succestext>
          <p>Your story has been </p>
          <p>successfully uploaded!</p>
        </Succestext>
        <BookDetails>
          <BookMeta>Booktitle: {MetaData.bookTitle} </BookMeta>
          <BookMeta>BookId: {MetaData.bookId} </BookMeta>
        </BookDetails>
        <GobackButton onClick={() => navigate('/main')}>
          Go back to Home
        </GobackButton>
      </SuccessCard>
    </SuceessContainer>
  );
};
export default SuccessPage;
