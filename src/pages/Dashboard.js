import React, { useEffect, useState } from "react";
import { fetchDrones } from "../api/mockApi";
import DroneList from "../components/DroneList";

export default function Dashboard() {
  const [drones, setDrones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchDrones().then((data) => {
      setDrones(data);
      setLoading(false);
    });
  }, []);

  const filteredDrones =
    filter === "All"
      ? drones
      : drones.filter((d) => d.status === filter);

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", fontFamily: "Arial, sans-serif" }}>
      <h1>Drone Delivery Fleet Dashboard</h1>

      <div style={{ marginBottom: 20 }}>
        <label htmlFor="statusFilter">Filter by Status: </label>
        <select
          id="statusFilter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: "0.3rem", fontSize: "1rem" }}
        >
          <option>All</option>
          <option>Idle</option>
          <option>Delivering</option>
          <option>Charging</option>
        </select>
      </div>

      {loading ? (
        <p>Loading drones...</p>
      ) : (
        <DroneList drones={filteredDrones} />
      )}
    </div>
  );
}
