import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [selectedHub, setSelectedHub] = useState(null); // 'railway' or 'airport'

  return (
    <div 
      className="mx-auto bg-white d-flex flex-column justify-content-between min-vh-100 position-relative shadow" 
      style={{ maxWidth: "430px", paddingBottom: "90px" }}
    >
      <div>
        {/* --- APP HEADER --- */}
        <header className="text-center pt-4 pb-3 px-3 border-bottom sticky-top bg-white z-3">
          <h1 className="fw-black fs-2 text-dark mb-0 d-flex align-items-center justify-content-center gap-2">
            🤟 <span>VisualAnnounce</span>
          </h1>
          <div className="d-flex align-items-center justify-content-center gap-2 mt-1">
            <span className="spinner-grow spinner-grow-sm text-success" role="status"></span>
            <small className="text-muted fw-bold tracking-wider text-uppercase small">System Ready</small>
          </div>
        </header>

        {/* --- SCROLLABLE MAIN BODY --- */}
        <main className="p-3">
          
          {/* Hero Banner */}
          <div className="card border-0 bg-primary text-white p-4 mb-4 rounded-4 text-center">
            <h3 className="fw-bold mb-2 fs-4">Tap to Start</h3>
            <p className="small opacity-75 mb-3">Select your location structure to route audio logs to your screen instantly.</p>
            <button 
              onClick={() => navigate("/track-selection")}
              className="btn btn-light w-100 py-3 fw-bold rounded-3 shadow-sm border-0 fs-6 active-scale"
            >
              ⚡ Fast Track Setup
            </button>
          </div>

          <h2 className="fs-6 fw-bold text-uppercase text-muted mb-3 px-1">
            Choose Hub Configuration
          </h2>
          
          <div className="d-flex flex-column gap-3">
            {/* Railway Card */}
            <div 
              onClick={() => setSelectedHub('railway')}
              className={`card p-3 border-3 d-flex flex-row align-items-center gap-3 rounded-4 active-scale transition-all ${
                selectedHub === 'railway' 
                  ? 'border-primary bg-primary bg-opacity-10 shadow-sm' 
                  : 'border-light bg-light bg-opacity-50'
              }`}
              style={{ cursor: 'pointer' }}
            >
              <div className="fs-1 bg-white p-2 rounded-3 shadow-sm">Explicitly 🚆</div>
              <div className="flex-grow-1">
                <h3 className="fw-bold fs-5 text-dark mb-0">Railway</h3>
                <p className="text-muted small mb-0">Platforms, Tracks & Trains</p>
              </div>
              {selectedHub === 'railway' && <div className="bg-primary rounded-circle p-1 text-white text-center fs-6" style={{width:"24px", height:"24px", lineHeight:"14px"}}>✓</div>}
            </div>

            {/* Airport Card */}
            <div 
              onClick={() => setSelectedHub('airport')}
              className={`card p-3 border-3 d-flex flex-row align-items-center gap-3 rounded-4 active-scale transition-all ${
                selectedHub === 'airport' 
                  ? 'border-primary bg-primary bg-opacity-10 shadow-sm' 
                  : 'border-light bg-light bg-opacity-50'
              }`}
              style={{ cursor: 'pointer' }}
            >
              <div className="fs-1 bg-white p-2 rounded-3 shadow-sm">✈️</div>
              <div className="flex-grow-1">
                <h3 className="fw-bold fs-5 text-dark mb-0">Airport</h3>
                <p className="text-muted small mb-0">Gates, Flights & Terminals</p>
              </div>
              {selectedHub === 'airport' && <div className="bg-primary rounded-circle p-1 text-white text-center fs-6" style={{width:"24px", height:"24px", lineHeight:"14px"}}>✓</div>}
            </div>
          </div>

          {/* Dynamic Floating Action Button */}
          {selectedHub && (
            <div className="mt-4 px-1 animate-fade-in">
              <button
                onClick={() => navigate(`/track-selection?hub=${selectedHub}`)}
                className="btn btn-dark w-100 py-3 rounded-3 fw-bold fs-6 shadow active-scale"
              >
                Configure Specific {selectedHub === 'railway' ? 'Platform' : 'Gate'} ➔
              </button>
            </div>
          )}
        </main>
      </div>

      {/* --- NATIVE APP BOTTOM NAV BAR --- */}
      <nav className="position-absolute bottom-0 start-0 end-0 bg-white border-top d-flex justify-content-around align-items-center p-2 z-3" style={{ height: "75px" }}>
        <button 
          onClick={() => navigate("/")}
          className="btn btn-link text-decoration-none text-primary d-flex flex-column align-items-center justify-content-center p-1"
        >
          <span className="fs-4">🏠</span>
          <span className="fw-bold" style={{ fontSize: "11px" }}>Home</span>
        </button>

        <button 
          onClick={() => navigate("/history")}
          className="btn btn-link text-decoration-none text-secondary d-flex flex-column align-items-center justify-content-center p-1"
        >
          <span className="fs-4">📋</span>
          <span style={{ fontSize: "11px" }}>Logs</span>
        </button>

        <button 
          onClick={() => alert("Simulated Emergency Trigger Activated for judges.")}
          className="btn btn-link text-decoration-none text-danger d-flex flex-column align-items-center justify-content-center p-1"
        >
          <span className="fs-4">🚨</span>
          <span style={{ fontSize: "11px" }}>SOS Check</span>
        </button>
      </nav>

    </div>
  );
}

export default Home;