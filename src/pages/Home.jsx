import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const styles = {
    page: {
      background: "#F5F9FF",
      minHeight: "100vh",
      fontFamily: "Arial, sans-serif",
    },

    hero: {
      background: "linear-gradient(135deg,#2563EB,#1D4ED8)",
      color: "#fff",
      padding: "80px 20px",
      borderBottomLeftRadius: "40px",
      borderBottomRightRadius: "40px",
      textAlign: "center",
    },

    card: {
      borderRadius: "18px",
      border: "none",
      boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
      transition: "0.3s",
    },

    featureIcon: {
      fontSize: "45px",
    },

    sectionTitle: {
      fontWeight: "700",
      color: "#1E293B",
    },
  };

  return (
    <div style={styles.page}>
      {/* Hero */}
      <section style={styles.hero}>
        <div className="container">

          <h1 className="display-3 fw-bold">
            🔊 ClearVoice
          </h1>

          <h4 className="mt-3">
            Accessible Railway Announcements
          </h4>

          <p className="mt-4 fs-5">
            Helping Deaf and Hard-of-Hearing passengers
            receive live railway announcements through
            captions, emergency alerts and ISL support.
          </p>

          <div className="mt-5">
            <Link
              to="/live-announcement"
              className="btn btn-light btn-lg me-3"
            >
              Start Listening
            </Link>

            <Link
              to="/history"
              className="btn btn-outline-light btn-lg"
            >
              View History
            </Link>
          </div>

        </div>
      </section>

      {/* Features */}

      <section className="container py-5">

        <h2
          className="text-center mb-5"
          style={styles.sectionTitle}
        >
          Features
        </h2>

        <div className="row g-4">

          {[
            {
              icon: "🎤",
              title: "Live Captions",
              text: "Convert railway announcements into live readable captions."
            },
            {
              icon: "📳",
              title: "Emergency Alerts",
              text: "Strong vibration and fullscreen warning for emergencies."
            },
            {
              icon: "🤟",
              title: "ISL Support",
              text: "Common announcements available in Indian Sign Language."
            },
            {
              icon: "📜",
              title: "History",
              text: "View missed announcements anytime."
            }
          ].map((item, index) => (

            <div className="col-md-3" key={index}>

              <div
                className="card h-100 text-center p-4"
                style={styles.card}
              >

                <div style={styles.featureIcon}>
                  {item.icon}
                </div>

                <h5 className="mt-3">
                  {item.title}
                </h5>

                <p>
                  {item.text}
                </p>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* Recent Announcements */}

      <section className="container pb-5">

        <h2
          className="text-center mb-4"
          style={styles.sectionTitle}
        >
          Recent Announcements
        </h2>

        <div className="card p-3 mb-3">
          🚆 Train 12625 arriving at Platform 2
        </div>

        <div className="card p-3 mb-3">
          ⚠️ Platform changed from 3 to 5
        </div>

        <div className="card p-3">
          🚨 Emergency evacuation. Please leave the station immediately.
        </div>

      </section>
    </div>
  );
}

export default Home;