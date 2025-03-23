// src/components/ReadPage/NavBars.tsx
import React from "react";
import { ChevronLeft } from "lucide-react";
import {
  TopNavBar,
  BottomNavBar,
  SliderContainer,
  Title,
  NavButton,
  PageIndicator,
  BottomNavButton,
} from "./ReadPage.styled";

interface NavBarsProps {
  showNav: boolean;
  bookTitle?: string;
  currentPage: number;
  totalPages: number;
  onBack: () => void;
  onPageChange: (newPage: number) => void;
  isFlipping: boolean;
  isTwoPageLayout?: boolean; // Add a prop to indicate two-page layout
}

export const NavBars: React.FC<NavBarsProps> = ({
  showNav,
  bookTitle,
  currentPage,
  totalPages,
  onBack,
  onPageChange,
  isFlipping,
  isTwoPageLayout = false, // Default to false
}) => {
  if (!showNav) return null;

  // Calculate the current spread for two-page layout
  const currentSpread = isTwoPageLayout ? Math.ceil(currentPage / 2) : currentPage;
  const totalSpreads = isTwoPageLayout ? Math.ceil(totalPages / 2) : totalPages;

  // Handle slider change
  const handleSliderChange = (value: number) => {
    if (isTwoPageLayout) {
      onPageChange(value * 2 - 1); // Set to the first page of the selected spread
    } else {
      onPageChange(value); // Set to the selected page
    }
  };

  return (
    <>
      <TopNavBar>
        <NavButton onClick={onBack}>
          <ChevronLeft size={30} />
        </NavButton>
        <Title>{bookTitle}</Title>
      </TopNavBar>

      <BottomNavBar>
        <BottomNavButton
          onClick={() => onPageChange(currentPage - (isTwoPageLayout ? 2 : 1))}
          disabled={
            isTwoPageLayout
              ? currentPage <= 1 || isFlipping // Disable if on the first page or flipping
              : currentPage === 1 || isFlipping // Disable if on the first page or flipping
          }
        >
          قبلی
        </BottomNavButton>

        <SliderContainer>
          <input
            type="range"
            min="1"
            max={isTwoPageLayout ? totalSpreads : totalPages}
            value={isTwoPageLayout ? currentSpread : currentPage}
            onChange={(e) => handleSliderChange(Number(e.target.value))}
            disabled={isFlipping}
          />
          <PageIndicator>
            {isTwoPageLayout
              ? `${currentSpread}/${totalSpreads}` // Show spread indicator
              : `${currentPage}/${totalPages}`}
          </PageIndicator>
        </SliderContainer>

        <BottomNavButton
          onClick={() => onPageChange(currentPage + (isTwoPageLayout ? 2 : 1))}
          disabled={
            isTwoPageLayout
              ? currentPage >= totalPages - 1 || isFlipping // Disable if on the last or second-to-last page or flipping
              : currentPage === totalPages || isFlipping // Disable if on the last page or flipping
          }
        >
          بعدی
        </BottomNavButton>
      </BottomNavBar>
    </>
  );
};