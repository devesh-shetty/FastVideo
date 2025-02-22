// Global state management
window.FastVideo = window.FastVideo || {
  // Configuration
  config: {
    rewindDuration: 5,
    normalSpeedDuration: 3,
    transitionDuration: 0.3
  },

  // State tracking
  videoStates: new WeakMap(),

  // State management methods
  getVideoState(video) {
    if (!this.videoStates.has(video)) {
      this.videoStates.set(video, {
        originalSpeed: video.playbackRate,
        isInUndo: false
      });
    }
    return this.videoStates.get(video);
  },

  // Configuration methods
  updateConfig(newConfig) {
    return new Promise((resolve) => {
      Object.assign(this.config, newConfig);
      chrome.runtime.sendMessage({
        type: 'updateConfig',
        config: this.config
      }, () => {
        resolve(this.config);
      });
    });
  },

  // Initialize config from storage
  initConfig() {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ type: 'getConfig' }, (storedConfig) => {
        if (Object.keys(storedConfig).length > 0) {
          Object.assign(this.config, storedConfig);
        }
        resolve(this.config);
      });
    });
  }
};

// Initialize config from storage
window.FastVideo.initConfig().then(config => {
  window.DEFAULT_CONFIG = config;
});