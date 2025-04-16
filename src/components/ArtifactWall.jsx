import React, { useEffect, useState } from 'react';
import artifactData from '../data/emojiArtifactData.json'; // Emoji info dataset

export default function Featured() {
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    // Get the number of weeks since a base date (e.g., Jan 1, 2025)
    const startDate = new Date('2025-01-01');
    const today = new Date();
    const diffInWeeks = Math.floor((today - startDate) / (1000 * 60 * 60 * 24 * 7));
    
    // Pick emoji based on the current week number
    const emojiIndex = diffInWeeks % artifactData.length;
    setFeatured(artifactData[emojiIndex]);
  }, []);

  if (!featured) return <div>Loading Artifact of the Week...</div>;

  return (
    <div className="artifact-wall">
      <h2 className="artifact-title">🧱 Featured Artifact of the Week</h2>
      <div className="artifact-card">
        <div className="artifact-highlight">
          <span className="artifact-spotlight-glow">{featured.emoji}</span>
          <h3 className="artifact-h3">{featured.name}</h3>
        </div>
        <div className="artifact-info">
          <p><strong>🧠 Fun Fact:</strong> {featured.funFact}</p>
          <p><strong>📜 Origin:</strong> {featured.originStory}</p>
          <p><strong>🕰 Unicode History:</strong> {featured.unicode}</p>
          <p><strong>🌍 Culture:</strong> {featured.culturalMoment}</p>
        </div>
      </div>
    </div>
  );
}