import evaluateToxicity from "../evaluateToxicity.ts";

const selectors = [
  'ytd-reel-item-renderer',   // Shorts feed
  'div[data-ad-preview="message"]', // Facebook posts
  'h1, h2, h3, p, span',     // Generic content
  'article', 'section',      // Forums/blogs
  'div[role="article"]',           // Facebook posts
  'div[role="feed"]',              // Facebook/Instagram content stream
  'yt-formatted-string',           // YouTube comment bodies & descriptions
  'div[dir="auto"]',               // Generic text blocks in modern apps (used a lot in Meta platforms)
];


function isVisible(node: Element): boolean {
  const style = window.getComputedStyle(node);
  return style && style.display !== 'none' && style.visibility !== 'hidden';
}

// This function processes each element, cleans the text, and evaluates its toxicity
async function processElements(elements: Element[]) {
  const tasks = elements.map(async el => {
    const raw = el.innerHTML || '';
    const cleaned = raw
      .replace(/<[^>]*>/g, ' ')   // Strip HTML tags
      .replace(/\s+/g, ' ')       // Normalize spacing
      .toLowerCase()              // Normalize case
      .trim();

    if (cleaned.length < 5) return; // Skip trivial content

    const result = await evaluateToxicity(cleaned);
    if (result >= 5) {
      mutateDOM(el, result);
    }
  });

  await Promise.allSettled(tasks);
}

// This function mutates the DOM based on the toxicity score
export function mutateDOM(node: Element, result: number) {
  let HTMLnode = node as HTMLElement;

  // If the node is not an HTMLElement, we cannot apply styles or attributes
  if (!(node instanceof HTMLElement)) return;

  if (result >= 5) {
    HTMLnode.style.filter = "blur(5px)";
    HTMLnode.setAttribute("data-hate-filtered", "true");
  }

}

// Main function to identify and filter hate speech in visible text nodes
async function identifyAndFilterHateSpeech() {
  console.log("Starting hate speech detection...");
  let nodes = document.querySelectorAll(selectors.join(','));
  let visibleNodes = Array.from(nodes).filter(isVisible);
  // const textNodes = processElements(visibleNodes);
  await processElements(visibleNodes);
}

export default identifyAndFilterHateSpeech;