import identifyAndFilterHateSpeech from "./modules/blocker/blocker.ts";

// Observe new DOM content and re-run filtering
function observeDynamicContent() {
  const observer = new MutationObserver(() => {
    identifyAndFilterHateSpeech();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

// Initial load
identifyAndFilterHateSpeech();

// Enable dynamic monitoring
observeDynamicContent();

console.log("Hate Speech Detector Content Script Loaded");