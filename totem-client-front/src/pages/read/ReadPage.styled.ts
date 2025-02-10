import styled from "styled-components";
import { Button } from "react-bootstrap";
import { Container } from "../../components/Container.tsx";

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-bottom: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fdf6e3; /* Light beige background for a book-like feel */
`;

export const MainContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1000px;
  position: relative;
`;

/* 🔹 Book Reading Section */
export const ReadingContainer = styled.div`
  position: relative;
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding-top: 50px; /* Ensure top nav does not overlap */
  padding-bottom: 50px; /* Ensure bottom nav does not overlap */
`;

/* 🔹 Navigation Bars */
export const TopNav = styled.div<{ show: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 15px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 1.2rem;
  display: ${(props) => (props.show ? "flex" : "none")};
  align-items: center;
  justify-content: space-between;
`;

/* 🔹 Back Arrow Icon */
export const BackButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

/* 🔹 Bottom Navigation */
export const BottomNav = styled.div<{ show: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  display: ${(props) => (props.show ? "flex" : "none")};

  button {
    background-color: #ffcc00;
    border: none;
    padding: 8px 12px;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 5px;
  }
`;

/* 🔹 Book Page Image */
export const BookImage = styled.img`
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 0; /* Removed corner radius */
`;

/* 🔹 Progress Bar */
export const ProgressBar = styled.input<{ show: boolean }>`
  width: 100%;
  position: absolute;
  bottom: -25px; /* Adjusted to avoid overlapping */
  background: transparent;
  cursor: pointer;
  display: ${(props) => (props.show ? "block" : "none")}; /* FIX: Add type for show */

  &::-webkit-slider-runnable-track {
    height: 5px;
    background: #ffcc00;
    border-radius: 2px;
  }

  &::-webkit-slider-thumb {
    width: 12px;
    height: 12px;
    background: white;
    border-radius: 50%;
    cursor: pointer;
  }
`;


export const HeroTitle = styled.h2`
  font-size: 2rem;

  & p {
    font-size: 1.5rem;
  }
`;
