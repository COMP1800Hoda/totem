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
    import.meta.env.VITE_APP_ID,
    import.meta.env.VITE_JS_KEY
);

ParseConfig.serverURL = import.meta.env.VITE_SERVER_URL;

export default ParseConfig;