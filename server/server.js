const fs = require('fs');
const path = require('path');
require('dotenv').config(); 

const axios = require('axios');
const express = require('express');
const cors = require('cors');
const textToSpeech = require('@google-cloud/text-to-speech');
const app = express();

app.use(cors());
app.use(express.json());

const credentialsPath = path.join(__dirname, 'config/tts.json'); 

if (!fs.existsSync(credentialsPath)) {
    console.error(`The file at ${credentialsPath} does not exist. Please check your setup.`);
    process.exit(1);
}

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.get('/', (req, res) => {
    res.send('Welcome to SummarizeMe!');
});

app.post('/summarize', async (req, res, next) => {
  const { text } = req.body;

  if (!text) {
      return res.status(400).json({ error: 'Text is required' });
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

app.post('/read-aloud', async (req, res, next) => {
  const { text } = req.body;

  if (!text) {
      return res.status(400).json({ error: 'Text is required for TTS' });
  }

  let client;
  try {
      client = new textToSpeech.TextToSpeechClient();
  } catch (error) {
      console.error('Error initializing Google TTS client:', error);
      return res.status(500).json({ error: 'Google TTS initialization failed' });
  }

  const request = {
      input: { text: text },
      voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
      audioConfig: { audioEncoding: 'MP3' },
  };

  try {
      const [response] = await client.synthesizeSpeech(request);
      
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

app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5555;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
