// Function to check if a string contains any of the keywords
import { keywords } from '../manager/remoteFetch.js';
import { extractInnerText } from '../../DOMInteraction/DOMSelector.ts';

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




export { containsKeyword };