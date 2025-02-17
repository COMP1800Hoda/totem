import React, { useState } from "react";
import { 
  Container, 
  TopNavBar, 
  BottomNavBar, 
  ReadingContainer, 
  SliderContainer, 
  Title, 
  NavButton, 
  PageIndicator 
} from "./ReadPage.styled";
import samplePage1 from "../../assets/sample-page-1.jpg";
import samplePage2 from "../../assets/sample-page-2.jpg";
import samplePage3 from "../../assets/sample-page-3.jpg";
import samplePage4 from "../../assets/sample-page-4.jpg";

const ReadPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showNav, setShowNav] = useState(false);

  // Pages in right-to-left order
  const pageImages = [samplePage1, samplePage2, samplePage3, samplePage4];

  // Toggle nav bar visibility when clicking the middle 60% of the screen
  const handleToggleNav = () => setShowNav((prev) => !prev);

  // Handle clicks on left (Next) and right (Previous)
  const handlePageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, currentTarget } = e;
    const width = currentTarget.clientWidth;
    const clickX = clientX / width;

    if (clickX < 0.2) {
      // Left 20% → Next Page
      setCurrentPage((prev) => Math.min(prev + 1, 4));
    } else if (clickX > 0.8) {
      // Right 20% → Previous Page
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    } else {
      // Middle 60% → Toggle Navbar
      handleToggleNav();
    }
  };

  return (
    <Container>
      {/* 🔹 Top Navigation Bar */}
      {showNav && (
        <TopNavBar>
          <NavButton onClick={() => console.log("Back Clicked")}>🔙</NavButton>
          <Title>آدم برفي و مترسك</Title>
        </TopNavBar>
      )}

      {/* 🔹 Reading Page */}
      <ReadingContainer onClick={handlePageClick}>
        <img src={pageImages[currentPage - 1]} alt={`Page ${currentPage}`} />
      </ReadingContainer>

      {/* 🔹 Bottom Navigation Bar */}
      {showNav && (
        <BottomNavBar>
          <NavButton onClick={() => setCurrentPage((prev) => Math.min(prev + 1, 4))}>بعدی</NavButton>

          {/* 🔹 Slider */}
          <SliderContainer>
            
            <input 
              type="range" 
              min="1" 
              max="4" 
              value={currentPage} 
              onInput={(e) => setCurrentPage(Number((e.target as HTMLInputElement).value))} 
            />
            <PageIndicator>4/{currentPage}</PageIndicator>
          </SliderContainer>

          
          <NavButton onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>قبلی</NavButton>
        </BottomNavBar>
      )}
    </Container>
  );
};

export default ReadPage;
