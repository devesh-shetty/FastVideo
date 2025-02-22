// Keep service worker active
chrome.runtime.onInstalled.addListener(() => {
  console.log('FastVideo Extension installed');

  // Initialize default config in storage
  chrome.storage.sync.get(null, (storedConfig) => {
    if (Object.keys(storedConfig).length === 0) {
      const defaultConfig = {
        rewindDuration: 5,
        normalSpeedDuration: 3,
        transitionDuration: 0.3
      };
      chrome.storage.sync.set(defaultConfig);
    }
  });
});

// Handle config updates and retrieval
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'getConfig') {
    chrome.storage.sync.get(null, (config) => {
      sendResponse(config);
    });
    return true; // Keep the message channel open for async response
  }

  if (request.type === 'updateConfig') {
    chrome.storage.sync.set(request.config, () => {
      sendResponse({ success: true });
    });
    return true;
  }
});

// Handle both keyboard command and click
function executeSpeedUp(tab) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['state.js', 'core.js']
  });
}

// Handle keyboard commands
chrome.commands.onCommand.addListener((command, tab) => {
  if (command === '_execute_action') {
    executeSpeedUp(tab);
  } else if (command === 'instant-undo') {
    chrome.tabs.sendMessage(tab.id, { command: 'instant-undo' });
  }
});

// Handle icon click
chrome.action.onClicked.addListener(function (tab) {
  executeSpeedUp(tab);
});
