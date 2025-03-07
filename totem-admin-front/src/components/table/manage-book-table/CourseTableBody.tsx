import React from 'react';
import { Table } from '@mantine/core';
import { flexRender, Row } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Table as TableType } from '@tanstack/table-core';

// import { Course } from '../../../types';
// import { useNavigateToCourseDetail } from '../../../hooks';
import { Storybook } from '../../../types/Storybook.ts';

type LazyTableHeaderProps = {
  table: TableType<Storybook>;
  tableContainerRef: React.RefObject<HTMLDivElement>;
};

export const CourseTableBody = ({
  table,
  tableContainerRef,
}: LazyTableHeaderProps) => {
  const navigateToCourseDetail = useNavigateToCourseDetail();

  const { rows } = table.getRowModel();

  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    if (tableContainerRef.current) {
      setIsReady(true);
    }
  }, []);

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 33, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => (isReady ? tableContainerRef.current : null),
    overscan: 5,
  });

  return (
    <Table.Tbody
      style={{
        height: `${rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
      }}
    >
      {rowVirtualizer.getVirtualItems().map((virtualRow) => {
        const row = rows[virtualRow.index] as Row<Storybook>;
        const book = row.original as Storybook;
        return (
          <Table.Tr
            data-index={virtualRow.index} //needed for dynamic row height measurement
            ref={(node) => rowVirtualizer.measureElement(node)} //measure dynamic row height
            key={row.id}
            style={{
              transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
            }}
            onClick={() => navigateToCourseDetail(book)}
          >
            {row.getVisibleCells().map((cell) => {
              return (
                <Table.Td
                  key={cell.id}
                  style={{
                    display: 'flex',
                    width: cell.column.getSize(),
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Td>
              );
            })}
          </Table.Tr>
        );
      })}
    </Table.Tbody>
  );
};
