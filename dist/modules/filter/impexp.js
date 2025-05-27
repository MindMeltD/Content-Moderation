const externalFileURL = "https://cdn.jsdelivr.net/gh/Eonarchy/p2025/filter.json";
let keywords = [];
let usernames = [];
// Fetches external filter data from a JSON file
// and stores it in the keywords and usernames arrays.
const fetchFilters = async () => {
    try {
        const response = await fetch(externalFileURL);
        if (!response.ok) {
            console.error(`Failed to fetch filter data: ${response.statusText}`);
            return;
        }
        const data = await response.json();
        keywords = data.keywords || [];
        usernames = data.usernames || [];
    }
    catch (error) {
        console.error("Error fetching filter data:", error);
    }
};
// Store the fetched data in local storage for later use
// This function is called after the data is fetched
// and is used to persist the data across sessions.
const storeFilters = () => {
    if (keywords.length === 0 && usernames.length === 0) {
        console.warn("No data to store in local storage.");
        return;
    }
    const filterData = {
        keywords: keywords,
        usernames: usernames
    };
    localStorage.setItem("filterData", JSON.stringify(filterData));
};
// Function to load data from local storage
const loadFilters = () => {
    const storedData = localStorage.getItem("filterData");
    if (storedData) {
        const data = JSON.parse(storedData);
        // If there are no keywords or usernames in local storage, fetch them from the external file
        if (!data.keywords || !data.usernames) {
            console.warn("No keywords or usernames found in local storage. Fetching from external file...");
            fetchFilters().then(() => {
                storeFilters();
            });
            return;
        }
        keywords = data.keywords || [];
        usernames = data.usernames || [];
    }
    else {
        // If there is no local storage, fetch them from the external file
        console.warn("No local storage found. Fetching from external file...");
        fetchFilters().then(() => {
            storeFilters();
        });
        return;
    }
};
fetchFilters();
storeFilters();
loadFilters();
export { fetchFilters, storeFilters, loadFilters, keywords, usernames };
