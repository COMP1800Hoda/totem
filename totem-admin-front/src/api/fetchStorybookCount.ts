import Parse from '../../src/database';

export async function fetchStorybookCount(): Promise<number> {
  try {
    const countQuery = new Parse.Query('storybook');
    const totalCount = await countQuery.count(); // Gets the total number of storybooks

    return totalCount;
  } catch (error) {
    console.error("Error fetching storybook count:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}