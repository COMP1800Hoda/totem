import React, {useEffect, useRef, useState} from 'react';
import {useInfiniteQuery} from "@tanstack/react-query";
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import {fetchStorybooks} from '../../../api/fetchStorybooks.ts';
import {bookColumns} from './bookColumns.tsx';
import {StyledManageBookTable, TableContainer} from './ManageBookTable.styled.ts';
import {Container} from '../../Container.tsx';
import SearchResultHeader from './SearchResultHeader.tsx';
import {fetchStorybookCount} from '../../../api/fetchStorybookCount.ts';
import {MainTitle} from "../../text/MainTitle.tsx";
import {SearchContainer} from "../../../pages/manage-books/ManageBooks.styled.ts";
import {Form} from "react-bootstrap";

const PAGE_SIZE = 30; // Number of items to fetch per page

export const ManageBookTable: React.FC = () => {
  const [totalStorybooks, setTotalStorybooks] = useState<number>(0); // State to store the total count

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

  // Flatten the pages into a single array
  const storybooks = data?.pages.flat() || [];

  // Create the table instance
  const table = useReactTable({
    data: storybooks,
    columns: bookColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Infinite scroll logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {threshold: 1.0}
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div id="top-container">
        <Container>
          <MainTitle text={`Manage Books`}/>
          <SearchContainer>
            <Form.Select size={'sm'} aria-label="select search type" defaultValue={"title"}>
              <option value="title">Title</option>
              <option value="bookid">Book ID</option>
              <option value="genre">Genre</option>
              <option value="contributed">Contributed by</option>
            </Form.Select>
            <Form.Control size="sm" type="text" placeholder="Search by keywords"/>
          </SearchContainer>
        </Container>
      </div>
      <TableContainer id="table-container">
        <SearchResultHeader resultCount={totalStorybooks}/>
        <StyledManageBookTable className="table">
          <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    width: header.getSize(),
                  }}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
          </thead>
          <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} style={{borderBottom: "1px solid #ddd"}}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{
                    padding: "10px",
                    textAlign: "left",
                    width: cell.column.getSize(),
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
          </tbody>
        </StyledManageBookTable>

        <Container>
          {/* Loader for infinite scroll */}
          <div ref={loaderRef}>
            {isFetchingNextPage && "Loading more..."}
          </div>

          {/* No more items to load */}
          {!hasNextPage && <div>No more storybooks to load.</div>}
        </Container>
      </TableContainer>
    </div>
  );
};

export default ManageBookTable;