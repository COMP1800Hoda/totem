import styled from "styled-components";
import { COLORS } from "../../constants/colors";

export const PageContainer = styled.div`
  text-align: center;
  padding: 20px;
  margin-top: 80px;
  color: ${COLORS.Darkest};
`;

export const AudioPlayer = styled.audio`
  width: 100%;
  max-width: 400px;
  margin-top: 15px;
  background-color: ${COLORS.Primary}; /* Customize */
  border-radius: 10px;
`;

export const AudioContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${COLORS.Light}; /* Customize */
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;
