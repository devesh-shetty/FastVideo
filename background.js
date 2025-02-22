// Keep service worker active
chrome.runtime.onInstalled.addListener(() => {
  console.log('FastVideo Extension installed');
});

// Handle both keyboard command and click
function executeSpeedUp(tab) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['config.js', 'core.js']
  });
}

// Handle keyboard commands
chrome.commands.onCommand.addListener((command, tab) => {
  if (command === '_execute_action') {
    executeSpeedUp(tab);
  } else if (command === 'instant-undo') {
    chrome.tabs.sendMessage(tab.id, {command: 'instant-undo'});
  }
});

// Handle icon click
chrome.action.onClicked.addListener(function (tab) {
  executeSpeedUp(tab);
});
