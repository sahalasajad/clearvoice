import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LiveAnnouncement from "./pages/LiveAnnouncement";

function App() {
  return (
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
  );
}

export default App;