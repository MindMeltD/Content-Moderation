import { keywords, usernames, sites, storeFilters } from "./remoteFetch";

// Functions to add and remove filtered usernames and keywords
function addKeyword(keyword: string) {
    if (!keywords.includes(keyword)) {
        keywords.push(keyword);
        storeFilters();
    }
}

function removeKeyword(keyword: string) {
    const index = keywords.indexOf(keyword);
    if (index !== -1) {
        keywords.splice(index, 1);
        storeFilters();
    }
}

function addUsername(username: string) {
    if (!usernames.includes(username)) {
        usernames.push(username);
        storeFilters();
    }
}

function removeUsername(username: string) {
    const index = usernames.indexOf(username);
    if (index !== -1) {
        usernames.splice(index, 1);
        storeFilters();
    }
}

function addSite(site: string) {
    if (!sites.includes(site)) {
        sites.push(site);
        storeFilters();
    }
}

function removeSite(site: string) {
    const index = sites.indexOf(site);
    if (index !== -1) {
        sites.splice(index, 1);
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