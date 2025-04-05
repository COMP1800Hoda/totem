import Parse from '../database.js';
import imagekit from '../imagekit.js';

export async function deleteStorybook(storybook_id: string): Promise<void> {
  try {
    const query = new Parse.Query('storybook');
    query.equalTo('storybook_id', storybook_id);
    const result = await query.first();

    if (result) {
      await result.destroy();
      console.log(`Storybook ${storybook_id} deleted from DB`);
    }


    const folderPaths = [
      `/book-cover-images/${storybook_id}`,
      `/book-images/${storybook_id}`,
    ];

    for (const folderPath of folderPaths) {
      // Delete all images
      const files = await imagekit.listFiles({ path: folderPath });
      for (const file of files) {
        // @ts-ignore
        await imagekit.deleteFile(file.fileId);
        console.log(`Deleted from Imagekit: ${file.name}`);
      }

      // Delete folder
      await deleteImagekitFolder(folderPath);
    }
  } catch (err) {
    console.error(`Error occurred while deleting: ${storybook_id}`, err);
    throw err;
  }
}

async function deleteImagekitFolder(folderPath: string) {
  try {
    await imagekit.deleteFolder(folderPath);
    console.log(` Folder deleted: ${folderPath}`);
  } catch (e) {
    console.warn(`Failed to delete folder ${folderPath}.`);
    console.error(e)
  }
}