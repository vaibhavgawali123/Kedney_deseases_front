import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import hospitalData from "./HospitalList.json";
import "../styles/MapDisplay.css";

// Custom red icon for user location
const userLocationIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [0, -40],
});

// Haversine formula to compute distance in kilometers
const haversineDistance = (loc1, loc2) => {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371; // Earth radius in km

  const dLat = toRad(loc2.lat - loc1.lat);
  const dLon = toRad(loc2.lon - loc1.lon);
  const lat1 = toRad(loc1.lat);
  const lat2 = toRad(loc2.lat);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const MapDisplay = ({ hospitals: propsHospitals }) => {
  const [hospitals, setHospitals] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [topHospitals, setTopHospitals] = useState([]);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        () => {
          console.error("Unable to retrieve user location.");
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
        }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  // Set hospitals
  useEffect(() => {
    if (propsHospitals?.length) {
      setHospitals(propsHospitals);
    } else {
      const filtered = hospitalData.filter((h) => h.Latitude && h.Longitude);
      setHospitals(filtered);
    }
  }, [propsHospitals]);

  // Calculate and set the top 3 nearest hospitals based on user location
  useEffect(() => {
    if (userLocation && hospitals.length > 0) {
      const sortedHospitals = hospitals
        .map((hospital) => {
          const distance = haversineDistance(userLocation, {
            lat: hospital.Latitude || hospital.lat,
            lon: hospital.Longitude || hospital.lon,
          });

          return { ...hospital, distance };
        })
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3); // Top 3 nearest hospitals

      setTopHospitals(sortedHospitals);
    }
  }, [userLocation, hospitals]);

  const defaultCenter = userLocation
    ? [userLocation.lat, userLocation.lon]
    : hospitals.length
    ? [hospitals[0].Latitude, hospitals[0].Longitude]
    : [20, 0];

  return (
    <div className="map-wrapper">
      {/* Map display */}
      <MapContainer
        center={defaultCenter}
        zoom={propsHospitals?.length ? 10 : 2}
        scrollWheelZoom={true}
        className="map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lon]} icon={userLocationIcon}>
            <Popup>
              <strong>You are here</strong>
              <br />
              Latitude: {userLocation.lat.toFixed(4)}
              <br />
              Longitude: {userLocation.lon.toFixed(4)}
            </Popup>
          </Marker>
        )}

        {hospitals.map((hospital, idx) => (
          <Marker key={idx} position={[hospital.Latitude, hospital.Longitude]}>
            <Popup>
              <strong>{hospital.Name}</strong>
              <br />
              {hospital.Address}
            </Popup>
            <Tooltip direction="top" offset={[0, -20]} permanent>
              {hospital.Name}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>

      {/* List of top 3 nearest hospitals */}
      {userLocation && topHospitals.length > 0 && (
        <div className="top-hospitals-container">
          <div className="top-hospitals">
          <h3>Top 3 Nearby Hospitals</h3>
          <ul>
            {topHospitals.map((hospital, idx) => (
              <li key={idx} className="hospital-list-item">
                <strong>{hospital.Name}</strong><br />
                📍 {hospital.Address}<br />
                🩺 Doctor: {hospital["Doctor name"]}<br />
                📏 {hospital.distance.toFixed(2)} km away<br />
                <em>{hospital.Description}</em>
              </li>
            ))}
          </ul>
        </div>

        </div>
      )}
    </div>
  );
};

export default MapDisplay;
