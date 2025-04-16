import './App.css';
import { HashLoader } from 'react-spinners';
import React, { useState, Suspense } from 'react';

const Layout = React.lazy(() => import('./components/Layout.jsx'));

function App() {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 3000);
  
  return (
   <>
    {loading ? (
      <div className="loading-container">
        <HashLoader color="#4caf50" size={75} />
        <p>Loading</p>
      </div>
    ) : (
      <Suspense
        fallback={
          <div className="loading-container">
            <HashLoader color="#4caf50" size={75} />
            <p>Loading...</p>
          </div>
        }
      >
        <Layout />
      </Suspense>
    )}
   </>
  );
}

export default App;