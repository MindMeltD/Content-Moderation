import { mutateDOM } from "../blocker/blocker.ts";
import {containsUsername, containsKeyword} from "../filter/exact/simpleFilter.ts";
import { findAllNodeTypes } from "../DOMInteraction/DOMSelector.ts";


const applicableTags : string[] = [
    'ytd-video-renderer',           //search results
    'ytd-compact-video-renderer',   // compact video recommendations
    'ytd-rich-item-renderer',       // Homepage recommendations container
    'ytd-rich-grid-media',          // Homepage recommendations content within the container
]


export async function recomModerator() {
    const nodes = findAllNodeTypes(applicableTags);
    if (nodes.length === 0) 
        return;
    else {
        nodes.map(node => {
            const userNameScore = containsUsername(node, '#text > a'); // Check for usernames in the node
            const keywordScore = containsKeyword(node); // Check for keywords in the node
            const toxicityScore = userNameScore + keywordScore;
            if (toxicityScore >= 5) {
                mutateDOM(node, toxicityScore);
            }
        });
    }
}

export { applicableTags as recomApplicableTags }; // Exporting for potential use in other modules