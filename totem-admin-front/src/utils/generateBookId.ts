import Parse from '../database.js';

/**
 * Generates a unique book ID in the format: [6 lowercase letters]_[8 digits] (e.g., abcdef_12345678).
 * Checks the 'storybook' table in Back4App (Parse) to ensure the ID is not already in use.
 * Tries up to 100 times to generate a unique ID before giving up.
 *
 * @returns {Promise<string|null>} A unique book ID, or null if a unique ID could not be generated.
 */

export const generateBookID = async () => {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  console.log('start id generation')

  const createRandomID = () => {
    const parts = [];

    // random prefix (6 alphabets)
    for (let i = 0; i < 6; i++) {
      parts.push(letters.charAt(Math.floor(Math.random() * letters.length)));
    }

    // add underscore
    parts.push('_');

    // random 8 numbers
    for (let i = 0; i < 8; i++) {
      parts.push(numbers.charAt(Math.floor(Math.random() * numbers.length)));
    }

    return parts.join('');
  };

  let unique = false;
  let newID = '';

  let trial = 0;
  const MAX_TRIALS = 100;
  while (!unique && trial < MAX_TRIALS) {
    trial++;
    newID = createRandomID();


    const Storybook = Parse.Object.extend('storybook');
    const query = new Parse.Query(Storybook);
    query.equalTo('storybook_id', newID);

    const result = await query.first();

    if (!result) {
      unique = true;
    }
  }

  if (!unique) {
    alert('Please try again');
    return null;
  }

  console.log('newId', newID)

  return newID;
};