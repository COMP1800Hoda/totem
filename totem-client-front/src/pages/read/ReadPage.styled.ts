import { COLORS } from '../../constants/colors.ts';
import styled, { keyframes } from "styled-components";

const slideOutLeft = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

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
  background-color: ${COLORS.Lightest};
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
  background: ${COLORS.Lightest};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3% 0 2%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 50;
`;

/* 🔹 Bottom Navigation Bar */
export const BottomNavBar = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 10%;
  background: ${COLORS.Lightest};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4%;
  box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.1);
  z-index: 50;
`;

/* 🔹 Navigation Button */
export const NavButton = styled.button`
  background: none;
  border: none;
  color: ${COLORS.Dark};
  cursor: pointer;
`;

/* 🔹 Bottom Navigation Button */
export const BottomNavButton = styled.button`
  background: linear-gradient(to bottom, #DECBB7, #BFA88F); /*  Gradient for depth */
  color: ${COLORS.Darkest};
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  padding: 10px 24px;
  border-radius: 12px;
  transition: all 0.2s ease-in-out;
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.2); /*  Raised shadow */
  border: none; /*  Removed outline */

  &:hover {
    background: linear-gradient(to bottom, #CBB8A6, #A8937E); /*  Slightly darker gradient */
  }

  &:active {
    transform: translateY(3px); /*  Moves button down to simulate pressing */
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2); /*  Smaller shadow when pressed */
  }
`;

/* 🔹 Bottom Navigation Button */
// 2D style next and previous buttons with solid color and border
// export const BottomNavButton = styled.button`
//   background-color: #DECBB7; /*  Solid background */
//   border: 1px solid ${COLORS.Darkest}; /*  No outline */
//   color: ${COLORS.Darkest}; /*  Text color */
//   font-size: 16px;
//   font-weight: bold;
//   cursor: pointer;
//   padding: 8px 20px;
//   border-radius: 12px; /*  Rounded corners */
//   transition: background 0.3s ease;

//   &:hover {
//     background-color: #CBB8A6; /*  Slightly darker shade on hover */
//   }

//   &:active {
//     background-color: #BFA890; /*  Darker shade when clicked */
//   }
// `;


/* 🔹 Book Title */
export const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: ${COLORS.Dark}; /*  Updated text color */
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

   .page_stf__item {
      padding: 0 !important;  /* Remove padding */
      margin: 0 !important;   /* Ensure no extra margins */
      left: 0 !important;     /* Remove left offset */
      top: 0 !important;      /* Remove top offset */
      bottom: 0 !important;   /*  Remove bottom offset */
      position: absolute !important; /*  Keep positioning intact */
      width: 100% !important; /*  Ensure full width */
      height: 100% !important; /*  Ensure full height */
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;

  .page-container.slide-out-left {
    animation: ${slideOutLeft} 0.5s ease-in-out; /* Slide out left animation */
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
    background: linear-gradient(to left, ${COLORS.Dark} var(--progress, 0%), #DECBB7 var(--progress, 0%));
    transition: background 0.3s ease;
  }

  input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${COLORS.Dark};
    cursor: pointer;
    position: relative;
    z-index: 2;
  }

  input::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${COLORS.Dark};
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
  color: ${COLORS.Dark}; /*  Updated color */
`;
