# Screen Capture Extension

This Chrome extension allows users to capture screen content directly from their browser. It adds an overlay to the current tab, providing a simple interface to start and stop screen recording.

## Features

- Simple popup interface to initiate screen recording.
- Overlay on the current tab with 'Start' and 'Stop' buttons.
- Utilizes `navigator.mediaDevices.getDisplayMedia` to capture screen content.
- Displays the recorded video within the overlay after stopping the capture.

## Installation

1. Clone the repository or download the source code.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top right corner.
4. Click on "Load unpacked" and select the directory where the source code is located.

## Usage

1. Click on the extension icon in the Chrome toolbar to open the popup.
2. Click the "Start Recording" button in the popup. This will inject an overlay into the current tab.
3. In the overlay, click the "Start" button to begin capturing your screen.
4. To stop capturing, click the "Stop" button. The recorded video will be displayed in the overlay.
5. To close the overlay, click the "Close" button.

## Files

- `manifest.json`: Defines the extension's permissions, background scripts, and content scripts.
- `popup.html`: Contains the HTML for the extension's popup interface.
- `popup.js`: Handles the interaction between the popup and the content script.
- `content.js`: Contains the logic for the overlay and screen recording functionality.
- `background.js`: Listens for clicks on the extension icon and injects the content script into the active tab.
