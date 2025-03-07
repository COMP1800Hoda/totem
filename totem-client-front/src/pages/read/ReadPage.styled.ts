import styled from "styled-components";

/* 🔹 Main Container */
export const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* ✅ Prevents overflow */
`;

/* 🔹 Top Navigation Bar */
export const TopNavBar = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 8%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

/* 🔹 Bottom Navigation Bar */
export const BottomNavBar = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 10%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.1);
`;

/* 🔹 Navigation Button */
export const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: black;
  padding: 8px 16px;

  &:hover {
    opacity: 0.7;
  }
`;

/* 🔹 Book Title */
export const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  color: black;
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
  overflow: hidden; /* ✅ Ensures no extra space */
  
  .flipbook {
    width: 100%;
    height: 100%;
  }

  img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
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
  }
`;

/* 🔹 Page Indicator */
export const PageIndicator = styled.span`
  margin-right: 10px;
  font-size: 16px;
  font-weight: bold;
  color: black;
`;
