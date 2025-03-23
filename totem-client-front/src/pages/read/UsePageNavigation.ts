// src/components/ReadPage/usePageNavigation.ts
import { useState } from "react";

export const usePageNavigation = (totalPages: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);

  const handlePageChange = (newPage: number, isTwoPageLayout: boolean = false) => {
    if (isFlipping) return;

    // Calculate the target page based on the layout
    let targetPage = newPage;

    if (isTwoPageLayout) {
      // For two-page layouts, ensure the target page is within valid spreads
      const totalSpreads = Math.ceil(totalPages / 2);
      const targetSpread = Math.max(1, Math.min(newPage, totalSpreads));
      targetPage = targetSpread * 2 - 1; // Set to the first page of the spread
    } else {
      // For single-page layouts, ensure the target page is within valid pages
      targetPage = Math.max(1, Math.min(newPage, totalPages));
    }

    setCurrentPage(targetPage);
  };

  const handleFlipEnd = () => {
    setIsFlipping(false);
  };

  return {
    currentPage,
    isFlipping,
    handlePageChange,
    handleFlipEnd,
  };
};