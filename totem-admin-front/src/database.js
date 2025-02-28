import Parse from 'parse';

// ES6 Minimized
// import Parse from 'parse/dist/parse.min.js';
async function initializeParse() {

    
    Parse.serverURL = 'https://parseapi.back4app.com';
    Parse.initialize("XWNVzANvs7w6pYMl4fZWLCcikgXdMvCZhEnI48sH", "NFHym7RCYmwrHL2Ohqr7769mcUt66ikBF13liUdt");  

    console.log("Successfully connected to Parse!");
    try {
        const StorybookAdmin = Parse.Object.extend("storybook_admin");
        const storybookAdmin = new StorybookAdmin();

        storybookAdmin.set("BookTitle", storybook);
        storybookAdmin.set("BookID", 123);
        storybookAdmin.set("Age", 3);

        await storybookAdmin.save();
        console.log("✅ Storybook data saved successfully!");
        alert('Book data saved successfully!');
    } catch (error) {
        console.error("❌ Error saving storybook data:", error);
        alert('Error saving data to the database.');
    }

}
export { initializeParse };