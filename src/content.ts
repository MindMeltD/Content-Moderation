import identifyAndFilterHateSpeech from "./modules/blocker/blocker.ts";
import { recomModerator as YTrecomModerator } from "./modules/YTBlocker/recomModerator.ts";

// Observe new DOM content and re-run filtering
function observeDynamicContent() {
  const observer = new MutationObserver(() => {
    identifyAndFilterHateSpeech();
  });

   const recommendationMonitor = new MutationObserver(() => {
    YTrecomModerator();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  recommendationMonitor.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

function init(){
  YTrecomModerator();
  identifyAndFilterHateSpeech();
  observeDynamicContent();
  console.log("Hate Speech Detector Content Script Loaded");
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
}
else {
  init();
}
