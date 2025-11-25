import React, { useState } from "react";
import hospitals from "./HospitalList.json";
import "../styles/HospitalList.css";


const HospitalList = () => {
  // State to track current page
  const [currentPage, setCurrentPage] = useState(1);
  const hospitalsPerPage = 16;

  // Calculate the index of the first and last hospital to display
  const indexOfLastHospital = currentPage * hospitalsPerPage;
  const indexOfFirstHospital = indexOfLastHospital - hospitalsPerPage;

  // Slice the hospital data for the current page
  const currentHospitals = hospitals.slice(indexOfFirstHospital, indexOfLastHospital);

  // Function to go to the next page
  const nextPage = () => {
    if (indexOfLastHospital < hospitals.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to go to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="hospital-list">
      <h3>List of Hospitals</h3>
      {/* Table Listing Hospitals */}
      <table className="hospital-table">
        <thead>
          <tr>
            <th>       </th>
            <th>Hospital Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {currentHospitals.map((h, i) => (
            <tr key={i}>
              <td>{indexOfFirstHospital + i + 1}</td> {/* Correct Sr. No numbering */}
              <td>{h.Name}</td>
              <td>{h.Location}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={nextPage} disabled={indexOfLastHospital >= hospitals.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default HospitalList;
