import styled from "styled-components";
import { COLORS } from "../../constants/colors";

export const PageContainer = styled.div`
  text-align: center;
  padding: 20px;
  margin-top: 55px;
  min-height: 100vh;
  color: ${COLORS.Darkest};
  background-color: ${COLORS.Lightest};
`;

export const AudioPlayer = styled.audio`
  width: 100%;
  max-width: 400px;
  border-radius: 10px;

  /* Apply styles to WebKit-based browsers */
  &::-webkit-media-controls-panel {
    background-color: ${COLORS.Light}; /* Change to desired color */
    border-radius: 10px;
  }
`;
