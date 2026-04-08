import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'https://summarizeme-438906.uk.r.appspot.com';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [loadingTTS, setLoadingTTS] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState('');
  const audioURLRef = useRef(null);

  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;

  // Cleanup audio and object URL on unmount
  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
      }
      if (audioURLRef.current) {
        URL.revokeObjectURL(audioURLRef.current);
      }
    };
  }, [audio]);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.body.classList.toggle('dark-mode', next);
  };

  const handleSummarize = async () => {
    if (!inputText.trim()) return;
    setLoadingSummary(true);
    setError('');
    setSummary('');
    try {
      const response = await axios.post(`${API_URL}/summarize`, { text: inputText });
      setSummary(response.data.summary);
    } catch (err) {
      setError('Failed to summarize. Please check your connection and try again.');
      console.error('Error summarizing:', err);
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
    setError('');
    try {
      const response = await axios.post(
        `${API_URL}/read-aloud`,
        { text: summary },
        { responseType: 'blob' }
      );
      if (audioURLRef.current) {
        URL.revokeObjectURL(audioURLRef.current);
      }
      const audioURL = window.URL.createObjectURL(new Blob([response.data], { type: 'audio/mpeg' }));
      audioURLRef.current = audioURL;
      const newAudio = new Audio(audioURL);
      newAudio.play();
      setAudio(newAudio);
      setIsPlaying(true);
      newAudio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioURL);
        audioURLRef.current = null;
      };
    } catch (err) {
      setError('Failed to load audio. Please try again.');
      console.error('Error with TTS:', err);
    }
    setLoadingTTS(false);
  };

  return (
    <div className="app-container">
      <button className="theme-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
        {darkMode ? '☀' : '☾'}
      </button>

      <header className="app-header">
        <h1>SummarizeMe</h1>
        <p className="subtitle">Paste any text below to get an AI-generated summary</p>
      </header>

      <div className="input-section">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste your text here..."
          rows="8"
          maxLength={50000}
        />
        {wordCount > 0 && <span className="word-count">{wordCount} words</span>}
      </div>

      <button
        className="btn-primary"
        onClick={handleSummarize}
        disabled={loadingSummary || !inputText.trim()}
      >
        {loadingSummary ? <span className="spinner" /> : 'Summarize'}
      </button>

      {error && <p className="error-message">{error}</p>}

      {summary && (
        <div className="summary-section">
          <h2>Summary</h2>
          <p>{summary}</p>
          <button className="btn-secondary" onClick={handleReadAloud} disabled={loadingTTS}>
            {loadingTTS ? <span className="spinner spinner-accent" /> : isPlaying ? '⏹ Stop' : '▶ Read Aloud'}
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
