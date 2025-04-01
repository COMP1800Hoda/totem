import imagekit from "../imagekit.js";

export async function deleteImageByName(folderPath: string, fileName: string) {
  const files = await imagekit.listFiles({ path: folderPath });
  // @ts-ignore
  const file = files.find(f => f.name === fileName);
  if (file && 'fileId' in file) {
    await imagekit.deleteFile(file.fileId);
    console.log(`Deleted ${fileName} from ${folderPath}`);
  } else {
    console.warn(`No file named ${fileName} found in ${folderPath}`);
  }
}