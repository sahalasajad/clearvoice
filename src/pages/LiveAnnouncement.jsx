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