# FastVideo

FastVideo is a Chrome extension that enhances video playback with smart speed controls and audio quality preservation.

![FastVideo](icons/128.png)


[Available in the Chrome Web Store](https://chromewebstore.google.com/detail/fastvideo/apejdflfbfcoenngpebifilgpgmgoppm?hl=en)

## Features

### 🎮 Speed Control
- Instantly set video playback to 2x speed
- Works on any HTML5 video element
- Preserves audio quality at higher speeds

### 🔊 Audio Enhancement
- Automatic pitch correction to prevent "chipmunk voice" effect
- Uses Web Audio API for high-quality audio processing
- Fallback to low-pass filter on unsupported browsers

### 💫 Visual Feedback
- Clean, minimal speed indicator overlay
- Shows current playback speed
- Automatically fades after 2 seconds
- Non-intrusive placement in top-right corner

### 🎯 Smart Video Detection
- Automatically finds the active video on the page
- Only affects currently playing videos
- Works with multiple video elements on the same page

## Usage

1. [Install from Chrome Web Store](https://chromewebstore.google.com/detail/fastvideo/apejdflfbfcoenngpebifilgpgmgoppm?hl=en)
2. Navigate to any page with a video
3. Click the FastVideo icon in your toolbar
4. The video will instantly speed up to 2x with preserved audio quality
5. A brief overlay will confirm the speed change

## Technical Details

- Built with vanilla JavaScript
- Uses Chrome Extension Manifest V3
- Implements Web Audio API for audio processing
- Employs dynamic audio context management
- Features graceful fallbacks for all functionality

## Browser Support

- Chrome (Primary support)
- Other Chromium-based browsers (Edge, Brave, etc.)

## License

See LICENSE file for details.
