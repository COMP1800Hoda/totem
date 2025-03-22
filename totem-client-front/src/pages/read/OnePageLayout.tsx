// src/components/ReadPage/OnePageLayout.tsx
import React from "react";
import { Page } from "./BookTypes";
import { ReadingContainer } from "./ReadPage.styled";

interface OnePageLayoutProps {
  page: Page;
  nextPage: Page | null;
  transitionDirection: "forward" | "backward";
  onPageClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const OnePageLayout: React.FC<OnePageLayoutProps> = ({
  page,
  nextPage,
  transitionDirection,
  onPageClick,
}) => {
  return (
    <ReadingContainer onClick={onPageClick}>
      {/* Current Page */}
      <div
        className={`page-container ${
          nextPage !== null && transitionDirection === "forward"
            ? "slide-out-left"
            : ""
        }`}
        style={{
          backgroundImage: `url(${page.imageUrl})`,
        }}
      />

      {/* Incoming Page */}
      {nextPage !== null && (
        <div
          className="page-container"
          style={{
            backgroundImage: `url(${nextPage.imageUrl})`,
          }}
        />
      )}
    </ReadingContainer>
  );
};