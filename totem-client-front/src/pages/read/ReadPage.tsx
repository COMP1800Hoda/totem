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
import { SearchContainer } from "../../components/header/Header.styled.ts";
import { Link } from "react-router";
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
        <SearchContainer>
          <Link to={"/"}>
            <FaArrowLeft size={24} color="#333" /> {/* Back Arrow Icon */}
          </Link>
        </SearchContainer>

        {/* Book Reading Section */}
        <ReadingContainer onClick={toggleNav}>
          <TopNav show={showNav}>عنوان کتاب (Placeholder)</TopNav>

          {/* Set the book page placeholder image */}
          <BookImage src={samplePage} alt="Book Page" />

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