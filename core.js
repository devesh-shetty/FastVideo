function createSpeedIndicator() {
  const indicator = document.createElement('div');
  indicator.id = 'fast-video-speed-indicator';

  Object.assign(indicator.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    padding: '8px 12px',
    borderRadius: '4px',
    fontSize: '14px',
    fontFamily: 'Arial, sans-serif',
    zIndex: '9999',
    transition: 'opacity 0.3s ease',
    opacity: '0'
  });

  document.body.appendChild(indicator);
  return indicator;
}

function showSpeedNotification(speed) {
  let indicator = document.getElementById('fast-video-speed-indicator');
  if (!indicator) {
    indicator = createSpeedIndicator();
  }

  indicator.textContent = `${speed}x Speed`;
  indicator.style.opacity = '1';

  indicator.style.transform = 'scale(1.1)';
  setTimeout(() => {
    indicator.style.transform = 'scale(1)';
  }, 100);

  setTimeout(() => {
    indicator.style.opacity = '0';
  }, 2000);
}

function createAudioContext(videoElement) {
  if (videoElement._audioContext && videoElement._source) {
    return {
      audioContext: videoElement._audioContext,
      pitchCorrector: videoElement._pitchCorrector
    };
  }

  if (videoElement._audioContext) {
    try {
      videoElement._source.disconnect();
      videoElement._pitchCorrector.disconnect();
      videoElement._audioContext.close();
    } catch (e) {
      console.log('Cleanup error:', e);
    }
  }

  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaElementSource(videoElement);
    const pitchCorrector = audioContext.createBiquadFilter(); // Always use biquad filter as fallback

    source.connect(pitchCorrector);
    pitchCorrector.connect(audioContext.destination);

    // Store references using underscore prefix to avoid conflicts
    videoElement._audioContext = audioContext;
    videoElement._source = source;
    videoElement._pitchCorrector = pitchCorrector;

    // Configure the filter for pitch correction
    pitchCorrector.type = 'lowpass';
    pitchCorrector.frequency.value = 20000 / videoElement.playbackRate;

    return {
      audioContext: audioContext,
      pitchCorrector: pitchCorrector
    };
  } catch (e) {
    console.log('Audio setup error:', e);
    return null;
  }
}

function increasePlaybackRate() {
  const videos = document.getElementsByTagName("video");
  for (let i = 0; i < videos.length; i++) {
    if (!videos[i].paused) {
      const video = videos[i];

      const audioSetup = createAudioContext(video);
      if (!audioSetup) {
        console.log('Audio setup failed');
        // If audio setup fails, just change speed without pitch correction
        video.playbackRate = 2.0;
        showSpeedNotification(video.playbackRate);
        break;
      }

      video.playbackRate = 2.0;

      showSpeedNotification(video.playbackRate);

      // Adjust pitch correction if supported
      if (video._pitchCorrector.playbackRate) {
        video._pitchCorrector.playbackRate.value = 1.0 / video.playbackRate;
      } else {
        // Fallback for browsers without native pitch correction:
        // Use a basic low-pass filter to reduce "chipmunk effect"
        video._pitchCorrector.type = 'lowpass';
        video._pitchCorrector.frequency.value = 20000 / video.playbackRate;
      }

      break;
    }
  }
}

increasePlaybackRate();
