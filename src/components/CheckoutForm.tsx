import { useState, useRef } from "react";

const fields = [
  "First Name","Middle Name","Last Name","Maiden Name","Pet's Name","Mother's Favorite Color",
  "Email","Backup Email","Emergency Email","Phone","Fax Number","Pager Number",
  "Street Address","PO Box","City","State","ZIP","Country","Planet",
  "Credit Card","Expiry","CVV","Blood Type"
];

const CheckoutForm = () => {
  const [values, setValues] = useState<Record<string,string>>({});
  const [message, setMessage] = useState("");
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleFocus = (field: string) => {
    // Clear ALL other fields when focusing one
    const cleared: Record<string,string> = {};
    fields.forEach(f => { cleared[f] = f === field ? (values[f] || "") : ""; });
    setValues(cleared);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!window.confirm("Are you sure?")) {
      // Cancel also submits lol
    }
    setValues({});
    setMessage("Oops! Please try again :) All fields have been cleared for your convenience!");
  };

  return (
    <div style={{ background: "#ffff00", padding: 30 }}>
      <h2 style={{ color: "#ff0000", fontSize: 48 }}>🛒 CHECKOUT (23 required fields)</h2>
      {message && <p className="blink" style={{ color: "#ff00ff", fontSize: 36 }}>{message}</p>}
      <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
        {fields.map((f) => (
          <div key={f}>
            <label style={{ fontSize: 10, color: "#0000ff" }}>{f}</label>
            <input
              ref={el => { inputRefs.current[f] = el; }}
              value={values[f] || ""}
              onChange={(e) => setValues({ ...values, [f]: e.target.value })}
              onFocus={() => handleFocus(f)}
              required
              style={{ width: "100%", background: "#ff00ff", color: "#00ff00", fontSize: 12, padding: 2 }}
            />
          </div>
        ))}
        <button type="submit" style={{ gridColumn: "1/-1", background: "#00ff00", color: "#ff0000", fontSize: 32, padding: 15 }}>
          💳 SUBMIT ORDER 💳
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
