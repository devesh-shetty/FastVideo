// Keep service worker active
chrome.runtime.onInstalled.addListener(() => {
  console.log('FastVideo Extension installed');
});

// Existing click handler
chrome.action.onClicked.addListener(function (tab) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['core.js']
  });
});
