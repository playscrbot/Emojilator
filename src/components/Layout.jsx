import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EmojiTranslator from './EmojiTranslator';
import StyledOutput from './StyledOutput';
import Explore from './Explore';
import VirtualTravel from './VirtualTour';
import Home from './Home';
import EmojiSentiment from './EmojiSentiment';

export default function Layout() {
  return (
    <div className="layout">
      <Router>
        <header>
          <Menu className="bm-burger-button">
            <Link to="/" className="menu-item">
            Home
            </Link>
            <Link to="/emoji" className="menu-item">
            Create
            </Link>
            <Link to="/explore" className="menu-item">
            Explore
            </Link>
            <Link to="/style" className="menu-item">
            Style Text
            </Link>
          </Menu>
          <img style={{ left: '5px', maxHeight: '160px', maxWidth: '180px', width: 'auto', height: 'auto', position: 'fixed', top: '1px' }} src="/Logo.png" alt="logo" />
        </header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/srcdoc" element={<Home />} />
            <Route path="/emoji" element={<EmojiTranslator />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/style" element={<StyledOutput />} />
            <Route path="/tour" element={<VirtualTravel />} />
            <Route path="/analyze" element={<EmojiSentiment />} />
          </Routes>
      </Router>
    </div>
  )
}