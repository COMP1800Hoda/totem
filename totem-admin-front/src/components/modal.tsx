import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 1.2em;
  border-radius: 0.5em;
  max-width: 25em;
  width: 100%;
  box-shadow: 0 0.125em 0.7em rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  text-align: center;
  background: var(--color-primary);
  color: white;
  border: none;
  padding: 0.5em 1em;
  border-radius: 0.25em;
  cursor: pointer;
  margin-top: 1em;
  &:hover {
    background: var(--color-primary-hover);
  }
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className: string | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, className ='' }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent className={className || ''}>
        {children}
        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;