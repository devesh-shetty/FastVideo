chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "increase_speed") {
    document.getElementsByTagName("video")[0].playbackRate = 2.0;
  }
});
