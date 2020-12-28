function increasePlaybackRate() {
  const videos = document.getElementsByTagName("video");
  for (i = 0; i < videos.length; i++) {
    if (!videos[i].paused) {
      videos[i].playbackRate = 2.0;
      break;
    }
  }
}

increasePlaybackRate();
