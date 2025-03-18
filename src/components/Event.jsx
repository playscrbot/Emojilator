import React from 'react';

const Event = ({ event }) => {
  const { year, description, emojis } = event;

  return (
    <div className="event">
      <div className="year">{year}</div>
      <div className="description">{description}</div>
      <div className="emojis">{emojis.join(' ')}</div>
    </div>
  );
};

export default Event;