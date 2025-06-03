import evaluateToxicity from "../evaluateToxicity.ts";

function getVisibleTextNodes(root: Node = document.body): Text[] {
  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node: Node) => {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;

        const style = getComputedStyle(parent);
        if (
          style.display === "none" ||
          style.visibility === "hidden" ||
          style.opacity === "0"
        ) return NodeFilter.FILTER_REJECT;

        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    }
  );

  const textNodes: Text[] = [];
  let currentNode: Node | null;
  while ((currentNode = walker.nextNode())) {
    textNodes.push(currentNode as Text);
  }

  return textNodes;
}

async function processTextNodes(nodes: Text[]) {
  for (const node of nodes) {
    const text = node.nodeValue ?? "";
    const result = await evaluateToxicity(text); // Your unified scoring/filtering function
    
    console.log(`Evaluating text: "${text}" - Score: ${result}`);
    if (result >= 5) {
      mutateDOM(node, result); // Proceed to mutation
    }
  }
}

// This function mutates the DOM based on the toxicity score
function mutateDOM(node: Text, result: number) {
  const parent = node.parentElement;
  if (!parent) return;

  if (result >= 5) {
    parent.style.filter = "blur(5px)";
    parent.setAttribute("data-hate-filtered", "true");
  } else {
    parent.innerHTML = `<span style="color:red;">[Content Removed: Hate Speech]</span>`;
  }
}

// Main function to identify and filter hate speech in visible text nodes
async function identifyAndFilterHateSpeech() {
  console.log("Starting hate speech detection...");
  const textNodes = getVisibleTextNodes();
  await processTextNodes(textNodes);
}

export default identifyAndFilterHateSpeech;