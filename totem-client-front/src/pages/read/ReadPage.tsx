import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBookData } from "./FetchBookData";
import { NavBars } from "./NavBars";
import { OnePageLayout } from "./OnePageLayout";
import { TwoPageLayout } from "./TwoPageLayout";
import { Container } from "./ReadPage.styled";

const ReadPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { book, pages, loading, error } = useBookData(id || "");
  const [currentPage, setCurrentPage] = useState(1);
  const [showNav, setShowNav] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 900);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 900);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleNav = useCallback(() => {
    setShowNav((prev) => !prev);
  }, []);

  const handlePageClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const clickX = e.clientX;
    const windowWidth = window.innerWidth;
    const middleStart = windowWidth * 0.3; // 30% from left
    const middleEnd = windowWidth * 0.7; // 70% from left (middle 40%)

    if (clickX > middleStart && clickX < middleEnd) {
      toggleNav();
    }
  }, [toggleNav]);

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
        onPageChange={setCurrentPage}
        isTwoPageLayout={isWideScreen}
      />

      {isWideScreen ? (
        <TwoPageLayout
          pages={pages}
          currentPage={currentPage}
          onFlip={setCurrentPage}
          onPageClick={handlePageClick}
        />
      ) : (
        <OnePageLayout
          pages={pages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onPageClick={handlePageClick}
        />
      )}
    </Container>
  );
};

export default ReadPage;