
# SummarizeMe Web Application

**SummarizeMe** is a fullstack web application that allows users to summarize any text or webpage content using AI-powered tools. It also supports text-to-speech functionality to read the summary aloud, with both light and dark modes available for an improved user experience In connections with (Chrome Extension) https://github.com/syedarman1/SummarizeMe_Chrome

## Features

- **Summarize Text**: Allows users to input or select text and summarize it using AI.
- **Read Aloud**: Converts the summarized text to speech using text-to-speech.
- **Smooth Transition**: The app offers a smooth fade transition between light and dark modes.

## Tech Stack

- **Frontend**: React Next.js for the web UI.
- **Backend**: Node.js (Express) Python (FastAPI).
- **Database**: (MongoDB) (PostgreSQL).
- **API Integrations**:
  - **OpenAI GPT API**: Used for generating summaries from text.
  - **Google Cloud Text-to-Speech API**: Used for converting text to audio.
- **Deployment**: Google Cloud for backend, Vercel/Heroku for frontend.

## Setup and Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/summarizeme-app.git
cd summarize-app

# Install dependencies for backend (choose one)
npm install  # For Node.js/Express backend
# OR
pip install -r requirements.txt  # For Python/FastAPI backend

# Install dependencies for frontend
cd client
npm install

# Set up environment variables
# Create a .env file in the root directory and add your API keys
OPENAI_API_KEY=your-openai-api-key
GOOGLE_APPLICATION_CREDENTIALS=/path/to/your/tts.json

# Run the backend locally
npm start  # For Node.js backend
# OR
uvicorn app:app --reload  # For Python/FastAPI

# Run the frontend locally
cd client
npm run dev  # For React/Next.js development mode
```

# API Endpoints

### `/summarize` (POST)
**Description**: This endpoint accepts raw text input and generates a summary.  
**Request Body**:
```json
{
  "text": "Your input text"
}
```
**Response**:
```json
{
  "summary": "Summarized text"
}
```

### `/read-aloud` (POST)
**Description**: Converts the summarized text into an MP3 file for playback.  
**Request Body**:
```json
{
  "text": "Text to be converted to speech"
}
```
**Response**: Returns an MP3 file with the audio.

## Fullstack Deployment

- **Backend**: The backend can be deployed using Google Cloud (App Engine or Cloud Run).
- **Frontend**: The frontend can be deployed using Vercel or Heroku (if using Next.js).
- Ensure that all the environment variables for both the frontend and backend are properly set up in the cloud.

## Usage

### Summarizing Text:
1. Enter text in the text area or select text on a webpage.
2. Click the **Summarize** button to generate a summary.

### Read Aloud:
1. After generating a summary, click the **Read Aloud** button to listen to the summary.
2. Double-clicking the **Read Aloud** button will stop the reading.

### Toggle Dark Mode:
Use the **Dark Mode** switch to toggle between light and dark themes.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Privacy Policy
You can view the privacy policy for this extension [here](https://www.freeprivacypolicy.com/live/5633e524-8d47-4586-a3af-8d740e1c1d33).
