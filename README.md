# SummarizeMe

**AI-powered text summarization with text-to-speech — trusted by 500+ users on the Chrome Web Store.**

SummarizeMe turns any wall of text into a clean, concise summary and reads it back to you. Available as a full web app and a Chrome extension.

---

## Features

- **Instant AI Summaries** — Paste any text and get a sharp, accurate summary powered by GPT
- **Text-to-Speech** — Listen to your summary read aloud via Google Cloud TTS
- **Chrome Extension** — Summarize anything directly from your browser without switching tabs
- **Dark Mode** — Clean crème/black inverse theme that's easy on the eyes
- **Fast & Lightweight** — No account required, no bloat

---

## Chrome Extension

> 500+ active users on the Chrome Web Store

The SummarizeMe Chrome Extension brings the full summarization experience directly into your browser. Highlight text, open the extension, and get a summary in seconds.


---

## Web App

The full web experience at [summarizeme.co]

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 |
| Backend | Node.js + Express |
| Summarization | OpenAI GPT-3.5 Turbo |
| Text-to-Speech | Google Cloud TTS |
| Hosting | Google Cloud App Engine |
| Extension | Chrome Manifest V3 |

---

## Running Locally

**1. Clone the repo**
```bash
git clone https://github.com/syedarman1/SummarizeMe.git
cd SummarizeMe
```

**2. Set up the server**
```bash
cd server
cp .env.example .env   # Add your OPENAI_API_KEY
npm install
npm start              # Runs on port 5555
```

**3. Start the client**
```bash
cd client
npm install
npm start              # Opens on localhost:3000
```

---

## Environment Variables

Create `server/.env`:
```
OPENAI_API_KEY=your_openai_key_here
PORT=5555
```

For Google Cloud TTS, place your service account JSON at `server/config/tts.json`.

---

## Project Structure

```
SummarizeMe/
├── client/          # React frontend
│   └── src/
│       ├── App.js
│       └── App.css
├── server/          # Express backend
│   ├── server.js
│   └── config/
└── Procfile
```

---

## Contributing

Pull requests are welcome. For major changes, open an issue first.

---

*Built by [Syed Arman](https://github.com/syedarman1)*
