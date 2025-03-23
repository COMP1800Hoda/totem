// src/components/ReadPage/TwoPageLayout.tsx
import React, { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { Page } from "./BookTypes";

interface TwoPageLayoutProps {
  pages: Page[];
  onFlip: (page: number) => void;
  onFlipEnd: () => void;
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

export const TwoPageLayout: React.FC<TwoPageLayoutProps> = ({
  pages,
  onFlip,
  onFlipEnd,
  onPageClick,
}) => {
  const flipBook = useRef<any>(null);

  // Reorder the pages before rendering
  const reorderedPages = reorderPages(pages);

  // Handle flipping to the next page
  const handleFlipNext = () => {
    if (flipBook.current) {
      flipBook.current.pageFlip().flipNext();
    }
  };

  // Handle flipping to the previous page
  const handleFlipPrev = () => {
    if (flipBook.current) {
      flipBook.current.pageFlip().flipPrev();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center", // Center the flipbook horizontally
        alignItems: "center", // Center the flipbook vertically
        height: "100vh", // Full viewport height
        backgroundColor: "#f0f0f0", // Optional: Add background color
        position: "relative", // Required for absolute positioning of overlays
      }}
      onClick={onPageClick}
    >
      {/* Left overlay for flipping to the previous page */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "25%", // Cover 25% of the screen width
          height: "100%",
          cursor: "pointer", // Show pointer cursor
          zIndex: 10, // Ensure it's above the flipbook
        }}
        onClick={handleFlipPrev}
      />

      {/* Right overlay for flipping to the next page */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "25%", // Cover 25% of the screen width
          height: "100%",
          cursor: "pointer", // Show pointer cursor
          zIndex: 10, // Ensure it's above the flipbook
        }}
        onClick={handleFlipNext}
      />

      <HTMLFlipBook
        ref={flipBook}
        width={500} // Adjusted width to bring pages closer
        height={700}
        size="stretch"
        minWidth={550} // Adjust min/max width for two-page layout
        maxWidth={1100}
        minHeight={700}
        maxHeight={1400}
        maxShadowOpacity={0.5}
        showCover={true} // Show the cover page alone
        mobileScrollSupport={true}
        onFlip={(e) => onFlip(e.data + 1)} // Pass the current page number
        onFlipEnd={onFlipEnd}
        usePortrait={false} // Ensure landscape mode for two-page spread
        startPage={0} // Start from the first page
        disableFlipByClick={true} // Disable flipping by clicking on the book
        style={{ margin: "0 auto" }} // Center the flipbook
      >
        {/* Render each page individually */}
        {reorderedPages.map((page, index) => (
          <div key={index + 1}>
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                justifyContent: "center", // Center the page content horizontally
                alignItems: "center", // Center the page content vertically
                backgroundColor: "#f0f0f0", // Optional: Add background color
              }}
            >
              <img
                src={page.imageUrl}
                alt={`Page ${page.pageNumber}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  );
};