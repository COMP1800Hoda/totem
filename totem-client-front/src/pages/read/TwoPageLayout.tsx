import React, { useRef, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { Page } from './BookTypes';

interface TwoPageLayoutProps {
  pages: Page[];
  currentPage: number;
  onFlip: (page: number) => void;
  onFlipEnd: () => void;
  onPageClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const TwoPageLayout: React.FC<TwoPageLayoutProps> = ({
  pages,
  currentPage,
  onFlip,
  onFlipEnd,
  onPageClick,
}) => {
  const flipBook = useRef<any>(null);

  // Handle flipping to the next page (left side click for RTL)
  const handleFlipNext = () => {
    if (flipBook.current && flipBook.current.pageFlip) {
      flipBook.current.pageFlip().flipPrev(); // Note: flipPrev for RTL navigation
    }
  };

  // Handle flipping to the previous page (right side click for RTL)
  const handleFlipPrev = () => {
    if (flipBook.current && flipBook.current.pageFlip) {
      flipBook.current.pageFlip().flipNext(); // Note: flipNext for RTL navigation
    }
  };

  // Sync the flipbook with the currentPage prop
  useEffect(() => {
    const timer = setTimeout(() => {
      if (flipBook.current && flipBook.current.pageFlip) {
        const pageIndex = pages.length - currentPage; // Reverse index for RTL
        console.log('Navigating to page:', pageIndex);
        flipBook.current.pageFlip().flip(pageIndex, 'top');
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [currentPage, pages.length]);

  // Reverse the pages array for RTL display
  const reversedPages = [...pages].reverse();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
        position: 'relative',
      }}
      onClick={onPageClick}
    >
      {/* Left overlay for flipping to the next page (RTL) */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '25%',
          height: '100%',
          cursor: 'pointer',
          zIndex: 10,
        }}
        onClick={handleFlipNext}
      />

      {/* Right overlay for flipping to the previous page (RTL) */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: '25%',
          height: '100%',
          cursor: 'pointer',
          zIndex: 10,
        }}
        onClick={handleFlipPrev}
      />

      <HTMLFlipBook
        ref={flipBook}
        width={500}
        height={700}
        size="stretch"
        minWidth={550}
        maxWidth={1100}
        minHeight={700}
        maxHeight={1400}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        onFlip={(e) => onFlip(pages.length - e.data)} // Adjust page number for RTL
        onFlipEnd={onFlipEnd}
        usePortrait={false}
        startPage={pages.length - currentPage} // Adjusted for RTL
        disableFlipByClick={true}
        flippingTime={450}
        style={{ margin: '0 auto' }}
        // RTL specific settings
        flippingDirection="backward" // This is crucial for RTL books
        drawShadow={true}
        showPageCorners={false}
      >
        {/* Render reversed pages */}
        {reversedPages.map((page, index) => (
          <div key={index + 1}>
            <div
              style={{
                display: 'flex',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f0f0f0',
              }}
            >
              <img
                src={page.imageUrl}
                alt={`Page ${page.pageNumber}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </div>
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  );
};
