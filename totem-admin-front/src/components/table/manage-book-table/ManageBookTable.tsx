/**
 * ManageBookTable Component
 *
 * This component displays a table of books using Tanstack's React Table and React Query.
 * It supports infinite scrolling to load more books dynamically.
 *
 * Features:
 * - Fetches book data using `useInfiniteQuery` from React Query.
 * - Uses `useReactTable` to manage table structure and rendering.
 * - Implements infinite scrolling via IntersectionObserver.
 *
 * Dependencies:
 * - @tanstack/react-table
 * - @tanstack/react-query
 * - react-bootstrap
 *
 * Documentation:
 * - React Table: https://tanstack.com/table/latest/docs/introduction
 * - React Query: https://tanstack.com/query/latest/docs/introduction
 */

import React, {useEffect, useRef, useState} from 'react';
import {useInfiniteQuery} from "@tanstack/react-query";
import {getCoreRowModel, useReactTable} from "@tanstack/react-table";

import {fetchStorybooks} from '../../../api/fetchStorybooks.ts';
import {fetchStorybookCount} from '../../../api/fetchStorybookCount.ts';
import {TableContainer} from './ManageBookTable.styled.ts';
import {SearchContainer} from "../../../pages/manage-books/ManageBooks.styled.ts";
import {bookColumns} from './bookColumns.tsx';
import {Container} from '../../Container.tsx';
import SearchResultHeader from './SearchResultHeader.tsx';
import {MainTitle} from "../../text/MainTitle.tsx";
import {Table} from "./Table.tsx";


const PAGE_SIZE = 30; // Number of items to fetch per page

export const ManageBookTable: React.FC = () => {
  const [totalStorybooks, setTotalStorybooks] = useState<number>(0); // State to store the total count
  const [searchType, setSearchType] = useState('title');
  const [searchKeyword, setSearchKeyword] = useState('');

  const onChangeSearchType = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchType(e.target.value)
  }
  const onChangeKeyword = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchKeyword(e.target.value)
  }

  // Fetch the total storybook count on component mount
  useEffect(() => {
    const getTotalCount = async () => {
      try {
        const count = await fetchStorybookCount();
        setTotalStorybooks(count);
      } catch (error) {
        console.error("Error fetching total storybook count:", error);
      }
    };
    getTotalCount();
  }, []);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["storybooks"],
    queryFn: ({pageParam = 0}) => fetchStorybooks(pageParam, PAGE_SIZE),
    getNextPageParam: (lastPage, allPages) => {
      // If the last page has fewer items than PAGE_SIZE, there are no more pages
      return lastPage.length === PAGE_SIZE ? allPages.length : undefined;
    },
    initialPageParam: 0,
  });


  const allItems = React.useMemo(
    () => data?.pages.flat() || [],
    [data]
  )

  // Create the table instance
  const table = useReactTable({
    data: allItems,
    columns: bookColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  // // Infinite scroll logic
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
  //         fetchNextPage();
  //       }
  //     },
  //     {threshold: 1.0}
  //   );
  //
  //   if (loaderRef.current) {
  //     observer.observe(loaderRef.current);
  //   }
  //
  //   return () => {
  //     if (loaderRef.current) {
  //       observer.unobserve(loaderRef.current);
  //     }
  //   };
  // }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const tableContainerRef = useRef<HTMLDivElement | null>(null);
  const handleScroll = () => {
    if (!tableContainerRef.current || isFetchingNextPage || !hasNextPage) return;

    const { scrollTop, scrollHeight, clientHeight } = tableContainerRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 50) {
      fetchNextPage();
    }
  };


  useEffect(() => {
    const container = tableContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div>
      <div id="top-container">
        <Container>
          <MainTitle text={`Manage Books`}/>
          <SearchContainer className="form-group">
            <select
              className="form-select"
              id="search-type"
              value={searchType}
              onChange={onChangeSearchType}
            >
              <option value="title">Title</option>
              <option value="bookid">Book ID</option>
              <option value="genre">Genre</option>
              <option value="contributed">Contributed by</option>
            </select>
            <input
              type="text"
              id="search-keyword"
              value={searchKeyword}
              onChange={onChangeKeyword}
            />
            <button type="submit" className="btn" id="search-button">Submit</button>
          </SearchContainer>
        </Container>
      </div>
      <SearchResultHeader resultCount={totalStorybooks}/>
      <TableContainer
        id="table-container"
        ref={tableContainerRef}
      >
        <Table
          table={table}
          isLoading={isLoading}
          isError={isError}
          error={error}
        />

        <Container>
           {/*Loader for infinite scroll */}
          <div ref={loaderRef}>
            {isFetchingNextPage && "Loading more..."}
          </div>

          {/* No more items to load */}
          {!hasNextPage && !isLoading && <div>No more storybooks to load.</div>}
        </Container>
      </TableContainer>
    </div>
  );
};

export default ManageBookTable;