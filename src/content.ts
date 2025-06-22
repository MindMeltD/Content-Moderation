import identifyAndFilterHateSpeech from "./modules/mutator/mutator.ts";

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

function init(){
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
