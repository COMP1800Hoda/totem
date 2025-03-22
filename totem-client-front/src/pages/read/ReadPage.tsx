// src/components/ReadPage/ReadPage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBookData } from "./FetchBookData";
import { usePageNavigation } from "./UsePageNavigation";
import { OnePageLayout } from "./OnePageLayout";
import { TwoPageLayout } from "./TwoPageLayout";
import { NavBars } from "./NavBars";
import { Container, ReadingContainer } from "./ReadPage.styled";

const ReadPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { book, pages, loading, error } = useBookData(id || "");
  const {
    currentPage,
    isFlipping,
    handlePageChange,
    handleFlipStart,
    handleFlipEnd,
  } = usePageNavigation(pages.length);
  const [showNav, setShowNav] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 900);
  const [nextPage, setNextPage] = useState<Page | null>(null);
  const [transitionDirection, setTransitionDirection] = useState<
    "forward" | "backward"
  >("forward");

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
    const { clientX, currentTarget } = e;
    const clickX = clientX / currentTarget.clientWidth;

    if (clickX < 0.3 && currentPage > 1) {
      // Clicked on the left side (30% of the screen)
      setTransitionDirection("backward");
      setNextPage(pages[currentPage - 2]);
      setTimeout(() => {
        handlePageChange(currentPage - 1);
        setNextPage(null);
      }, 500);
    } else if (clickX > 0.7 && currentPage < pages.length) {
      // Clicked on the right side (70% of the screen)
      setTransitionDirection("forward");
      setNextPage(pages[currentPage]);
      setTimeout(() => {
        handlePageChange(currentPage + 1);
        setNextPage(null);
      }, 500);
    } else {
      // Clicked in the middle, toggle navigation bars
      toggleNav();
    }
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
        onPageChange={handlePageChange}
        isFlipping={isFlipping}
      />

      {isWideScreen ? (
        <TwoPageLayout
          pages={pages}
          onFlip={handlePageChange}
          onFlipEnd={handleFlipEnd}
        />
      ) : (
        <OnePageLayout
          page={pages[currentPage - 1]}
          nextPage={nextPage}
          transitionDirection={transitionDirection}
          onPageClick={handleOnePageClick}
        />
      )}
    </Container>
  );
};

export default ReadPage;