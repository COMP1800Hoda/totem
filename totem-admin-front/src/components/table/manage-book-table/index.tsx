import React from 'react';
import { Table } from '@mantine/core';

import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { courseColumns } from '../column/courseColumns.tsx';
import { Course, CourseFormat } from '../../../types';
import { LazyTableContainer, TableWrapper } from './CourseTable.styled.ts';
import { useInfiniteCourseQuery } from '../../../hooks';
import { NoResult } from '../../NoResult.tsx';
import { CourseTableHeader } from './CourseTableHeader.tsx';
import { CourseTableBody } from './CourseTableBody.tsx';
import CustomLoader from '../../CustomLoader.tsx';
import SearchResultHeader from './SearchResultHeader.tsx';
import { Container } from '../../Container.tsx';

type LazyTableType = {
  activeTab: string | null;
  courseFormat: CourseFormat;
  keyword: string;
  fetchSize?: number;
};

const LazyTable: React.FC<LazyTableType> = ({
  activeTab,
  courseFormat,
  keyword,
  fetchSize = 50,
}) => {
  //we need a reference to the scrolling element for logic down below
  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const columns = React.useMemo<ColumnDef<Course>[]>(() => courseColumns, []);

  const { data, fetchNextPage, isFetching, isLoading } = useInfiniteCourseQuery(
    {
      keyword,
      courseFormat,
      fetchSize,
    }
  );

  //flatten the array of arrays from the useInfiniteQuery hook
  const flatData = React.useMemo(
    () => data?.pages?.flatMap((page) => page.content) ?? [],
    [data]
  );
  const totalDBRowCount = data?.pages?.[0]?.page?.totalElements ?? 0;
  const totalFetched = flatData.length;

  //called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
  const fetchMoreOnBottomReached = React.useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (activeTab !== courseFormat) {
        return;
      }
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        //once the user has scrolled within 500px of the bottom of the table, fetch more data if we can
        if (
          scrollHeight - scrollTop - clientHeight < 500 &&
          !isFetching &&
          totalFetched < totalDBRowCount
        ) {
          fetchNextPage();
        }
      }
    },
    [
      activeTab,
      courseFormat,
      isFetching,
      totalFetched,
      totalDBRowCount,
      fetchNextPage,
    ]
  );

  // a check on mount and after a fetch to see if the table is already scrolled
  // to the bottom and immediately needs to fetch more data
  React.useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current);
  }, [fetchMoreOnBottomReached]);

  const table = useReactTable({
    data: flatData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
  });

  if (isLoading) {
    return <CustomLoader show={true} />;
  }

  if (!isFetching && flatData.length == 0) {
    return <NoResult />;
  }

  return (
    <LazyTableContainer>
      <Container>
        <SearchResultHeader keyword={keyword} resultCount={totalDBRowCount} />
      </Container>
      <TableWrapper
        className="container"
        onScroll={(e) => fetchMoreOnBottomReached(e.currentTarget)}
        ref={tableContainerRef}
      >
        <Table>
          <CourseTableHeader table={table} />
          <CourseTableBody
            table={table}
            tableContainerRef={tableContainerRef}
          />
        </Table>
        <CustomLoader show={isFetching} />
      </TableWrapper>
      {/* TODO: remove this indicator (added only for dev purpose)*/}
      <div style={{ textAlign: 'right', padding: 10 }}>
        {flatData.length} of {totalDBRowCount} rows fetched
      </div>
    </LazyTableContainer>
  );
};

export default LazyTable;
