import './App.css';
import { HashLoader } from 'react-spinners';
import React, { useState } from 'react';
import Layout from './components/Layout';

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