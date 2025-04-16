import React from 'react';
import RoomPortal from './RoomPortal.jsx';

const museumRooms = [
  { name: 'Museum Hall', icon: '🏛️', path: '/museum/enter', description: 'This is the hall of museum You\'re currently in.' },
  { name: 'Artifact Wall', icon: '🧱', path: '/museum/enter/featured', description: 'Explore the Outstanding Emoji of the Week' },
  { name: 'Experiment Zone', icon: '🧪', path: '/museum/enter/experiment-zone', description: 'A lab of emoji experiments, AI reactions, and playful generative experiences.' },
  { name: 'Unicode Lab', icon: '🔢', path: '/museum/enter/unicode', description: 'A lab of emoji experiments and playful generative experiences.' },
  { name: 'Visitor\'s Playground', icon: '🎭', path: '/museum/enter/playground', description: 'Dive into interactive mini games that test your emoji knowledge and mood-matching skills.' },
  { name: 'World Map', icon: '🌐', path: '/museum/enter/explore', description: 'Explore various contries and their famous spots' },
  { name: 'Tradition Tracker', icon: '🛤️', path: '/tour', description: 'Look at the traditions around your world' },
  { name: 'Emojipedia Room', icon: '📚', path: '/museum/enter/emojipedia', description: 'Explore the various emojis that defines our World' },
  { name: 'Secret Vault', icon: '🕵️', path: '/museum/enter/secret-vault', description: 'This is a secret room that nobody knows where it is.' }
];

export default function MuseumDirectory() {
  return (
    <section className="museum-directory">
      <h2 className="directory-title">🗺️ Museum Directory</h2>
      <p className="directory-subtext">Navigate through all rooms from here. You are currently in the <strong>Museum Hall</strong>.</p>
      
      <div className="directory-grid">
        {museumRooms.map((room, idx) => (
          <a key={idx} className="directory-room" title={room.name}>
            <span className="room-icon">{room.icon}</span>
            <span className="room-label">{room.name}</span>

            <RoomPortal title="Enter Room" path={room.path} />

            {/* Add 'You Are Here' badge for Museum Hall */}
            {room.name === 'Museum Hall' && (
              <span className="you-are-here">📍 You Are Here</span>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}