// src/types/bookTypes.ts
export interface Page {
  imageUrl: string;
  pageNumber?: number;
}

export interface Book {
  storybook_id: string;
  storybook_title: string;
  storybook_image_url: { [key: string]: string };
  storybook_description: string;
  language: string;
  published: string;
  created_by: { name: string; role: string }[];
  publisher: string;
}