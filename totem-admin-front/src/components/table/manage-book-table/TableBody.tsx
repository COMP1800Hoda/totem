import {flexRender, Table} from "@tanstack/react-table";
import {Storybook} from "../../../types/Storybook.ts";

export const TableBody= ({ table }: {table:Table<Storybook>}) => {
  return (
    <tbody>
    {table.getRowModel().rows.map((row) => (
      <tr key={row.id} style={{ borderBottom: "1px solid #ddd" }}>
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
  );
};