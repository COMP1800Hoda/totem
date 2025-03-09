// flipping animation from https://www.npmjs.com/package/page-flip

import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HTMLFlipBook from "react-pageflip";
import { ChevronLeft } from "lucide-react";
import {
  Container,
  TopNavBar,
  BottomNavBar,
  ReadingContainer,
  SliderContainer,
  Title,
  NavButton,
  PageIndicator,
  BottomNavButton
} from "./ReadPage.styled";
import samplePage1 from "../../assets/sample-page-1.jpg";
import samplePage2 from "../../assets/sample-page-2.jpg";
import samplePage3 from "../../assets/sample-page-3.jpg";
import samplePage4 from "../../assets/sample-page-4.jpg";

const ReadPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [showNav, setShowNav] = useState(false);
  const [isPortrait, setIsPortrait] = useState(window.innerWidth < 1024);

  const flipBookRef = useRef<HTMLDivElement>(null);

  const pageImages = [samplePage1, samplePage2, samplePage3, samplePage4];

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggleNav = () => setShowNav((prev) => !prev);

  const handlePageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, currentTarget } = e;
    const width = currentTarget.clientWidth;
    const clickX = clientX / width;

    if (clickX < 0.2) {
      setCurrentPage((prev) => Math.min(prev + 1, 4));
    } else if (clickX > 0.8) {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    } else {
      handleToggleNav();
    }
  };

  return (
    <Container>
      {showNav && (
        <TopNavBar>
          <NavButton onClick={() => navigate(`/books/${id}`)} style={{ background: "none", border: "none", color: "#8F857D" }}>
            <ChevronLeft size={30} />
          </NavButton>



          <Title>آدم برفي و مترسك</Title>
        </TopNavBar>
      )}

      <ReadingContainer onClick={handlePageClick}>
        <HTMLFlipBook
          ref={flipBookRef}
          width={isPortrait ? 700 : 600}
          height={isPortrait ? 700 : 800}
          size="fixed"
          minWidth={300}
          minHeight={400}
          maxWidth={isPortrait ? 700 : 800}
          maxHeight={isPortrait ? 900 : 1000}
          showCover={false}
          mobileScrollSupport={true}
          autoSize={false}
          className="flipbook"
          style={{}}
          startPage={0}
          drawShadow={true}
          flippingTime={1000}
          useMouseEvents={true}
          swipeDistance={30}
          clickEventForward={true}
          usePortrait={isPortrait}
          showPageCorners={true}
          startZIndex={0}
          maxShadowOpacity={0.5}
          disableFlipByClick={false}
        >
          {pageImages.map((image, index) => (
            <div key={index} className="page_stf__item">
              <img src={image} alt={`Page ${index + 1}`} />
            </div>
          ))}
        </HTMLFlipBook>
      </ReadingContainer>

      {showNav && (
        <BottomNavBar>
        <BottomNavButton onClick={() => setCurrentPage((prev) => Math.min(prev + 1, 4))}>
          بعدی
        </BottomNavButton>
      
        <SliderContainer>
          <input
            type="range"
            min="1"
            max="4"
            value={currentPage}
            onInput={(e) => {
              const value = Number((e.target as HTMLInputElement).value);
              setCurrentPage(value);
              (e.target as HTMLInputElement).style.setProperty(
                "--progress",
                `${((value - 1) / (pageImages.length - 1)) * 100}%`
              );
            }}
          />
          <PageIndicator>{currentPage}/4</PageIndicator>
        </SliderContainer>
      
        <BottomNavButton onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
          قبلی
        </BottomNavButton>
      </BottomNavBar>      
      )}
    </Container>
  );
};

export default ReadPage;
