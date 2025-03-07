import { Table } from '@mantine/core';
import { flexRender, Table as TableType } from '@tanstack/react-table';
import { Storybook } from '../../../types/Storybook.ts';

type LazyTableHeaderProps = {
  table: TableType<Storybook>;
};

export const CourseTableHeader = ({ table }: LazyTableHeaderProps) => {
  return (
    <Table.Thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <Table.Tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <Table.Th
                key={header.id}
                style={{
                  width: header.getSize(),
                }}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </Table.Th>
            );
          })}
        </Table.Tr>
      ))}
    </Table.Thead>
  );
};
