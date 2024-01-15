import './App.css'
import EmojiTranslator from './components/EmojiTranslator';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import React, { useState } from 'react';
import StyledOutput from './components/StyledOutput';
import Layout from './components/Layout';
import Timeline from './components/Timeline';
import Explore from './components/Explore';
import VirtualTravel from './components/VirtualTour';
import Home from './components/Home';

function App() {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 3000);
  
  return (
   <>
    {loading ? (
      <div className="loading-container">
        <HashLoader color="#4caf50" loading={loading} size={75} />
        <p>Loading</p>
      </div>
    ) : (
      <Layout />
    )}
   </>
  );
}

export default App;