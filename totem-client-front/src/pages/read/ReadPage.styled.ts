import styled, { keyframes } from "styled-components";

// Define the slide-in animations
const slideInForward = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
`;

const slideInBackward = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
`;

/* 🔹 Main Container */
export const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #f8f0e9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

/* 🔹 Top Navigation Bar */
export const TopNavBar = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 8%;
  background: #f8f0e9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3% 0 2%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

/* 🔹 Bottom Navigation Bar */
export const BottomNavBar = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 10%;
  background: #f8f0e9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4%;
  box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.1);
`;

/* 🔹 Navigation Button */
export const NavButton = styled.button`
  background: none;
  border: none;
  color: #8f857d;
  cursor: pointer;
`;

/* 🔹 Bottom Navigation Button */
export const BottomNavButton = styled.button`
  background: linear-gradient(to bottom, #decbb7, #bfa88f);
  color: #5c5552;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  padding: 10px 24px;
  border-radius: 12px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: linear-gradient(to bottom, #cbb8a6, #a8937e);
  }

  &:active {
    transform: translateY(3px);
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  }
`;

/* 🔹 Book Title */
export const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #8f857d;
`;

/* 🔹 Reading Page */
export const ReadingContainer = styled.div`
  position: absolute;
  top: 8%;
  bottom: 10%;
  width: 100%;
  height: calc(100vh - 18%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;

  .page-container {
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    transition: transform 0.5s ease-in-out; /* Smooth transition */
  }

  .page-container.slide-in-forward {
    animation: ${slideInForward} 0.5s ease-in-out; /* Slide in forward animation */
  }

  .page-container.slide-in-backward {
    animation: ${slideInBackward} 0.5s ease-in-out; /* Slide in backward animation */
  }
`;

/* 🔹 Slider Container */
export const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
  direction: rtl;

  input {
    width: 100%;
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
    height: 6px;
    border-radius: 5px;
    outline: none;
    background: linear-gradient(to left, #8f857d var(--progress, 0%), #decbb7 var(--progress, 0%));
    transition: background 0.3s ease;
  }

  input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #8f857d;
    cursor: pointer;
    position: relative;
    z-index: 2;
  }

  input::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #8f857d;
    cursor: pointer;
    position: relative;
    z-index: 2;
  }
`;

/* 🔹 Page Indicator */
export const PageIndicator = styled.span`
  margin-right: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #8f857d;
`;