import React, { useEffect, useState } from "react";
import axios from "axios";
import MapDisplay from "../components/MapDisplay";
import HospitalList from "../components/HospitalList";
import "../styles/NearbyHospitals.css";

const NearbyHospitals = () => {
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        };
        setLocation(coords);

        axios
          .get(`http://localhost:5000/get-hospitals?lat=${coords.lat}&lon=${coords.lon}`)
          .then((res) => {
            const fetchedHospitals = res.data.hospitals || [];
            setHospitals(fetchedHospitals);
          })
          .catch((err) => {
            console.error("Error fetching hospitals:", err);
          });
      },
      (err) => {
        console.error("Geolocation error:", err);
        alert("Unable to access your location.");
      }
    );
  }, []);

  return (
    <div className="nearby-hospitals-wrapper">
      {/* Map Section */}
      <div className="map-left-section">
        <MapDisplay userLocation={location} hospitals={hospitals} />
      </div>

      {/* Hospital List Section */}
      <div className="top-hospitals-section">
        <HospitalList />
      </div>
    </div>
  );
};

export default NearbyHospitals;
