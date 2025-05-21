// Function to check if a string contains any of the keywords
import { keywords, usernames } from './impexp.js';
const containsKeyword = (str) => {
    if (keywords.length === 0) {
        console.warn("Keywords list is empty. Please fetch the filter data first.");
        return false;
    }
    return keywords.some(keyword => str.toLowerCase().includes(keyword.toLowerCase()));
};
// Function to check if a string contains any of the usernames
const containsUsername = (str) => {
    if (usernames.length === 0) {
        console.warn("Usernames list is empty. Please fetch the filter data first.");
        return false;
    }
    // For each username, check if the lower case version of the username is included in the lower case version of the string
    // This is case insensitive
    // This is useful for checking if a username is mentioned in a comment or post
    return usernames.some(username => str.toLowerCase().includes(username.toLowerCase()));
};
