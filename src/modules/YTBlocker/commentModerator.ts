import { findAllNodeTypes } from "../DOMInteraction/DOMSelector"
import {containsUsername, containsKeyword} from "../filter/exact/simpleFilter.ts";
import { mutateDOM } from "../blocker/blocker.ts";

const selectors = [
  'ytd-comment-thread-renderer',   // YouTube comments
  'ytd-continuation-item-renderer'
]

function moderateComments(nodes: HTMLElement[]): void {
    if (nodes.length === 0) {
        return; // No nodes to process
    }
        
    nodes.forEach(node => {
        if (node.tagName === 'ytd-comment-thread-renderer') {
            const userNameScore = containsUsername(node, '#text'); // Check for usernames in the node
            const keywordScore = containsKeyword(node); // Check for keywords in the node
            const toxicityScore = userNameScore + keywordScore;
            if (toxicityScore >= 5) {
                mutateDOM(node, toxicityScore);
            }
        }
    });
}


export async function commentModerator() {
    const nodes = findAllNodeTypes(selectors);
    if (nodes.length === 0){
        return
    }
    moderateComments(nodes);
}