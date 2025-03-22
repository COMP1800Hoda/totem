import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import {
  Container,
  TopNavBar,
  BottomNavBar,
  ReadingContainer,
  SliderContainer,
  Title,
  NavButton,
  PageIndicator,
  BottomNavButton,
} from "./ReadPage.styled";

interface Page {
  imageUrl: string;
  pageNumber?: number;
}

interface Book {
  objectId: string;
  storybook_title: string;
  storybook_image_url: { [key: string]: string };
  storybook_description: string;
  language: string;
  published: string;
  created_by: { name: string; role: string }[];
  publisher: string;
}

const ReadPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [pages, setPages] = useState<Page[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState<number | null>(null); // State for incoming page
  const [showNav, setShowNav] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false); // State for animation
  const [transitionDirection, setTransitionDirection] = useState<"forward" | "backward">("forward"); // State for transition direction
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 900); // State for wide screen

  // Fetch book data
  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://parseapi.back4app.com/classes/storybook/${id}`,
          {
            headers: {
              "X-Parse-Application-Id": "XWNVzANvs7w6pYMl4fZWLCcikgXdMvCZhEnI48sH",
              "X-Parse-REST-API-Key": "mRZK1BOLh5EIaOR9Ircc2OhX5OU28aidSsZAtyJP",
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch book details");

        const data: Book = await response.json();
        setBook(data);

        const imageUrls = Object.values(data.storybook_image_url);
        const mappedPages = imageUrls.map((url, index) => ({
          imageUrl: url,
          pageNumber: index + 1,
        }));
        setPages(mappedPages);
      } catch (error) {
        console.error("Error fetching book:", error);
        setError("Error fetching book details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 1024); // Adjust the breakpoint as needed
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, currentTarget } = e;
    const clickX = clientX / currentTarget.clientWidth;

    if (clickX < 0.2 && currentPage > 1) {
      handlePageChange(currentPage - (isWideScreen ? 2 : 1), "backward"); // Go to previous page(s)
    } else if (clickX > 0.8 && currentPage < pages.length) {
      handlePageChange(currentPage + (isWideScreen ? 2 : 1), "forward"); // Go to next page(s)
    } else {
      setShowNav((prev) => !prev);
    }
  };

  const handlePageChange = (newPage: number, direction: "forward" | "backward") => {
    setIsAnimating(true); // Start animation
    setTransitionDirection(direction); // Set transition direction
    setNextPage(newPage); // Set the incoming page

    setTimeout(() => {
      setCurrentPage(newPage); // Update current page after animation
      setNextPage(null); // Reset incoming page
      setIsAnimating(false); // End animation
    }, 500); // Match animation duration
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container>
      {showNav && (
        <TopNavBar>
          <NavButton onClick={() => navigate(`/books/${id}`)}>
            <ChevronLeft size={30} />
          </NavButton>
          <Title>{book?.storybook_title}</Title>
        </TopNavBar>
      )}

      <ReadingContainer onClick={handlePageClick}>
        {/* Current Page(s) */}
        {isWideScreen ? (
          // Two-page layout
          <>
            <div
              className="page-container"
              style={{
                backgroundImage: `url(${pages[currentPage - 1]?.imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "50%", // Half width for two pages
                height: "100%",
                zIndex: 1, // Ensure current page is behind the incoming page
              }}
            />
            {currentPage < pages.length && (
              <div
                className="page-container"
                style={{
                  backgroundImage: `url(${pages[currentPage]?.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "50%", // Half width for two pages
                  height: "100%",
                  zIndex: 1, // Ensure current page is behind the incoming page
                }}
              />
            )}
          </>
        ) : (
          // One-page layout
          <div
            className="page-container"
            style={{
              backgroundImage: `url(${pages[currentPage - 1]?.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
              height: "100%",
              zIndex: 1, // Ensure current page is behind the incoming page
            }}
          />
        )}

        {/* Incoming Page(s) */}
        {nextPage !== null && (
          <>
            {isWideScreen ? (
              // Two-page layout
              <>
                <div
                  className={`page-container ${
                    isAnimating
                      ? transitionDirection === "forward"
                        ? "slide-in-forward"
                        : "slide-in-backward"
                      : ""
                  }`}
                  style={{
                    backgroundImage: `url(${pages[nextPage - 1]?.imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "50%", // Half width for two pages
                    height: "100%",
                    zIndex: 2, // Ensure incoming page is on top
                  }}
                />
                {nextPage < pages.length && (
                  <div
                    className={`page-container ${
                      isAnimating
                        ? transitionDirection === "forward"
                          ? "slide-in-forward"
                          : "slide-in-backward"
                        : ""
                    }`}
                    style={{
                      backgroundImage: `url(${pages[nextPage]?.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      width: "50%", // Half width for two pages
                      height: "100%",
                      zIndex: 2, // Ensure incoming page is on top
                    }}
                  />
                )}
              </>
            ) : (
              // One-page layout
              <div
                className={`page-container ${
                  isAnimating
                    ? transitionDirection === "forward"
                      ? "slide-in-forward"
                      : "slide-in-backward"
                    : ""
                }`}
                style={{
                  backgroundImage: `url(${pages[nextPage - 1]?.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "100%",
                  zIndex: 2, // Ensure incoming page is on top
                }}
              />
            )}
          </>
        )}
      </ReadingContainer>

      {showNav && (
        <BottomNavBar>
          <BottomNavButton
            onClick={() => handlePageChange(currentPage - (isWideScreen ? 2 : 1), "backward")}
            disabled={currentPage === 1}
          >
            قبلی
          </BottomNavButton>

          <SliderContainer>
            <input
              type="range"
              min="1"
              max={pages.length}
              value={currentPage}
              onChange={(e) => handlePageChange(Number(e.target.value), "forward")}
            />
            <PageIndicator>{currentPage}/{pages.length}</PageIndicator>
          </SliderContainer>

          <BottomNavButton
            onClick={() => handlePageChange(currentPage + (isWideScreen ? 2 : 1), "forward")}
            disabled={currentPage === pages.length}
          >
            بعدی
          </BottomNavButton>
        </BottomNavBar>
      )}
    </Container>
  );
};

export default ReadPage;