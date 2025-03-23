import React from 'react';
import styled from "styled-components";
import {IconX} from "@tabler/icons-react";

interface AlertMessageProps {
  message: string;
  show: boolean;
  onClose?: () => void;
  type?: string;
}

const AlertContainer = styled.div`
  position: fixed;
  z-index: 9999;
  width: 96%;
  left: 2%;
  top:0;
  display: flex;
  >span{
    display: block;
    flex:1;
  }
  svg {
    cursor: pointer;
  }
`

const AlertMessage: React.FC<AlertMessageProps> = ({ message, show, onClose, type='warning' }) => {
  if (!show) {
    return ;
  }
  return (
    <AlertContainer className={`alert alert-${type} mt-3`} role="alert">
      <span>
        {message}
      </span>
      {onClose && (
        <IconX onClick={() => onClose()}/>
      )}
    </AlertContainer>
  );
};

export default AlertMessage;