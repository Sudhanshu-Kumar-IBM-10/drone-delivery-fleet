import React, { useEffect, useState } from "react";
import BatteryBar from "./components/BatteryBar";
import StatusBadge from "./components/StatusBadge";
import { mockDrones } from "./data/mockDrones";
import "./App.css";
import Home from "./home";
import './home.css'

function App() {
  const [drones, setDrones] = useState([]);
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDroneLocation, setSelectedDroneLocation] = useState(null);
  const [selectedDrone, setSelectedDrone] = useState(null);
  const dronesPerPage = 14; // Show 14 drones per page

  // Mock coordinates for the drones (simulating street positions)
  const droneLocations = {
    "Warehouse A": { top: "20%", left: "30%" },
    "Warehouse B": { top: "40%", left: "60%" },
    "On Route": { top: "50%", left: "70%" },
    "Charging Station": { top: "80%", left: "90%" },
  };

  // Simulate fetching data with useEffect and mock API
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDrones(mockDrones);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  // Filter drones by status
  const filteredDrones =
    filter === "All" ? drones : drones.filter((d) => d.status === filter);

  // Pagination Logic (apply pagination to filtered drones)
  const totalPages = Math.ceil(filteredDrones.length / dronesPerPage);
  const startIndex = (currentPage - 1) * dronesPerPage;
  const currentDrones = filteredDrones.slice(startIndex, startIndex + dronesPerPage);

  // Handle next and previous page navigation
  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Handle clicking on a location
  const handleLocationClick = (location, drone) => {
    setSelectedDroneLocation(location);  // Set the selected location
    setSelectedDrone(drone); // Store selected drone for map view
    setIsModalOpen(true); // Open the modal
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDroneLocation(null); // Reset location when modal is closed
    setSelectedDrone(null); // Reset drone
  };

  return (
    <>
    <Home />
    <header>
        <h1>Drone Delivery Fleet</h1>
    </header>
    <div style={{ maxWidth: "100%", margin: "4rem 16px", fontFamily: "Arial, sans-serif" }}>

      <h1>Fleet Dashboard</h1>

      <div style={{ marginBottom: 20 }}>
        <label htmlFor="statusFilter">Filter by Status: </label>
        <select
          id="statusFilter"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1); // Reset to the first page when the filter changes
          }}
          style={{ padding: "0.3rem", fontSize: "1rem" }}
        >
          <option>All</option>
          <option>Idle</option>
          <option>Delivering</option>
          <option>Charging</option>
        </select>
      </div>

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
          </tr>
        </thead>
        <tbody>
          {currentDrones.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ padding: 20, textAlign: "center" }}>
                Loading or no drones match filter...
              </td>
            </tr>
          ) : (
            currentDrones.map(({ id, name, battery, location, status, deliveryTask }) => (
              <tr key={id} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "8px 10px" }}>{name}</td>
                <td style={{ padding: "8px 10px" }}>
                  <BatteryBar level={battery} />
                  <span style={{ marginLeft: 10 }}>{battery}%</span>
                </td>
                <td style={{ padding: "8px 10px" }}>
                  {/* Make location clickable */}
                  <a
                    href="#"
                    onClick={() => handleLocationClick(location, { name, status, location })}
                    style={{
                      color: "blue",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    {location}
                  </a>
                </td>
                <td style={{ padding: "8px 10px" }}>
                  <StatusBadge status={status} />
                </td>
                <td style={{ padding: "8px 10px" }}>{deliveryTask || "—"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {filteredDrones.length > 10 && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            style={{ padding: "0.5rem", margin: "0 10px", cursor: "pointer" }}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            style={{ padding: "0.5rem", margin: "0 10px", cursor: "pointer" }}
          >
            Next
          </button>
        </div>
      )}

      {/* Footer */}
      {filteredDrones.length > 10 && currentPage === 2 && (
        <div style={{ marginTop: "20px", textAlign: "center", color: "gray" }}>
          <p>End of Page 2. Total drones: {filteredDrones.length}</p>
        </div>
      )}

      {/* Modal for Live Location */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              minWidth: "300px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2>Live Location of Drone</h2>
            <p>
              The live location of <strong>{selectedDrone.name}</strong> is currently:{" "}
              <strong>{selectedDroneLocation}</strong>
            </p>

            <div style={{ position: "relative", marginTop: "20px" }}>
              {/* Street map background */}
              <div
                style={{
                  position: "relative",
                  backgroundImage: "url('https://via.placeholder.com/800x600?text=Street+Map')", // Placeholder image for street map
                  backgroundSize: "cover",
                  width: "800px",
                  height: "600px",
                  borderRadius: "8px",
                }}
              >
                {/* Drone marker on the map */}
                <div
                  style={{
                    position: "absolute",
                    top: droneLocations[selectedDroneLocation]?.top,
                    left: droneLocations[selectedDroneLocation]?.left,
                    width: "15px",
                    height: "15px",
                    backgroundColor: "red",
                    borderRadius: "50%",
                    zIndex: 10,
                  }}
                ></div>
              </div>
            </div>

            <button
              onClick={closeModal}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "red",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "4px",
                marginTop: "20px",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default App;
