import React from "react";

function ISLVideo({ transcript }) {
  const text = transcript.toLowerCase();

  let video = "";
  let label = "";

  if (text.includes("emergency")) {
    video = "/isl/emergency.mp4";
    label = "Emergency";
  } 
  else if (text.includes("evacuate") || text.includes("evacuation")) {
    video = "/isl/evacuate.mp4";
    label = "Evacuate";
  } 
  else if (
    text.includes("cancelled") ||
    text.includes("canceled") ||
    text.includes("cancel")
  ) {
    video = "/isl/cancelled.mp4";
    label = "Cancelled";
  } 
  else if (
    text.includes("delay") ||
    text.includes("delayed")
  ) {
    video = "/isl/delay.mp4";
    label = "Delay";
  } 
  else if (text.includes("train")) {
    video = "/isl/train.mp4";
    label = "Train";
  }

  if (!video) return null;

  return (
    <div className="card mt-4 shadow">
      <div className="card-body text-center">
        <h4>Indian Sign Language</h4>

        <span className="badge bg-primary mb-3">
          {label}
        </span>

        <video
          src={video}
          width="350"
          autoPlay
          controls
          className="rounded"
        />
      </div>
    </div>
  );
}

export default ISLVideo;