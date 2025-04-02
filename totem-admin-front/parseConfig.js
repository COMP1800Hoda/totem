/**
 * This database.js file is used to connect to the Back4app database using parse/node.js.
 * This file is used by the backend(nodeJS) of the application to perform operations on the database.
 * It is not used by the frontend of the application.
 * The front of the application uses database.js file to connect to the database.
 * the link to database.js file is: totem-admin-front\src\database.js
 */

import ParseConfig from "parse/node.js";
import dotenv from 'dotenv';

dotenv.config(); // Load env variables

ParseConfig.initialize(
    "XWNVzANvs7w6pYMl4fZWLCcikgXdMvCZhEnI48sH",
    "NFHym7RCYmwrHL2Ohqr7769mcUt66ikBF13liUdt"
);

ParseConfig.serverURL = "https://parseapi.back4app.com";

export default ParseConfig;