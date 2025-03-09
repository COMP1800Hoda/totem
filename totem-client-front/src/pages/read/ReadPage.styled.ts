import styled from "styled-components";

/* 🔹 Main Container */
export const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #F8F0E9;
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
  background: #F8F0E9;
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
  background: #F8F0E9;
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
  color: #8F857D;
  cursor: pointer;
`;

/* 🔹 Bottom Navigation Button */
// 3D style next and previous buttons with gradient and shadow
export const BottomNavButton = styled.button`
  background: linear-gradient(to bottom, #DECBB7, #BFA88F); /* ✅ Gradient for depth */
  color: #5C5552;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  padding: 10px 24px;
  border-radius: 12px;
  transition: all 0.2s ease-in-out;
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.2); /* ✅ Raised shadow */
  border: none; /* ✅ Removed outline */

  &:hover {
    background: linear-gradient(to bottom, #CBB8A6, #A8937E); /* ✅ Slightly darker gradient */
  }

  &:active {
    transform: translateY(3px); /* ✅ Moves button down to simulate pressing */
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2); /* ✅ Smaller shadow when pressed */
  }
`;

/* 🔹 Bottom Navigation Button */
// 2D style next and previous buttons with solid color and border
// export const BottomNavButton = styled.button`
//   background-color: #DECBB7; /* ✅ Solid background */
//   border: 1px solid #5C5552; /* ✅ No outline */
//   color: #5C5552; /* ✅ Text color */
//   font-size: 16px;
//   font-weight: bold;
//   cursor: pointer;
//   padding: 8px 20px;
//   border-radius: 12px; /* ✅ Rounded corners */
//   transition: background 0.3s ease;

//   &:hover {
//     background-color: #CBB8A6; /* ✅ Slightly darker shade on hover */
//   }

//   &:active {
//     background-color: #BFA890; /* ✅ Darker shade when clicked */
//   }
// `;




/* 🔹 Book Title */
export const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: #8F857D; /* ✅ Updated text color */
`;


/* 🔹 Reading Page */
export const ReadingContainer = styled.div`
  position: absolute;
  top: 8%;
  bottom: 10%;
  width: 100%;
  height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;

  .flipbook {
    width: 100%;
    height: 100%;
    object-fit: cover;
    max-width: 100vw;
    max-height: 100vh;
  }

   .page_stf__item {
      padding: 0 !important;  /* ✅ Remove padding */
      margin: 0 !important;   /* ✅ Ensure no extra margins */
      left: 0 !important;     /* ✅ Remove left offset */
      top: 0 !important;      /* ✅ Remove top offset */
      bottom: 0 !important;   /* ✅ Remove bottom offset */
      position: absolute !important; /* ✅ Keep positioning intact */
      width: 100% !important; /* ✅ Ensure full width */
      height: 100% !important; /* ✅ Ensure full height */
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
  }



  img {
    width: 100%;
    height: 100%;
    object-fit: contain !important;
  }
`;

/* 🔹 Flipbook Page Container */
export const Page = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
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
    background: linear-gradient(to left, #8F857D var(--progress, 0%), #DECBB7 var(--progress, 0%));
    transition: background 0.3s ease;
  }

  input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #8F857D;
    cursor: pointer;
    position: relative;
    z-index: 2;
  }

  input::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #8F857D;
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
  color: #8F857D; /* ✅ Updated color */
`;
