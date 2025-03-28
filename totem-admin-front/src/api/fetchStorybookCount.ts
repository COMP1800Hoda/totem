import Parse from '../../src/database';

export async function fetchStorybookCount(
  searchType: string = 'storybook_title',
  searchKeyword: string = ''
): Promise<number> {
  try {
    const countQuery = new Parse.Query('storybook');

    if (searchKeyword?.length > 0 && searchType?.length > 0) {
      if (searchType === 'index') {
        // Convert to number and search for exact match
        const indexNumber = Number(searchKeyword);
        if (!isNaN(indexNumber)) {
          countQuery.equalTo(searchType, indexNumber);
        } else {
          console.warn("Invalid index number for count query");
          return 0;
        }
      } else if (searchType === 'createdAt') {
        const [month, day, year] = searchKeyword.split('/');
        if (month && day && year) {
          const start = new Date(`20${year}-${month}-${day}T00:00:00.000Z`);
          const end = new Date(`20${year}-${month}-${day}T23:59:59.999Z`);
          countQuery.greaterThanOrEqualTo('createdAt', start);
          countQuery.lessThan('createdAt', end);
        } else {
          console.warn("Invalid date format. Use MM/DD/YY.");
          return 0;
        }
      } else {
        // Case-insensitive regex match
        countQuery.matches(searchType, searchKeyword, 'i');
      }
    }

    const totalCount = await countQuery.count();
    return totalCount;
  } catch (error) {
    console.error("Error fetching storybook count:", error);
    throw error;
  }
}