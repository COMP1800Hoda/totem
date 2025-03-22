// src/components/ReadPage/usePageNavigation.ts
import { useState } from "react";

export const usePageNavigation = (totalPages: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || isFlipping) return;
    setCurrentPage(newPage);
  };

  const handleFlipStart = () => {
    setIsFlipping(true);
  };

  const handleFlipEnd = () => {
    setIsFlipping(false);
  };

  return {
    currentPage,
    isFlipping,
    handlePageChange,
    handleFlipStart,
    handleFlipEnd,
  };
};