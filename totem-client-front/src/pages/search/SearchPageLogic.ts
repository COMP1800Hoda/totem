import { useState } from 'react';

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    // Retrieve the last search query from localStorage
    return localStorage.getItem('lastSearchQuery') || '';
  });

  const [searchResults, setSearchResults] = useState<any[]>(() => {
    // Retrieve the last search results from localStorage
    const savedResults = localStorage.getItem('lastSearchResults');
    return savedResults ? JSON.parse(savedResults) : [];
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const query = {
        $or: [
          { storybook_title: { $regex: searchQuery, $options: 'i' } },
          { genre: { $regex: searchQuery, $options: 'i' } },
          { ISBN: { $regex: searchQuery, $options: 'i' } },
          { contributed_by: { $regex: searchQuery, $options: 'i' } },
          { language: { $regex: searchQuery, $options: 'i' } },
          { publisher: { $regex: searchQuery, $options: 'i' } },
          { storybook_description: { $regex: searchQuery, $options: 'i' } },
        ],
      };

      const response = await fetch(
        `https://parseapi.back4app.com/classes/storybook?where=${encodeURIComponent(
          JSON.stringify(query)
        )}`,
        {
          method: 'GET',
          headers: {
            'X-Parse-Application-Id': 'XWNVzANvs7w6pYMl4fZWLCcikgXdMvCZhEnI48sH',
            'X-Parse-REST-API-Key': 'mRZK1BOLh5EIaOR9Ircc2OhX5OU28aidSsZAtyJP',
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }

      const data = await response.json();
      setSearchResults(data.results || []);

      // Save the search query and results to localStorage
      localStorage.setItem('lastSearchQuery', searchQuery);
      localStorage.setItem('lastSearchResults', JSON.stringify(data.results || []));
    } catch (error: unknown) {
      console.error(error)
      setError('Error fetching search results. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    loading,
    error,
    handleSearch,
  };
};