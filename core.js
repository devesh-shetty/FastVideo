function increasePlaybackRate() {
  const video = document.getElementsByTagName("video")[0];
  if (video) {
    video.playbackRate = 2.0;
  } else {
    console.log("No video found.");
  }
}

increasePlaybackRate();
