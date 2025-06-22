import fs from "fs";
import { keywords, sites, usernames } from "./remoteFetch";

// Function to export filter data to a JSON file
// This function converts the keywords and usernames arrays into a JSON object
// and writes it to a file named "filterData.json" in the current directory.

function exportFilters() {
    const filterData = {
        keywords: keywords,
        usernames: usernames,
        sites: sites
    };
    const jsonString = JSON.stringify(filterData, null, 2);
    fs.writeFile("filterData.json", jsonString, (err) => {
        if (err) {
            console.error("Error writing filter data to file:", err);
        } else {
            console.log("Filter data successfully written to filterData.json");
        }
    });
}

// Function to import filter data from a JSON file
// This function reads the JSON file and updates the keywords and usernames arrays
// with the data from the file. \
// It clears the existing arrays before importing new data if append is false.
// If append is true, it appends the new data to the existing arrays.

function importFilters(filePath: string, append: boolean = false) {
    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading filter data from file:", err);
            return;
        }
        try {
            const filterData = JSON.parse(data);
            if (!append) {
                keywords.length = 0; // Clear existing keywords
                usernames.length = 0; // Clear existing usernames
                sites.length = 0; // Clear existing sites
            }
            keywords.push(...(filterData.keywords || [])); // Import new keywords
            usernames.push(...(filterData.usernames || [])); // Import new usernames
            sites.push(...(filterData.sites || [])); // Import new sites
            console.log("Filter data successfully imported from", filePath);
        } catch (err) {
            console.error("Error parsing filter data from file:", err);
        }
    });
}

export { exportFilters, importFilters };