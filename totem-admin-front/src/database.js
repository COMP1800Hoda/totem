/**
 * This database.js file is used to connect to the Back4app database using Parse SDK.
 * This file is used by the frontend of the application to perform CRUD operations on the database.
 * It is not used by the backend of the application.
 * The backend of the application uses ParseConfig.js file to connect to the database.
 * the link to ParseConfig.js file is: totem-admin-front\parseConfig.js
 */

import Parse from "parse/dist/parse.min.js";

// Initialize with your Back4app keys.
/**
 * * @description Initialize Parse with Back4app keys.
 * This is how to import .env variables in Vite.js,
 * which is different from how to import .env variables in Node.js.
 * no need to import dotenv in Vite.js,
 * because Vite.js automatically loads .env variables from .env files.
 */
Parse.initialize(
    "XWNVzANvs7w6pYMl4fZWLCcikgXdMvCZhEnI48sH",
    "NFHym7RCYmwrHL2Ohqr7769mcUt66ikBF13liUdt"
);

Parse.serverURL = "https://parseapi.back4app.com/";

export default Parse;