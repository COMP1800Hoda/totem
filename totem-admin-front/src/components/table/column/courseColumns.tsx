import { Text } from '@mantine/core';
import { ColumnDef } from '@tanstack/react-table';
import { Storybook } from '../../../types/Storybook.ts';


export const courseColumns: ColumnDef<Storybook>[] = [
  // {
  //   accessorKey: 'number',
  //   header: 'Course Code',
  //   size: 120,
  //   cell: (info) => {
  //     return (
  //       <Text className="tb-course-cell-code" size="sm" color="orange" fw="500">
  //         {`${info.getValue() || 'N/A'}`}
  //       </Text>
  //     );
  //   },
  // },
  // {
  //   accessorKey: 'name',
  //   header: 'Course Name',
  //   minSize: 320,
  // },
  // {
  //   accessorKey: 'program',
  //   header: 'Program',
  //   minSize: 300,
  //   accessorFn: (program) => program.name,
  // },
  // {
  //   // TODO: change key names based on backend data
  //   accessorKey: 'reviews',
  //   header: 'Reviews',
  //   minSize: 40,
  //   maxSize: 100,
  //   cell: (info) => (
  //     <span className="cell-num">
  //       {typeof info.getValue() === 'number' ? info.getValue() + 'reviews' : 0}
  //     </span>
  //   ),
  // },
  // {
  //   accessorKey: 'liked',
  //   header: 'Liked',
  //   size: 80,
  //   cell: (info) => (
  //     <span className="cell-num">{`${info.getValue() || 'N/A'}`}</span>
  //   ),
  // },
  // {
  //   accessorKey: 'quality',
  //   header: 'Quality',
  //   size: 80,
  //   cell: (info) => (
  //     <span className="cell-num">{`${info.getValue() || 'N/A'}`}</span>
  //   ),
  // },
  // {
  //   accessorKey: 'difficulty',
  //   header: 'Difficulty',
  //   size: 80,
  //   cell: (info) => (
  //     <span className="cell-num">{`${info.getValue() || 'N/A'}`}</span>
  //   ),
  // },
];
