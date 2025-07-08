import React from "react";
import { Link } from "react-router-dom";
import BatteryBar from "./BatteryBar";
import StatusBadge from "./StatusBadge";

export default function DroneList({ drones }) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        textAlign: "left",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <thead>
        <tr style={{ backgroundColor: "#222", color: "#fff" }}>
          <th style={{ padding: "10px" }}>Drone Name</th>
          <th>Battery (%)</th>
          <th>Location</th>
          <th>Status</th>
          <th>Delivery Task</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {drones.length === 0 ? (
          <tr>
            <td colSpan="6" style={{ padding: 20, textAlign: "center" }}>
              No drones found.
            </td>
          </tr>
        ) : (
          drones.map(({ id, name, battery, location, status, deliveryTask }) => (
            <tr key={id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "8px 10px" }}>
                <Link to={`/drone/${id}`} style={{ color: "#0077cc" }}>
                  {name}
                </Link>
              </td>
              <td style={{ padding: "8px 10px" }}>
                <BatteryBar level={battery} />
                <span style={{ marginLeft: 10 }}>{battery}%</span>
              </td>
              <td style={{ padding: "8px 10px" }}>{location}</td>
              <td style={{ padding: "8px 10px" }}>
                <StatusBadge status={status} />
              </td>
              <td style={{ padding: "8px 10px" }}>
                {deliveryTask || "—"}
              </td>
              <td style={{ padding: "8px 10px" }}>
                <Link to={`/drone/${id}`}>View</Link>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
