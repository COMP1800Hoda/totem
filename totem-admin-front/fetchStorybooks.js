import fetch from 'node-fetch';

const fetchStorybooks = async () => {
    try {
        const response = await fetch("https://parseapi.back4app.com/classes/storybook", {
            method: "GET",
            headers: {
                "X-Parse-Application-Id": "XWNVzANvs7w6pYMl4fZWLCcikgXdMvCZhEnI48sH",
                "X-Parse-REST-API-Key": "mRZK1BOLh5EIaOR9Ircc2OhX5OU28aidSsZAtyJP",
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Storybooks fetched successfully:", data.results);
        return data.results; // Array of storybooks
    } catch (error) {
        console.error("Error fetching storybooks:", error.message);
        return [];
    }
};

// Call the function
fetchStorybooks();
