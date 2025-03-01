// Import Parse SDK -> change this
/**
 * Vite automatically externalizes the events module for browser compatibility. 
 * The Parse SDK relies on events.EventEmitter, which isn't available in Vite's browser environment.
 * explicitly use the browser version of Parse:
 */
import Parse from "parse/dist/parse.min.js";

// Initialize with your Back4app keys
Parse.initialize("XWNVzANvs7w6pYMl4fZWLCcikgXdMvCZhEnI48sH", "NFHym7RCYmwrHL2Ohqr7769mcUt66ikBF13liUdt");  
Parse.serverURL = 'https://parseapi.back4app.com';

export default Parse;
