// Save settings
function saveOptions() {
  const config = {
    rewindDuration: parseFloat(document.getElementById('rewindDuration').value),
    normalSpeedDuration: parseFloat(document.getElementById('normalSpeedDuration').value),
    transitionDuration: parseFloat(document.getElementById('transitionDuration').value)
  };

  chrome.runtime.sendMessage({ type: 'updateConfig', config }, () => {
    updateValueDisplays(config);
    console.log('Settings saved:', config);
  });
}

// Update value displays
function updateValueDisplays(config) {
  const rewindValue = document.getElementById('rewindValue');
  const normalSpeedValue = document.getElementById('normalSpeedValue');
  const transitionValue = document.getElementById('transitionValue');

  if (rewindValue) rewindValue.textContent = config.rewindDuration + 's';
  if (normalSpeedValue) normalSpeedValue.textContent = config.normalSpeedDuration + 's';
  if (transitionValue) transitionValue.textContent = config.transitionDuration + 's';
}

// Load saved settings
function restoreOptions() {
  chrome.runtime.sendMessage({ type: 'getConfig' }, (config) => {
    document.getElementById('rewindDuration').value = config.rewindDuration;
    document.getElementById('normalSpeedDuration').value = config.normalSpeedDuration;
    document.getElementById('transitionDuration').value = config.transitionDuration;
    updateValueDisplays(config);
    console.log('Options restored:', config);
  });
}

// Reset to defaults
function resetOptions() {
  const defaultConfig = {
    rewindDuration: 5,
    normalSpeedDuration: 3,
    transitionDuration: 0.3
  };
  chrome.runtime.sendMessage({ type: 'updateConfig', config: defaultConfig }, () => {
    restoreOptions();
    console.log('Options reset to defaults');
  });
}

// Initialize event listeners after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing options');

  // Load initial settings
  restoreOptions();

  // Add event listeners for changes
  document.getElementById('rewindDuration').addEventListener('change', saveOptions);
  document.getElementById('normalSpeedDuration').addEventListener('change', saveOptions);
  document.getElementById('transitionDuration').addEventListener('change', saveOptions);
  document.getElementById('reset').addEventListener('click', resetOptions);

  // Add live update for value displays
  const idMappings = {
    'rewindDuration': 'rewindValue',
    'normalSpeedDuration': 'normalSpeedValue',
    'transitionDuration': 'transitionValue'
  };

  Object.entries(idMappings).forEach(([inputId, displayId]) => {
    const input = document.getElementById(inputId);
    const display = document.getElementById(displayId);

    if (input && display) {
      input.addEventListener('input', (e) => {
        display.textContent = e.target.value + 's';
      });
    } else {
      console.error(`Failed to initialize live updates for "${inputId}"`);
      if (!input) console.error(`- Input element "#${inputId}" not found`);
      if (!display) console.error(`- Display element "#${displayId}" not found`);
    }
  });
});