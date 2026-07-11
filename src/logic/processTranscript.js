import { isRelevant } from "./matching.js";
import { isEmergency } from "./emergency.js";

export function processTranscript(transcript, selectedTracking) {
  const relevant = isRelevant(transcript, selectedTracking);
  const { matched, keyword } = isEmergency(transcript);

  return {
    show: relevant || matched,
    emergency: matched,
    emergencyKeyword: keyword,
    text: transcript
  };
}