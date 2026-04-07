import { useState } from "react";

const words = "We sell stuff that you probably do not need but will buy anyway because reasons".split(" ");

const AboutPaginated = () => {
  const [page, setPage] = useState(0);

  const handleNext = () => {
    if (!window.confirm("Are you sure you want the next word?")) {
      // Cancel also proceeds
    }
    setPage((p) => (p + 1) % words.length);
  };

  return (
    <div style={{ textAlign: "center", padding: 40, background: "#00ff00" }}>
      <h2 style={{ fontSize: 48, color: "#ff0000" }}>📖 ABOUT US (Page {page + 1} of {words.length})</h2>
      <p style={{ fontSize: 72, color: "#0000ff", minHeight: 120 }}>{words[page]}</p>
      <button
        onClick={handleNext}
        style={{ background: "#ff00ff", color: "#ffff00", fontSize: 28, padding: "15px 50px" }}
      >
        Next Word → ({words.length - page - 1} remaining)
      </button>
    </div>
  );
};

export default AboutPaginated;
