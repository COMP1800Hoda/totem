import styled from "styled-components";
import { COLORS } from "../../constants/colors";

export const PageContainer = styled.div`
  position: relative;  // Add this for positioning context
  text-align: center;
  min-height: 100vh;
  padding-top: 80px;  // Add space for header
  color: ${COLORS.Darkest};
  background-color: ${COLORS.Lightest};
`;

export const AudioPlayer = styled.audio`
  width: 100%;
  max-width: 400px;
  margin: 20px auto;
  border-radius: 10px;

  /* Apply styles to WebKit-based browsers */
  &::-webkit-media-controls-panel {
    background-color: ${COLORS.Light};
    border-radius: 10px;
  }
`;

export const BackButton = styled.button`
  position: fixed;  // Changed from static to absolute
  top: 15px;         // Position from top
  left: 20px;        // Position from left
  z-index: 100;      // Higher than header
  display: flex;
  align-items: center;
  gap: 0.5em;
  color: ${COLORS.Dark}; 
  background: ${COLORS.Lightest};
  border: none;
  cursor: pointer;
  font-size: 1em;
  transition: all 0.3s ease;

`;

// Add these new components for better structure
export const AudioCover = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 8px;
  object-fit: cover;
  margin: 0 auto 20px;
`;

export const AudioTitle = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${COLORS.Darkest};
`;

export const AudioMeta = styled.div`
  color: ${COLORS.Dark};
  margin-bottom: 2rem;
  font-size: 0.9rem;
`;