import { useEffect, useState } from 'react';
import { useInfiniteQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { Course, CourseApiResponse, CourseFormat, CourseMeta } from '../types';
import { getCoursesByKeyword } from '../api/getCoursesByKeyword.ts';

type useInfiniteCourseQueryProps = {
  keyword: string;
  courseFormat: CourseFormat;
  fetchSize: number;
};

export const useInfiniteCourseQuery = ({ keyword, courseFormat, fetchSize }: useInfiniteCourseQueryProps) => {
  const queryClient = useQueryClient();
  const [courses, setCourses] = useState<Course[]>([]);
  const [meta, setMeta] = useState<CourseMeta>({
    totalElements: 0,
    totalPages: 0,
    pageSize: 0,
    currentPage: 0,
  });
  const [previousKeyword, setPreviousKeyword] = useState<string>(keyword);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (previousKeyword !== keyword) {
      setCourses([]);
      setPreviousKeyword(keyword);
      setIsLoading(true);
      setMeta({
        totalElements: 0,
        totalPages: 0,
        pageSize: 0,
        currentPage: 0,
      });
      queryClient.resetQueries(['course', keyword, courseFormat]);
    }
  }, [keyword]);

  const query = useInfiniteQuery<CourseApiResponse>({
    queryKey: ['course', keyword, courseFormat],
    queryFn: async ({ pageParam = meta.currentPage }) => {
      const cachedPage = queryClient.getQueryData(['course', keyword, courseFormat, pageParam]);
      if (cachedPage) return cachedPage;

      const fetchedData = await getCoursesByKeyword({
        keyword,
        format: courseFormat,
        page: pageParam as number,
        size: fetchSize,
      });

      queryClient.setQueryData(['course', keyword, courseFormat, pageParam], fetchedData);
      setCourses((prev) => [...prev, ...fetchedData.content]);
      setMeta({
        totalElements: fetchedData.page.totalElements,
        totalPages: fetchedData.page.totalPages,
        pageSize: fetchedData.page.size,
        currentPage: fetchedData.page.number,
      });
      setIsLoading(false);
      return fetchedData;
    },
    initialPageParam: meta.currentPage,
    getNextPageParam: (lastPage) => {
      return lastPage.page.number < lastPage.page.totalPages - 1 ? lastPage.page.number + 1 : undefined;
    },
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  return { ...query, isLoading, courses, meta };
};
