import React from 'react';
import Event from './Event.jsx';

const Timeline = ({ events }) => {
  return (
    <div className="timeline">
      {events.map((event) => (
        <Event key={event.id} event={event} />
      ))}
    </div>
  );
};

export default Timeline;