import { createContext, useContext, useState, useCallback } from "react";
import { useSpeechRecognition } from "./useSpeechRecognition.js";
import { processTranscript } from "./processTranscript.js";

const SpeechContext = createContext(null);

export function SpeechProvider({ children }) {
  const [selectedTracking, setSelectedTracking] = useState("Platform 5");
  const [captions, setCaptions] = useState([]);
  const [latestEmergency, setLatestEmergency] = useState(null);
  const [latestRelevant, setLatestRelevant] = useState(null);

  const handleFinalTranscript = useCallback(
    (transcript) => {
      const result = processTranscript(transcript, selectedTracking);

      if (result.show) {
        setCaptions((prev) => [...prev, result]);
        setLatestRelevant(result); 

        if (result.emergency) {
          setLatestEmergency(result);
          if (navigator.vibrate) {
            navigator.vibrate([300, 100, 300, 100, 300]);
          }
        }
      }
    },
    [selectedTracking]
  );

  const { start, stop, isListening, interimText, error } =
    useSpeechRecognition(handleFinalTranscript);

  return (
    <SpeechContext.Provider
      value={{
        selectedTracking,
        setSelectedTracking,
        captions,
        latestEmergency,
        clearEmergency: () => setLatestEmergency(null),
        latestRelevant,
        clearRelevant: () => setLatestRelevant(null),
        start,
        stop,
        isListening,
        interimText,
        error,
      }}
    >
      {children}
    </SpeechContext.Provider>
  );
}

export function useSpeech() {
  const ctx = useContext(SpeechContext);
  if (!ctx) {
    throw new Error("useSpeech must be used inside <SpeechProvider>");
  }
  return ctx;
}