import React from 'react';
import { Header } from '../../components/header/Header';  // Adjust the import paths as needed
import Footer from '../../components/footer/Footer';
import { ProfileContainer } from './ProfilePage.styled';

const ProfilePage: React.FC = () => {
     return (
    <ProfileContainer>
      <Header />
        <div style={{ padding: '20px', marginTop: '80px', textAlign: 'center' }}>
        <h1>This is the Profile Page with a header and footer.</h1>
        </div>
        <Footer />
    </ProfileContainer>
  );

};

export default ProfilePage;
