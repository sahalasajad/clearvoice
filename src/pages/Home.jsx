import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [selectedHub, setSelectedHub] = useState(null); // 'railway' or 'airport'

  const styles = {
    page: {
      minHeight: "100vh",
      paddingBottom: "100px",
      background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    },
    heroCard: {
      background: "rgba(255, 255, 255, 0.85)",
      backdropFilter: "blur(10px)",
      borderRadius: "24px",
      boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
    },
    hubCard: {
      cursor: "pointer",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
    }
  };

  return (
    <div style={styles.page} className="py-4">
      <div className="container px-4">
        
        {/* Main Branding Header */}
        <div className="text-center my-4">
          <h1 className="display-4 fw-black text-dark mb-1 d-flex align-items-center justify-content-center gap-2">
            <span>🔊</span> ClearAir
          </h1>
          <span className="badge bg-dark px-3 py-2 rounded-pill text-uppercase tracking-wider">
            Accessibility Hub
          </span>
        </div>

        {/* Hero & Intro Section */}
        <div className="p-4 mb-4" style={styles.heroCard}>
          <h4 className="fw-bold text-secondary mb-2">Real-Time Transit Transcripts</h4>
          <p className="text-muted mb-0 lh-base">
            Helping Deaf and Hard-of-Hearing passengers receive live transit announcements through 
            instant captions, high-priority emergency alerts, and sign language support.
          </p>
        </div>

        {/* Interactive Hub Selector */}
        <div className="my-4">
          <h2 className="fs-6 fw-bold text-uppercase text-secondary tracking-wide mb-3 px-1">
            Where are you traveling today?
          </h2>

          <div className="row g-3">
            {/* Railway Card */}
            <div className="col-12 col-md-6">
              <div
                onClick={() => setSelectedHub('railway')}
                className={`card p-4 border-2 h-100 rounded-4 d-flex flex-row align-items-center gap-3 shadow-sm ${
                  selectedHub === 'railway'
                    ? 'border-primary bg-white ring-2 ring-primary'
                    : 'border-white bg-white bg-opacity-60'
                }`}
                style={{
                  ...styles.hubCard,
                  transform: selectedHub === 'railway' ? 'scale(1.02)' : 'scale(1)',
                }}
              >
                <div className="fs-1 bg-primary bg-opacity-10 p-3 rounded-4 shadow-sm text-primary">
                  🚆
                </div>
                <div className="flex-grow-1">
                  <h3 className="fw-bold fs-4 text-dark mb-1">Railway Hub</h3>
                  <p className="text-muted small mb-0">Track platforms, train timelines & boarding calls</p>
                </div>
                <div 
                  className={`rounded-circle d-flex align-items-center justify-content-center transition-all`} 
                  style={{ 
                    width: "28px", 
                    height: "28px", 
                    border: "2px solid #0d6efd",
                    backgroundColor: selectedHub === 'railway' ? '#0d6efd' : 'transparent',
                    color: '#fff'
                  }}
                >
                  {selectedHub === 'railway' && "✓"}
                </div>
              </div>
            </div>

            {/* Airport Card */}
            <div className="col-12 col-md-6">
              <div
                onClick={() => setSelectedHub('airport')}
                className={`card p-4 border-2 h-100 rounded-4 d-flex flex-row align-items-center gap-3 shadow-sm ${
                  selectedHub === 'airport'
                    ? 'border-info bg-white ring-2 ring-info'
                    : 'border-white bg-white bg-opacity-60'
                }`}
                style={{
                  ...styles.hubCard,
                  transform: selectedHub === 'airport' ? 'scale(1.02)' : 'scale(1)',
                }}
              >
                <div className="fs-1 bg-info bg-opacity-10 p-3 rounded-4 shadow-sm text-info">
                  ✈️
                </div>
                <div className="flex-grow-1">
                  <h3 className="fw-bold fs-4 text-dark mb-1">Airport Hub</h3>
                  <p className="text-muted small mb-0">Monitor terminal gates, flight delays & baggage drops</p>
                </div>
                <div 
                  className={`rounded-circle d-flex align-items-center justify-content-center transition-all`} 
                  style={{ 
                    width: "28px", 
                    height: "28px", 
                    border: "2px solid #0dcaf0",
                    backgroundColor: selectedHub === 'airport' ? '#0dcaf0' : 'transparent',
                    color: '#fff'
                  }}
                >
                  {selectedHub === 'airport' && "✓"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Context Action Trigger */}
        <div style={{ minHeight: "80px" }} className="mt-4">
          {selectedHub ? (
            <div className="animate-fade-in text-center">
              <p className="text-muted small mb-2 fw-semibold">
                Ready to stream live updates for your {selectedHub === 'railway' ? 'Train' : 'Flight'}?
              </p>
              <button
                onClick={() => navigate(`/live-announcement?hub=${selectedHub}`)}
                className={`btn btn-lg w-100 py-3 rounded-4 fw-bold shadow active-scale text-white border-0 transition-all ${
                  selectedHub === 'railway' ? 'bg-primary' : 'bg-info'
                }`}
              >
                🎯 Start Listening to {selectedHub === 'railway' ? 'Railway' : 'Airport'} Announcements
              </button>
            </div>
          ) : (
            <div className="text-center p-3 border border-dashed rounded-4 bg-light text-muted">
              Select a transport option above to begin listening.
            </div>
          )}
        </div>

      </div>

      {/* --- NATIVE APP BOTTOM NAV BAR --- */}
      <nav className="position-fixed bottom-0 start-0 end-0 bg-white border-top d-flex justify-content-around align-items-center p-2 z-3 shadow-lg" style={{ height: "75px" }}>
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

export default Home; // <--- This line is critical to fix the App.jsx routing error