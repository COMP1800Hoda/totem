import React, { useState } from "react";
import {
  MainContainer,
  Wrapper,
  ReadingContainer,
  TopNav,
  BottomNav,
  BookImage,
  ProgressBar,
} from "../../pages/read/ReadPage.styled.ts";
import { FaArrowLeft } from "react-icons/fa"; // Importing a back arrow icon
import samplePage from "../../assets/sample-page.jpg";

const ReadPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showNav, setShowNav] = useState(false);
  const totalPages = 32;

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  return (
    <Wrapper id={"page-home"} className={"page"}>
      <MainContainer>
        {/* Book Reading Section */}
        <ReadingContainer onClick={toggleNav}>
          <TopNav show={showNav}>
            <FaArrowLeft size={24} color="#333" style={{ cursor: "pointer" }} /> {/* Back Arrow Icon inside TopNav */}
            عنوان کتاب (Placeholder)
          </TopNav>

          {/* Set the book page placeholder image */}
          <BookImage src={samplePage} alt="Book Page" style={{ borderRadius: "0" }} />

          {/* <BottomNav show={showNav}>
            <button onClick={prevPage}>قبلی</button>
            <span>
              {currentPage}/{totalPages}
            </span>
            <button onClick={nextPage}>بعدی</button>
          </BottomNav> */}

          {/* Progress Bar now only shows when navigation is visible */}
          <ProgressBar
            type="range"
            min="1"
            max={totalPages}
            value={currentPage}
            onChange={(e) => setCurrentPage(Number(e.target.value))}
            show={showNav} // ✅ Pass the show prop correctly
          />

        </ReadingContainer>
      </MainContainer>
    </Wrapper>
  );
};

export default ReadPage;
