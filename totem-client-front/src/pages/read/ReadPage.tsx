// src/components/ReadPage/ReadPage.tsx
import React, { useState, useEffect } from "react";
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
  const [currentPage, setCurrentPage] = useState(1); // Lift currentPage state here
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
        onPageChange={setCurrentPage} // Pass setCurrentPage to NavBars
        isTwoPageLayout={isWideScreen}
      />

      {isWideScreen ? (
        <TwoPageLayout
        pages={pages}
        currentPage={currentPage} // Pass currentPage as a prop
        onFlip={setCurrentPage} // Pass setCurrentPage to update currentPage
        onFlipEnd={() => {}} // Optional: Add logic for flip end
        onPageClick={handleOnePageClick}
        />
      ) : (
        <OnePageLayout
          pages={pages}
          currentPage={currentPage} // Pass currentPage as a prop
          onPageChange={setCurrentPage} // Pass setCurrentPage to OnePageLayout
          onPageClick={handleOnePageClick}
        />
      )}
    </Container>
  );
};

export default ReadPage;