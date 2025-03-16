import { ColumnDef } from '@tanstack/react-table';
import { Storybook } from '../../../types/Storybook.ts';

export const bookColumns: ColumnDef<Storybook>[] = [
  {
    accessorKey: 'index',
    header: 'Index',
    size: 60,
    cell: (info) =>
      (<span style={{
        width: "100%",
        textAlign: 'center',
        display: "block"
      }}>{info.getValue() as string}</span>),
  },
  {
    accessorKey: 'cover_image_url',
    header: 'Cover Image',
    size: 140,
    cell: (info) => (
      <img
        src={info.getValue() as string}
        alt="Cover"
        style={{ width: '100px', height: 'auto' }}
      />
    ),
  },
  {
    accessorKey: 'storybook_id',
    header: 'Book ID',
    size: 200,
    cell: (info) => <span>{info.getValue() as string}</span>,
  },
  {
    accessorKey: 'storybook_title',
    header: 'Title',
    minSize: 200,
    cell: (info) => <span className={"rtl"}>{info.getValue() as string}</span>,
  },
  {
    accessorKey: 'genre',
    header: 'Genre',
    size: 150,
    cell: (info) => (
      <span>{(info.getValue() as string[])?.join(', ') || 'N/A'}</span>
    ),
  },
  {
    accessorKey: 'published',
    header: 'Published Date',
    size: 130,
    cell: (info) => <span className={"rtl"}>{info.getValue() as string}</span>,
  },
  {
    accessorKey: 'publisher',
    header: 'Publisher',
    size: 200,
    cell: (info) => <span className={"rtl"}>{info.getValue() as string}</span>,
  },
  {
    accessorKey: 'ISBN',
    header: 'ISBN',
    size: 160,
    cell: (info) => <span>{info.getValue() as string}</span>,
  },
  {
    accessorKey: 'contributed_by',
    header: 'Contributed By',
    size: 160,
    cell: (info) => <span className={"rtl"}>{info.getValue() as string}</span>,
  },
  {
    accessorKey: 'paid_storybook',
    header: 'Paid',
    size: 80,
    cell: (info) => (
      <span>{info.getValue() ? 'Yes' : 'No'}</span>
    ),
  },
];