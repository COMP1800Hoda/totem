// src/components/ReadPage/ReadPage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBookData } from "./FetchBookData";
import { usePageNavigation } from "./UsePageNavigation";
import { OnePageLayout } from "./OnePageLayout";
import { TwoPageLayout } from "./TwoPageLayout";
import { NavBars } from "./NavBars";
import { Container } from "./ReadPage.styled";

const ReadPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { book, pages, loading, error } = useBookData(id || "");
  const {
    currentPage,
    isFlipping,
    handlePageChange,
    handleFlipEnd,
  } = usePageNavigation(pages.length);
  const [showNav, setShowNav] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 900);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 900);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleNav = () => {
    setShowNav((prev) => !prev);
  };

  const handleOnePageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Toggle navigation bars on click
    toggleNav();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container>
      <NavBars
        showNav={showNav}
        bookTitle={book?.storybook_title}
        currentPage={currentPage}
        totalPages={pages.length}
        onBack={() => navigate(`/books/${id}`)}
        onPageChange={(newPage) => handlePageChange(newPage, isWideScreen)} // Pass isWideScreen
        isFlipping={isFlipping}
        isTwoPageLayout={isWideScreen}
      />

      {isWideScreen ? (
        <TwoPageLayout
          pages={pages}
          onFlip={(newPage) => handlePageChange(newPage, true)} // Pass true for two-page layout
          onFlipEnd={handleFlipEnd}
          onPageClick={handleOnePageClick}
        />
      ) : (
        <OnePageLayout pages={pages} onPageClick={handleOnePageClick} />
      )}
    </Container>
  );
};

export default ReadPage;