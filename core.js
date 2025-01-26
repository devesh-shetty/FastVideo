function createAudioContext(videoElement) {
  // Create a temporary button and click it to satisfy user gesture requirement
  // The temporary button click simulates the required user interaction that browsers need to allow audio context creation.
  // The button is immediately removed after use, so it won't be visible to users.
  const tempButton = document.createElement('button');
  tempButton.style.display = 'none';
  document.body.appendChild(tempButton);
  tempButton.click();
  document.body.removeChild(tempButton);

  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const source = audioContext.createMediaElementSource(videoElement);
  const pitchCorrector = audioContext.createPitchCorrector
    ? audioContext.createPitchCorrector()
    : audioContext.createBiquadFilter();

  // Connect the audio nodes
  source.connect(pitchCorrector);
  pitchCorrector.connect(audioContext.destination);

  // Resume the audio context
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  return { audioContext, pitchCorrector };
}

function increasePlaybackRate() {
  const videos = document.getElementsByTagName("video");
  for (let i = 0; i < videos.length; i++) {
    if (!videos[i].paused) {
      const video = videos[i];

      // Only set up audio context if not already done
      if (!video.audioContext) {
        const { audioContext, pitchCorrector } = createAudioContext(video);
        video.audioContext = audioContext;
        video.pitchCorrector = pitchCorrector;
      }

      // Set new playback rate
      video.playbackRate = 2.0;

      // Adjust pitch correction if supported
      if (video.pitchCorrector.playbackRate) {
        video.pitchCorrector.playbackRate.value = 1.0 / video.playbackRate;
      } else {
        // Fallback for browsers without native pitch correction:
        // Use a basic low-pass filter to reduce "chipmunk effect"
        video.pitchCorrector.type = 'lowpass';
        video.pitchCorrector.frequency.value = 20000 / video.playbackRate;
      }

      break;
    }
  }
}

increasePlaybackRate();
