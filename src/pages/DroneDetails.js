// src/pages/DroneDetails.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchDroneById } from "../api/mockApi";
import BatteryBar from "../components/BatteryBar";
import StatusBadge from "../components/StatusBadge";

export default function DroneDetails() {
  const { id } = useParams();
  const [drone, setDrone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDroneById(id)
      .then((data) => {
        setDrone(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading drone details...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", fontFamily: "Arial, sans-serif" }}>
      <Link to="/" style={{ display: "inline-block", marginBottom: 20 }}>
        ← Back to Dashboard
      </Link>

      <h2>{drone.name}</h2>

      <p>
        <strong>Status: </strong>
        <StatusBadge status={drone.status} />
      </p>

      <p>
        <strong>Battery: </strong>
        <BatteryBar level={drone.battery} /> {drone.battery}%
      </p>

      <p>
        <strong>Location: </strong> {drone.location}
      </p>

      <p>
        <strong>Delivery Task: </strong>{" "}
        {drone.deliveryTask || "No active task"}
      </p>

      {/* Example Control Buttons */}
      <div style={{ marginTop: 20 }}>
        <button
          onClick={() => alert("Start delivery task triggered (mock)")}
          disabled={drone.status === "Delivering"}
          style={{ marginRight: 10 }}
        >
          Start Delivery
        </button>
        <button
          onClick={() => alert("Send drone to charge (mock)")}
disabled={drone.status === "Charging"}
>
Send to Charge
</button>
</div>
</div>
);
}
