import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { mockDrones } from '../data/mockDrones'; // Adjust the path as per your project structure

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

function DroneMap() {
  const center = [40.7128, -74.006]; // Center of all drones (NYC-like area)

  return (
    <MapContainer center={center} zoom={14} style={{ height: '600px', width: '1000px' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {mockDrones.map((drone) => (
        <Marker
          key={drone.id}
          position={[drone.latitude, drone.longitude]}
        >
          <Popup>
            <strong>{drone.name}</strong><br />
            Battery: {drone.battery}%<br />
            Status: {drone.status}<br />
            {drone.deliveryTask && <>Task: {drone.deliveryTask}<br /></>}
            Location: {drone.location}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default DroneMap;
