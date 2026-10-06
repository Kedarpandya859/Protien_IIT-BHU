import { useEffect, useMemo, useState } from "react";

type Screen = "splash" | "gender" | "age" | "interests" | "home";

const MAGENTA = "#9f2089";

const photos = {
  denim: "https://images.unsplash.com/photo-1593765762957-d8d876a1beeb?auto=format&fit=crop&w=600&q=80",
  shirt: "https://images.unsplash.com/photo-1601522089844-8ac5e2ae6773?auto=format&fit=crop&w=600&q=80",
  yellowShirt: "https://images.unsplash.com/photo-1701365676249-9d7ab5022dec?auto=format&fit=crop&w=600&q=80",
  kurta: "https://images.unsplash.com/photo-1768807478320-fcfd3929acb2?auto=format&fit=crop&w=600&q=80",
  jacket: "https://images.unsplash.com/photo-1611859681787-b1e90023bae1?auto=format&fit=crop&w=600&q=80",
  floral: "https://images.unsplash.com/photo-1595437649625-71bfd156a36d?auto=format&fit=crop&w=600&q=80",
  backpack: "https://images.unsplash.com/photo-1643213199653-c43330a4cba6?auto=format&fit=crop&w=600&q=80",
  bag: "https://images.unsplash.com/photo-1603832766703-4f1b44f40af8?auto=format&fit=crop&w=600&q=80",
  tech: "https://images.unsplash.com/photo-1628911771814-5d61388efbf7?auto=format&fit=crop&w=600&q=80",
  gamer: "https://images.unsplash.com/photo-1594434533760-02e0f3faaa68?auto=format&fit=crop&w=600&q=80",
  phone: "https://images.unsplash.com/photo-1612197315273-4ced0a731bba?auto=format&fit=crop&w=600&q=80",
  red: "https://images.unsplash.com/photo-1628250521470-28c1fc54616c?auto=format&fit=crop&w=600&q=80",
  purple: "https://images.unsplash.com/photo-1628250520426-14966d958157?auto=format&fit=crop&w=600&q=80",
  blue: "https://images.unsplash.com/photo-1667976399970-25a7e9ff4a70?auto=format&fit=crop&w=600&q=80",
  model: "https://images.unsplash.com/photo-1744551358303-46edae8b374b?auto=format&fit=crop&w=600&q=80",
  black: "https://images.unsplash.com/photo-1580307272298-ce94566a47d5?auto=format&fit=crop&w=600&q=80",
};

const interestData = [
  ["Men’s Fashion", photos.model], ["T-Shirts", photos.yellowShirt], ["Shirts", photos.shirt],
  ["Jeans", photos.denim], ["Trousers", photos.black], ["Ethnic Wear", photos.kurta],
  ["Kurtas", photos.blue], ["Shoes", photos.red], ["Sneakers", photos.purple],
  ["Sandals", photos.denim], ["Watches", photos.denim], ["Wallets", photos.bag],
  ["Belts", photos.model], ["Bags", photos.bag], ["Backpacks", photos.backpack],
  ["Sunglasses", photos.black], ["Grooming", photos.model], ["Skincare", photos.blue],
  ["Hair Care", photos.jacket], ["Perfume", photos.tech], ["Fitness", photos.black],
  ["Sports", photos.red], ["Gym", photos.gamer], ["Electronics", photos.tech],
  ["Mobiles & Accessories", photos.phone], ["Gaming", photos.gamer], ["Bikes & Accessories", photos.jacket],
  ["Car Accessories", photos.tech], ["Home & Room Setup", photos.floral], ["Travel", photos.backpack],
  ["Office/College Essentials", photos.bag], ["Jewellery", photos.denim], ["Women’s Fashion", photos.red],
  ["Beauty", photos.purple], ["Kids & Toys", photos.yellowShirt], ["Home & Kitchen", photos.floral],
];

const products = [
  { name: "Trendy Solid Men T-Shirt", price: "₹189", old: "₹399", rating: "4.2", image: photos.yellowShirt },
  { name: "Men’s Casual Denim Jacket", price: "₹449", old: "₹899", rating: "4.3", image: photos.jacket },
  { name: "Premium Cotton Formal Shirt", price: "₹299", old: "₹599", rating: "4.1", image: photos.shirt },
  { name: "Classic Men’s Watch", price: "₹199", old: "₹499", rating: "4.0", image: photos.denim },
  { name: "Stylish Everyday Backpack", price: "₹349", old: "₹699", rating: "4.4", image: photos.backpack },
  { name: "Festive Cotton Kurta", price: "₹399", old: "₹799", rating: "4.2", image: photos.kurta },
  { name: "Sports Headphones", price: "₹249", old: "₹599", rating: "4.1", image: photos.tech },
  { name: "Men’s Printed Casual Shirt", price: "₹279", old: "₹599", rating: "4.0", image: photos.floral },
];

function Icon({ name, size = 24 }: { name: string; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (name === "back") return <svg {...common}><path d="m15 18-6-6 6-6" /></svg>;
  if (name === "speaker") return <svg {...common}><path d="M11 5 6 9H3v6h3l5 4z" /><path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8 8 0 0 1 0 12" /></svg>;
  if (name === "check") return <svg {...common}><path d="m5 12 4 4L19 6" /></svg>;
  if (name === "search") return <svg {...common}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>;
  if (name === "heart") return <svg {...common}><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8z" /></svg>;
  if (name === "cart") return <svg {...common}><circle cx="9" cy="20" r="1" /><circle cx="19" cy="20" r="1" /><path d="M2 3h3l2.6 11.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 7H6" /></svg>;
  if (name === "home") return <svg {...common}><path d="m3 11 9-8 9 8v10h-6v-6H9v6H3z" /></svg>;
  if (name === "grid") return <svg {...common}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>;
  if (name === "orders") return <svg {...common}><path d="m4 7 8-4 8 4v10l-8 4-8-4z" /><path d="m4 7 8 4 8-4M12 11v10" /></svg>;
  if (name === "user") return <svg {...common}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>;
  if (name === "mic") return <svg {...common}><rect x="9" y="2" width="6" height="13" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v4" /></svg>;
  if (name === "clock") return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
  return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 8v4M12 16h.01" /></svg>;
}

function VoiceButton({ phrase }: { phrase: string }) {
  const [speaking, setSpeaking] = useState(false);
  const speak = () => {
    setSpeaking(true);
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.rate = 0.82;
      utterance.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setSpeaking(false), 1200);
    }
  };
  return (
    <button className={`voice-button ${speaking ? "speaking" : ""}`} onClick={speak} aria-label={`Hear: ${phrase}`}>
      <Icon name="speaker" size={23} /><span>{speaking ? "Speaking…" : "Hear this"}</span>
    </button>
  );
}

function OnboardingHeader({ step, onBack, phrase }: { step: string; onBack: () => void; phrase: string }) {
  return (
    <div className="onboard-toolbar">
      <button className="round-button" onClick={onBack} aria-label="Go back"><Icon name="back" size={27} /></button>
      <span className="step-pill">{step}</span>
      <VoiceButton phrase={phrase} />
    </div>
  );
}

function Mosaic() {
  const tiles = [photos.tech, photos.backpack, photos.denim, photos.gamer, photos.kurta, photos.red, photos.model, photos.shirt, photos.black];
  return <div className="mosaic">{tiles.map((url, index) => <img key={index} src={url} alt="" />)}</div>;
}

function GenderScreen({ next, back }: { next: (gender: string) => void; back: () => void }) {
  return (
    <main className="onboarding-screen">
      <div className="visual-top">
        <Mosaic />
        <OnboardingHeader step="1/3" onBack={back} phrase="Are you a man or a woman? Tap one." />
      </div>
      <section className="onboard-content">
        <div className="title-row"><div><h1>Select your gender</h1><p>Find best products for you</p></div></div>
        <div className="gender-grid">
          <button className="choice-card" onClick={() => next("Female")}><span className="avatar female">👩</span><strong>Female</strong></button>
          <button className="choice-card recommended" onClick={() => next("Male")}><span className="avatar male">👨</span><span><strong>Male</strong><small>Best for you</small></span></button>
        </div>
      </section>
    </main>
  );
}

function AgeScreen({ next, back }: { next: (age: string) => void; back: () => void }) {
  return (
    <main className="onboarding-screen">
      <div className="visual-top age-visual">
        <Mosaic />
        <OnboardingHeader step="2/3" onBack={back} phrase="Choose your age. Tap one age group." />
      </div>
      <section className="onboard-content age-content">
        <h1>Select your age</h1><p>Find best products for you</p>
        <div className="age-list">
          {["0–18 years", "19–24 years", "25–40 years", "40+ years"].map((age) => (
            <button key={age} onClick={() => next(age)}><span>{age}</span><Icon name="back" size={21} /></button>
          ))}
        </div>
      </section>
    </main>
  );
}

function InterestScreen({ selected, setSelected, next, back }: { selected: string[]; setSelected: (x: string[]) => void; next: () => void; back: () => void }) {
  const toggle = (name: string) => setSelected(selected.includes(name) ? selected.filter((x) => x !== name) : [...selected, name]);
  return (
    <main className="interest-screen">
      <header className="interest-header">
        <div className="interest-toolbar">
          <button className="round-button" onClick={back} aria-label="Go back"><Icon name="back" size={27} /></button>
          <span className="step-pill">3/3</span>
          <button className="skip" onClick={next}>Skip</button>
        </div>
        <div className="interest-title">
          <div><h1>What do you like?</h1><p>Choose one or more</p></div>
          <VoiceButton phrase="Choose what you like. You can choose many." />
        </div>
      </header>
      <div className="popular-label"><span>Popular for men</span><small>Tap to choose</small></div>
      <section className="interest-grid">
        {interestData.map(([name, image], index) => {
          const active = selected.includes(name);
          return (
            <button className={`interest-card ${active ? "selected" : ""} ${index < 3 ? "featured" : ""}`} key={name} onClick={() => toggle(name)}>
              <img src={image} alt="" />
              <span>{name}</span>
              <i>{active ? <Icon name="check" size={17} /> : "+"}</i>
            </button>
          );
        })}
      </section>
      <div className="continue-bar">
        <span>{selected.length ? `${selected.length} selected` : "Choose or skip"}</span>
        <button onClick={next}>Continue <span>›</span></button>
      </div>
    </main>
  );
}

function DealCard({ image, title, price, onClick }: { image: string; title: string; price: string; onClick: () => void }) {
  return (
    <button className="deal-card" onClick={onClick}>
      <img src={image} alt="" /><span className="deal-name">{title}</span><strong>{price}</strong>
    </button>
  );
}

function SectionTitle({ title, subtitle, onClick }: { title: string; subtitle?: string; onClick: () => void }) {
  return <div className="section-heading"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div><button onClick={onClick}>View all ›</button></div>;
}

function BottomNav({ navigate }: { navigate: (label: string) => void }) {
  const items = [["home", "Home"], ["grid", "Categories"], ["orders", "My Orders"], ["info", "Help"], ["user", "Account"]];
  return <nav className="bottom-nav">{items.map(([icon, label]) => <button className={label === "Home" ? "active" : ""} key={label} onClick={() => navigate(label)}><Icon name={icon} size={23} /><span>{label}</span></button>)}</nav>;
}

function DetailSheet({ title, image, close }: { title: string; image?: string; close: () => void }) {
  return (
    <div className="sheet-backdrop" onClick={close}>
      <section className="detail-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" />
        {image && <img className="detail-image" src={image} alt="" />}
        <button className="sheet-close" onClick={close}>×</button>
        <p className="eyebrow">MEESHO • PERSONALIZED FOR YOU</p>
        <h2>{title}</h2>
        {image ? <>
          <div className="detail-price">₹299 <del>₹699</del> <span>57% off</span></div>
          <p className="delivery">Free Delivery · Cash on Delivery</p>
          <button className="primary-action" onClick={close}>Add to Cart</button>
        </> : <>
          <p className="sheet-copy">This part of the prototype is connected. Your personalized picks are ready to explore.</p>
          <button className="primary-action" onClick={close}>Continue shopping</button>
        </>}
      </section>
    </div>
  );
}

function HomeScreen({ interests }: { interests: string[] }) {
  const [sheet, setSheet] = useState<{ title: string; image?: string } | null>(null);
  const chosen = interests.length ? interests.slice(0, 2).join(" & ") : "Men’s Fashion";
  const open = (title: string, image?: string) => setSheet({ title, image });
  const time = new Date();
  return (
    <main className="home-screen">
      <header className="home-header">
        <div className="status"><span>{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span><span>VoLTE&nbsp;&nbsp; 5G&nbsp;&nbsp; ▰ 82%</span></div>
        <div className="brand-row"><div><div className="hello-icon">🙏</div><span>Hello,<strong>Let’s shop!</strong></span></div><button onClick={() => open("Your Wishlist")}><Icon name="heart" size={27} /></button><button onClick={() => open("Your Cart")}><Icon name="cart" size={27} /></button></div>
        <button className="search-bar" onClick={() => open("Search Meesho")}><Icon name="search" size={23} /><span>Search by Keyword or Product ID</span><Icon name="mic" size={21} /></button>
      </header>

      <button className="first-order-banner" onClick={() => open("First order offer")}><span>Up to<br /><strong>₹105 OFF</strong> on 1st order</span><b>🎁</b></button>
      <div className="trust-strip">
        <button onClick={() => open("7 Days Easy Return")}><span>↩</span>7 Days<br />Easy Return</button>
        <button onClick={() => open("Cash on Delivery")}><span>₹</span>Cash on<br />Delivery</button>
        <button onClick={() => open("Lowest Price")}><span>🏷</span>Lowest<br />Price</button>
      </div>

      <section className="home-section personal">
        <SectionTitle title={`Because you like ${chosen}`} subtitle="Picked from your interests" onClick={() => open(`Because you like ${chosen}`)} />
        <div className="horizontal-cards">
          {products.slice(0, 4).map((p) => <DealCard key={p.name} image={p.image} title={p.name} price={p.price} onClick={() => open(p.name, p.image)} />)}
        </div>
      </section>

      <section className="home-section pink-section">
        <SectionTitle title="Men’s deals" subtitle="Today’s best offers" onClick={() => open("Men’s deals")} />
        <div className="price-bubbles">
          {[["Under ₹199", photos.yellowShirt], ["Under ₹299", photos.shirt], ["Under ₹499", photos.jacket]].map(([label, image]) => <button key={label} onClick={() => open(label)}><img src={image} alt="" /><span>{label}</span></button>)}
        </div>
      </section>

      <section className="home-section">
        <SectionTitle title="Shop by category" subtitle="Everything you like, in one tap" onClick={() => open("All Categories")} />
        <div className="category-shortcuts">
          {[["T-Shirts", photos.yellowShirt], ["Shirts", photos.shirt], ["Shoes", photos.red], ["Watches", photos.denim], ["Grooming", photos.model], ["Electronics", photos.tech]].map(([label, image]) => <button key={label} onClick={() => open(label)}><img src={image} alt="" /><span>{label}</span></button>)}
        </div>
      </section>

      <section className="flash-section">
        <div className="flash-top"><span><Icon name="clock" size={20} /> Flash Deals</span><strong>Ends in 01:42:18</strong></div>
        <p>Limited-time prices made for you</p>
        <div className="horizontal-cards">
          {products.slice(4, 8).map((p) => <DealCard key={p.name} image={p.image} title={p.name} price={p.price} onClick={() => open(p.name, p.image)} />)}
        </div>
      </section>

      <section className="trend-banner">
        <div><small>TRENDING FOR YOU</small><h2>Upgrade your everyday look</h2><button onClick={() => open("Trending for you")}>Shop now</button></div>
        <img src={photos.model} alt="" />
      </section>

      <section className="home-section">
        <SectionTitle title="Recently viewed" onClick={() => open("Recently viewed")} />
        <div className="recent-row">{products.slice(1, 5).map((p) => <button key={p.name} onClick={() => open(p.name, p.image)}><img src={p.image} alt="" /><span>{p.price}</span></button>)}</div>
      </section>

      <section className="home-section product-feed">
        <SectionTitle title="Recommended for you" subtitle="Fresh picks based on your choices" onClick={() => open("Recommended for you")} />
        <div className="product-grid">
          {products.map((p) => <button className="product-card" key={p.name} onClick={() => open(p.name, p.image)}>
            <div className="product-image"><img src={p.image} alt="" /><span>♡</span></div>
            <div className="product-info"><p>{p.name}</p><strong>{p.price}</strong> <del>{p.old}</del><small>Free Delivery</small><em>{p.rating} ★</em></div>
          </button>)}
        </div>
      </section>
      <button className="floating-mic" onClick={() => open("Voice search")}><Icon name="mic" size={28} /></button>
      <BottomNav navigate={(label) => open(label)} />
      {sheet && <DetailSheet {...sheet} close={() => setSheet(null)} />}
    </main>
  );
}

function Splash({ done }: { done: () => void }) {
  useEffect(() => {
    const timer = setTimeout(done, 1450);
    return () => clearTimeout(timer);
  }, [done]);
  return <main className="splash" onClick={done}><div className="meesho-mark"><span>m</span></div><div className="meesho-logo">meesho</div><p>India’s favourite shopping app</p><div className="loader"><i /></div><small>Tap to start</small></main>;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [interests, setInterests] = useState<string[]>(["Men’s Fashion", "T-Shirts", "Shoes"]);
  const doneSplash = useMemo(() => () => setScreen("gender"), []);

  return (
    <div className="app-shell">
      {screen === "splash" && <Splash done={doneSplash} />}
      {screen === "gender" && <GenderScreen back={() => setScreen("splash")} next={(value) => { setGender(value); setScreen("age"); }} />}
      {screen === "age" && <AgeScreen back={() => setScreen("gender")} next={(value) => { setAge(value); setScreen("interests"); }} />}
      {screen === "interests" && <InterestScreen selected={interests} setSelected={setInterests} back={() => setScreen("age")} next={() => setScreen("home")} />}
      {screen === "home" && <HomeScreen interests={interests} />}
      <div className="prototype-data" aria-hidden="true">{gender}{age}</div>
    </div>
  );
}
