// Import Parse SDK
import Parse from 'parse/node.js';

// Initialize with your Back4app keys
Parse.initialize("XWNVzANvs7w6pYMl4fZWLCcikgXdMvCZhEnI48sH", "NFHym7RCYmwrHL2Ohqr7769mcUt66ikBF13liUdt");  
Parse.serverURL = 'https://parseapi.back4app.com';


const createStorybook = async () => {
    try {
      // ✅ Fetch the Admin object using objectId
      const adminObjectId = "r3C1qf63Ks";  // Replace with actual objectId of an Admin
      const Admin = Parse.Object.extend("Admin");
      const adminQuery = new Parse.Query(Admin);
      const admin = await adminQuery.get(adminObjectId); // Get Admin object by objectId
  
      // ✅ Create a new Storybook object
      const Storybook = Parse.Object.extend("storybook");
      const storybook = new Storybook();
      
      storybook.set("storybookId", 6);
      storybook.set("admin_id", admin);  // ✅ Use admin object as a Pointer
      storybook.set("storybook_title", "connecting");
      storybook.set("storybook_description", "testing connecting");
      storybook.set("cover_image_url", "https://ik.imagekit.io/Comp3800Group12/book-cover-images/yusmirr_00500267/yusmirr_00500267-0001-thumb20-mini.jpg?updatedAt=1739601039010");
      storybook.set("paid_storybook", false);
      storybook.set("language", "english");
      storybook.set("type", "fiction");
      storybook.set("genre", "children");
      storybook.set("published", "2025");
      storybook.set("publisher", "na");
      storybook.set("ISBN", "na");
      storybook.set("contributed_by", "na");
  
      // ✅ Save the Storybook object
      await storybook.save();
      console.log("✅ Storybook created successfully!");
    } catch (error) {
      console.error("❌ Error creating storybook:", error.message);
    }
  };
  
  // Run the function
  createStorybook();

