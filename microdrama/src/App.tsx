import { createElement, useRef, useState, type ChangeEvent, type ReactNode } from "react";

type Screen =
  | "home"
  | "categories"
  | "customize"
  | "discover"
  | "series"
  | "episode"
  | "product"
  | "confirmation"
  | "nextEpisode";

type IconName =
  | "home"
  | "grid"
  | "play"
  | "bag"
  | "user"
  | "search"
  | "pin"
  | "back"
  | "heart"
  | "share"
  | "cart"
  | "check"
  | "shield"
  | "pause"
  | "volume"
  | "muted";

const images = {
  friends:
    "https://images.unsplash.com/photo-1670602462408-3a0d153768d7?crop=faces&fit=crop&w=900&h=1200&q=84",
  ravi:
    "https://images.unsplash.com/photo-1712917125122-3d5b6527bf47?crop=faces&fit=crop&w=900&h=1200&q=84",
  city:
    "https://images.unsplash.com/photo-1619763470573-5c0df45bf6ef?crop=faces&fit=crop&w=900&h=1200&q=84",
  wedding:
    "https://images.unsplash.com/photo-1639575668829-c56a82db9f00?crop=faces&fit=crop&w=900&h=1200&q=84",
  room:
    "https://images.unsplash.com/photo-1715405155652-3147e1db15e9?crop=faces&fit=crop&w=900&h=1200&q=84",
  trimmer:
    "https://images.unsplash.com/photo-1643495350935-25cc12678b57?fit=crop&w=800&h=800&q=84",
  watch:
    "https://images.unsplash.com/photo-1569411032431-07598b0012c2?fit=crop&w=800&h=800&q=84",
};

function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    home: <><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5M9 21v-7h6v7" /></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    play: <path d="m8 5 11 7-11 7V5Z" />,
    pause: <><path d="M9 5v14M15 5v14" /></>,
    bag: <><path d="M5 8h14l-1 13H6L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4.5 21a7.5 7.5 0 0 1 15 0" /></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    back: <><path d="m15 18-6-6 6-6" /></>,
    heart: <path d="M20.8 5.7a5.5 5.5 0 0 0-7.8 0L12 6.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.5a5.5 5.5 0 0 0 0-7.8Z" />,
    share: <><circle cx="18" cy="5" r="2.5" /><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="19" r="2.5" /><path d="m8.2 10.8 7.6-4.5M8.2 13.2l7.6 4.5" /></>,
    cart: <><path d="M3 4h2l2.2 11h10.5l2-7H6" /><circle cx="9" cy="20" r="1" /><circle cx="17" cy="20" r="1" /></>,
    check: <path d="m5 12 4.5 4.5L19 7" />,
    shield: <><path d="M12 3 5 6v5c0 4.7 2.9 8.4 7 10 4.1-1.6 7-5.3 7-10V6l-7-3Z" /><path d="m9 12 2 2 4-4" /></>,
    volume: <><path d="M11 5 6 9H3v6h3l5 4V5Z" /><path d="M15 9a4 4 0 0 1 0 6M18 6a8 8 0 0 1 0 12" /></>,
    muted: <><path d="M11 5 6 9H3v6h3l5 4V5Z" /><path d="m16 10 5 5M21 10l-5 5" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "outline" | "soft" | "ghost" | "dark";
  className?: string;
  disabled?: boolean;
};

function Button({ children, onClick, variant = "primary", className = "", disabled }: ButtonProps) {
  return createElement(
    "button",
    {
      type: "button",
      onClick,
      disabled,
      className: `button button-${variant} ${className}`,
    },
    children,
  );
}

function Logo() {
  return <div className="logo">meesho</div>;
}

function AppHeader({ title, onBack, actions }: { title?: string; onBack?: () => void; actions?: ReactNode }) {
  return (
    <div className="app-header">
      <div className="header-left">
        {onBack ? <Button variant="ghost" className="icon-button" onClick={onBack}><Icon name="back" /></Button> : null}
        {title ? <div className="header-title">{title}</div> : <Logo />}
      </div>
      <div className="header-actions">{actions}</div>
    </div>
  );
}

const navItems: { label: string; icon: IconName; route: Screen }[] = [
  { label: "Home", icon: "home", route: "home" },
  { label: "Categories", icon: "grid", route: "categories" },
  { label: "MiniDrama", icon: "play", route: "discover" },
  { label: "Orders", icon: "bag", route: "confirmation" },
  { label: "Account", icon: "user", route: "home" },
];

function BottomNav({ screen, go }: { screen: Screen; go: (screen: Screen) => void }) {
  const miniActive = ["discover", "series", "episode", "product", "confirmation", "nextEpisode"].includes(screen);
  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      {navItems.map((item) => {
        const active = item.label === "MiniDrama"
          ? miniActive
          : item.label === "Categories"
            ? ["categories", "customize"].includes(screen)
            : screen === item.route && !miniActive;
        return (
          <Button key={item.label} variant="ghost" className={`nav-item ${active ? "active" : ""}`} onClick={() => go(item.route)}>
            <span className={item.label === "MiniDrama" ? "nav-play" : ""}><Icon name={item.icon} size={20} /></span>
            <span>{item.label}</span>
          </Button>
        );
      })}
    </nav>
  );
}

function Poster({ image, label, className = "" }: { image: string; label: string; className?: string }) {
  return <img className={`poster ${className}`} src={image} alt={label} />;
}

const dramas = [
  { title: "First Salary", ep: "Episode 6", time: "2 min", hook: "Naukri ka pehla din… aur pehli shopping.", image: images.friends, genre: "Comedy • Career" },
  { title: "Bhai Ki Shaadi", ep: "Episode 4", time: "2 min", hook: "Shaadi ghar ki hai, tension sabki.", image: images.wedding, genre: "Family • Comedy" },
  { title: "Room No. 302", ep: "Episode 8", time: "3 min", hook: "Naya room. Nayi life. Naye jugaad.", image: images.room, genre: "Friendship • Comedy" },
  { title: "Gaon Se Sheher", ep: "Episode 3", time: "2 min", hook: "Sapne bade hain, sheher naya hai.", image: images.city, genre: "Aspirational • Drama" },
];

function SearchBar() {
  return (
    <div className="searchbar">
      <Icon name="search" size={19} />
      <span>Search for products or stories</span>
      <span className="search-camera">▣</span>
    </div>
  );
}

function Home({ go }: { go: (screen: Screen) => void }) {
  const categories = [
    ["For You", "◎"], ["Fashion", "◫"], ["Custom Prints", "✦"], ["Mobiles", "▯"], ["Beauty", "◇"], ["Home", "⌂"],
  ];
  return (
    <>
      <main className="screen-content">
        <div className="home-head">
          <AppHeader actions={<><Icon name="heart" /><Icon name="cart" /></>} />
          <SearchBar />
          <div className="location-row"><Icon name="pin" size={18} /><div><span>Delivering to</span><strong>Vijay Nagar, Indore - 452010</strong></div><span className="chevron">›</span></div>
        </div>

        <section className="category-strip">
          {categories.map(([label, icon]) => <div className="category" key={label} onClick={() => go(label === "Custom Prints" ? "customize" : "categories")}><div className="category-icon">{icon}</div><span>{label}</span></div>)}
        </section>

        <section className="sale-banner">
          <div><span className="sale-kicker">MEESHO MAHA SAVINGS</span><div className="sale-title">Lowest prices,<br />every single day</div><span className="sale-note">Free delivery on your first order</span></div>
          <div className="sale-badge">50%<small>OFF</small></div>
        </section>

        <section className="mini-section">
          <div className="mini-heading">
            <div className="clapper"><Icon name="play" size={17} /></div>
            <div><div className="eyebrow">MEESHO MINIDRAMA</div><div className="section-title">Watch. Discover. Shop.</div></div>
          </div>
          <div className="section-sub">Short stories. New episodes. Products you’ll love.</div>
          <div className="home-dramas">
            {dramas.slice(0, 3).map((drama) => (
              <article className="home-drama-card" key={drama.title} onClick={() => go("series")}>
                <div className="poster-wrap"><Poster image={drama.image} label={`${drama.title} poster`} /><span className="duration">{drama.time}</span></div>
                <div className="home-drama-info"><strong>{drama.title}</strong><span>{drama.ep}</span><p>{drama.hook}</p><span className="text-cta">Watch Now <b>›</b></span></div>
              </article>
            ))}
          </div>
          <Button className="wide" onClick={() => go("discover")}><Icon name="play" size={18} /> Watch MiniDrama</Button>
        </section>

        <section className="shopping-section">
          <div className="section-row"><div className="section-title">Deals for you</div><span className="text-cta">View all ›</span></div>
          <div className="product-grid">
            <ProductTile image={images.watch} name="Smart Watches" price="₹899" />
            <ProductTile image={images.trimmer} name="Grooming essentials" price="₹349" />
          </div>
        </section>
      </main>
      <BottomNav screen="home" go={go} />
    </>
  );
}

function ProductTile({ image, name, price }: { image: string; name: string; price: string }) {
  return <div className="product-tile"><img src={image} alt={name} /><span>{name}</span><strong>{price} onwards</strong><small>Free Delivery</small></div>;
}

const shoppingCategories = [
  ["Women Ethnic", "WE"],
  ["Men Fashion", "MF"],
  ["Home & Kitchen", "HK"],
  ["Beauty", "BY"],
  ["Mobiles", "MB"],
  ["Footwear", "FW"],
  ["Kids", "KD"],
  ["Jewellery", "JW"],
];

function Categories({ go }: { go: (screen: Screen) => void }) {
  return (
    <>
      <main className="screen-content categories-page">
        <AppHeader title="Categories" actions={<Icon name="cart" />} />
        <SearchBar />
        <section className="custom-category-hero" onClick={() => go("customize")}>
          <div className="custom-hero-copy">
            <span className="custom-new">NEW ON MEESHO</span>
            <div className="custom-hero-title">Customizable Prints</div>
            <p>Your photo or name, printed on merch made for you.</p>
            <Button onClick={() => go("customize")}>Start Customizing <b>›</b></Button>
          </div>
          <div className="hero-merch">
            <div className="mini-shirt"><span>RAHUL</span></div>
            <div className="mini-mug"><span>♥</span></div>
          </div>
        </section>
        <section className="category-page-section">
          <div className="section-title">Shop by category</div>
          <div className="category-grid">
            {shoppingCategories.map(([name, mark], index) => (
              <article className="category-grid-item" key={name}>
                <div className={`category-mark category-tone-${index + 1}`}>{mark}</div>
                <span>{name}</span>
              </article>
            ))}
          </div>
        </section>
        <section className="personalize-strip" onClick={() => go("customize")}>
          <div className="personalize-icon"><Icon name="user" size={25} /></div>
          <div><strong>Make it yours</strong><span>Upload photo or add a name</span></div>
          <b>›</b>
        </section>
        <section className="category-page-section">
          <div className="section-row"><div className="section-title">Popular customized gifts</div><span className="text-cta" onClick={() => go("customize")}>See all</span></div>
          <div className="custom-product-row">
            <CustomMiniProduct type="T-Shirt" price="₹399" />
            <CustomMiniProduct type="Mug" price="₹249" />
            <CustomMiniProduct type="Pillow" price="₹349" />
          </div>
        </section>
      </main>
      <BottomNav screen="categories" go={go} />
    </>
  );
}

function CustomMiniProduct({ type, price }: { type: string; price: string }) {
  return (
    <div className="custom-mini-product">
      <div className={`mini-merch product-mini-${type.toLowerCase()}`}><span>A</span></div>
      <strong>Custom {type}</strong><span>{price}</span><small>Free Delivery</small>
    </div>
  );
}

type MerchType = "T-Shirt" | "Shirt" | "Hoodie" | "Pillow" | "Mug";
type PrintMode = "photo" | "name";

function Customizer({ go }: { go: (screen: Screen) => void }) {
  const uploadRef = useRef<HTMLInputElement>(null);
  const [merch, setMerch] = useState<MerchType>("T-Shirt");
  const [mode, setMode] = useState<PrintMode>("photo");
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("RAHUL");
  const [size, setSize] = useState("M");
  const [color, setColor] = useState("White");
  const [added, setAdded] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const prices: Record<MerchType, string> = { "T-Shirt": "₹399", Shirt: "₹499", Hoodie: "₹699", Pillow: "₹349", Mug: "₹249" };

  const onFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
      setMode("photo");
    }
  };

  if (ordered) {
    return (
      <main className="custom-success">
        <AppHeader title="Order Confirmation" onBack={() => setOrdered(false)} />
        <div className="custom-success-body">
          <div className="success-icon"><Icon name="check" size={40} /></div>
          <div className="success-title">Personalized order placed!</div>
          <p>Your custom {merch.toLowerCase()} is confirmed. We’ll print it after a quick quality check.</p>
          <div className="custom-order-preview">
            <MerchPreview merch={merch} mode={mode} photo={photo} name={name} color={color} compact />
            <div><strong>Custom {merch}</strong><span>{mode === "photo" ? "Photo print" : `Name: ${name}`}</span><b>{prices[merch]}</b></div>
          </div>
          <div className="verified-card custom-verified"><Icon name="shield" size={28} /><div><strong>Print quality protected</strong><span>We’ll contact you if your photo needs adjustment.</span></div></div>
          <Button className="wide" onClick={() => go("home")}>Continue Shopping</Button>
          <Button variant="ghost" className="shopping-link" onClick={() => setOrdered(false)}>Create another design</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="screen-content customizer-page">
      <AppHeader title="Customize Your Product" onBack={() => go("categories")} actions={<Icon name="cart" />} />
      <div className="custom-step"><span>1</span> Choose product <i /><span>2</span> Add design <i /><span>3</span> Order</div>
      <section className="merch-selector">
        {(["T-Shirt", "Shirt", "Hoodie", "Pillow", "Mug"] as MerchType[]).map((item) => (
          <Button key={item} variant="ghost" className={`merch-option ${merch === item ? "selected" : ""}`} onClick={() => setMerch(item)}>
            <span className={`merch-option-icon shape-${item.toLowerCase()}`}>{item.slice(0, 1)}</span><span>{item}</span>
          </Button>
        ))}
      </section>

      <section className="preview-stage">
        <span className="preview-label">LIVE PREVIEW</span>
        <MerchPreview merch={merch} mode={mode} photo={photo} name={name} color={color} />
        <span className="preview-note">Actual print size may vary slightly</span>
      </section>

      <section className="custom-controls">
        <div className="section-title">What would you like to print?</div>
        <div className="mode-tabs">
          <Button variant={mode === "photo" ? "soft" : "outline"} onClick={() => setMode("photo")}>Upload Photo</Button>
          <Button variant={mode === "name" ? "soft" : "outline"} onClick={() => setMode("name")}>Add Name / Text</Button>
        </div>
        {mode === "photo" ? (
          <div className="upload-box" onClick={() => uploadRef.current?.click()}>
            {photo ? <img src={photo} alt="Your uploaded print" /> : <div className="upload-symbol">+</div>}
            <div><strong>{photo ? "Photo uploaded" : "Choose a photo"}</strong><span>{photo ? "Tap to replace photo" : "JPG or PNG • Clear photos print best"}</span></div>
            <Button variant="outline" onClick={() => uploadRef.current?.click()}>{photo ? "Change" : "Upload"}</Button>
            {createElement("input", { ref: uploadRef, type: "file", accept: "image/png,image/jpeg", onChange: onFile, className: "hidden-file", "aria-label": "Upload a photo to print" })}
          </div>
        ) : (
          <div className="name-control">
            <label htmlFor="print-name">Name or message</label>
            {createElement("input", { id: "print-name", value: name, maxLength: 18, onChange: (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value.toUpperCase()), placeholder: "Enter name", "aria-label": "Name to print" })}
            <span>{name.length}/18 characters</span>
          </div>
        )}

        {!["Pillow", "Mug"].includes(merch) && (
          <div className="option-block"><strong>Select size</strong><div className="option-row">{["S", "M", "L", "XL", "XXL"].map((item) => <Button key={item} variant={size === item ? "soft" : "outline"} onClick={() => setSize(item)}>{item}</Button>)}</div></div>
        )}
        <div className="option-block"><strong>Select color</strong><div className="color-row">{["White", "Black", "Pink", "Blue"].map((item) => <Button key={item} variant="ghost" className={color === item ? "selected" : ""} onClick={() => setColor(item)}><i className={`color-dot color-${item.toLowerCase()}`} />{item}</Button>)}</div></div>
        <div className="print-promise"><Icon name="shield" size={25} /><div><strong>Meesho Print Promise</strong><span>Preview checked before printing • Easy help for print issues</span></div></div>
        <section className="custom-summary">
          <div><span>Custom {merch}</span><strong>{prices[merch]}</strong><small>Free Delivery • Made to order</small></div>
          <span>Delivery in 6–8 days</span>
        </section>
      </section>
      {added && <div className="added-toast"><Icon name="check" size={17} /> Personalized item added to cart</div>}
      <div className="commerce-bar custom-commerce">
        <Button variant="outline" onClick={() => setAdded(true)}><Icon name="cart" size={18} /> Add to Cart</Button>
        <Button onClick={() => setOrdered(true)}>Buy Now • {prices[merch]}</Button>
      </div>
    </main>
  );
}

function MerchPreview({ merch, mode, photo, name, color, compact = false }: { merch: MerchType; mode: PrintMode; photo: string; name: string; color: string; compact?: boolean }) {
  return (
    <div className={`merch-preview merch-${merch.toLowerCase()} merch-color-${color.toLowerCase()} ${compact ? "compact-preview" : ""}`}>
      <div className="print-area">
        {mode === "photo" ? (
          photo ? <img src={photo} alt="Uploaded design preview" /> : <div className="photo-placeholder"><Icon name="user" size={compact ? 18 : 34} /><span>Your photo</span></div>
        ) : <span className="printed-name">{name || "YOUR NAME"}</span>}
      </div>
      {merch === "Mug" && <i className="mug-handle" />}
      {merch === "Hoodie" && <i className="hood" />}
    </div>
  );
}

function Discover({ go }: { go: (screen: Screen) => void }) {
  const filters = ["Trending", "New Episodes", "Comedy", "Love & Relationships", "Career", "Family", "Friendship", "Life in the City"];
  return (
    <>
      <main className="screen-content">
        <AppHeader title="MiniDrama" actions={<Icon name="search" />} />
        <div className="discover-intro">
          <div className="display-title">Stories made<br />for your break.</div>
          <div className="section-sub">Short stories you’ll want to come back for.</div>
        </div>
        <div className="chips">{filters.map((filter, i) => <span className={`chip ${i === 0 ? "selected" : ""}`} key={filter}>{filter}</span>)}</div>
        <section className="continue-card" onClick={() => go("episode")}>
          <Poster image={images.friends} label="First Salary" />
          <div className="continue-info"><span className="eyebrow light">CONTINUE WATCHING</span><strong>First Salary</strong><span>Episode 5 • 01:24 left</span><div className="progress"><i /></div><span className="continue-link">Continue Watching →</span></div>
          <div className="round-play"><Icon name="play" /></div>
        </section>
        <section className="feed-section">
          <div className="section-row"><div className="section-title">Trending now</div><span className="muted">Fresh today</span></div>
          <div className="drama-feed">
            {dramas.map((drama, index) => (
              <article className="feed-card" key={drama.title}>
                <div className="feed-poster" onClick={() => go("series")}>
                  <Poster image={drama.image} label={drama.title} />
                  <span className="rank">0{index + 1}</span><span className="duration">{drama.time}</span>
                </div>
                <div className="feed-info"><span className="genre">{drama.genre}</span><strong>{drama.title}</strong><span>{drama.ep} • {drama.time}</span><p>{drama.hook}</p><Button className="compact" onClick={() => go("series")}><Icon name="play" size={16} /> Watch Now</Button></div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <BottomNav screen="discover" go={go} />
    </>
  );
}

const episodes = [
  ["1", "Interview Day", "Ravi ka pehla bada mauka.", "2:12"],
  ["2", "First Day", "Office naya, rules naye.", "2:04"],
  ["3", "Salary Credit", "Message aaya aur plan ban gaya.", "2:31"],
  ["4", "Bhai, Budget Bana!", "Roommate ka free financial gyaan.", "2:20"],
];

function Series({ go }: { go: (screen: Screen) => void }) {
  return (
    <>
      <main className="screen-content detail-screen">
        <div className="series-hero">
          <Poster image={images.friends} label="First Salary poster" />
          <div className="hero-shade" />
          <AppHeader onBack={() => go("discover")} actions={<><Button variant="ghost" className="icon-button glass"><Icon name="share" /></Button><Button variant="ghost" className="icon-button glass"><Icon name="heart" /></Button></>} />
          <div className="hero-copy"><span className="pill-light">Comedy • Career</span><div className="hero-title">First Salary</div><p>Ravi gets his first job in the city and discovers that earning money is easier than managing it.</p></div>
        </div>
        <div className="series-body">
          <div className="meta-row"><span className="rating">★ 4.6</span><span>12 Episodes</span><span>2–3 min each</span></div>
          <Button className="wide" onClick={() => go("episode")}><Icon name="play" size={18} /> Continue Watching</Button>
          <Button variant="outline" className="wide" onClick={() => go("episode")}>Start from Episode 1</Button>
          <div className="section-row episode-title-row"><div><div className="section-title">Episodes</div><span className="muted">Season 1</span></div><span className="season-pill">12 episodes⌄</span></div>
          <div className="episode-list">
            {episodes.map((ep) => (
              <article className="episode-row" key={ep[0]}>
                <div className="episode-thumb"><Poster image={Number(ep[0]) % 2 ? images.ravi : images.friends} label={ep[1]} /><span><Icon name="play" size={15} /></span></div>
                <div className="episode-info"><span>EPISODE {ep[0]}</span><strong>{ep[1]}</strong><p>{ep[2]}</p><small>{ep[3]}</small></div>
                <Button variant="outline" className="watch-button" onClick={() => go("episode")}>Watch</Button>
              </article>
            ))}
          </div>
        </div>
      </main>
      <BottomNav screen="series" go={go} />
    </>
  );
}

function Episode({ go, scene, setScene }: { go: (screen: Screen) => void; scene: number; setScene: (n: number) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const scenes = [
    { quote: "“Bhai, beard toh bana le. Aaj interview hai!”", speaker: "Vicky", note: "\u00a0\u00a0\u00a0\u00a0\u00a0" },
    { quote: "“Bas yahi hona tha!”", speaker: "Ravi", note: "The old trimmer stops working." },
    { quote: "“Ye wala try kar. Battery bhi full hai.”", speaker: "Vicky", note: "A small problem, sorted just in time." },
  ];
  const current = scenes[scene];

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().catch(() => setVideoError(true));
    } else {
      video.pause();
    }
  };

  const syncScene = () => {
    const video = videoRef.current;
    if (!video?.duration) return;
    const nextScene = Math.min(scenes.length - 1, Math.floor((video.currentTime / video.duration) * scenes.length));
    if (nextScene !== scene) setScene(nextScene);
  };

  const seekToScene = (nextScene: number) => {
    const video = videoRef.current;
    setScene(nextScene);
    if (video?.duration) video.currentTime = (video.duration / scenes.length) * nextScene;
  };

  return (
    <main className="story-screen">
      <video
        ref={videoRef}
        className="story-video"
        poster={images.friends}
        playsInline
        preload="metadata"
        muted={muted}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={syncScene}
        onEnded={() => {
          setPlaying(false);
          setScene(scenes.length - 1);
        }}
        onError={() => setVideoError(true)}
        aria-label="First Salary microdrama episode with audio"
      >
        <source src="https://media.w3.org/2010/05/sintel/trailer.mp4" type="video/mp4" />
        <source src="https://media.w3.org/2010/05/sintel/trailer.webm" type="video/webm" />
      </video>
      <div className="story-overlay" />
      <div className="story-top">
        <div className="story-progress">{scenes.map((_, index) => <i key={index} className={index <= scene ? "filled" : ""} />)}</div>
        <div className="story-header">
          <Button variant="ghost" className="icon-button glass" onClick={() => go("series")}><Icon name="back" /></Button>
          <div><strong>First Salary</strong><span>Episode 6 • Interview Day</span></div>
          <Button variant="ghost" className="icon-button glass"><Icon name="share" /></Button>
        </div>
      </div>
      <Button
        variant="ghost"
        className="sound-control"
        onClick={() => setMuted(!muted)}
      >
        <Icon name={muted ? "muted" : "volume"} size={18} />
        {muted ? "Sound off" : "Sound on"}
      </Button>
      <Button variant="ghost" className={`play-control ${playing ? "is-playing" : ""}`} onClick={togglePlayback}>
        <Icon name={playing ? "pause" : "play"} size={30} />
      </Button>
      {videoError && <div className="video-error">Video needs an internet connection. You can still continue the story below.</div>}
      <div className="dialogue">
        <span>{current.note}</span>
      </div>
      <div className="story-bottom">
        <section className="story-product" onClick={() => go("product")}>
          <img src={images.trimmer} alt="Nova Cordless Trimmer" />
          <div className="story-product-copy"><span>USED IN THIS EPISODE</span><strong>Nova Cordless Trimmer</strong><div><b>₹699</b><small>★ 4.2 • 10K+ ratings</small></div></div>
          <Button className="product-arrow" onClick={() => go("product")}>View Product <b>›</b></Button>
        </section>
        <div className="story-actions">
          <Button variant="dark" onClick={() => seekToScene(Math.max(0, scene - 1))} disabled={scene === 0}>Previous</Button>
          {scene < scenes.length - 1 ? <Button onClick={() => seekToScene(scene + 1)}>Continue Watching <b>›</b></Button> : <Button onClick={() => go("nextEpisode")}>Next Episode <b>›</b></Button>}
        </div>
        <span className="swipe-hint">{playing ? "Now playing with audio" : "Tap play to watch with audio"}</span>
      </div>
    </main>
  );
}

type ProductKind = "trimmer" | "watch";

function Product({ go, kind, setKind }: { go: (screen: Screen) => void; kind: ProductKind; setKind: (kind: ProductKind) => void }) {
  const watch = kind === "watch";
  const title = watch ? "Fire-Boltt Smartwatch with Bluetooth Calling" : "Nova Cordless Trimmer for Men";
  const image = watch ? images.watch : images.trimmer;
  const price = watch ? "₹899" : "₹699";
  const returnScreen: Screen = watch ? "nextEpisode" : "episode";
  const [variant, setVariant] = useState(watch ? "Black" : "Black");
  const [added, setAdded] = useState(false);
  return (
    <>
      <main className="screen-content product-page">
        <AppHeader onBack={() => go(returnScreen)} actions={<><Icon name="search" /><Icon name="share" /><Icon name="cart" /></>} />
        <div className="product-visual">
          <img src={image} alt={title} />
          <Button variant="ghost" className="wish-float"><Icon name="heart" /></Button>
          <div className="image-dots"><i className="active" /><i /><i /></div>
        </div>
        <div className="product-content">
          <div className="context-badge"><Icon name="play" size={14} /> Seen in <strong>First Salary • Episode {watch ? "7" : "6"}</strong></div>
          <div className="product-name">{title}</div>
          <div className="price-row"><strong>{price}</strong><del>{watch ? "₹2,499" : "₹1,299"}</del><span>{watch ? "64%" : "46%"} off</span></div>
          <span className="inclusive">Inclusive of all taxes</span>
          <div className="rating-line"><span>4.{watch ? "3" : "2"} ★</span><b>{watch ? "7,842" : "10,361"} Ratings</b><b>1,204 Reviews</b></div>
        </div>
        <div className="divider" />
        <section className="product-content">
          <div className="section-title">Select variant</div>
          <div className="variants">{["Black", watch ? "Grey" : "Blue"].map((item) => <Button key={item} variant={variant === item ? "soft" : "outline"} className="variant" onClick={() => setVariant(item)}>{item}</Button>)}</div>
        </section>
        <div className="divider" />
        <section className="product-content delivery-box">
          <div className="section-title">Delivery details</div>
          <div className="pincode"><Icon name="pin" size={18} /><span>452010</span><b>Change</b></div>
          <strong>Delivery by Thursday, 12 June</strong><span>Free Delivery</span>
        </section>
        <section className="verified-card">
          <Icon name="shield" size={28} /><div><strong>Meesho Verified Plus</strong><span>Quality checked product from a trusted seller</span><small>Optional protection available at checkout</small></div>
        </section>
        <section className="product-content">
          <div className="section-title">Product details</div>
          <ul>
            {watch
              ? <><li>1.83” HD display with calling</li><li>7-day battery life</li><li>Heart rate and activity tracking</li></>
              : <><li>45 min cordless use</li><li>Stainless steel blades</li><li>20 length settings • USB charging</li></>}
          </ul>
        </section>
        <div className="divider" />
        <section className="product-content">
          <div className="section-row"><div className="section-title">Ratings & Reviews</div><span className="text-cta">View all</span></div>
          <div className="review"><span className="avatar">AS</span><div><strong>Ankit S.</strong><span>★★★★★</span><p>Good quality for this price. Delivery was quick and packing was safe.</p><small>Verified Buyer • Ujjain</small></div></div>
        </section>
        <section className="seller"><span>Sold by</span><strong>{watch ? "Shree Digital Store" : "Nova India Retail"}</strong><span>4.3 ★ Trusted Seller</span></section>
        <Button variant="ghost" className="back-episode" onClick={() => go(returnScreen)}><Icon name="back" size={18} /> Back to Episode</Button>
      </main>
      <div className="commerce-bar">
        <Button variant="outline" onClick={() => setAdded(true)}><Icon name="cart" size={18} /> {added ? "Added to Cart" : "Add to Cart"}</Button>
        <Button onClick={() => { setKind(kind); go("confirmation"); }}>Buy Now</Button>
      </div>
    </>
  );
}

function Confirmation({ go, kind }: { go: (screen: Screen) => void; kind: ProductKind }) {
  const watch = kind === "watch";
  return (
    <main className="confirmation">
      <AppHeader title="Order Confirmation" />
      <section className="success-panel">
        <div className="success-icon"><Icon name="check" size={40} /></div>
        <div className="success-title">Order placed! 🎉</div>
        <p>Your order is confirmed.</p>
        <span className="order-id">Order ID #MSH2748196</span>
      </section>
      <section className="order-card">
        <img src={watch ? images.watch : images.trimmer} alt={watch ? "Smartwatch" : "Nova Cordless Trimmer"} />
        <div><strong>{watch ? "Fire-Boltt Smartwatch" : "Nova Cordless Trimmer"}</strong><span>{watch ? "Black" : "Black • 1 item"}</span><b>{watch ? "₹899" : "₹699"}</b></div>
      </section>
      <section className="delivery-status"><i /><div><strong>Arriving by Thursday, 12 June</strong><span>We’ll notify you when your order ships.</span></div></section>
      <section className="return-story">
        <span className="eyebrow">YOUR STORY IS WAITING</span>
        <div className="return-poster"><Poster image={images.friends} label="First Salary" /><span><Icon name="play" size={28} /></span></div>
        <div className="section-title">See what happens to Ravi</div>
        <p>Pick up exactly where you left off in Episode 6.</p>
        <Button className="wide" onClick={() => go(watch ? "nextEpisode" : "episode")}><Icon name="play" size={18} /> Continue Episode</Button>
      </section>
      <section className="next-drop">
        <span>NEW EPISODE</span><div><strong>Episode 7 drops tomorrow</strong><small>Salary Aa Gayi! • 2 min</small></div><Button variant="outline" onClick={() => go("nextEpisode")}>Watch Next Episode</Button>
      </section>
      <Button variant="ghost" className="shopping-link" onClick={() => go("home")}>Continue Shopping</Button>
    </main>
  );
}

function NextEpisode({ go, setKind }: { go: (screen: Screen) => void; setKind: (kind: ProductKind) => void }) {
  const [scene, setScene] = useState(0);
  return (
    <main className="story-screen">
      <Poster image={scene === 0 ? images.city : images.friends} label="Salary Aa Gayi story scene" className="story-bg" />
      <div className="story-overlay" />
      <div className="story-top">
        <div className="story-progress"><i className="filled" /><i className={scene > 0 ? "filled" : ""} /><i /></div>
        <div className="story-header">
          <Button variant="ghost" className="icon-button glass" onClick={() => go("episode")}><Icon name="back" /></Button>
          <div><strong>First Salary</strong><span>Episode 7 • Salary Aa Gayi!</span></div>
          <Button variant="ghost" className="icon-button glass"><Icon name="share" /></Button>
        </div>
      </div>
      <Button variant="ghost" className="play-control" onClick={() => setScene(scene === 0 ? 1 : 0)}><Icon name="play" size={30} /></Button>
      <div className="episode-label"><span>EPISODE 7</span><div>Salary Aa Gayi!</div></div>
      <div className="dialogue next-dialogue">
        <span>Salary credited • ₹24,500</span><div>{scene === 0 ? "“Maa ke liye gift pakka. Par pehle ek chhota celebration?”" : "“Office time pe pahunchna bhi toh zaroori hai!”"}</div><strong>— Ravi</strong>
      </div>
      <div className="story-bottom">
        <section className="story-product" onClick={() => { setKind("watch"); go("product"); }}>
          <img src={images.watch} alt="Fire-Boltt Smartwatch" />
          <div className="story-product-copy"><span>SEEN IN THIS EPISODE</span><strong>Fire-Boltt Smartwatch</strong><div><b>₹899</b><small>★ 4.3 • 7K+ ratings</small></div></div>
          <Button className="product-arrow" onClick={() => { setKind("watch"); go("product"); }}>View Product <b>›</b></Button>
        </section>
        <Button className="wide" onClick={() => setScene(1)}>Watch Next Episode <b>›</b></Button>
        <span className="swipe-hint">New product, naturally part of Ravi’s story</span>
      </div>
    </main>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [episodeScene, setEpisodeScene] = useState(0);
  const [productKind, setProductKind] = useState<ProductKind>("trimmer");

  const go = (next: Screen) => {
    setScreen(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-stage">
      <div className="phone-shell">
        {screen === "home" && <Home go={go} />}
        {screen === "categories" && <Categories go={go} />}
        {screen === "customize" && <Customizer go={go} />}
        {screen === "discover" && <Discover go={go} />}
        {screen === "series" && <Series go={go} />}
        {screen === "episode" && <Episode go={go} scene={episodeScene} setScene={setEpisodeScene} />}
        {screen === "product" && <Product go={go} kind={productKind} setKind={setProductKind} />}
        {screen === "confirmation" && <Confirmation go={go} kind={productKind} />}
        {screen === "nextEpisode" && <NextEpisode go={go} setKind={setProductKind} />}
      </div>
    </div>
  );
}
