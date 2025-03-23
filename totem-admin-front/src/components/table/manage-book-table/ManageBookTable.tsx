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
import AlertMessage from "../../AlertMessage.tsx";


const PAGE_SIZE = 30; // Number of items to fetch per page

export const ManageBookTable: React.FC = () => {
  const [totalStorybooks, setTotalStorybooks] = useState<number>(0); // State to store the total count
  // interactive states
  const [searchType, setSearchType] = useState('storybook_title');
  const [searchKeyword, setSearchKeyword] = useState('');
  // states used for actual search when clicks 'submit' button
  const [searchResultType, setSearchResultType] = useState('storybook_title');
  const [searchResultKeyword, setSearchResultKeyword] = useState(''); // will be shown in search header (# results for '##')

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
        const count = await fetchStorybookCount(searchResultType, searchResultKeyword);
        setTotalStorybooks(count);
      } catch (error) {
        console.error("Error fetching total storybook count:", error);
      }
    };
    getTotalCount();
  }, [searchResultKeyword]);

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
    queryKey: ["storybooks", searchResultKeyword, searchResultType],
    queryFn: ({pageParam = 0}) => {
      return fetchStorybooks(
        pageParam,
        searchResultType,
        searchResultKeyword,
        PAGE_SIZE
      )
    },
    getNextPageParam: (lastPage, allPages) => {
      // If the last page has fewer items than PAGE_SIZE, there are no more pages
      return lastPage?.length === PAGE_SIZE ? allPages.length : undefined;
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

  // event onClickSubmit on search bar
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const handleAlert = (msg = '') => {
    setAlertMessage(msg)
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };
  const onClickSubmit = () => {
    if (searchKeyword.length < 1) {
      handleAlert('Please add a search keyword')
    }

    console.log(searchKeyword)
    if (searchKeyword !== searchResultKeyword)
      setSearchResultKeyword(searchKeyword)
    if (searchType !== searchResultType)
      setSearchResultType(searchType)
  }

  // Infinite scroll logic
  const tableContainerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = () => {
    if (!tableContainerRef.current || isFetchingNextPage || !hasNextPage) return;

    const { scrollTop, scrollHeight, clientHeight } = tableContainerRef.current;
    if (isLoading) return;

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
              <option value="storybook_title">Title</option>
              <option value="storybook_id">Book ID</option>
              <option value="genre">Genre</option>
              <option value="created_by">Created by</option>
              <option value="ISBN">ISBN</option>
              <option value="index">Index</option>
            </select>
            <input
              type="text"
              id="search-keyword"
              value={searchKeyword}
              onChange={onChangeKeyword}
            />
            <button type="submit" className="btn" id="search-button" onClick={onClickSubmit}>Submit</button>
          </SearchContainer>
        </Container>
      </div>
      <SearchResultHeader
        resultCount={totalStorybooks}
        keyword={searchResultKeyword}
      />
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
      <AlertMessage
        message={alertMessage}
        show={showAlert}
        onClose={() => setShowAlert(false)}
      />
    </div>
  );
};

export default ManageBookTable;