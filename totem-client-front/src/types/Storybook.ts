export interface Storybook {
  objectId: string | null;
  index: number;
  storybook_id: number;
  admin_id: number;
  created_by: createdBy[] | null;
  storybook_title: string;
  storybook_description: string | null;
  cover_image_url: string;
  paid_storybook: boolean;
  language: string | null;
  genre: string[] | null;
  published: string | null;
  published_in: string | null;
  publisher: string | null;
  ISBN: string | null;
  contributed_by: string | null;
  storybook_image_url: string[];
}

type createdBy = {
  role: string;
  name: string;
}