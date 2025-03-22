import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import {
  ProfileContainer,
  TopNavBar,
  NavButton,
  Section,
  SectionTitle,
  TextBox,
  Button,
} from './changePassword.styled';

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();
  
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleSave = () => {
    if (newPassword === confirmPassword) {
      // Implement password change logic
      console.log('Password changed');
    } else {
      alert('Passwords do not match');
    }
  };
  
  return (
    <ProfileContainer>
      <TopNavBar>
        <NavButton onClick={() => navigate(-1)}>
          <ChevronLeft size={30} />
        </NavButton>
      </TopNavBar>

      <Section>
        <SectionTitle>Old Password</SectionTitle>
        <TextBox
          type="password"
          placeholder="Enter old password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </Section>

      <Section>
        <SectionTitle>New Password</SectionTitle>
        <TextBox
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </Section>

      <Section>
        <SectionTitle>Confirm New Password</SectionTitle>
        <TextBox
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Section>

      <Section>
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={() => navigate(-1)} cancel>
          Cancel
        </Button>
      </Section>
    </ProfileContainer>
  );
};

export default ChangePassword;
