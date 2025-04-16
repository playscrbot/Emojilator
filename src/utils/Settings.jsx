import React, { useState, useEffect } from 'react';

const Settings = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleFeedbackChange = (e) => {
    setFeedbackMessage(e.target.value);
  };

  const sendFeedback = () => {
    const subject = encodeURIComponent('Regarding the Emojilator.. 🎡');
    const body = encodeURIComponent(feedbackMessage);
    const mailtoLink = `mailto:joyboysk5@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="settings-container">
      <div className="setting-item">
        <label htmlFor="theme-selector">Choose Theme:</label>
        <select id="theme-selector" value={theme} onChange={handleThemeChange}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="retro">Retro</option>
          <option value="neon">Neon</option>
          <option value="holidays">Holidays</option>
          <option value="winter">Winter</option>
          <option value="sunset">Sunset</option>
          <option value="midnight">Midnight</option>
          <option value="pastel">Pastel</option>
          <option value="galaxy">Galaxy</option>
        </select>
      </div>

      {/* Feedback Section */}
      <div className="settings-feedback-section">
        <h3>We'd Love Your Feedback! 🎢</h3>
        <p>If you have any suggestions or complaints, feel free to share with us!</p>
        <p>Contact us via:</p>
        <p>Email: <a href="mailto:joyboysk5@gmail.com">joyboysk5@gmail.com</a></p>
        <p>Phone: <a href="tel:+96384890892">6384890892</a></p>

        <textarea
          rows="4"
          placeholder="Tell us your thoughts... 💭"
          className="settings-feedback-textarea"
          value={feedbackMessage}
          onChange={handleFeedbackChange}
        ></textarea>
        <div className="feedback-buttons">
          <button className="send-feedback-btn" onClick={sendFeedback}>
            📬 Send Feedback
          </button>
        </div>
      </div>

      <div className="coming-soon-section">
        <h3>🎡 Upcoming Attractions!</h3>
        <ul>
          <li>🎮 <strong>Exclusive Game Launch</strong> – May 9! (Shhh... it's going to be wild!)</li>
          <li>🌈 <strong>Color Splash Show</strong> – watch emojis light up in real-time moods!</li>
          <li>🚀 <strong>Space Drop Ride</strong> –   A random emoji generator with cosmic surprises!</li>
          <li>🎤 <strong>Sound Booth</strong> – Coming soon, to liven up your audio experience!</li>
        </ul>
        <p className="closing-line">Stick around – we're just getting started! 🥳</p>
      </div>
    </div>
  );
}

export default Settings;