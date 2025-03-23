import Parse from '../../src/database';
import { Storybook } from '../types/Storybook.ts';

export async function fetchStorybooks(
  page: number,
  searchType: string = 'storybook_title',
  searchKeyword: string = '',
  pageSize: number = 30,
): Promise<Storybook[]> {
  const skip = page * pageSize;
  const limit = pageSize;

  try {
    const query = new Parse.Query('storybook');
    query.limit(limit);
    query.skip(skip);
    query.ascending('index');


    if (searchKeyword?.length > 0 && searchType?.length > 0) {
      if (searchType === 'index') {
        // search exact matched number
        query.equalTo(searchType, Number(searchKeyword))
      } else {
        // Add search by key and keyword (case-sensitive)
        query.matches(searchType, searchKeyword, 'i');
      }
    }

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