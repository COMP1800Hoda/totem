import React, { useRef, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { Page } from "./BookTypes";

interface TwoPageLayoutProps {
  pages: Page[];
  currentPage: number;
  onFlip: (page: number) => void;
  onPageClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const TwoPageLayout: React.FC<TwoPageLayoutProps> = ({
  pages,
  currentPage,
  onFlip,
  onPageClick,
}) => {
  const flipBook = useRef<any>(null);

  const handleFlipNext = () => {
    if (flipBook.current?.pageFlip) {
      flipBook.current.pageFlip().flipPrev();
    }
  };

  const handleFlipPrev = () => {
    if (flipBook.current?.pageFlip) {
      flipBook.current.pageFlip().flipNext();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (flipBook.current?.pageFlip) {
        const pageIndex = pages.length - currentPage;
        console.log("Navigating to page:", pageIndex);
        flipBook.current.pageFlip().flip(pageIndex, "top");
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [currentPage, pages.length]);

  const reversedPages = [...pages].reverse();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
        position: "relative",
      }}
      onClick={onPageClick}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "25%",
          height: "100%",
          cursor: "pointer",
          zIndex: 10,
        }}
        onClick={handleFlipNext}
      />

      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "25%",
          height: "100%",
          cursor: "pointer",
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
      onFlip={(e) => {
        const newPage = pages.length - e.data;
        onFlip(newPage);
      }}
      usePortrait={false}
      startPage={pages.length - currentPage}
      disableFlipByClick={true}
      flippingTime={450}
      style={{ margin: "0 auto" }}
      drawShadow={true}
      showPageCorners={false}
      // Adding the missing required props
      className="flip-book"
      startZIndex={0}
      autoSize={false}
      clickEventForward={false}
      useMouseEvents={true}
      swipeDistance={10}
    >
        {reversedPages.map((page, index) => (
          <div key={`page-${index}`} className="page">
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
        ))}
      </HTMLFlipBook>
    </div>
  );
};