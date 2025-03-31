import imagekit from '../../imagekit.js';


export async function deleteRemovedImages({
  oldImageNames,
  newImageNames,
  folderPath,
}: {
  storybookId: string;
  oldImageNames: string[];
  newImageNames: string[];
  folderPath: string;
}): Promise<void> {
  const removedNames = oldImageNames.filter(name => !newImageNames.includes(name));

  if (removedNames.length === 0) return;

  try {
    const files = await imagekit.listFiles({path: folderPath});

    for (const file of files) {
      if (removedNames.includes(file.name)) {
        await imagekit.deleteFile(file.fileId);
        console.log(`Deleted removed image: ${file.name}`);
      }
    }
  } catch (err) {
    console.error('Error deleting removed images', err);
  }
}