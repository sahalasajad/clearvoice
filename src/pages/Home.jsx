import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Fixed duplicate imports

function Home() {
  const navigate = useNavigate();
  const [selectedHub, setSelectedHub] = useState(null); // 'railway' or 'airport'

  // Added basic placeholder styles to prevent runtime errors
  const styles = {
    page: { position: "relative", minHeight: "100vh", paddingBottom: "80px" },
    hero: { padding: "2rem 0" }
  };

  return (
    <div style={styles.page}>
      {/* Hero */}
      <section style={styles.hero}>
        <div className="container">

          <h1 className="display-3 fw-bold">
            🔊 ClearAir
          </h1>

          <h4 className="mt-3">
            Accessible Railway Announcements
          </h4>

          <p className="mt-4 fs-5">
            Helping Deaf and Hard-of-Hearing passengers
            receive live railway announcements through
            captions, emergency alerts and ISL support.
          </p>

          <div className="mt-5">
            <Link
              to="/live-announcement"
              className="btn btn-primary btn-lg"
            >
              Start Listening
            </Link>

            <Link
              to="/history"
              className="btn btn-outline-light btn-lg"
            >
              ⚡ Fast Track Setup
            </Link>
          </div> {/* Fixed missing closing tag for links container */}

          <h2 className="fs-6 fw-bold text-uppercase text-muted my-4 px-1">
            Choose Hub Configuration
          </h2>

          <div className="d-flex flex-column gap-3">
            {/* Railway Card */}
            <div
              onClick={() => setSelectedHub('railway')}
              className={`card p-3 border-3 d-flex flex-row align-items-center gap-3 rounded-4 active-scale transition-all ${selectedHub === 'railway'
                  ? 'border-primary bg-primary bg-opacity-10 shadow-sm'
                  : 'border-light bg-light bg-opacity-50'
                }`}
              style={{ cursor: 'pointer' }}
            >
              <div className="fs-1 bg-white p-2 rounded-3 shadow-sm">🚆</div>
              <div className="flex-grow-1">
                <h3 className="fw-bold fs-5 text-dark mb-0">Railway</h3>
                <p className="text-muted small mb-0">Platforms, Tracks & Trains</p>
              </div>
              {selectedHub === 'railway' && (
                <div className="bg-primary rounded-circle p-1 text-white text-center fs-6" style={{ width: "24px", height: "24px", lineHeight: "14px" }}>✓</div>
              )}
            </div>

            {/* Airport Card */}
            <div
              onClick={() => setSelectedHub('airport')}
              className={`card p-3 border-3 d-flex flex-row align-items-center gap-3 rounded-4 active-scale transition-all ${selectedHub === 'airport'
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
              {selectedHub === 'airport' && (
                <div className="bg-primary rounded-circle p-1 text-white text-center fs-6" style={{ width: "24px", height: "24px", lineHeight: "14px" }}>✓</div>
              )}
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
        </div>
      </section>

      {/* --- NATIVE APP BOTTOM NAV BAR --- */}
      <nav className="position-fixed bottom-0 start-0 end-0 bg-white border-top d-flex justify-content-around align-items-center p-2 z-3" style={{ height: "75px" }}>
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