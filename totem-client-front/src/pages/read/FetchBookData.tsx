// src/components/ReadPage/useBookData.ts
import { useState, useEffect } from "react";
import { Page } from "./BookTypes";
import { fetchStorybookById } from "../../api/fetchStorybookById.ts";
import { Storybook } from '../../types/Storybook.ts';

export const useBookData = (id: string) => {
  const [book, setBook] = useState<Storybook | null>(null);
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const response = await fetchStorybookById(id);
        const data: Storybook = await response;
        console.log(data);
        setBook(data);

        const imageUrls = Object.values(data.storybook_image_url);
        const mappedPages = imageUrls.map((url, index) => ({
          imageUrl: url,
          pageNumber: index + 1,
        }));
        
        // Apply reordering here
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