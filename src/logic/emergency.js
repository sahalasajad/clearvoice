const EMERGENCY_KEYWORDS = [
  "emergency", "evacuate", "cancel", "delay", "security alert"
];

// Map your keywords to your actual mp4 files in src/isl/
const VIDEO_MAP = {
  "emergency": "emergency.mp4",
  "evacuate": "evacuate.mp4",
  "cancel": "cancel.mp4",
  "delay": "delay.mp4",
  "security alert": "emergency.mp4"
};

export function isEmergency(transcript) {
  const lower = transcript.toLowerCase();
  const found = EMERGENCY_KEYWORDS.find(k => lower.includes(k));
  
  return {
    matched: !!found,
    keyword: found,
    videoFile: found ? (VIDEO_MAP[found] || "emergency.mp4") : null
  };
}
