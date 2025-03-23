import {flexRender, Table} from "@tanstack/react-table";
import {Storybook} from "../../../types/Storybook.ts";

export const TableHead = ({ table }: {table:Table<Storybook>}) => {
  return (
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
  );
};