import { useState, useEffect, useRef, useCallback } from "react";
import CookieBanner from "@/components/CookieBanner";
import UserDetailsPopup from "@/components/UserDetailsPopup";
import FakeProgressBar from "@/components/FakeProgressBar";
import AboutPaginated from "@/components/AboutPaginated";
import CheckoutForm from "@/components/CheckoutForm";

const bgColors = ["#FF0000", "#00FF00", "#FF00FF", "#FFFF00"];
const randomColor = () => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");

const ColorWord = ({ word }: { word: string }) => {
  const color = useRef(randomColor());
  return <span style={{ color: color.current }}>{word} </span>;
};

const ColorParagraph = ({ text }: { text: string }) => (
  <p>{text.split(" ").map((w, i) => <ColorWord key={i} word={w} />)}</p>
);

const TypewriterWelcome = () => {
  const full = "WELCOME TO GARY'S DISCOUNT EMPORIUM OF STUFF!!! 🎉🎊🤯 THE BEST WORST STORE ON THE INTERNET!!!";
  const [shown, setShown] = useState("");

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setShown(full.slice(0, i));
      if (i >= full.length) clearInterval(id);
    }, 400);
    return () => clearInterval(id);
  }, []);

  return <h1 className="word-art" style={{ textAlign: "center" }}>{shown}<span className="blink">|</span></h1>;
};

const DriftingButton = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = cx - e.clientX;
    const dy = cy - e.clientY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 200) {
      setOffset(prev => ({ x: prev.x + dx * 0.3, y: prev.y + dy * 0.3 }));
    }
  }, []);

  return (
    <div onMouseMove={handleMouseMove} style={{ padding: 60, textAlign: "center", minHeight: 200 }}>
      <button
        ref={btnRef}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          background: "#ff0000",
          color: "#00ff00",
          fontSize: 48,
          padding: "20px 60px",
          transition: "transform 0.1s",
        }}
        onClick={() => { window.confirm("Are you sure?"); alert("ITEM ADDED! (not really)"); }}
      >
        🛒 BUY NOW!!! 🛒
      </button>
    </div>
  );
};

const FakeSearch = () => {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);

  return (
    <div style={{ textAlign: "center", padding: 30, background: "#0000ff" }}>
      <h2 style={{ color: "#ffff00", fontSize: 42 }}>🔍 SEARCH OUR VAST INVENTORY</h2>
      <input
        value={query}
        onChange={(e) => { setQuery(e.target.value); setSearched(false); }}
        style={{ fontSize: 28, padding: 10, width: 400, background: "#ff00ff", color: "#ffff00" }}
        placeholder="Search for anything..."
      />
      <button
        onClick={() => { window.confirm("Are you sure?"); setSearched(true); }}
        style={{ fontSize: 28, padding: 10, background: "#00ff00", color: "#ff0000", marginLeft: 10 }}
      >
        SEARCH
      </button>
      {searched && (
        <p className="blink" style={{ color: "#ff0000", fontSize: 36, marginTop: 20 }}>
          ❌ No results found for "{query}". Try something else! (spoiler: nothing works)
        </p>
      )}
    </div>
  );
};

const products = [
  { name: "Mystery Box of ???", price: "$9̶9̶.̶9̶9̶ $999.99", desc: "Could be anything! Probably nothing!" },
  { name: "Invisible Pen", price: "$49.99", desc: "You can't see it, but trust us it's there!" },
  { name: "Left-Handed Smoke Shifter", price: "$149.99", desc: "Essential tool for every household!" },
  { name: "Dehydrated Water", price: "$29.99", desc: "Just add water! Wait..." },
  { name: "Used Air™", price: "$5.99/breath", desc: "Premium pre-breathed air from celebrities!" },
  { name: "Screen Protector for Your Screen Protector", price: "$19.99", desc: "Protect the protector!" },
];

const ProductGrid = () => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, padding: 20 }}>
    {products.map((p, i) => (
      <div key={i} style={{ background: randomColor(), padding: 10, position: "relative", minHeight: 250 }}>
        <h3 style={{ color: randomColor(), fontSize: 22 }}>{p.name}</h3>
        <ColorParagraph text={p.desc} />
        <p style={{ color: "#ffff00", background: "white", fontSize: 28 }}>{p.price}</p>
        {/* Tiny add to cart button */}
        <button
          onClick={() => { window.confirm("Are you sure?"); alert("Added! (not really)"); }}
          style={{
            position: "absolute",
            bottom: 2,
            right: 2,
            width: 6,
            height: 6,
            fontSize: 4,
            background: "#333",
            color: "#333",
            padding: 0,
            border: "none",
            overflow: "hidden",
          }}
          title="Add to Cart"
        >
          +
        </button>
      </div>
    ))}
    {/* Extra column to make 7 */}
    <div style={{ background: "#ff00ff", padding: 10 }}>
      <h3 style={{ color: "#00ff00" }}>SOLD OUT</h3>
      <p className="blink" style={{ color: "#ffff00" }}>COMING NEVER</p>
    </div>
  </div>
);

const Testimonials = () => (
  <div style={{ background: "#ff8800", padding: 30 }}>
    <h2 style={{ color: "#0000ff", fontSize: 48 }}>⭐ REAL TESTIMONIALS FROM REAL HUMANS ⭐</h2>
    {[
      { name: "Definitely Real Person", text: "I bought invisible pen and now I can't find it! 10/10 would lose again!" },
      { name: "NotARobot99", text: "BEEP BOOP THIS STORE IS GREAT FELLOW HUMANS. I RATE IT 5 HUMAN STARS." },
      { name: "Gary's Mom", text: "I'm so proud of my son's store! Please buy something, he lives in my basement." },
    ].map((t, i) => (
      <div key={i} style={{ background: randomColor(), padding: 15, margin: 10 }}>
        <ColorParagraph text={`"${t.text}"`} />
        <p style={{ color: "#ff00ff", fontSize: 22 }}>— {t.name}</p>
      </div>
    ))}
  </div>
);

const Index = () => {
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [detailsCompleted, setDetailsCompleted] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);
  const [navTarget, setNavTarget] = useState(0);
  const navLabels = ["🏠 Home", "ℹ️ About", "🏠 Home", "ℹ️ About"];
  const [visitorCount] = useState(Math.floor(Math.random() * 999999) + 1000000);
  const [shoppers, setShoppers] = useState(Math.floor(Math.random() * 9999));

  // Flashing background
  useEffect(() => {
    const id = setInterval(() => setBgIndex(i => (i + 1) % bgColors.length), 300);
    return () => clearInterval(id);
  }, []);

  // Random shoppers counter
  useEffect(() => {
    const id = setInterval(() => setShoppers(Math.floor(Math.random() * 9999)), 1000);
    return () => clearInterval(id);
  }, []);

  // Invert scroll
  useEffect(() => {
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      window.scrollBy(0, -e.deltaY);
    };
    window.addEventListener("wheel", handler, { passive: false });
    return () => window.removeEventListener("wheel", handler);
  }, []);

  // Alert on load
  useEffect(() => {
    setTimeout(() => alert("WELCOME TO GARY'S DISCOUNT EMPORIUM!!! Press OK 5 times to continue!!!"), 500);
  }, []);

  return (
    <div style={{ background: bgColors[bgIndex], minHeight: "100vh" }}>
      {/* Important notice - yellow on white */}
      <div className="important-notice" style={{ textAlign: "center", padding: 20, fontSize: 32 }}>
        ⚠️ IMPORTANT: This website is best viewed with your eyes closed ⚠️
      </div>

      {/* Scroll down note */}
      <div className="blink" style={{ textAlign: "center", padding: 15, fontSize: 26, color: "#00ff00", background: "#000" }}>
        👇 SCROLL DOWN FOR MORE AMAZING DEALS!!! (good luck with that) 👇
      </div>

      {/* Visitor banner */}
      <div className="blink" style={{ background: "#ff0000", color: "#ffff00", textAlign: "center", padding: 20, fontSize: 36 }}>
        🎉 You are our {visitorCount.toLocaleString()}th visitor!!! 🎉
      </div>

      {/* Navigation that goes nowhere */}
      <nav style={{ display: "flex", gap: 10, padding: 15, background: "#000", justifyContent: "center" }}>
        {navLabels.map((label, i) => (
          <a
            key={i}
            href="#"
            onClick={(e) => { e.preventDefault(); window.confirm("Are you sure?"); setNavTarget((navTarget + 1) % navLabels.length); }}
            style={{ color: randomColor(), fontSize: 24, textDecoration: "underline overline line-through" }}
          >
            {label}
          </a>
        ))}
        <a href="#" style={{ color: "#333", fontSize: 8 }}>Products</a>
        <a href="#" style={{ color: "#333", fontSize: 8 }}>Cart</a>
      </nav>

      {/* Marquee */}
      <div style={{ overflow: "hidden", background: "#00ff00", padding: 10 }}>
        <div className="marquee-text" style={{ color: "#ff0000", fontSize: 40 }}>
          🌟🌟🌟 WELCOME TO THE BEST SHOP IN THE UNIVERSE!!!!! SALE SALE SALE!!! EVERYTHING MUST GO (but won't)!!! 🌟🌟🌟
        </div>
      </div>



      <FakeProgressBar />
      <TypewriterWelcome />

      {/* Shoppers counter */}
      <div style={{ textAlign: "center", padding: 15, background: "#ff00ff" }}>
        <p style={{ color: "#00ff00", fontSize: 28 }}>
          👥 People currently shopping: <strong className="blink">{shoppers}</strong>
        </p>
      </div>

      <DriftingButton />
      <FakeSearch />
      <ProductGrid />
      <Testimonials />
      <AboutPaginated />
      <CheckoutForm />

      {/* Overlapping divs blocking content */}
      <div style={{
        position: "fixed", top: "40%", left: "30%", width: 300, height: 200,
        background: "rgba(255,0,255,0.7)", zIndex: 50, transform: "rotate(15deg)",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28,
      }}>
        <p style={{ color: "#ffff00" }}>THIS DIV BLOCKS CONTENT 😈</p>
      </div>

      <div style={{
        position: "fixed", top: "50%", right: "20%", width: 250, height: 180,
        background: "rgba(0,255,0,0.7)", zIndex: 51, transform: "rotate(-10deg)",
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
      }}>
        <p style={{ color: "#ff0000" }}>ANOTHER BLOCKING DIV 🤪</p>
      </div>

      {/* Footer */}
      <footer style={{ background: "#000", color: "#00ff00", textAlign: "center", padding: 30, fontSize: 18 }}>
        <p>© 1997 Gary's Discount Emporium of Stuff. All rights reserved. None rights respected.</p>
        <p className="blink" style={{ color: "#ff0000" }}>Best viewed in Netscape Navigator 3.0 at 640x480</p>
        <p style={{ color: "#ffff00", background: "white" }}>
          Visitor counter: {Math.floor(Math.random() * 99) + 1} (we reset it daily to look popular)
        </p>
      </footer>

      {/* Hidden auto-play audio */}
      <audio autoPlay loop>
        <source src="https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3" type="audio/mpeg" />
      </audio>

      {!cookiesAccepted && (
        <>
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.9)", zIndex: 99998 }} />
          <CookieBanner onCompleted={() => setCookiesAccepted(true)} />
        </>
      )}
      {cookiesAccepted && !detailsCompleted && (
        <UserDetailsPopup onComplete={() => setDetailsCompleted(true)} />
      )}
    </div>
  );
};

export default Index;
