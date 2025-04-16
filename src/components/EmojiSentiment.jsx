import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import EmojiSentimentMap from './EmojiSentimentMap.jsx';
import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const SentimentChart = ({ tones }) => {
  if (!tones || tones.length === 0) {
    return null;
  };

  const toneCounts = tones.reduce((acc, tone) => {
    acc[tone] = (acc[tone] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(toneCounts),
    datasets: [
      {
        data: Object.values(toneCounts),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      },
    ],
  };

  return (
    <div>
      <h3 className="sentiment-heading">Emoji Sentiment Breakdown</h3>
      <Pie data={data} />
    </div>
  );
};

const EmojiSentiment = () => {
  const [inputText, setInputText] = useState('');
  const [emojiCount, setEmojiCount] = useState(0);
  const [analysisResult, setAnalysisResult] = useState({ tones: [], overall: "Neutral" });

  const analyzeSentiment = (text) => {
    const emojis = text.match(/[\p{Extended_Pictographic}]/gu) || []; // Extract emojis
    const tones = emojis.map((emoji) => EmojiSentimentMap[emoji]?.tone || "Neutral");

    // Count occurrences of each sentiment type
    const sentimentCounts = tones.reduce((acc, tone) => {
      acc[tone] = (acc[tone] || 0) + 1;
      return acc;
    }, {});

    // Determine overall sentiment
    let overallSentiment = "Neutral";
    if ((sentimentCounts.Positive || 0) > (sentimentCounts.Negative || 0)) {
      overallSentiment = "Positive";
    } else if ((sentimentCounts.Negative || 0) > (sentimentCounts.Positive || 0)) {
      overallSentiment = "Negative";
    }

    setAnalysisResult({ overall: overallSentiment, tones: tones });
    setEmojiCount(emojis.length);
  };

  return (
    <div className="sentiment-container">
      <h2 className="sentiment-heading">Sentiment Analysis</h2>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows="6"
        cols="50"
        placeholder="Type a sentence with emojis..."
        className="sentiment-textarea"
      />
      <button onClick={() => analyzeSentiment(inputText)}>Analyze</button>
      {analysisResult.tones.length > 0 && (
        <>
          <p className="emoji-count">Emoji Count: {emojiCount} | Sentiment: {analysisResult.overall}</p>
          <SentimentChart tones={analysisResult.tones} />
        </>
      )}
    </div>
  );
};

export default EmojiSentiment;