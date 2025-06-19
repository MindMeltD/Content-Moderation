import { recomApplicableTags } from "./recomModerator.ts";




function getRelevantAnchorElement(node: HTMLElement): HTMLAnchorElement | undefined {
    // Try to find an anchor element within the node or return undefined if not found
    if (node instanceof HTMLAnchorElement) {
        return node;
    }

    return node.querySelector('a') as HTMLAnchorElement | undefined;
    
}


// Function to extract the channel ID from a YouTube anchor element
function getChannelID(node: HTMLAnchorElement): string {

    if (!node || !(node instanceof HTMLAnchorElement)) {
        console.warn("Invalid node provided to getChannelID");
        return '';
    }

    // Attempt to extract the channel ID from the node's attributes or text content
    const channelID = node.href.match(/\/channel\/(UC[\w-]+)/)?.[1] || '';

    return channelID;
}

