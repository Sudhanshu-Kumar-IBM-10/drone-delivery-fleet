import React from "react";

const statusColors = {
  Idle: "gray",
  Delivering: "green",
  Charging: "orange",
};

function StatusBadge({ status }) {
  const color = statusColors[status] || "gray";

  const badgeStyle = {
    display: "inline-block",
    padding: "4px 8px",
    borderRadius: "12px",
    backgroundColor: color,
    color: "white",
    fontWeight: "bold",
    fontSize: "0.85rem",
  };

  return <span style={badgeStyle}>{status}</span>;
}

export default StatusBadge;
