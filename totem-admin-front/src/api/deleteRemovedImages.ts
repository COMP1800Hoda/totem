import imagekit from '../imagekit.js';

export async function deleteRemovedImages({
  oldImageNames,
  newImageNames,
  folderPath,
}: {
  oldImageNames: string[];
  newImageNames: string[];
  folderPath: string;
}): Promise<void> {
  const removedNames = oldImageNames.filter(name => !newImageNames.includes(name));
  if (removedNames.length === 0) return;

  try {
    const files = await imagekit.listFiles({ path: folderPath });

    const deletions = files
      .filter(file => 'fileId' in file && removedNames.includes(file.name))
      .map(async (file) => {
        try {
          // @ts-ignore
          await imagekit.deleteFile(file.fileId);
          console.log(`Deleted removed image: ${file.name}`);
        } catch (err) {
          console.warn(`Failed to delete image: ${file.name}`, err);
        }
      });

    await Promise.all(deletions);
  } catch (err) {
    console.error('Error fetching files from ImageKit:', err);
  }
}