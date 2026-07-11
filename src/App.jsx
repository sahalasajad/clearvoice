import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Temporary Pages */}
      <Route
        path="/track-selection"
        element={
          <div className="container mt-5">
            <h1>Track Selection Page</h1>
          </div>
        }
      />

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