import React, { useEffect, useState } from "react";

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

const TopHospitals = ({ hospitals, userLocation }) => {
  const [topHospitals, setTopHospitals] = useState([]);

  useEffect(() => {
    if (!userLocation || hospitals.length === 0) return;

    const sorted = hospitals
      .map((hospital) => {
        const distance = haversineDistance(userLocation, {
          lat: hospital.Latitude || hospital.lat,
          lon: hospital.Longitude || hospital.lon,
        });

        return { ...hospital, distance };
      })
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3); // Top 3 nearest hospitals

    setTopHospitals(sorted);
  }, [hospitals, userLocation]);

  return (
    <div className="top-hospitals">
      <h3>Top 3 Nearby Hospitals</h3>
      <ul>
        {topHospitals.map((hospital, idx) => (
          <li key={idx}>
            <strong>{hospital.Name}</strong><br />
            📍 {hospital.Address}<br />
            🩺 Doctor: {hospital["Doctor name"]}<br />
            📏 {hospital.distance.toFixed(2)} km away<br />
            <em>{hospital.Description}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopHospitals;
