import Parse from '../../src/database';
import { Storybook } from '../types/Storybook.ts';

export async function fetchStorybookById(storybook_id: string): Promise<Storybook> {
  try {
    const query = new Parse.Query('storybook');
    query.equalTo('storybook_id', storybook_id);
    query.limit(1);

    // Fetch the object directly by its ID
    const results = await query.find()

    if (results.length === 0) {
      throw new Error(`No storybook found with storybook_idf: ${storybook_id}`);
    }


    return results[0].toJSON() as Storybook;
  } catch (error) {
    console.error(`Error fetching storybook with ID ${storybook_id}:`, error);
    throw error;
  }
}