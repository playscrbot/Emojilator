import React from "react";
import { useNavigate } from "react-router";

const RoomPortal = ({ title, path }) => {
  const navigate = useNavigate();

  return (
    <div
      className="room-portal"
      onClick={() => navigate(path)}
    >
      <div className="portal-glow" />
      <span>{title}</span>
    </div>
  );
};

export default RoomPortal;