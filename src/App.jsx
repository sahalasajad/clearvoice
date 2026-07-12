import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LiveAnnouncement from "./pages/LiveAnnouncement";
import { useSpeech } from "./logic/SpeechContext.jsx";

function App() {
  const { latestEmergency, clearEmergency, latestRelevant, clearRelevant } =
    useSpeech();

  return (
    <>
      {/* Non-emergency but relevant announcement (e.g. tracking match) -
          also shows on ANY page. Skipped if it's the same one already
          shown as the emergency banner above. */}
      {latestRelevant && (!latestEmergency || latestRelevant !== latestEmergency) && (
        <div
          className="d-flex justify-content-between align-items-center"
          style={{
            background: "#F59E0B",
            color: "#1E293B",
            padding: "10px 20px",
            fontWeight: "600",
            position: "sticky",
            top: 0,
            zIndex: 999,
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          <span>🔔 {latestRelevant.text}</span>
          <button className="btn btn-sm btn-light" onClick={clearRelevant}>
            Dismiss
          </button>
        </div>
      )}

      {/* Global emergency banner - shows on ANY page, so navigating
          away from Live Announcements never hides an active emergency */}
      {latestEmergency && (
        <div
          className="d-flex justify-content-between align-items-center"
          style={{
            background: "#ff4d4d",
            color: "#fff",
            padding: "12px 20px",
            fontWeight: "bold",
            fontSize: "1.1rem",
            position: "sticky",
            top: 0,
            zIndex: 1000,
          }}
        >
          <span>
            ⚠ EMERGENCY: {latestEmergency.emergencyKeyword} — {latestEmergency.text}
          </span>
          <button
            className="btn btn-sm btn-light"
            onClick={clearEmergency}
          >
            Dismiss
          </button>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/live-announcement" element={<LiveAnnouncement />} />

        {/* Temporary Pages */}
        <Route
          path="/history"
          element={
            <div className="container mt-5">
              <h1>History Page</h1>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;