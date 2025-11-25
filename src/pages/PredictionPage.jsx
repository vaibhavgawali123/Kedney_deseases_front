import React, { useState } from "react";
import axios from "axios";
import { FaHospital, FaClinicMedical, FaUserMd, FaFileMedical, FaMapMarkerAlt, FaUpload } from "react-icons/fa";
import "../styles/PredictionPage.css";
import hospitalsData from "../components/HospitalList.json";

const conditionDetails = {
  normal: {
    title: "Normal Kidney",
    description: "A healthy kidney with no abnormalities, functioning properly to filter waste and excess fluids from the blood.",
    characteristics: [
      "Smooth kidney contours",
      "Uniform tissue density",
      "Normal size (10-12 cm in adults)",
      "Properly functioning nephrons",
      "No visible masses or obstructions"
    ],
    symptoms: [
      "Normal urine output (1-2 liters/day)",
      "Stable blood pressure",
      "No pain or discomfort in kidney area",
      "Balanced electrolyte levels"
    ],
    precautions: [
      "Maintain adequate hydration",
      "Follow a balanced diet low in sodium",
      "Exercise regularly",
      "Monitor blood pressure",
      "Avoid excessive use of NSAIDs"
    ]
  },
  cyst: {
    title: "Kidney Cyst",
    description: "Fluid-filled sacs that form on or in the kidneys, usually benign but may require monitoring.",
    types: [
      "Simple cysts (most common, harmless)",
      "Complex cysts (may require further evaluation)",
      "Polycystic kidney disease (genetic, multiple cysts)"
    ],
    symptoms: [
      "Dull pain in back or side",
      "Fever (if infected)",
      "High blood pressure",
      "Frequent urination",
      "Blood in urine (rare)"
    ],
    precautions: [
      "Regular monitoring with ultrasound",
      "Control blood pressure",
      "Stay hydrated",
      "Report any sudden pain or fever",
      "Genetic counseling if family history of polycystic kidney disease"
    ]
  },
  stone: {
    title: "Kidney Stone",
    description: "Hard mineral and salt deposits that form inside the kidneys.",
    types: [
      "Calcium stones (most common)",
      "Uric acid stones",
      "Struvite stones (infection-related)",
      "Cystine stones (rare, genetic)"
    ],
    symptoms: [
      "Severe flank pain radiating to groin",
      "Painful urination",
      "Pink, red or brown urine",
      "Cloudy or foul-smelling urine",
      "Nausea/vomiting",
      "Persistent urge to urinate"
    ],
    precautions: [
      "Drink 2-3 liters of water daily",
      "Reduce sodium intake",
      "Limit animal protein",
      "Consume calcium-rich foods",
      "Avoid foods high in oxalates if prone to calcium stones"
    ]
  },
  tumor: {
    title: "Kidney Tumor",
    description: "Abnormal growths in kidney tissue, which may be benign or malignant (renal cell carcinoma being most common cancerous type).",
    types: [
      "Benign tumors (e.g., renal adenoma, angiomyolipoma)",
      "Malignant tumors (e.g., renal cell carcinoma, Wilms' tumor in children)"
    ],
    symptoms: [
      "Blood in urine (hematuria)",
      "Persistent flank pain",
      "Unintended weight loss",
      "Fatigue",
      "Intermittent fever",
      "Swelling in ankles/legs"
    ],
    precautions: [
      "Immediate consultation with urologist/oncologist",
      "Regular follow-up imaging",
      "Smoking cessation",
      "Blood pressure management",
      "Healthy diet rich in fruits and vegetables",
      "Genetic testing if family history"
    ]
  }
};

const PredictionPage = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [location, setLocation] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const findHospitalsByLocation = (locationName) => {
    if (!locationName) return [];
    
    const searchTerm = locationName.toLowerCase();
    const matchedHospitals = hospitalsData.filter(hospital => 
      hospital.Location.toLowerCase().includes(searchTerm) ||
      hospital.Address.toLowerCase().includes(searchTerm) ||
      hospital.Name.toLowerCase().includes(searchTerm)
    );
    
    if (matchedHospitals.length > 0) {
      return matchedHospitals.slice(0, 3);
    }
    
    // Try matching by country if city not found
    const countryHospitals = hospitalsData.filter(hospital => 
      hospital.Location.toLowerCase().includes(searchTerm.split(',')[0].trim())
    );
    
    return countryHospitals.length > 0 ? countryHospitals.slice(0, 3) : hospitalsData.slice(0, 3);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !location) {
      setError("Please upload an image and enter your location.");
      return;
    }

    setIsLoading(true);
    setError("");
    setResult(null);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("location", location);

    try {
      // Make actual API call to your prediction endpoint
      const res = await axios.post("http://localhost:5000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      const conditionKey = res.data.prediction.toLowerCase();
      const conditionData = conditionDetails[conditionKey] || conditionDetails.normal;
      const matchedHospitals = findHospitalsByLocation(location);
      
      setResult({ 
        ...res.data,
        conditionData,
        location,
        hospitals: matchedHospitals.map(hospital => ({
          name: hospital.Name,
          distance: (Math.random() * 20 + 1).toFixed(1), // Simulated distance
          address: hospital.Address,
          doctor: hospital["Doctor name"],
          description: hospital.Description,
          speciality: hospital["Speciality tags"]
        }))
      });
    } catch (err) {
      console.error("Prediction error:", err);
      setError(err.response?.data?.error || "Failed to get prediction. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="prediction-container">
      <div className="prediction-form-container">
        <div className="prediction-form">
          <div className="form-header">
            <FaFileMedical className="form-icon" />
            <h2>Kidney Disease Predictor</h2>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="input-label">
                <FaUpload className="input-icon" />
                <span>Upload Medical Image</span>
              </label>
              <div className="file-input-container">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="file-input"
                  id="medical-image-upload"
                />
                <label htmlFor="medical-image-upload" className="file-input-label">
                  Choose Image
                </label>
                {preview && (
                  <div className="image-preview-container">
                    <span className="preview-label">Selected Image:</span>
                    <div className="image-preview">
                      <img src={preview} alt="Preview" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label className="input-label">
                <FaMapMarkerAlt className="input-icon" />
                <span>Your Location</span>
              </label>
              <div className="input-container">
                <input
                  type="text"
                  placeholder="Enter your city or location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="location-input"
                />
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="submit-button">
              {isLoading ? (
                <span className="button-loading">
                  <span className="spinner"></span>
                  Predicting...
                </span>
              ) : (
                "Get Diagnosis"
              )}
            </button>
          </form>

          {error && (
            <div className="error-message">
              <span className="error-icon">!</span>
              {error}
            </div>
          )}
        </div>

        {result && (
          <div className="result-container">
            <h3 className="result-title">Diagnosis Report</h3>
            
            <div className="result-grid">
              <div className="result-card">
                <FaFileMedical className="result-icon diagnosis" />
                <div className="result-content">
                  <span className="result-label">Diagnosis</span>
                  <span className="result-value">{result.prediction}</span>
                </div>
              </div>
              
              <div className="result-card">
                <FaClinicMedical className="result-icon confidence" />
                <div className="result-content">
                  <span className="result-label">Confidence</span>
                  <span className="result-value">{(result.confidence * 100).toFixed(2)}%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="medical-details">
        {result ? (
          <>
            <div className="condition-details">
              <h3 className="condition-title">{result.conditionData.title}</h3>
              <p className="condition-description">{result.conditionData.description}</p>
              
              <div className="details-grid">
                <div className="details-section">
                  <h4 className="section-title">
                    <FaFileMedical className="section-icon" />
                    Key Characteristics
                  </h4>
                  <ul className="details-list">
                    {result.conditionData.characteristics?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="details-section">
                  <h4 className="section-title">
                    <FaClinicMedical className="section-icon" />
                    Common Symptoms
                  </h4>
                  <ul className="details-list">
                    {result.conditionData.symptoms?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                
                {result.conditionData.types && (
                  <div className="details-section">
                    <h4 className="section-title">
                      <FaHospital className="section-icon" />
                      Types
                    </h4>
                    <ul className="details-list">
                      {result.conditionData.types.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="details-section">
                  <h4 className="section-title">
                    <FaUserMd className="section-icon" />
                    Recommended Precautions
                  </h4>
                  <ul className="details-list">
                    {result.conditionData.precautions?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="hospitals-section">
              <h3 className="hospitals-title">
                <FaHospital className="title-icon" />
                Recommended Hospitals nearer to {result.location}
              </h3>
              
              <div className="hospitals-grid">
                {result.hospitals.map((hospital, index) => (
                  <div key={index} className="hospital-card">
                    <div className="hospital-header">
                      <FaHospital className="hospital-icon" />
                      <h4>{hospital.name}</h4>
                    </div>
                    <div className="hospital-details">
                      <p><FaMapMarkerAlt className="detail-icon" /> {hospital.address}</p>
                      <p><FaUserMd className="detail-icon" /> {hospital.doctor}</p>
                      <p className="speciality">
                        <strong>Speciality:</strong> {hospital.speciality}
                      </p>
                      <p className="description">{hospital.description}</p>
                      <p className="distance">{hospital.distance} km away</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="default-message">
            <h3>Kidney Health Information</h3>
            <p>Upload a medical image and enter your location to get a diagnosis and detailed information about your kidney health.</p>
            <div className="default-image">
              <img 
                src="https://5.imimg.com/data5/GLADMIN/Default/2023/2/AZ/XK/YQ/12972674/human-kidney-3d-model.jpg" 
                alt="Human Kidney 3D Model" 
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionPage;