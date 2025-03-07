import axios from 'axios';

import { Course, CourseFormat, PaginatedResponse } from '../types';

type getCoursesByKeywordResponse = PaginatedResponse<Course> & {
  format: string;
};

type getCoursesByKeywordType = {
  keyword: string;
  format: CourseFormat;
  page?: number;
  size?: number;
};

export const getCoursesByKeyword = async ({
  keyword,
  format,
  page = 0,
  size = 50,
}: getCoursesByKeywordType): Promise<getCoursesByKeywordResponse> => {
  try {
    const response = await axios.get(`/api/courses/search`, {
      params: { keyword, page, size, format },
    });
    return response.data;
  } catch (error: unknown) {
    console.error('Error fetching courses:', error);
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch courses'
      );
    } else {
      throw new Error('Failed to fetch courses');
    }
  }
};
