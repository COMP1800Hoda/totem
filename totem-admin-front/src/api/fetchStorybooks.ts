import Parse from '../../src/database'; // Make sure Parse is initialized correctly
import { Storybook } from '../types/Storybook.ts';

export async function fetchStorybooks(page: number, pageSize: number = 30): Promise<Storybook[]> {
  const skip = page * pageSize;
  const limit = pageSize;

  try {
    const query = new Parse.Query('storybookTesting');
    // const query = new Parse.Query('storybook');
    query.limit(limit);
    query.skip(skip);

    // Execute the query
    const results = await query.find();

    // If no results are found, you can handle it accordingly
    if (results.length === 0) {
      throw new Error("No storybooks found");
    }

    // Return the results as an array of Storybook objects
    return results.map(result => result.toJSON() as Storybook);
  } catch (error) {
    console.error("Error fetching storybooks:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}