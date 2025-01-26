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

    // Create a more sophisticated pitch correction chain
    const preGain = audioContext.createGain();
    const pitchCorrector = audioContext.createBiquadFilter();
    const compressor = audioContext.createDynamicsCompressor();
    const postGain = audioContext.createGain();

    // Configure the pitch correction filter
    pitchCorrector.type = 'lowshelf';
    pitchCorrector.frequency.value = 500;
    pitchCorrector.gain.value = 0;

    // Configure compressor for better audio quality
    compressor.threshold.value = -50;
    compressor.knee.value = 40;
    compressor.ratio.value = 12;
    compressor.attack.value = 0;
    compressor.release.value = 0.25;

    // Set initial gains
    preGain.gain.value = 1.0;
    postGain.gain.value = 1.0;

    // Connect the audio processing chain
    source
      .connect(preGain)
      .connect(pitchCorrector)
      .connect(compressor)
      .connect(postGain)
      .connect(audioContext.destination);

    // Store references
    videoElement._audioContext = audioContext;
    videoElement._source = source;
    videoElement._pitchCorrector = pitchCorrector;
    videoElement._preGain = preGain;
    videoElement._compressor = compressor;
    videoElement._postGain = postGain;

    return {
      audioContext: audioContext,
      pitchCorrector: pitchCorrector
    };
  } catch (e) {
    console.log('Audio setup error:', e);
    return null;
  }
}

function adjustPitchCorrection(video, speed) {
  if (!video._pitchCorrector) return;

  // Calculate pitch correction parameters based on speed
  const pitchRatio = 1.0 / speed;
  const frequency = Math.min(20000, 500 * speed);
  const gain = -12 * (speed - 1); // More negative gain for higher speeds

  // Apply pitch correction
  video._pitchCorrector.frequency.setValueAtTime(frequency, video._audioContext.currentTime);
  video._pitchCorrector.gain.setValueAtTime(gain, video._audioContext.currentTime);

  // Adjust pre/post gains to maintain consistent volume
  video._preGain.gain.setValueAtTime(Math.min(1.0, pitchRatio), video._audioContext.currentTime);
  video._postGain.gain.setValueAtTime(Math.min(1.0, speed), video._audioContext.currentTime);
}

function increasePlaybackRate() {
  const videos = document.getElementsByTagName("video");
  for (let i = 0; i < videos.length; i++) {
    if (!videos[i].paused) {
      const video = videos[i];

      const audioSetup = createAudioContext(video);
      if (!audioSetup) {
        console.log('Audio setup failed');
        video.playbackRate = 2.0;
        showSpeedNotification(video.playbackRate);
        break;
      }

      video.playbackRate = 2.0;
      showSpeedNotification(video.playbackRate);

      // Apply enhanced pitch correction
      adjustPitchCorrection(video, video.playbackRate);

      break;
    }
  }
}

increasePlaybackRate();
