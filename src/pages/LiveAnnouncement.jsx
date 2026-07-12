import { useSpeech } from "../logic/SpeechContext.jsx";

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

  return (
    <div className="container mt-4">
      <h2>Live Announcements</h2>

      <div className="mb-3">
        <label>
          Tracking:{" "}
          <input
            className="form-control"
            style={{ maxWidth: "300px", display: "inline-block" }}
            value={selectedTracking}
            onChange={(e) => setSelectedTracking(e.target.value)}
            placeholder="e.g. Platform 5"
          />
        </label>
      </div>

      <button
        className="btn btn-primary mb-3"
        onClick={isListening ? stop : start}
      >
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <p style={{ fontStyle: "italic", color: "#888" }}>{interimText}</p>

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