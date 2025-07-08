import React from "react";

function BatteryBar({ level }) {
  const barStyle = {
    height: "10px",
    width: "80px",
    backgroundColor: "#eee",
    borderRadius: "4px",
    overflow: "hidden",
    display: "inline-block",
    verticalAlign: "middle",
  };

  const fillStyle = {
    height: "100%",
    width: `${level}%`,
    backgroundColor: level > 50 ? "green" : level > 20 ? "orange" : "red",
    transition: "width 0.3s ease",
  };

  return (
    <div style={barStyle}>
      <div style={fillStyle} />
    </div>
  );
}

export default BatteryBar;
