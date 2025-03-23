// src/components/ReadPage/OnePageLayout.tsx
import React, { useState } from "react";
import { Page } from "./BookTypes";
import { ReadingContainer } from "./ReadPage.styled";

interface OnePageLayoutProps {
  pages: Page[];
  onPageClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

// Books in the database are stored in an incorrect order.
const reorderPages = (pages: Page[]): Page[] => {
  const reorderedPages: Page[] = [];
  for (let i = 0; i < pages.length; i += 2) {
    // Add the first page of the spread (odd-numbered page)
    if (pages[i]) reorderedPages.push(pages[i]);
    // Add the second page of the spread (even-numbered page)
    if (pages[i - 1]) reorderedPages.push(pages[i - 1]);
  }
  return reorderedPages;
};

export const OnePageLayout: React.FC<OnePageLayoutProps> = ({
  pages,
  onPageClick,
}) => {
  const [currentPage, setCurrentPage] = useState(0); // Track the current page index
  const reorderedPages = reorderPages(pages); // Reorder the pages

  // Handle next page
  const handleNextPage = () => {
    if (currentPage < reorderedPages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle click on the reading container
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, currentTarget } = e;
    const clickX = clientX / currentTarget.clientWidth;

    if (clickX < 0.3 && currentPage > 0) {
      // Clicked on the left side (30% of the screen)
      handlePreviousPage();
    } else if (clickX > 0.7 && currentPage < reorderedPages.length - 1) {
      // Clicked on the right side (70% of the screen)
      handleNextPage();
    }

    // Call the parent onPageClick handler if needed
    onPageClick(e);
  };

  return (
    <ReadingContainer onClick={handleClick}>
      {/* Current Page */}
      <div
        className="page-container"
        style={{
          backgroundImage: `url(${reorderedPages[currentPage]?.imageUrl})`,
          width: "95%",
          height: "95%",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
    </ReadingContainer>
  );
};