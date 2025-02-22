# FastVideo

FastVideo is a Chrome extension that enhances video playback with smart speed controls and audio quality preservation.

![FastVideo](icons/128.png)


[Available in the Chrome Web Store](https://chromewebstore.google.com/detail/fastvideo/apejdflfbfcoenngpebifilgpgmgoppm?hl=en)

## Features

### 🎮 Speed Control
- Instantly set video playback to 2x speed (Alt+Shift+F)
- Works on any HTML5 video element
- Preserves audio quality at higher speeds

### ⏮ Instant Undo (New!)
- Quick rewind feature for catching missed content
- Rewinds 5 seconds and temporarily plays at normal speed
- Smoothly transitions back to previous speed
- Keyboard shortcut: Alt+Shift+Z
- Configurable durations and transitions

### 🔊 Advanced Audio Processing
- Real-time pitch correction using Web Audio API
- Multi-stage audio processing chain:
  - Dynamic gain control
  - Adaptive pitch correction
  - Audio compression
  - Volume normalization
- Maintains natural voice pitch at high speeds
- Automatically adjusts to prevent audio distortion

### 💫 Visual Feedback
- Clean, minimal speed indicator overlay
- Shows current playback speed
- Progress bar for undo duration
- Automatically fades after 2 seconds
- Non-intrusive placement in top-right corner

### 🎯 Smart Video Detection
- Automatically finds the active video on the page
- Only affects currently playing videos
- Works with multiple video elements on the same page

### ⚙️ Customization
- Configurable rewind duration (2-10 seconds)
- Adjustable normal speed playback time (2-8 seconds)
- Fine-tune transition smoothness
- Settings persist across sessions

## Usage

1. [Install from Chrome Web Store](https://chromewebstore.google.com/detail/fastvideo/apejdflfbfcoenngpebifilgpgmgoppm?hl=en)
2. Navigate to any page with a video
3. Click the FastVideo icon or press Alt+Shift+F to speed up to 2x
4. Use Alt+Shift+Z to quickly rewind and catch missed content
5. Access options through extension menu to customize behavior

## Technical Details

- Built with vanilla JavaScript
- Uses Chrome Extension Manifest V3
- Implements advanced Web Audio API features:
  - BiquadFilter for pitch correction
  - DynamicsCompressor for audio clarity
  - GainNodes for volume control
  - Real-time parameter automation
- Features graceful fallbacks for all functionality
- Configurable through Chrome Storage API

## Browser Support

- Chrome (Primary support)
- Other Chromium-based browsers (Edge, Brave, etc.)

## License

See LICENSE file for details.
