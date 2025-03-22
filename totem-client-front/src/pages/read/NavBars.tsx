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
}

export const NavBars: React.FC<NavBarsProps> = ({
  showNav,
  bookTitle,
  currentPage,
  totalPages,
  onBack,
  onPageChange,
  isFlipping,
}) => {
  if (!showNav) return null;

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
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1 || isFlipping}
        >
          قبلی
        </BottomNavButton>

        <SliderContainer>
          <input
            type="range"
            min="1"
            max={totalPages}
            value={currentPage}
            onChange={(e) => onPageChange(Number(e.target.value))}
            disabled={isFlipping}
          />
          <PageIndicator>
            {currentPage}/{totalPages}
          </PageIndicator>
        </SliderContainer>

        <BottomNavButton
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || isFlipping}
        >
          بعدی
        </BottomNavButton>
      </BottomNavBar>
    </>
  );
};