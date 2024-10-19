import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingTTS, setLoadingTTS] = useState(false);

  const handleSummarize = async () => {
    setLoadingSummary(true);
    try {
      const response = await axios.post('http://localhost:5555/summarize', {
        text: inputText,
      });
      setSummary(response.data.summary);
    } catch (error) {
      console.error("Error summarizing:", error);
    }
    setLoadingSummary(false);
  };

  const handleReadAloud = async () => {
    setLoadingTTS(true);
    try {
      const response = await axios.post('http://localhost:5555/read-aloud', {
        text: summary,
      }, { responseType: 'blob' }); // Ensures binary data is returned

      const audioURL = window.URL.createObjectURL(new Blob([response.data], { type: 'audio/mpeg' }));
      const audio = new Audio(audioURL);
      audio.play();
    } catch (error) {
      console.error("Error with TTS:", error);
    }
    setLoadingTTS(false);
  };

  return (
    <div className="app-container">
      <h1>SummarizeMe</h1>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter text to summarize"
        rows="6"
        cols="60"
      />
      <br />
      <button onClick={handleSummarize} disabled={loadingSummary}>
        {loadingSummary ? 'Summarizing...' : 'Summarize'}
      </button>
      <div className="summary-section">
        <h3>Summary:</h3>
        <p>{summary}</p>
        <button onClick={handleReadAloud} disabled={loadingTTS || !summary}>
          {loadingTTS ? 'Reading Aloud...' : 'Read Aloud'}
        </button>
      </div>
    </div>
  );
};

export default App;
