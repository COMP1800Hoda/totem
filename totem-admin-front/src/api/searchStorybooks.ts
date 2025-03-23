import Parse from '../../src/database';
import { Storybook } from '../types/Storybook.ts';

export async function searchStorybooks(
  page: number,
  pageSize: number = 30,
  key: string,
  keyword: string,
): Promise<Storybook[]> {
  if (typeof key !== 'string' || key.length > 1) {
    console.warn("Please select a key");
    return [];
  }
  if (typeof keyword !== 'string' || keyword.length < 1) {
    console.warn("Please enter a keyword")
    return [];
  }

  const skip = page * pageSize;
  const limit = pageSize;

  try {
    const query = new Parse.Query('storybook');
    query.limit(limit);
    query.skip(skip);
    query.ascending('index');

    // Add search by key and keyword (case-sensitive)
    query.contains(key, keyword)

    // Execute the query
    const results = await query.find();

    // If no results are found, you can handle it accordingly
    if (results.length === 0) {
      throw new Error("No storybooks found");
    }

    // Return the results as an array of Storybook objects
    return results.map((result:Parse.Object) => result.toJSON() as Storybook);
  } catch (error) {
    console.error("Error fetching storybooks:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}