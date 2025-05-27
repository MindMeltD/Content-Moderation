chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "reportHateSpeech",
    title: "Report hate speech",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "reportHateSpeech" && info.selectionText && tab.id !== undefined) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (selectedText) => {
        fetch("https://your-endpoint.example/report", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            content: selectedText,
            url: window.location.href
          })
        }).catch(err => console.error("Report failed", err));
      },
      args: [info.selectionText]
    });
  }
});