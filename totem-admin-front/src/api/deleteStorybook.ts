import Parse from '../../src/database';
import imagekit from '../../src/utils/imagekit'; // 위에서 만든 imagekit 모듈을 import

export async function deleteStorybook(storybook_id: string): Promise<void> {
  try {
    // Parse에서 삭제
    const query = new Parse.Query('StoryBook_Admin');
    query.equalTo('BookID', storybook_id);
    const result = await query.first();

    if (result) {
      await result.destroy();
      console.log(`Storybook ${storybook_id} 삭제됨`);
    }

    // ImageKit에서 이미지 삭제
    const folderPaths = [
      `/book-cover-images/${storybook_id}`,
      `/book-images/${storybook_id}`,
    ];

    for (const folderPath of folderPaths) {
      const files = await imagekit.listFiles({ path: folderPath });
      for (const file of files) {
        await imagekit.deleteFile(file.fileId);
        console.log(`ImageKit에서 삭제됨: ${file.name}`);
      }
    }
  } catch (err) {
    console.error(`삭제 중 에러 발생: ${storybook_id}`, err);
    throw err;
  }
}