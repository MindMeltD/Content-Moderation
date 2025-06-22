import { filters, storeFilters } from "./remoteFetchRecord";

// Functions to add and remove filtered usernames and keywords
function addKeyword(keyword: string) {
    if (!filters.keywords.includes(keyword)) {
        filters.keywords.push(keyword);
        storeFilters();
    }
}

function removeKeyword(keyword: string) {
    const index = filters.keywords.indexOf(keyword);
    if (index !== -1) {
        filters.keywords.splice(index, 1);
        storeFilters();
    }
}

function addUsername(username: string) {
    if (!filters.usernames.includes(username)) {
        filters.usernames.push(username);
        storeFilters();
    }
}

function removeUsername(username: string) {
    const index = filters.usernames.indexOf(username);
    if (index !== -1) {
        filters.usernames.splice(index, 1);
        storeFilters();
    }
}

function addSite(site: string) {
    if (!filters.sites.includes(site)) {
        filters.sites.push(site);
        storeFilters();
    }
}

function removeSite(site: string) {
    const index = filters.sites.indexOf(site);
    if (index !== -1) {
        filters.sites.splice(index, 1);
        storeFilters();
    }
}

export {
    addKeyword,
    removeKeyword,
    addUsername,
    removeUsername,
    addSite,
    removeSite
};