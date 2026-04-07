import { useState, useEffect, useRef } from "react";

interface CookieBannerProps {
  onCompleted: () => void;
}

const CookieBanner = ({ onCompleted }: CookieBannerProps) => {
  const [visible, setVisible] = useState(true);
  const [acceptCount, setAcceptCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setVisible(true), 4000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleClick = () => {
    const next = acceptCount + 1;
    setAcceptCount(next);
    setVisible(false);
    if (next >= 3) {
      onCompleted();
    } else {
      alert(`Cookie acceptance ${next}/3 registered. ${3 - next} more to go!!!`);
      startTimer();
    }
  };

  if (!visible || acceptCount >= 3) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 99999,
        background: "#ff00ff",
        color: "#00ff00",
        padding: "30px",
        fontSize: "32px",
        textAlign: "center",
      }}
    >
      <div className="marquee-text">🍪 WE USE COOKIES!!! ALL OF THEM!!! EVERY SINGLE COOKIE!!! 🍪</div>
      <p style={{ color: "#ffff00", fontSize: 20 }}>
        (You must accept {3 - acceptCount} more time{3 - acceptCount > 1 ? "s" : ""} to enter the site)
      </p>
      <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 10 }}>
        <button
          onClick={handleClick}
          style={{ background: "#ffff00", color: "#ff0000", padding: "10px 40px", fontSize: 24 }}
        >
          ✅ Accept ALL Cookies ({acceptCount + 1}/3)
        </button>
        <button
          onClick={handleClick}
          style={{ background: "#00ffff", color: "#ff00ff", padding: "10px 40px", fontSize: 24 }}
        >
          ❌ Decline (just kidding, same thing)
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
