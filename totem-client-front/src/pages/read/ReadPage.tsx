import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  MainContainer,
  Wrapper,
  ReadingContainer,
  TopNav,
  BookImage,
  ProgressBar,
} from "../../pages/read/ReadPage.styled.ts";
import { SearchContainer } from "../../components/header/Header.styled.ts";
import { Link } from "react-router"; // Use `react-router-dom` instead of `react-router`
import { FaArrowLeft } from "react-icons/fa";

// Define the Book and Page interfaces
interface Page {
  imageUrl: string;
  pageNumber?: number;
}

interface Book {
  objectId: string;
  storybook_title: string; // Updated to match JSON
  storybook_image_url: { [key: string]: string }; // Updated to match JSON
  storybook_description: string; // Updated to match JSON
  language: string;
  published: string;
  created_by: { name: string; role: string }[]; // Updated to match JSON
  publisher: string;
}

export const ReadPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null); // State to store the book data
  const [pages, setPages] = useState<Page[]>([]); // State to store the book pages
  const [currentPage, setCurrentPage] = useState(1); // State to track the current page
  const [showNav, setShowNav] = useState(false); // State to toggle navigation visibility
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState<string | null>(null); // State to track errors
  // Fetch book data
  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://parseapi.back4app.com/classes/storybook/${id}`,
          {
            method: "GET",
            headers: {
              "X-Parse-Application-Id": "XWNVzANvs7w6pYMl4fZWLCcikgXdMvCZhEnI48sH",
              "X-Parse-REST-API-Key": "mRZK1BOLh5EIaOR9Ircc2OhX5OU28aidSsZAtyJP",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }

        const data: Book = await response.json();
        console.log(data.storybook_image_url[1]);
        setBook(data); // Set the book details

        // Extract image URLs from the `storybook_image_url` object
        const imageUrls = Object.values(data.storybook_image_url);

        // Map image URLs to `pages`
        const mappedPages = imageUrls.map((url, index) => ({
          imageUrl: url,
          pageNumber: index + 1,
        }));
        setPages(mappedPages); // Set the book pages
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book:", error);
        setError("Error fetching book details. Please try again.");
        setLoading(false);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  // Navigation handlers
  const nextPage = () => {
    if (currentPage < pages.length) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!book) return <p>Book not found.</p>;

  return (
    <Wrapper id={"page-home"} className={"page"}>
      <MainContainer>
        <SearchContainer>
          <Link to={"/"}>
            <FaArrowLeft size={24} color="#333" />
          </Link>
        </SearchContainer>

        <ReadingContainer onClick={toggleNav}>
          <TopNav show={showNav}>
            {book.storybook_title} {/* Display the book title */}
          </TopNav>

          {pages.length > 0 && (
            <BookImage
              src={pages[currentPage - 1].imageUrl}
              alt={`Page ${currentPage}`}
            />
          )}

          <ProgressBar
            type="range"
            min="1"
            max={pages.length}
            value={currentPage}
            onChange={(e) => setCurrentPage(Number(e.target.value))}
            show={showNav}
          />
        </ReadingContainer>
      </MainContainer>
    </Wrapper>
  );
};