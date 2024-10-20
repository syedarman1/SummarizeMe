import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingTTS, setLoadingTTS] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [audio, setAudio] = useState(null); 
  const [isPlaying, setIsPlaying] = useState(false); 

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

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
    if (isPlaying && audio) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
      return;
    }

    setLoadingTTS(true);
    try {
      const response = await axios.post('http://localhost:5555/read-aloud', {
        text: summary,
      }, { responseType: 'blob' });

      const audioURL = window.URL.createObjectURL(new Blob([response.data], { type: 'audio/mpeg' }));
      const newAudio = new Audio(audioURL);

      newAudio.play();
      setAudio(newAudio);
      setIsPlaying(true); 

      newAudio.onended = () => {
        setIsPlaying(false);
      };
    } catch (error) {
      console.error("Error with TTS:", error);
    }
    setLoadingTTS(false);
  };

  return (
    <div className="app-container">
      <div className="toggle-container">
        <button onClick={toggleDarkMode}>
          {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </div>
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
          {loadingTTS ? 'Reading Aloud...' : (isPlaying ? 'Stop' : 'Read Aloud')}
        </button>
      </div>
    </div>
  );
};

export default App;
