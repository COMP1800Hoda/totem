// import Parse from "parse";
import Parse from "parse/dist/parse.min.js";

// Initialize with your Back4app keys
Parse.initialize(
    import.meta.env.VITE_APP_ID,
    import.meta.env.VITE_JS_KEY
);

Parse.serverURL = import.meta.env.VITE_SERVER_URL;

export default Parse;