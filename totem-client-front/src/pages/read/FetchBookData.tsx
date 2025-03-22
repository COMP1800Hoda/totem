// src/components/ReadPage/useBookData.ts
import { useState, useEffect } from "react";
import { Book, Page } from "./BookTypes";

export const useBookData = (id: string) => {
  const [book, setBook] = useState<Book | null>(null);
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return { book, pages, loading, error };
};