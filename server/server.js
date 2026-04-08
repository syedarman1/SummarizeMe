// Load environment variables from .env file
require('dotenv').config();

// Required imports
const axios = require('axios');
const express = require('express');
const cors = require('cors');
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const app = express();

// Middleware
const ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'https://summarizeme-438906.uk.r.appspot.com'
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (e.g. curl, Postman, Chrome extension)
        if (!origin || ALLOWED_ORIGINS.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS: origin ${origin} not allowed`));
        }
    }
}));
app.use(express.json({ limit: '1mb' }));

// OpenAI API Key loaded from environment variables
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

let client;
if (process.env.NODE_ENV === 'production') {
    // In production, use Google Cloud's default service account
    client = new textToSpeech.TextToSpeechClient();
    console.log("Using Google Cloud's default service account for production");
} else {
    // In local development, use the service account JSON file for authentication
    client = new textToSpeech.TextToSpeechClient({
        keyFilename: './config/tts.json',  // Your local service account JSON file
    });
    console.log("Using local service account for authentication");
}


// Root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to SummarizeMe!');
});

// Summarize endpoint using OpenAI GPT
app.post('/summarize', async (req, res, next) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }

    if (text.length > 50000) {
        return res.status(400).json({ error: 'Text exceeds maximum length of 50,000 characters' });
    }

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: `Summarize this: ${text}` }],
                max_tokens: 180
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const summary = response.data.choices[0].message.content.trim();
        res.json({ summary });

    } catch (error) {
        console.error('Error with OpenAI GPT API:', error.response ? error.response.data : error.message);
        next(error);
    }
});

// Read aloud (Text-to-Speech) endpoint using Google TTS
app.post('/read-aloud', async (req, res, next) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Text is required for TTS' });
    }

    if (text.length > 50000) {
        return res.status(400).json({ error: 'Text exceeds maximum length of 50,000 characters' });
    }

    if (!client) {
        console.error('Google TTS client is not initialized');
        return res.status(500).json({ error: 'Google TTS client is not initialized' });
    }

    // Set up the request for text-to-speech
    const request = {
        input: { text: text },
        voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
        audioConfig: { audioEncoding: 'MP3' },
    };

    try {
        const [response] = await client.synthesizeSpeech(request);
        
        // Send the synthesized audio back as an MP3 file
        res.set({
            'Content-Type': 'audio/mpeg',
            'Content-Disposition': 'attachment; filename="output.mp3"',
        });

        res.send(response.audioContent);

    } catch (error) {
        console.error('Error with Google TTS:', error.message);
        next(error);
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server on the specified port (default 5555)
const PORT = process.env.PORT || 5555;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
