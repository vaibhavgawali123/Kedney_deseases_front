import React from "react";
import { FaUpload, FaMapMarkerAlt, FaClinicMedical, FaFileMedical, FaHospital } from "react-icons/fa";
import { MdHealthAndSafety, MdOutlineScience } from "react-icons/md";
import backgroundImage from "../assets/background.jpg";
import "../styles/LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <header className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Kidney Disease Prediction System</h1>
          <p className="hero-subtitle">
            AI-powered diagnosis with personalized treatment recommendations
          </p>
          <button 
            className="cta-button" 
            onClick={() => (window.location.href = "/predict")}
          >
            Get Started
          </button>
        </div>
      </header>

      <section className="about-section">
        <div className="section-content">
          <h2>About The Project</h2>
          <div className="about-grid">
            <div className="about-card">
              <MdHealthAndSafety className="about-icon" />
              <h3>Medical Innovation</h3>
              <p>
                Our system uses advanced machine learning to analyze kidney CT scans 
                and detect abnormalities with high accuracy.
              </p>
            </div>
            <div className="about-card">
              <FaHospital className="about-icon" />
              <h3>Treatment Guidance</h3>
              <p>
                Get immediate recommendations for specialized hospitals based on your 
                location and condition.
              </p>
            </div>
            <div className="about-card">
              <MdOutlineScience className="about-icon" />
              <h3>Research-Backed</h3>
              <p>
                Developed using clinically validated datasets and medical research 
                in nephrology.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="section-content">
          <h2>How It Works</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <FaUpload className="step-icon" />
              <h3>Upload Scan</h3>
              <p>Upload your kidney CT scan image</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <FaMapMarkerAlt className="step-icon" />
              <h3>Enter Location</h3>
              <p>Provide your city or location</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <FaFileMedical className="step-icon" />
              <h3>Get Diagnosis</h3>
              <p>Receive AI-powered prediction with confidence score</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <FaClinicMedical className="step-icon" />
              <h3>Find Hospitals</h3>
              <p>Discover top 3 specialized hospitals near you</p>
            </div>
          </div>
        </div>
      </section>

      <section className="data-flow">
        <div className="section-content">
          <h2>System Flow</h2>
          <div className="flow-diagram">
            <div className="flow-step">
              <h3>Input</h3>
              <p>Medical Image + Location</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <h3>Processing</h3>
              <p>AI Analysis + Hospital Matching</p>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-step">
              <h3>Output</h3>
              <p>Diagnosis + Hospital Recommendations</p>
            </div>
          </div>
        </div>
      </section>

      <section className="differentiators">
        <div className="section-content">
          <h2>Key Advantages</h2>
          <ul className="features-list">
            <li>
              <strong>Comprehensive Solution:</strong> Combines diagnosis and treatment recommendations
            </li>
            <li>
              <strong>Verified Hospital Data:</strong> Real specialist information from top institutions
            </li>
            <li>
              <strong>Educational Resources:</strong> Detailed condition explanations and care guidelines
            </li>
            <li>
              <strong>Universal Access:</strong> Responsive design works on all devices
            </li>
            <li>
              <strong>Rapid Results:</strong> Get answers in minutes, not days
            </li>
          </ul>
        </div>
      </section>

      <section className="use-case">
        <div className="section-content">
          <h2>Example Scenario</h2>
          <div className="case-study">
            <div className="case-step">
              <div className="case-header">
                <div className="case-number">1</div>
                <h3>User Input</h3>
              </div>
              <p>
                A patient in <strong>Toronto</strong> uploads a kidney ultrasound showing potential abnormalities
              </p>
            </div>
            <div className="case-step">
              <div className="case-header">
                <div className="case-number">2</div>
                <h3>System Analysis</h3>
              </div>
              <p>
                AI detects <strong>"Kidney Stone"</strong> with <strong>92% confidence</strong>
              </p>
            </div>
            <div className="case-step">
              <div className="case-header">
                <div className="case-number">3</div>
                <h3>Recommendations</h3>
              </div>
              <ul className="recommendations">
                <li>Toronto General Hospital (4.2 km)</li>
                <li>St. Michael's Hospital (5.7 km)</li>
                <li>Mayo Clinic (international option)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <p>© {new Date().getFullYear()} Kidney Disease Prediction System</p>
        <button 
          className="cta-button footer-cta" 
          onClick={() => (window.location.href = "/predict")}
        >
          Try It Now
        </button>
      </footer>
    </div>
  );
};

export default LandingPage;