// Save settings
function saveOptions() {
  const config = {
    rewindDuration: parseFloat(document.getElementById('rewindDuration').value),
    normalSpeedDuration: parseFloat(document.getElementById('normalSpeedDuration').value),
    transitionDuration: parseFloat(document.getElementById('transitionDuration').value)
  };

  chrome.storage.sync.set(config, () => {
    updateValueDisplays(config);
  });
}

// Update value displays
function updateValueDisplays(config) {
  document.getElementById('rewindValue').textContent = config.rewindDuration + 's';
  document.getElementById('normalSpeedValue').textContent = config.normalSpeedDuration + 's';
  document.getElementById('transitionValue').textContent = config.transitionDuration + 's';
}

// Load saved settings
function restoreOptions() {
  chrome.storage.sync.get(DEFAULT_CONFIG, (config) => {
    document.getElementById('rewindDuration').value = config.rewindDuration;
    document.getElementById('normalSpeedDuration').value = config.normalSpeedDuration;
    document.getElementById('transitionDuration').value = config.transitionDuration;
    updateValueDisplays(config);
  });
}

// Reset to defaults
function resetOptions() {
  chrome.storage.sync.set(DEFAULT_CONFIG, () => {
    restoreOptions();
  });
}

// Initialize event listeners after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Load initial settings
  restoreOptions();

  // Add event listeners for changes
  document.getElementById('rewindDuration').addEventListener('change', saveOptions);
  document.getElementById('normalSpeedDuration').addEventListener('change', saveOptions);
  document.getElementById('transitionDuration').addEventListener('change', saveOptions);
  document.getElementById('reset').addEventListener('click', resetOptions);

  // Add live update for value displays
  ['rewindDuration', 'normalSpeedDuration', 'transitionDuration'].forEach(id => {
    const input = document.getElementById(id);
    const display = document.getElementById(id + 'Value');

    input.addEventListener('input', (e) => {
      display.textContent = e.target.value + 's';
    });
  });
});