import emergencyVideo from "../isl/emergency.mp4";
import evacuateVideo from "../isl/evacuate.mp4";
import cancelVideo from "../isl/cancel.mp4";
import delayVideo from "../isl/delay.mp4";

const EMERGENCY_KEYWORDS = [
  "emergency",
  "evacuate",
  "cancel",
  "delay",
  "security alert",
];

const VIDEO_MAP = {
  emergency: emergencyVideo,
  evacuate: evacuateVideo,
  cancel: cancelVideo,
  delay: delayVideo,
  "security alert": emergencyVideo,
};

export function isEmergency(transcript) {
  const lower = transcript.toLowerCase();
  const found = EMERGENCY_KEYWORDS.find((k) => lower.includes(k));

  return {
    matched: !!found,
    keyword: found,
    videoFile: found ? VIDEO_MAP[found] : null,
  };
}
