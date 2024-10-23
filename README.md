# SummarizeMe

**SummarizeMe** is a Chrome extension that allows users to summarize any text or webpage content using AI-powered tools. The extension also supports text-to-speech functionality to read the summary aloud, with both light and dark modes available for an improved user experience.

## Features

- **Summarize Text**: Allows users to input or select text from a webpage and summarize it using AI.
- **Read Aloud**: Reads the summarized text aloud using text-to-speech.
- **Smooth Transition**: Smooth fade transition between light and dark modes.

## Permissions

The extension uses the following permissions:
- **activeTab**: Required to interact with the currently active tab.
- **storage**: For storing the dark mode setting locally.
- **scripting**: To manipulate the DOM for interacting with the webpage’s content.

## Installation

### From the Chrome Web Store
1. Navigate to the [Chrome Web Store](https://chrome.google.com/webstore) and search for **SummarizeMe**.
2. Click "Add to Chrome" and follow the on-screen prompts to install the extension.

### Manual Installation
1. Clone this repository or download it as a `.zip` file.
2. Unzip the file.
3. Open Chrome and go to `chrome://extensions/`.
4. Enable "Developer mode" in the top-right corner.
5. Click "Load unpacked" and select the folder where you unzipped the files.

## Usage

1. **Summarizing Text**:
   - Open the extension by clicking on the SummarizeMe icon in the browser toolbar.
   - Enter text in the text area or select text on a webpage.
   - Click the **Summarize** button to generate a summary.
   
2. **Read Aloud**:
   - After generating a summary, click the **Read Aloud** button to listen to the summary.
   - Double-clicking the **Read Aloud** button will stop the reading.

## Development

If you would like to contribute or modify this extension, follow these steps:

### Code Structure

- **manifest.json**: Contains metadata about the extension, including permissions and the popup structure.
- **popup.html**: The main HTML file for the extension's popup interface.
- **popup.css**: The styling for both light and dark modes, including transitions.
- **popup.js**: The main logic that handles the summarize, read aloud, and dark mode functionality.
- **content.js**: Handles interactions with the currently active tab (e.g., fetching text from the page).

### Running Locally

1. Clone or download the project files.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" in the top-right corner.
4. Click "Load unpacked" and select the project folder.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Privacy Policy

You can view the privacy policy for this extension [here](https://www.freeprivacypolicy.com/live/5633e524-8d47-4586-a3af-8d740e1c1d33).
