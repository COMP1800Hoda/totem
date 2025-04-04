// src/components/ReadPage/OnePageLayout.tsx
import React from "react";
import { Page } from "./BookTypes";
import { ReadingContainer } from "./ReadPage.styled";

interface OnePageLayoutProps {
  pages: Page[];
  currentPage: number; // Receive currentPage as a prop
  onPageChange: (newPage: number) => void; // Receive onPageChange as a prop
  onPageClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const OnePageLayout: React.FC<OnePageLayoutProps> = ({
  pages,
  currentPage,
  onPageChange,
  onPageClick,
}) => {
  // Handle click on the reading container
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, currentTarget } = e;
    const clickX = clientX / currentTarget.clientWidth;

    if (clickX < 0.35 && currentPage < pages.length) {
      // Clicked on the left side (30% of the screen)
      onPageChange(currentPage + 1); // Go to the previous page
    } else if (clickX > 0.65 && currentPage > 1) {
      // Clicked on the right side (70% of the screen)
      onPageChange(currentPage - 1); // Go to the next page
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
          backgroundImage: `url(${pages[currentPage - 1]?.imageUrl})`, // Use currentPage to display the correct page
          width: "95%",
          height: "100%",
          margin: "0.5em",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
    </ReadingContainer>
  );
};