const externalFileURL = "https://cdn.jsdelivr.net/gh/Eonarchy/p2025/filter.json";

const filters: Record<string, string[]> = {}

const fetchFilters = async () => {
    const response = await fetch(externalFileURL);
    const data = await response.json();

    // Populate filters
    for (const key in data) {
        if (Array.isArray(data[key])) {
            filters[key] = data[key];
        }
    }

}

// Store the fetched data in local storage for later use
const storeFilters = () => {
    
    for (const key in filters) {
        if (filters[key].length === 0) {
            console.warn(`No data to store for ${key} in local storage.`);
        }
    }

    localStorage.setItem("filterDataRecords", JSON.stringify(filters));
}


// Load data from local storage
const loadFilters = () => {

    const storedData = localStorage.getItem("filterDataRecords");

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

        for (const key in data) {
            if (Array.isArray(data[key])) {
                filters[key] = data[key];
            }
        }

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

export { fetchFilters, storeFilters, loadFilters, filters };