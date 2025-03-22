// src/components/ReadPage/TwoPageLayout.tsx
import React, { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { Page } from "./BookTypes";

interface TwoPageLayoutProps {
  pages: Page[];
  onFlip: (page: number) => void;
  onFlipEnd: () => void;
}

export const TwoPageLayout: React.FC<TwoPageLayoutProps> = ({
  pages,
  onFlip,
  onFlipEnd,
}) => {
  const flipBook = useRef(null);

  return (
    <div>
      <HTMLFlipBook
        ref={flipBook}
        width={600}
        height={800}
        size="stretch"
        minWidth={400}
        maxWidth={1000}
        minHeight={600}
        maxHeight={1533}
        maxShadowOpacity={0.5}
        showCover={true} // Show the cover page alone
        mobileScrollSupport={true}
        onFlip={(e) => onFlip(e.data + 1)}
        onFlipEnd={onFlipEnd}
        usePortrait={true} // Ensure portrait mode for proper page display
        startPage={0} // Start from the first page
        disableFlipByClick={false} // Allow flipping by clicking
        style={{ margin: "0 auto" }} // Center the flipbook
      >
        {/* Cover Page (Displayed Alone) */}
        <div className="cover-page">
          <img
            src={pages[0].imageUrl}
            alt={`Cover Page`}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* Inner Pages (Displayed Two at a Time) */}
        {pages.slice(1).map((page, index) => (
          <div key={index + 1} className="demoPage">
            <img
              src={page.imageUrl}
              alt={`Page ${page.pageNumber}`}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  );
};