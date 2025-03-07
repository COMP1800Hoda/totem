import React from 'react';
import { flexRender, Row } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Table as TableType } from '@tanstack/table-core';

import { Storybook } from '../../../types/Storybook.ts';
import { useNavigateToBookDetail } from '../../../hooks/useNavigateToBookDetail.ts';

type LazyTableHeaderProps = {
  table: TableType<Storybook>;
  tableContainerRef: React.RefObject<HTMLDivElement>;
};

export const CourseTableBody = ({
  table,
  tableContainerRef,
  ...props
}: LazyTableHeaderProps) => {
  const navigateToCourseDetail = useNavigateToBookDetail();

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
    <table
      style={{
        height: `${rowVirtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
      }}
      {...props}
    >
      {rowVirtualizer.getVirtualItems().map((virtualRow) => {
        const row = rows[virtualRow.index] as Row<Storybook>;
        const book = row.original as Storybook;
        return (
          <tr
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
                <td
                  key={cell.id}
                  style={{
                    display: 'flex',
                    width: cell.column.getSize(),
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              );
            })}
          </tr>
        );
      })}
    </table>
  );
};
