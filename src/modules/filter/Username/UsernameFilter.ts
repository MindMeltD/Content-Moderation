import { usernames } from '../manager/remoteFetch.js';
import { extractUsername } from '../../DOMInteraction/DOMSelector.ts';

// Returns an array of usernames found in the nodes
function containsUsername(node : HTMLElement, selector: string): number {

    // Function to extract the username from the node using the provided selector
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

export { containsUsername };