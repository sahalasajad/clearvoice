const EMERGENCY_KEYWORDS = [
  "emergency", "evacuate", "fire", "final boarding",
  "last call", "security alert"
];

export function isEmergency(transcript) {
  const lower = transcript.toLowerCase();
  const found = EMERGENCY_KEYWORDS.find(k => lower.includes(k));
  return { matched: !!found, keyword: found };
}