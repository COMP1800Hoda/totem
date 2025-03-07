// import { useEffect, useState } from 'react';
// import { useAtom } from 'jotai';
// // https://tanstack.com/query/latest/docs/framework/react/guides/infinite-queries
// import {
//   keepPreviousData,
//   useInfiniteQuery,
//   useQueryClient,
// } from '@tanstack/react-query';
//
// import { Course, CourseApiResponse, CourseFormat } from '../types';
// import {
//   courseKeyword,
//   CourseMeta,
//   fullTimeCoursesAtom,
//   fullTimeCoursesMetaAtom,
//   partTimeCoursesAtom,
//   partTimeCoursesMetaAtom,
// } from '../state/courses/atom.ts';
//
// type useInfiniteCourseQueryProps = {
//   keyword: string;
//   courseFormat: CourseFormat;
//   fetchSize: number;
// };
//
// const getCourseFormat = (courseFormat: CourseFormat) =>
//   courseFormat === CourseFormat.FULL
//     ? fullTimeCoursesAtom
//     : partTimeCoursesAtom;
//
// const getCourseMetaFormat = (courseFormat: CourseFormat) =>
//   courseFormat === CourseFormat.FULL
//     ? fullTimeCoursesMetaAtom
//     : partTimeCoursesMetaAtom;
//
// export const useInfiniteCourseQuery = ({
//   keyword,
//   courseFormat,
//   fetchSize,
// }: useInfiniteCourseQueryProps) => {
//   const queryClient = useQueryClient();
//   const [, setCourses] = useAtom<Course[]>(getCourseFormat(courseFormat));
//   const [meta, setMeta] = useAtom<CourseMeta>(
//     getCourseMetaFormat(courseFormat)
//   );
//   const [previousKeyword, setPreviousKeyword] = useAtom(courseKeyword);
//   const [isLoading, setIsLoading] = useState(false);
//
//   useEffect(() => {
//     const cachedData = queryClient.getQueryData([
//       'course',
//       keyword,
//       courseFormat,
//     ]);
//
//     if (!cachedData || previousKeyword !== keyword) {
//       setCourses([]);
//       setPreviousKeyword(keyword);
//       setIsLoading(true);
//       setMeta({
//         totalElements: 0,
//         totalPages: 0,
//         pageSize: 0,
//         currentPage: 0,
//       });
//
//       queryClient.resetQueries(['course', keyword, courseFormat]); // clear
//     }
//   }, [keyword]);
//
//   const query = useInfiniteQuery<CourseApiResponse>({
//     queryKey: ['course', keyword, courseFormat],
//     queryFn: async ({ pageParam = meta.currentPage }) => {
//       const cachedPage = queryClient.getQueryData([
//         'course',
//         keyword,
//         courseFormat,
//         pageParam,
//       ]);
//       if (cachedPage) return cachedPage;
//
//       const fetchedData = await getCoursesByKeyword({
//         keyword,
//         format: courseFormat,
//         page: pageParam as number,
//         size: fetchSize,
//       }); //pretend api call
//
//       queryClient.setQueryData(
//         ['course', keyword, courseFormat, pageParam], // Store fetched data per page
//         fetchedData
//       );
//
//       setCourses((prev: Course[]) => [...prev, ...fetchedData.content]);
//       setMeta({
//         totalElements: fetchedData.page.totalElements,
//         totalPages: fetchedData.page.totalPages,
//         pageSize: fetchedData.page.size,
//         currentPage: fetchedData.page.number,
//       });
//
//       setIsLoading(false);
//       return fetchedData;
//     },
//     initialPageParam: meta.currentPage,
//     getNextPageParam: (lastPage) => {
//       return lastPage.page.number < lastPage.page.totalPages - 1
//         ? lastPage.page.number + 1
//         : undefined;
//     },
//     refetchOnWindowFocus: false,
//     placeholderData: keepPreviousData,
//   });
//
//   return { ...query, isLoading };
// };
