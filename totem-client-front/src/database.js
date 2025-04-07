// import Parse from "parse";
import Parse from "parse/dist/parse.min.js";

// Initialize with your Back4app keys
Parse.initialize(
    "XWNVzANvs7w6pYMl4fZWLCcikgXdMvCZhEnI48sH",
   "NFHym7RCYmwrHL2Ohqr7769mcUt66ikBF13liUdt"
);

Parse.serverURL = "https://parseapi.back4app.com/";

export default Parse;