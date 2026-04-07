import { useState, useMemo } from "react";

const UserDetailsPopup = ({ onComplete }: { onComplete: () => void }) => {
  const [name, setName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // Generate every single day from 1900 to 2030 as verbose strings
  const dateOptions = useMemo(() => {
    const options: { value: string; label: string }[] = [];
    const ordinal = (n: number) => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    // Just do 1990-2026 to keep it "manageable" but still absurd (13,000+ options)
    for (let y = 1990; y <= 2026; y++) {
      for (let m = 0; m < 12; m++) {
        const daysInMonth = new Date(y, m + 1, 0).getDate();
        for (let d = 1; d <= daysInMonth; d++) {
          const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          const dayOfWeek = dayNames[new Date(y, m, d).getDay()];
          const label = `${dayOfWeek}, ${monthNames[m]} ${ordinal(d)}, ${y} A.D.`;
          options.push({ value: `${y}-${m}-${d}`, label });
        }
      }
    }
    return options;
  }, []);

  const handleSubmit = () => {
    if (!name.trim()) {
      alert("YOU MUST ENTER YOUR NAME!!!");
      return;
    }
    if (!selectedDate) {
      alert("YOU MUST SELECT YOUR EXACT BIRTHDATE FROM THE DROPDOWN!!!");
      return;
    }
    window.confirm("Are you sure this is your real name and birthdate?");
    alert(`Welcome ${name}! We will remember you FOREVER. 😈`);
    onComplete();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100000,
        background: "rgba(0,0,0,0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#ff00ff",
          padding: 40,
          maxWidth: 500,
          width: "90%",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#ffff00", fontSize: 36 }}>
          🔒 MANDATORY USER REGISTRATION 🔒
        </h2>
        <p style={{ color: "#00ff00", fontSize: 18 }}>
          You MUST provide your details to access Gary's Emporium!!!
        </p>

        <div style={{ marginTop: 20, textAlign: "left" }}>
          <label style={{ color: "#ffff00", fontSize: 22, display: "block" }}>
            Your Full Legal Name:
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your FULL name (middle names included)"
            style={{
              width: "100%",
              fontSize: 20,
              padding: 10,
              background: "#00ff00",
              color: "#ff0000",
              marginTop: 5,
            }}
          />
        </div>

        <div style={{ marginTop: 20, textAlign: "left" }}>
          <label style={{ color: "#ffff00", fontSize: 22, display: "block" }}>
            Your Exact Birthdate:
          </label>
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{
              width: "100%",
              fontSize: 18,
              padding: 10,
              background: "#00ffff",
              color: "#ff00ff",
              marginTop: 5,
            }}
          >
            <option value="">-- Please scroll through 13,000+ dates to find yours --</option>
            {dateOptions.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleSubmit}
          style={{
            marginTop: 25,
            background: "#ffff00",
            color: "#ff0000",
            fontSize: 24,
            padding: "12px 40px",
          }}
        >
          🎉 SUBMIT & ENTER THE EMPORIUM 🎉
        </button>
      </div>
    </div>
  );
};

export default UserDetailsPopup;
