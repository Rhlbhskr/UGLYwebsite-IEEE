const FakeProgressBar = () => (
  <div style={{ padding: 20, textAlign: "center" }}>
    <p className="blink" style={{ color: "#ff0000", fontSize: 36 }}>
      ⏳ Loading your experience...
    </p>
    <div style={{ background: "#333", height: 40, width: "100%", border: "4px solid #ffff00" }}>
      <div
        className="progress-bar-fake"
        style={{ background: "linear-gradient(90deg, #ff0000, #ffff00, #00ff00, #00ffff, #ff00ff)", height: "100%" }}
      />
    </div>
    <p style={{ color: "#ffff00", background: "white", fontSize: 20 }}>99% complete... any moment now...</p>
  </div>
);

export default FakeProgressBar;
