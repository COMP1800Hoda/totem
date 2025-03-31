export interface Storybook {
  objectId: string | null;
  index: number;
  storybook_id: string;
  admin_id: number;
  created_by: createdBy[] | null;
  storybook_title: string;
  storybook_description: string | null;
  paid_storybook: boolean;
  language: string | null;
  genre: string[] | null;
  published: string | null;
  published_in: string | null;
  publisher: string | null;
  ISBN: string | null;
  contributed_by: string | null;
  storybook_image_name: string[];
  storybook_image_url: string[];
  cover_image_url: string;
  cover_image_name: string;
  Age: string | null;
}

type createdBy = {
  role: string;
  name: string;
}