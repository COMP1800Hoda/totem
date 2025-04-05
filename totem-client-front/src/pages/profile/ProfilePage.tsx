import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { 
  ProfileContainer,  
  TopNavBar, 
  NavButton, 
  Section, 
  SectionTitle, 
  SectionContent, 
  Divider, 
  SettingsRow, 
  Footer,
  Content
} from './ProfilePage.styled';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ProfileContainer>
      <TopNavBar>
        <NavButton onClick={() => navigate(-1)}>
          <ChevronLeft size={30} />
        </NavButton>
      </TopNavBar>

      <Content>
        <Section>
          <SectionTitle>Name:</SectionTitle>
          <SectionContent>Sample Name</SectionContent>
        </Section>
        <Divider />

        <Section>
          <SectionTitle>Email and Username:</SectionTitle>
          <SectionContent>sample@email.com</SectionContent>
        </Section>
        <Divider />

        <br />
        <br />

        <SectionTitle>Edit Account</SectionTitle>
        <Divider />
        <SettingsRow onClick={() => navigate('/change-password')}> {/* Navigate to ChangePassword page */}
          <SectionContent>Change Password</SectionContent>
          <ChevronLeft size={28} style={{ transform: 'rotate(180deg)' }} />
        </SettingsRow>
        <Divider />

        <br />
        <br />

        <SectionTitle>Account Settings</SectionTitle>
        <Divider />

        <SettingsRow>
          <SectionContent>Log Out</SectionContent>
          <ChevronLeft size={28} style={{ transform: 'rotate(180deg)' }} />
        </SettingsRow>
        <Divider />
      </Content>
      <br />
      <br />

      <Footer>© 2025 Totem</Footer>
    </ProfileContainer>
  );
};

export default ProfilePage;
