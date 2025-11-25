import React, { useState } from 'react';
import hospitals from '../components/HospitalList.json';
import '../styles/ResearchComparison.css';

const ResearchComparison = () => {
  const [activePaper, setActivePaper] = useState(null);
  const [currentHospitalPage, setCurrentHospitalPage] = useState(1);
  const hospitalsPerPage = 3;

  const togglePaper = (paperId) => {
    setActivePaper(activePaper === paperId ? null : paperId);
  };

  // Hospital pagination logic
  const indexOfLastHospital = currentHospitalPage * hospitalsPerPage;
  const indexOfFirstHospital = indexOfLastHospital - hospitalsPerPage;
  const currentHospitals = hospitals.slice(indexOfFirstHospital, indexOfLastHospital);

  const nextHospitalPage = () => {
    if (indexOfLastHospital < hospitals.length) {
      setCurrentHospitalPage(currentHospitalPage + 1);
    }
  };

  const prevHospitalPage = () => {
    if (currentHospitalPage > 1) {
      setCurrentHospitalPage(currentHospitalPage - 1);
    }
  };

  return (
    <div className="research-container">
      <h1>Renal Segmentation Research & Global Nephrology Centers</h1>
      
      {/* Research Papers Section */}
      <section className="research-section">
        <h2>Comparative Analysis of Renal Segmentation Research Papers</h2>
        
        {/* Paper 1 */}
        <div className={`paper-card ${activePaper === 'paper1' ? 'active' : ''}`}>
          <button className="paper-button" onClick={() => togglePaper('paper1')}>
            <h3>Weakly-supervised CNNs for Renal Tumor Segmentation</h3>
            <span className="arrow">{activePaper === 'paper1' ? '▼' : '▶'}</span>
          </button>
          
          {activePaper === 'paper1' && (
            <div className="paper-content">
              <div className="paper-meta">
                <p><strong>Authors:</strong> Yang et al.</p>
                <p><strong>Published in:</strong> BMC Medical Imaging (2020)</p>
                <p><strong>DOI:</strong> 10.1186/s12880-020-00491-2</p>
              </div>
              
              <h4>Key Contributions:</h4>
              <ul>
                <li>Proposes a three-stage weakly-supervised CNN framework for renal tumor segmentation using bounding box annotations</li>
                <li>Stages include pseudo mask generation (using ConvCRFs), group training, and weighted training with VWCE loss</li>
                <li>Achieves a Dice coefficient (DSC) of 0.826, close to fully supervised methods</li>
                <li>Validated on 130 CT scans with renal tumors</li>
              </ul>
              
              <div className="strengths-drawbacks">
                <div className="strengths">
                  <h4>Strengths:</h4>
                  <ul>
                    <li>Reduces annotation burden (bounding boxes instead of pixel-wise labels)</li>
                    <li>Handles variability in tumor size, location, and texture</li>
                    <li>Outperforms other weakly-supervised methods like SDI and Constrained-CNN</li>
                    <li>Open-source implementation available</li>
                  </ul>
                </div>
                
                <div className="drawbacks">
                  <h4>Limitations:</h4>
                  <ul>
                    <li>Limited validation on external datasets (single-center data)</li>
                    <li>Performance drops for small tumors (&lt;2cm) and complex shapes</li>
                    <li>Requires post-processing for clinical use</li>
                  </ul>
                </div>
              </div>
              
              <div className="clinical-relevance">
                <h4>Clinical Applications:</h4>
                <p>This approach is particularly valuable for:</p>
                <ul>
                  <li>Tumor localization in laparoscopic partial nephrectomy (LPN) planning</li>
                  <li>Longitudinal tumor growth monitoring</li>
                  <li>Institutions with limited resources for detailed annotations</li>
                </ul>
              </div>
            </div>
          )}
        </div>
        
        {/* Paper 2 */}
        <div className={`paper-card ${activePaper === 'paper2' ? 'active' : ''}`}>
          <button className="paper-button" onClick={() => togglePaper('paper2')}>
            <h3>Segmentation-based Quantitative Measurements in Renal CT Imaging</h3>
            <span className="arrow">{activePaper === 'paper2' ? '▼' : '▶'}</span>
          </button>
          
          {activePaper === 'paper2' && (
            <div className="paper-content">
              <div className="paper-meta">
                <p><strong>Authors:</strong> Koukoutegos et al.</p>
                <p><strong>Published in:</strong> European Radiology Experimental (2024)</p>
                <p><strong>DOI:</strong> 10.1186/s41747-023-00406-0</p>
              </div>
              
              <h4>Key Contributions:</h4>
              <ul>
                <li>Develops two 3D U-Net models for kidney segmentation in contrast-enhanced (CE) and non-contrast (NC) CT scans</li>
                <li>Achieves high DSC (0.92–0.95) and excellent ICC (>0.90) for renal volume and axes measurements</li>
                <li>Validated on multiple test sets (n=200), including low-dose and photon-counting CT (PCCT)</li>
                <li>Provides automated measurements of kidney length, width, thickness, and volume</li>
              </ul>
              
              <div className="strengths-drawbacks">
                <div className="strengths">
                  <h4>Strengths:</h4>
                  <ul>
                    <li>Accurate and reproducible kidney measurements (volume, length, width, thickness)</li>
                    <li>Generalizes well across different CT protocols (CE, NC, low-dose, PCCT)</li>
                    <li>Outperforms traditional ellipsoid models (38% error vs. 4% error with DL)</li>
                    <li>Full segmentation pipeline takes &lt;30 seconds per case</li>
                  </ul>
                </div>
                
                <div className="drawbacks">
                  <h4>Limitations:</h4>
                  <ul>
                    <li>Trained only on healthy kidneys—may not generalize well to diseased kidneys</li>
                    <li>Single-institution data—potential bias in model performance</li>
                    <li>Requires GPU acceleration for optimal performance</li>
                  </ul>
                </div>
              </div>
              
              <div className="clinical-relevance">
                <h4>Clinical Applications:</h4>
                <p>This method is particularly useful for:</p>
                <ul>
                  <li>Living donor kidney transplant evaluation</li>
                  <li>Chronic kidney disease monitoring</li>
                  <li>Post-nephrectomy compensatory hypertrophy assessment</li>
                </ul>
              </div>
            </div>
          )}
        </div>
        
        {/* Paper 3 */}
        <div className={`paper-card ${activePaper === 'paper3' ? 'active' : ''}`}>
          <button className="paper-button" onClick={() => togglePaper('paper3')}>
            <h3>Segmentation of ADPKD CT Images with Deep Learning</h3>
            <span className="arrow">{activePaper === 'paper3' ? '▼' : '▶'}</span>
          </button>
          
          {activePaper === 'paper3' && (
            <div className="paper-content">
              <div className="paper-meta">
                <p><strong>Authors:</strong> Sheng et al.</p>
                <p><strong>Published in:</strong> Biomedicines (2024)</p>
                <p><strong>DOI:</strong> 10.3390/biomedicines12010154</p>
              </div>
              
              <h4>Key Contributions:</h4>
              <ul>
                <li>Proposes an end-to-end AI framework for automatic localization, segmentation, and TKV estimation in ADPKD patients</li>
                <li>Achieves mIoU of 92% (segmentation) and R² of 97% (TKV estimation)</li>
                <li>Uses SSD Inception V2 (localization), DeepLab V3+ (segmentation), and Decision Tree Regression (TKV estimation)</li>
                <li>Validated on balanced dataset (100 NCCT + 100 CCT scans from 97 patients)</li>
              </ul>
              
              <div className="strengths-drawbacks">
                <div className="strengths">
                  <h4>Strengths:</h4>
                  <ul>
                    <li>Robust across imaging modalities (NCCT and CCT)</li>
                    <li>High accuracy in TKV prediction, critical for ADPKD progression monitoring</li>
                    <li>Complete pipeline from image input to TKV estimation</li>
                    <li>Handles large cystic kidneys effectively</li>
                  </ul>
                </div>
                
                <div className="drawbacks">
                  <h4>Limitations:</h4>
                  <ul>
                    <li>Limited dataset size (200 scans from 97 patients)—may affect generalizability</li>
                    <li>Segmentation errors in cases with cyst-organ overlap or homogeneous intensity</li>
                    <li>Not validated for early-stage ADPKD (Mayo Class 1A-1B)</li>
                  </ul>
                </div>
              </div>
              
              <div className="clinical-relevance">
                <h4>Clinical Applications:</h4>
                <p>This system is particularly valuable for:</p>
                <ul>
                  <li>ADPKD patient stratification (Mayo Classification)</li>
                  <li>Clinical trial enrollment assessment</li>
                  <li>Monitoring response to vasopressin antagonists</li>
                </ul>
              </div>
            </div>
          )}
        </div>
        
        {/* Comparative Analysis */}
        <div className="comparative-analysis">
          <h3>Comparative Analysis</h3>
          
          <table>
            <thead>
              <tr>
                <th>Aspect</th>
                <th>Yang et al. (2020)</th>
                <th>Koukoutegos et al. (2024)</th>
                <th>Sheng et al. (2024)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Primary Focus</td>
                <td>Renal tumor segmentation</td>
                <td>Kidney segmentation & measurements</td>
                <td>ADPKD localization, segmentation, TKV</td>
              </tr>
              <tr>
                <td>Annotation Type</td>
                <td>Weakly-supervised (boxes)</td>
                <td>Fully-supervised (masks)</td>
                <td>Fully-supervised (masks)</td>
              </tr>
              <tr>
                <td>Model Architecture</td>
                <td>Three-stage CNN</td>
                <td>3D U-Net (dual models)</td>
                <td>SSD + DeepLab V3+</td>
              </tr>
              <tr>
                <td>Performance Metric</td>
                <td>DSC: 0.826 (tumor)</td>
                <td>DSC: 0.92-0.95 (kidney)</td>
                <td>mIoU: 0.92 (ADPKD)</td>
              </tr>
              <tr>
                <td>Validation Dataset</td>
                <td>130 CTs (single center)</td>
                <td>200 CTs (multi-protocol)</td>
                <td>200 CTs (97 patients)</td>
              </tr>
              <tr>
                <td>Key Innovation</td>
                <td>Reduced annotation effort</td>
                <td>Automated measurements</td>
                <td>End-to-end ADPKD pipeline</td>
              </tr>
              <tr>
                <td>Clinical Use Case</td>
                <td>Tumor surgery planning</td>
                <td>Transplant evaluation</td>
                <td>ADPKD progression</td>
              </tr>
            </tbody>
          </table>
          
          <div className="key-takeaways">
            <h4>Key Takeaways for Clinical Implementation</h4>
            <ul>
              <li><strong>For tumor segmentation:</strong> Yang's weakly-supervised approach reduces annotation time by 70% compared to full segmentation</li>
              <li><strong>For precise measurements:</strong> Koukoutegos' method shows &lt;5% error in renal volume vs. manual segmentation</li>
              <li><strong>For ADPKD management:</strong> Sheng's pipeline achieves &lt;3% TKV error compared to reference standards</li>
              <li><strong>Hybrid potential:</strong> Combining these approaches could create comprehensive renal analysis system</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Global Nephrology Centers */}
      <section className="hospital-section">
        <h2>Global Nephrology Specialty Centers</h2>
        <div className="hospital-cards-container">
          {currentHospitals.map((hospital, index) => (
            <div key={index} className="hospital-card">
              <h3>{hospital.Name}</h3>
              <div className="hospital-details">
                <p><strong>Location:</strong> {hospital.Location}</p>
                <p><strong>Address:</strong> {hospital.Address}</p>
                <p><strong>Lead Nephrologist:</strong> {hospital['Doctor name']}</p>
                <p><strong>Specialties:</strong> {hospital['Speciality tags']}</p>
                <p className="hospital-description">{hospital.Description}</p>
                <div className="hospital-meta">
                  <span>Coordinates: {hospital.Latitude.toFixed(4)}, {hospital.Longitude.toFixed(4)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination-controls">
          <button 
            onClick={prevHospitalPage} 
            disabled={currentHospitalPage === 1}
            className="pagination-button"
          >
            Previous
          </button>
          <span className="page-indicator">
            Page {currentHospitalPage} of {Math.ceil(hospitals.length / hospitalsPerPage)}
          </span>
          <button 
            onClick={nextHospitalPage} 
            disabled={indexOfLastHospital >= hospitals.length}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      </section>

      {/* Project Workflow */}
      <section className="project-flow">
        <h2>Hospital Locator Workflow</h2>
        <div className="flow-steps">
          <div className="flow-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>User Opens Map</h3>
              <p>Patient or physician accesses the hospital locator feature.</p>
            </div>
          </div>
          <div className="flow-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Geolocation Detection</h3>
              <p>System requests and obtains user's current location (with consent).</p>
            </div>
          </div>
          <div className="flow-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Hospital Data Load</h3>
              <p>System retrieves database of available hospitals and their locations.</p>
            </div>
          </div>
          <div className="flow-step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Distance Calculation</h3>
              <p>Algorithm calculates distances and identifies 3 nearest hospitals.</p>
            </div>
          </div>
          <div className="flow-step">
            <div className="step-number">5</div>
            <div className="step-content">
              <h3>Results Display</h3>
              <p>Map shows user location and nearby hospitals with list of closest options.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResearchComparison;