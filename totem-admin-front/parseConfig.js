import ParseConfig from "parse/node.js";
import dotenv from 'dotenv';

dotenv.config(); // Load env variables

ParseConfig.initialize(
    process.env.BACK4APP_APP_ID,
    process.env.BACK4APP_JS_KEY
);

ParseConfig.serverURL = process.env.BACK4APP_SERVER_URL;

export default ParseConfig;
