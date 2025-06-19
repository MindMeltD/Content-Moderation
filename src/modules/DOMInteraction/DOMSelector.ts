// This module provides functions to find all nodes of specific types in the DOM
function findAllNodeTypes(applicableTags : string[]): HTMLElement[] {
    const nodes: HTMLElement[] = [];
    for (const tag of applicableTags) {
        const elements = document.querySelectorAll(tag);
        for (const element of elements) {
            if (element instanceof HTMLElement) {
                nodes.push(element);
            }
        }
    }
    return nodes;
}


function extractUsername(node: HTMLElement, selector: string): string {
    const usernameElement = node.querySelector(selector);
    return usernameElement ? usernameElement.textContent?.trim() || '' : '';
}


function extractInnerText(node: HTMLElement): string {
    return node.textContent?.trim() || '';
}




export { findAllNodeTypes, extractUsername, extractInnerText };