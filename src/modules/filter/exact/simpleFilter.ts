// Function to check if a string contains any of the keywords
import { keywords, usernames } from '../impexp.js';
import { extractInnerText, extractUsername } from '../../DOMInteraction/DOMSelector.ts';

function containsKeyword(node : HTMLElement): number {
    const innerText = extractInnerText(node);

    if (keywords.length === 0) {
        console.warn("Keyword list is empty. Please fetch the filter data first.");
        return -1;
    }

    // If the innerText contains any of the keywords then return 5
    if (keywords.some(keyword => innerText.includes(keyword))) {
        return 5;
    }

    // If the innerText does not contain any of the keywords then return 0
    return 0;
}

// Takes node, and the type of selector query to find it within the given node
// Returns an array of usernames found in the nodes
function containsUsername(node : HTMLElement, selector: string): number {
    const usernameElement = extractUsername(node, selector);

    if (usernames.length === 0) {
        console.warn("Usernames list is empty. Please fetch the filter data first.");
        return -1;
    }

    // If the username is in usernames then return 5
    if (usernames.includes(usernameElement)) {
        return 5;
    }

    // If the username is not in usernames then return 0
    return 0;
}



export { containsKeyword, containsUsername };