import { useState, useCallback } from "react";
import { useSpeechRecognition } from "../logic/useSpeechRecognition.js";
import { processTranscript } from "../logic/processTranscript.js";

export default function LiveAnnouncement() {
  const [selectedTracking, setSelectedTracking] = useState("Platform 5");
  const [captions, setCaptions] = useState([]); // history of processed results

  const handleFinalTranscript = useCallback(
    (transcript) => {
      const result = processTranscript(transcript, selectedTracking);

      if (result.show) {
        setCaptions((prev) => [...prev, result]);

        // Trigger vibration on emergency (Web Vibration API)
        if (result.emergency && navigator.vibrate) {
          navigator.vibrate([300, 100, 300, 100, 300]);
        }
      }
    },
    [selectedTracking]
  );

  const { start, stop, isListening, interimText, error } =
    useSpeechRecognition(handleFinalTranscript);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Live Announcements</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label>
          Tracking:{" "}
          <input
            value={selectedTracking}
            onChange={(e) => setSelectedTracking(e.target.value)}
            placeholder="e.g. Platform 5"
          />
        </label>
      </div>

      <button onClick={isListening ? stop : start}>
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <p style={{ fontStyle: "italic", color: "#888" }}>{interimText}</p>

      <div style={{ marginTop: "1rem" }}>
        {captions.map((c, i) => (
          <div
            key={i}
            style={{
              padding: "0.75rem",
              marginBottom: "0.5rem",
              borderRadius: "8px",
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