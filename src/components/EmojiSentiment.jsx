import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { io } from 'socket.io-client';

ChartJS.register(ArcElement, Tooltip, Legend);

const SentimentChart = ({ tones }) => {
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
      <h3>Emoji Sentiment Breakdown</h3>
      <Pie data={data} />
    </div>
  );
};

const EmojiSentiment = () => {
  const [socket, setSocket] = useState(null);
  const [inputText, setInputText] = useState('');
  const [emojiCount, setEmojiCount] = useState(0);
  const [tones, setTones] = useState([]);
  const [analysisResult, setAnalysisResult] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log(`Connected to server with id: ${newSocket.id}`);
    });

    newSocket.on('connection_status', (data) => {
      console.log(data.status); // Should log 'connected'
    });

    newSocket.on('analysis_result', (data) => {
      setAnalysisResult(data);
      setEmojiCount(data.emoji_count);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (socket) {
      socket.emit('analyze_text', { text: inputText });
      setInputText('');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Sentiment Analysis</h2>
      <form onSubmit={handleSubmit}>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows="6"
        cols="50"
        placeholder="Type a sentence with emojis..."
        style={styles.textarea}
      />
      <button style={styles.button} type="submit">Analyze</button>
      </form>
      {analysisResult && (
        <>
          <p>Emoji Count: {emojiCount} | Sentiment: {analysisResult.overall_sentiment} | Score: {analysisResult.bert_score}</p>
          {analysisResult.emoji_sentiment && analysisResult.emoji_sentiment.tones ? (
            <SentimentChart tones={analysisResult.emoji_sentiment.tones} />
          ) : (
            <p>No emoji sentiment data available.</p>
          )}
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '25px',
    fontSize: '30px',
  },
  textarea: {
    marginBottom: '20px',
    padding: '10px',
    width: '80%',
    maxWidth: '750px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  button: {
    padding: '15px 45px',
    fontSize: '16px'
  },
  result: {
    marginBottom: '20px',
    fontSize: '18px',
  },
};

export default EmojiSentiment;