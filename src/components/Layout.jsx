import React, { useEffect } from 'react';
import { FaCog } from 'react-icons/fa';
import { slide as Menu } from 'react-burger-menu';
import { HashRouter as Router, Routes, Route, Link } from 'react-router';
import EmojiTranslator from './EmojiTranslator.jsx';
import Explore from './Explore.jsx';
import VirtualTravel from './VirtualTour.jsx';
import Home from './Home.jsx';
import VRHome from './VRHome.jsx';
import Settings from '../utils/Settings.jsx';
import EmojiSentiment from './EmojiSentiment.jsx';
import EmojiQuiz from './EmojiQuiz.jsx';
import EmojiMuseum from './EmojiMuseum.jsx';
import Emojipedia from './Emojipedia.jsx';
import UnicodeLab from './UnicodeLab.jsx';
import MoodPlayground from './MoodPlayground.jsx';
import ExperimentZone from './ExperimentZone.jsx';
import SecretVault from './SecretVault.jsx';
import Featured from './ArtifactWall.jsx';

export default function Layout() {
  const theme = localStorage.getItem('theme');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

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
            <Link to="/museum" className="menu-item">
            Explore
            </Link>

            {/* Settings Icon at Bottom */}
            <div className="settings-icon">
              <Link to="/settings" className="menu-item">
                <FaCog size={20} />
              </Link>
            </div>
          </Menu>
          <div className="logo-container">
            <img className="logo" src="Logo.png" alt="logo" />
          </div>
        </header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/srcdoc" element={<Home />} />
            <Route path="/sitemap.xml" element={<Home />} />
            <Route path="/emoji" element={<EmojiTranslator />} />
            <Route path="/quiz" element={<EmojiQuiz />} />
            <Route path="/tour" element={<VirtualTravel />} />
            <Route path="/analyze" element={<EmojiSentiment />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/museum" element={<VRHome />} />
            <Route path="/museum/enter" element={<EmojiMuseum />} />
            <Route path="/museum/enter/featured" element={<Featured />} />
            <Route path="/museum/enter/explore" element={<Explore />} />
            <Route path="/museum/enter/unicode" element={<UnicodeLab />} />
            <Route path="/museum/enter/emojipedia" element={<Emojipedia />} />
            <Route path="/museum/enter/playground" element={<MoodPlayground />} />
            <Route path="/museum/enter/experiment-zone" element={<ExperimentZone />} />
            <Route path="/museum/enter/secret-vault" element={<SecretVault />} />
          </Routes>
      </Router>
    </div>
  )
}