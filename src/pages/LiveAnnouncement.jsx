import React, { useState, useEffect } from "react";
import { useSpeech } from "../logic/SpeechContext.jsx";
import { isEmergency } from "../logic/emergency.js"; // Import your emergency checker

export default function LiveAnnouncement() {
  const {
    selectedTracking,
    setSelectedTracking,
    captions,
    start,
    stop,
    isListening,
    interimText,
    error,
  } = useSpeech();

  // Simple popup modal state
  const [showAlert, setShowAlert] = useState(false);
  const [activeVideo, setActiveVideo] = useState("");
  const [activeKeyword, setActiveKeyword] = useState("");

  // Monitor new captions for emergencies
  useEffect(() => {
    if (captions.length > 0) {
      const latestCaption = captions[captions.length - 1];
      
      // Check the latest text using your logic file
      const result = isEmergency(latestCaption.text);
      if (result.matched) {
        setActiveKeyword(result.keyword);
        setActiveVideo(result.videoFile);
        setShowAlert(true);
      }
    }
  }, [captions]);

  return (
    <div className="container mt-4">
      <h2>Live Announcements</h2>

      <div className="mb-3">
    <label htmlFor="tracking-input" className="form-label d-block">
        What would you like to track?
    </label>
    <input
        id="tracking-input"
        className="form-control"
        style={{ maxWidth: "300px" }}
        value={selectedTracking}
        onChange={(e) => setSelectedTracking(e.target.value)}
        placeholder="e.g. Platform 1, Gate A, Train 12034"
    />
    <small className="form-text text-muted">
        Enter one or more values, separated by commas
    </small>
    </div>

      <button
        className="btn btn-primary mb-3"
        onClick={isListening ? stop : start}
      >
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <p style={{ fontStyle: "italic", color: "#888" }}>{interimText}</p>

      {/* --- Emergency Video Popup Overlay --- */}
      {showAlert && (
        <div 
          className="modal d-block position-fixed top-50 start-50 translate-middle p-4 shadow-lg rounded-4 bg-white border border-danger border-3 text-center" 
          style={{ zIndex: 9999, width: "90%", maxWidth: "450px" }}
        >
          <h2 className="text-danger fw-bold animate-pulse">🚨 {activeKeyword.toUpperCase()} DETECTED!</h2>
          <p className="text-muted mb-2">Indian Sign Language (ISL) Translation:</p>
          
          {/* Video Player playing from your src/isl folder */}
          <div className="ratio ratio-16x9 my-3 bg-black rounded overflow-hidden">
            <video 
              src={`/src/isl/${activeVideo}`} 
              autoPlay 
              controls 
              playsInline 
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          <button 
            className="btn btn-danger w-100 fw-bold py-2 mt-2" 
            onClick={() => setShowAlert(false)}
          >
            Dismiss Alert
          </button>
        </div>
      )}

      {/* Background Dimming Panel when Popup is open */}
      {showAlert && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100" 
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 9998 }}
          onClick={() => setShowAlert(false)}
        />
      )}

      {/* Static Transcript Cards list */}
      <div>
        {captions.map((c, i) => (
          <div
            key={i}
            className="card p-3 mb-2"
            style={{
              background: c.emergency ? "#ffdddd" : "#eee",
              border: c.emergency ? "2px solid red" : "1px solid #ccc",
              fontSize: "1.2rem",
            }}
          >
            {c.emergency && (
              <strong style={{ color: "red" }}>
                ⚠ EMERGENCY: {c.emergencyKeyword} —{" "}
              </strong>
            )}
            {c.text}
          </div>
        ))}
      </div>
    </div>
  );
}
