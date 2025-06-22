import * as impexp from"./impexp";
import * as remoteFetch from "./remoteFetchRecord"

// This function updates the filters by exporting the current filters to a file,
// fetching the latest filters from a remote source, and integrating the old filters into the new ones.
// Note: this works mainly because the fetchFilters function in remoteFetch directly updates the keywords and usernames arrays,
// which is then directly updated by the importFilters function in impexp.
// These can then be stored in local storage.

function updateFilterRecords() {
    // Export the current filters to a file
    impexp.exportFilters();

    // Fetch the latest filters from the remote source
    try {
        remoteFetch.fetchFilters();
    } catch (error) {
        console.error("Error fetching remote filters:", error);
    }

    // Integrate the new filters into the local storage
    impexp.importFilters("filterDataRecords.json", true);

    // Store the updated arrays in local storage
    remoteFetch.storeFilters();

    // Export the updated filters to a file
    impexp.exportFilters();
}

// Update the filters when the module is loaded
export { updateFilterRecords };