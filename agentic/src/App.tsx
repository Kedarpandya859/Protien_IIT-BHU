import { createContext, useCallback, useContext, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";

const journeySteps = ["Listen", "Think", "Act", "Confirm"];
const frameCount = 12;

const PrototypeContext = createContext({ goTo: (_index: number) => {} });
const FrameContext = createContext(0);

function usePrototypeNavigation() {
  const { goTo } = useContext(PrototypeContext);
  const frameIndex = useContext(FrameContext);

  return {
    goTo,
    next: () => goTo(frameIndex + 1),
    back: () => goTo(frameIndex - 1),
  };
}

function Interactive({ className = "", onClick, children, label }: { className?: string; onClick: () => void; children: ReactNode; label?: string }) {
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };
  return <div className={className} role="button" tabIndex={0} aria-label={label} onClick={onClick} onKeyDown={onKeyDown}>{children}</div>;
}

function Icon({ name }: { name: "search" | "mic" | "back" | "sparkle" | "check" | "home" | "grid" | "bag" | "cart" | "user" | "pin" }) {
  const paths = {
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 4 4" /></>,
    mic: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M6 11a6 6 0 0 0 12 0M12 17v4M9 21h6" /></>,
    back: <path d="m14.5 5-7 7 7 7" />,
    sparkle: <path d="m12 2 1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2Zm7 14 .6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z" />,
    check: <path d="m5 12.5 4.2 4.2L19 7" />,
    home: <><path d="m3 11 9-8 9 8" /><path d="M5.5 9.5V21h13V9.5M9.5 21v-7h5v7" /></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    bag: <><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    cart: <><path d="M3 4h2l2 11h10l3-8H6" /><circle cx="9" cy="19" r="1.5" /><circle cx="17" cy="19" r="1.5" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4.5 21a7.5 7.5 0 0 1 15 0" /></>,
    pin: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  };
  return <svg aria-hidden="true" className={`ui-icon icon-${name}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function ShirtIcon() {
  return (
    <svg aria-hidden="true" className="shirt-icon" viewBox="0 0 64 64" fill="none">
      <path d="M23 12c2 5 16 5 18 0l13 8-7 11-6-3v25H23V28l-6 3-7-11 13-8Z" fill="#B4B0BA" stroke="#817C8E" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M26 14c1.5 6 10.5 6 12 0" stroke="#817C8E" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function StatusBar() {
  return (
    <div className="status-bar">
      <span>9:41</span>
      <div className="status-symbols" aria-hidden="true"><span>●●●</span><span>⌁</span><span className="battery" /></div>
    </div>
  );
}

function JourneyProgress({ active }: { active: number }) {
  return (
    <div className="journey-progress">
      {journeySteps.map((step, index) => (
        <div className={`journey-step ${index === active ? "is-current" : ""}`} key={step}>
          <span className="journey-dot" />
          <span>{step}</span>
        </div>
      ))}
    </div>
  );
}

function AaravAvatar() {
  return (
    <div className="aarav-dock">
      <span className="aarav-label">Aarav</span>
      <div className="avatar-ring">
        <svg aria-hidden="true" viewBox="0 0 56 56">
          <circle cx="28" cy="28" r="28" fill="#E8C9DA" />
          <path d="M10 55c1-12 8-18 18-18s17 6 18 18" fill="#5B0F47" />
          <ellipse cx="28" cy="25" rx="12" ry="13.5" fill="#C9845A" />
          <path d="M16.5 24c-.5-10 5-15 12-15 8 0 12.5 6 11 15-3-1.5-5-4.5-5.5-6.5-4 4-10 6-17.5 6.5Z" fill="#1B1535" />
          <circle cx="24" cy="26" r="1.2" fill="#1B1535" />
          <circle cx="32" cy="26" r="1.2" fill="#1B1535" />
          <path d="M24 31c2.5 2 5.5 2 8 0" stroke="#7B402D" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span className="avatar-mic"><Icon name="mic" /></span>
      </div>
    </div>
  );
}

function AppHeader({ query, back = false, cartTitle }: { query?: string; back?: boolean; cartTitle?: string }) {
  const { back: goBack } = usePrototypeNavigation();
  const backControl = <Interactive className="header-back" onClick={goBack} label="Go to previous screen"><Icon name="back" /></Interactive>;

  if (cartTitle) {
    return <div className="simple-header">{backControl}<b>{cartTitle}</b></div>;
  }
  return (
    <div className="app-header">
      {back ? backControl : <div className="m-mark">m</div>}
      <div className="search-box"><Icon name="search" /><span>{query ?? "Search for products"}</span><Icon name="mic" /></div>
    </div>
  );
}

const navItems: Array<{ label: string; icon: "home" | "grid" | "bag" | "cart" | "user" }> = [
  { label: "Home", icon: "home" },
  { label: "Categories", icon: "grid" },
  { label: "Orders", icon: "bag" },
  { label: "Cart", icon: "cart" },
  { label: "Account", icon: "user" },
];

function BottomNav({ active = "Home" }: { active?: string }) {
  const { goTo } = usePrototypeNavigation();
  const destinations: Record<string, number> = { Home: 0, Categories: 3, Orders: 10, Cart: 7, Account: 0 };

  return (
    <div className="bottom-nav">
      {navItems.map((item) => (
        <Interactive className={`nav-item ${item.label === active ? "active" : ""}`} onClick={() => goTo(destinations[item.label])} label={`Open ${item.label}`} key={item.label}>
          <Icon name={item.icon} /><span>{item.label}</span>
        </Interactive>
      ))}
    </div>
  );
}

function ProductTile({ name, price, rating, highlighted = false, delivery = false }: { name: string; price: string; rating?: string; highlighted?: boolean; delivery?: boolean }) {
  return (
    <div className={`product-tile ${highlighted ? "highlighted" : ""}`}>
      <div className="product-image"><ShirtIcon /></div>
      <div className="product-name">{name}</div>
      <div className="product-price">{price}</div>
      <div className="product-details">
        {rating && <span className="rating-pill">{rating} ★</span>}
        {delivery && <span>Free delivery</span>}
      </div>
    </div>
  );
}

function BaseLayer({ children, dimmed = false }: { children: ReactNode; dimmed?: boolean }) {
  return (
    <div className={`layer-group meesho-base ${dimmed ? "dimmed" : ""}`} data-layer-group="Meesho App Base">
      {children}
    </div>
  );
}

function OverlayLayer({ active, children }: { active: number; children: ReactNode }) {
  return (
    <div className="layer-group aarav-overlay" data-layer-group="Aarav Overlay">
      <JourneyProgress active={active} />
      {children}
      <AaravAvatar />
    </div>
  );
}

function Frame({ index, name, active, current, base, overlay, dimmed = false }: { index: number; name: string; active: number; current: boolean; base: ReactNode; overlay: ReactNode; dimmed?: boolean }) {
  return (
    <FrameContext.Provider value={index}>
      <section className={`frame-wrap ${current ? "is-active" : ""}`} aria-label={name} data-frame-index={index}>
        <div className="frame-name"><span>{name}</span>{current && <small>Current screen</small>}</div>
        <div className="phone-frame" data-frame-name={name}>
          <BaseLayer dimmed={dimmed}>{base}</BaseLayer>
          <OverlayLayer active={active}>{overlay}</OverlayLayer>
          <div className="home-indicator" />
        </div>
      </section>
    </FrameContext.Provider>
  );
}

function HomeBase() {
  return (
    <>
      <StatusBar />
      <AppHeader />
      <div className="base-scroll home-content">
        <div className="delivery-line"><Icon name="pin" /><span>Delivering to 110001</span><b>Change</b></div>
        <div className="promo-banner"><div><span>SPORTS EDIT</span><b>Move more. Spend less.</b><small>Starting ₹199</small></div><ShirtIcon /></div>
        <div className="category-row">{["Men", "Women", "Electronics", "Sports", "Home"].map((item) => <span key={item}>{item}</span>)}</div>
        <div className="section-heading"><b>Top picks for you</b><span>View all</span></div>
        <div className="home-grid">
          <ProductTile name="Everyday Tee" price="₹199" />
          <ProductTile name="Active Crew Tee" price="₹249" />
          <ProductTile name="Sports T-shirt" price="₹299" />
          <ProductTile name="Training Tee" price="₹349" />
        </div>
      </div>
      <BottomNav />
    </>
  );
}

function ListeningOverlay() {
  const [listening, setListening] = useState(true);
  const [tone, setTone] = useState("Bhaiya");
  const { next } = usePrototypeNavigation();
  const bars = [12, 22, 34, 18, 38, 48, 28, 54, 40, 50, 29, 42, 31, 20, 28, 14];
  return (
    <div className="frosted-sheet listen-sheet">
      <div className="sheet-handle" />
      <Interactive className="listening-title tap" onClick={() => setListening(!listening)}>{listening ? "Bolo, main sun raha hoon" : "Paused · tap to continue"}</Interactive>
      <div className={`waveform ${listening ? "is-live" : ""}`}>{bars.map((height, index) => <span key={index} style={{ height }} />)}</div>
      <div className="transcript">Gym ke liye ₹700 ke andar 2 dry-fit T-shirts chahiye.<span>Samajh gaya</span></div>
      <div className="reply-line">Bolo, main dhoondh leta hoon.</div>
      <div className="tone-row">{["Buddy", "Bhaiya", "Uncle"].map((item) => <Interactive className={tone === item ? "selected" : ""} onClick={() => setTone(item)} key={item}>{item}</Interactive>)}</div>
      <Interactive className="sheet-action listen-action" onClick={next}>Done speaking</Interactive>
    </div>
  );
}

function AppliedTag({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`applied-tag ${className}`}><Icon name="sparkle" />{children}</span>;
}

function ResultsBase() {
  return (
    <>
      <StatusBar />
      <AppHeader back query="dry-fit t-shirts men" />
      <div className="base-scroll results-content">
        <div className="filter-row"><span>Sort</span><span>Filter</span><span>Under ₹700</span><span>Men</span></div>
        <div className="filter-row second"><span>Dry-Fit</span><span>4 star and above</span></div>
        <div className="results-count">24 results</div>
        <div className="results-grid">
          <ProductTile name="AeroFlex Dry-Fit Tee" price="₹374" rating="4.5" highlighted delivery />
          <ProductTile name="FlexGo Training Tee" price="₹399" rating="4.1" delivery />
          <ProductTile name="StrideFit Sports Tee" price="₹429" rating="4.2" delivery />
          <ProductTile name="Motion Crew T-shirt" price="₹449" rating="4.0" delivery />
        </div>
      </div>
      <BottomNav active="Categories" />
    </>
  );
}

function ThinkingOverlay() {
  const { next, back } = usePrototypeNavigation();
  return (
    <>
      <AppliedTag className="tag-budget">Applied by Aarav</AppliedTag>
      <AppliedTag className="tag-men">Applied by Aarav</AppliedTag>
      <AppliedTag className="tag-dryfit">Applied by Aarav</AppliedTag>
      <AppliedTag className="tag-rating">Applied by Aarav</AppliedTag>
      <span className="pick-badge">Aarav's pick</span>
      <div className="frosted-sheet review-sheet">
        <div className="sheet-handle" />
        <div className="review-title">Aarav ne 2,430 reviews padhe</div>
        <div className="review-chip good"><b>PRO</b> Sweat-wicking, true to size</div>
        <div className="review-chip good"><b>PRO</b> 4.5 star verified durability</div>
        <div className="review-chip note"><b>NOTE</b> Sleeves run 0.5 inch fitted</div>
        <div className="funnel-line">1,248 options &gt; 24 fit &gt; 2 best picks</div>
        <Interactive className="sheet-action" onClick={next}>Haan, yehi chahiye</Interactive>
        <Interactive className="sheet-link" onClick={back}>Aur dikhao</Interactive>
      </div>
    </>
  );
}

function QtyStepper() {
  const [quantity, setQuantity] = useState(1);
  return <div className="qty-stepper"><Interactive onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</Interactive><b>{quantity}</b><Interactive onClick={() => setQuantity(quantity + 1)}>+</Interactive></div>;
}

function CartItem({ color }: { color: string }) {
  const [removed, setRemoved] = useState(false);
  if (removed) return <Interactive className="removed-item" onClick={() => setRemoved(false)}>Item removed · Undo</Interactive>;
  return (
    <div className="cart-item">
      <div className="cart-thumb"><ShirtIcon /></div>
      <div className="cart-item-copy"><b>AeroFlex Dry-Fit Tee</b><span>{color}, L</span><strong>₹374</strong><Interactive className="remove-link" onClick={() => setRemoved(true)}>Remove</Interactive></div>
      <QtyStepper />
    </div>
  );
}

function CartBase() {
  const { next } = usePrototypeNavigation();
  return (
    <>
      <StatusBar />
      <AppHeader cartTitle="Cart (2)" />
      <div className="base-scroll cart-content">
        <div className="address-strip"><Icon name="pin" /><div><b>Deliver to Aarav</b><span>New Delhi, 110001</span></div><strong>Change</strong></div>
        <CartItem color="Jet Black" />
        <CartItem color="Navy" />
        <div className="coupon-base"><div><b>FIRSTBUY50 applied, -₹50</b><span>You saved ₹50</span></div><strong>Applied</strong></div>
        <div className="price-summary">
          <b>Price details</b>
          <div><span>Items</span><span>₹748</span></div>
          <div><span>Coupon</span><span className="saving">-₹50</span></div>
          <div><strong>Total</strong><strong>₹698</strong></div>
        </div>
      </div>
      <div className="sticky-bar"><div><span>Total</span><b>₹698</b></div><Interactive className="base-cta" onClick={next}>Continue</Interactive></div>
    </>
  );
}

function ActOverlay() {
  return (
    <>
      <div className="voice-bubble">Black wala L mein cart mein daal do.</div>
      <AppliedTag className="tag-cart-one">Added by Aarav</AppliedTag>
      <AppliedTag className="tag-size">Size L selected by Aarav</AppliedTag>
      <AppliedTag className="tag-cart-two">Added by Aarav</AppliedTag>
      <AppliedTag className="tag-coupon">Applied by Aarav</AppliedTag>
      <div className="action-toast"><Icon name="check" />Pack of 2 added, coupon lag gaya</div>
    </>
  );
}

function CheckoutBase({ locked = false }: { locked?: boolean }) {
  const [payment, setPayment] = useState("UPI");
  const { next } = usePrototypeNavigation();
  return (
    <>
      <StatusBar />
      <AppHeader cartTitle="Checkout" />
      <div className="base-scroll checkout-content">
        <div className="checkout-card address-card"><div><b>Delivery address</b><strong>Change</strong></div><span>Aarav Kumar</span><span>New Delhi, 110001</span></div>
        <div className="delivery-card"><Icon name="check" /><div><b>Delivery in 3 days, Free</b><span>Both items in one package</span></div></div>
        <div className="checkout-card checkout-prices">
          <b>Price details</b>
          <div><span>Items</span><span>₹748</span></div>
          <div><span>Coupon</span><span className="saving">-₹50</span></div>
          <div><span>Delivery</span><span className="saving">Free</span></div>
          <div className="order-total"><strong>Order total</strong><strong>₹698</strong></div>
        </div>
        <div className="checkout-card payment-card">
          <b>Payment options</b>
          {["UPI", "Cash on delivery", "Card"].map((item) => <Interactive onClick={() => setPayment(item)} key={item}><span className={`radio ${payment === item ? "checked" : ""}`} /><span>{item}{item === "UPI" ? " selected" : ""}</span></Interactive>)}
        </div>
      </div>
      <div className="checkout-sticky">
        {locked ? <div className="base-cta locked-cta">Approval required</div> : <Interactive className="base-cta" onClick={next}>Place Order ₹698</Interactive>}
      </div>
    </>
  );
}

function VerifyOverlay() {
  const [decision, setDecision] = useState<"none" | "yes" | "later">("none");
  const { next, back } = usePrototypeNavigation();
  const checks = ["Size L, Jet Black + Navy", "Delivery 3 days, free", "7-day easy return", "Coupon FIRSTBUY50 applied"];
  return (
    <div className="frosted-sheet verify-sheet">
      <div className="sheet-handle" />
      <div className="verify-grid">{checks.map((check) => <div key={check}><span className="check-circle"><Icon name="check" /></span>{check}</div>)}</div>
      <div className="confirm-panel">
        <b>₹698. Place order?</b>
        <span className="voice-confirm"><Icon name="mic" />Bol ke confirm karo</span>
        <div className="confirm-buttons"><Interactive onClick={() => { setDecision("yes"); next(); }}>YES (haan)</Interactive><Interactive onClick={() => { setDecision("later"); back(); }}>NOT YET</Interactive></div>
      </div>
      <div className="safety-caption">{decision === "yes" ? "Yes received · placing demo order" : decision === "later" ? "Order paused · nothing charged" : "Aarav never pays without your yes"}</div>
    </div>
  );
}

function WelcomeOverlay() {
  const { next } = usePrototypeNavigation();
  return (
    <div className="frosted-sheet welcome-sheet">
      <div className="sheet-handle" />
      <div className="welcome-copy"><span className="eyebrow">YOUR DIGITAL SHOPKEEPER</span><b>Meet Aarav</b><p>Bas bolo kya chahiye. Main dhoondhunga, compare karunga aur aapki permission ke baad hi order karunga.</p></div>
      <div className="promise-row"><span><Icon name="search" />Finds</span><span><Icon name="sparkle" />Decides</span><span><Icon name="cart" />Prepares</span><span><Icon name="check" />You approve</span></div>
      <Interactive className="sheet-action" onClick={next}>Start shopping with Aarav</Interactive>
    </div>
  );
}

function IntentOverlay() {
  const { next, back } = usePrototypeNavigation();
  return (
    <div className="frosted-sheet intent-sheet">
      <div className="sheet-handle" />
      <div className="review-title">Maine yeh samjha</div>
      <div className="intent-summary">
        <span>2 T-shirts</span><span>Dry-fit</span><span>For gym</span><span>Total ≤ ₹700</span>
      </div>
      <div className="assumption-note"><Icon name="sparkle" /><span><b>No assumptions made</b>Colour aur size aapse poochunga.</span></div>
      <Interactive className="sheet-action" onClick={next}>Haan, sahi samjhe</Interactive>
      <Interactive className="sheet-link" onClick={back}>Request edit karo</Interactive>
    </div>
  );
}

function SearchOverlay() {
  const [running, setRunning] = useState(true);
  const { next } = usePrototypeNavigation();
  const tasks = ["Request understood", "1,248 products searched", "Budget + fabric filtered", "24 strong matches found"];
  return (
    <div className="frosted-sheet search-sheet">
      <div className="sheet-handle" />
      <div className="searching-head"><div className={running ? "agent-pulse" : ""}><Icon name="sparkle" /></div><span><b>{running ? "Aarav is working" : "Search paused"}</b><small>{running ? "Checking value, ratings and returns…" : "Resume whenever you are ready"}</small></span></div>
      <div className="task-list">{tasks.map((task, index) => <div className={running || index < 2 ? "done" : ""} key={task}><span><Icon name="check" /></span>{task}</div>)}</div>
      <div className="search-actions">
        <Interactive className="pause-action" onClick={() => setRunning(!running)}>{running ? "Pause" : "Resume"}</Interactive>
        <Interactive className="sheet-action" onClick={next}>See 24 matches</Interactive>
      </div>
    </div>
  );
}

function DecisionOverlay() {
  const [choice, setChoice] = useState("AeroFlex");
  const { next } = usePrototypeNavigation();
  return (
    <>
      <span className="pick-badge">Aarav's pick</span>
      <div className="frosted-sheet decision-sheet">
        <div className="sheet-handle" />
        <div className="review-title">Best value, clearly explained</div>
        <div className="choice-row">
          <Interactive className={choice === "AeroFlex" ? "selected" : ""} onClick={() => setChoice("AeroFlex")}><b>AeroFlex</b><strong>₹374</strong><span>4.5 ★ · lighter</span></Interactive>
          <Interactive className={choice === "FlexGo" ? "selected" : ""} onClick={() => setChoice("FlexGo")}><b>FlexGo</b><strong>₹399</strong><span>4.1 ★ · thicker</span></Interactive>
        </div>
        <div className="recommend-line"><Icon name="sparkle" /><span><b>{choice} recommended</b>Better review confidence and still inside your total budget.</span></div>
        <Interactive className="sheet-action" onClick={next}>Choose {choice}</Interactive>
      </div>
    </>
  );
}

function ProductBase() {
  return (
    <>
      <StatusBar />
      <AppHeader back cartTitle="AeroFlex Dry-Fit Tee" />
      <div className="base-scroll product-page">
        <div className="product-hero"><ShirtIcon /><span>4.5 ★ · 1,480 ratings</span></div>
        <b>AeroFlex Dry-Fit Training Tee</b>
        <div className="hero-price">₹374 <span>Free delivery</span></div>
        <div className="detail-line"><span>Quick-dry fabric</span><span>7-day return</span></div>
        <div className="colour-row"><b>Colour</b><span className="swatch black" /><span className="swatch navy" /></div>
      </div>
      <BottomNav active="Categories" />
    </>
  );
}

function SizeOverlay() {
  const [size, setSize] = useState("L");
  const { next } = usePrototypeNavigation();
  return (
    <div className="frosted-sheet size-sheet">
      <div className="sheet-handle" />
      <div className="review-title">Fit check by Aarav</div>
      <div className="fit-note"><Icon name="sparkle" /><span>Reviews say shoulders run snug. <b>L is safer for workouts.</b></span></div>
      <div className="size-options">{["M", "L", "XL"].map((item) => <Interactive className={size === item ? "selected" : ""} onClick={() => setSize(item)} key={item}>{item}</Interactive>)}</div>
      <Interactive className="sheet-action" onClick={next}>{`Add Black / ${size} to cart`}</Interactive>
      <div className="safety-caption">Size and colour stay editable in cart</div>
    </div>
  );
}

function CheckoutReviewOverlay() {
  const { next } = usePrototypeNavigation();
  return (
    <>
      <AppliedTag className="tag-address">Address checked</AppliedTag>
      <AppliedTag className="tag-delivery">Free delivery found</AppliedTag>
      <AppliedTag className="tag-payment">UPI ready · not charged</AppliedTag>
      <div className="checkout-toast">
        <div><Icon name="sparkle" /><span><b>Everything is ready</b>Address, coupon, delivery and payment checked.</span></div>
        <Interactive onClick={next}>Continue to approval · ₹698</Interactive>
      </div>
    </>
  );
}

function OrderBase() {
  return (
    <>
      <StatusBar />
      <AppHeader cartTitle="Order confirmed" />
      <div className="base-scroll order-content">
        <div className="success-mark"><Icon name="check" /></div>
        <b className="order-title">Your gym set is ordered</b>
        <span className="order-number">Order #MS1042 · ₹698 paid via UPI</span>
        <div className="order-products"><div><ShirtIcon /></div><span><b>2 AeroFlex tees</b>Black and Navy · Size L<br />Arriving together</span></div>
        <div className="delivery-address"><Icon name="pin" /><span><b>Delivering to Aarav Kumar</b>New Delhi, 110001</span></div>
      </div>
      <BottomNav active="Orders" />
    </>
  );
}

function OrderPlacedOverlay() {
  const { next } = usePrototypeNavigation();
  return (
    <Interactive className="order-toast" onClick={next} label="Track this order"><span className="check-circle"><Icon name="check" /></span><span><b>YES received. Order placed.</b>Tap to track it with Aarav →</span></Interactive>
  );
}

function TrackingBase() {
  const stages = ["Order placed", "Packed", "Shipped", "Delivered"];
  return (
    <>
      <StatusBar />
      <AppHeader cartTitle="Track order" />
      <div className="base-scroll tracking-content">
        <div className="tracking-hero"><span>Arriving Tuesday</span><b>06 Oct, by 8 PM</b><small>Both items in one package</small></div>
        <div className="tracking-line">{stages.map((stage, index) => <div className={index < 2 ? "active" : ""} key={stage}><span /><b>{stage}</b><small>{index === 0 ? "9:42 AM" : index === 1 ? "In progress" : "Upcoming"}</small></div>)}</div>
        <div className="help-card"><b>Need help with this order?</b><span>Return eligible for 7 days after delivery.</span></div>
      </div>
      <BottomNav active="Orders" />
    </>
  );
}

function TrackingOverlay() {
  const [action, setAction] = useState("Track");
  const { goTo } = usePrototypeNavigation();
  return (
    <div className="frosted-sheet tracking-sheet">
      <div className="sheet-handle" />
      <div className="review-title">Aarav is still on it</div>
      <p>“Package pack ho raha hai. Ship hote hi bata dunga.”</p>
      <div className="tracking-actions">{["Track", "Support", "Return"].map((item) => <Interactive className={action === item ? "selected" : ""} onClick={() => setAction(item)} key={item}>{item}</Interactive>)}</div>
      <div className="safety-caption">{action} selected · you stay in control</div>
      <Interactive className="restart-link" onClick={() => goTo(0)}>Restart prototype</Interactive>
    </div>
  );
}

export default function App() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const goTo = useCallback((requestedIndex: number) => {
    const index = Math.min(Math.max(requestedIndex, 0), frameCount - 1);
    setCurrentFrame(index);
    requestAnimationFrame(() => {
      document.querySelector(`[data-frame-index="${index}"]`)?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    });
  }, []);

  const frames = [
    { name: "01 Meet Aarav", active: 0, base: <HomeBase />, overlay: <WelcomeOverlay />, dimmed: true },
    { name: "02 Listen to Request", active: 0, base: <HomeBase />, overlay: <ListeningOverlay />, dimmed: true },
    { name: "03 Understand Intent", active: 0, base: <HomeBase />, overlay: <IntentOverlay />, dimmed: true },
    { name: "04 Search and Filter", active: 1, base: <ResultsBase />, overlay: <SearchOverlay />, dimmed: true },
    { name: "05 Review Intelligence", active: 1, base: <ResultsBase />, overlay: <ThinkingOverlay />, dimmed: true },
    { name: "06 Decide the Best Buy", active: 1, base: <ResultsBase />, overlay: <DecisionOverlay />, dimmed: true },
    { name: "07 Select Size and Colour", active: 2, base: <ProductBase />, overlay: <SizeOverlay />, dimmed: true },
    { name: "08 Act and Build Cart", active: 2, base: <CartBase />, overlay: <ActOverlay />, dimmed: false },
    { name: "09 Review Checkout", active: 2, base: <CheckoutBase />, overlay: <CheckoutReviewOverlay />, dimmed: false },
    { name: "10 Verify and Confirm", active: 3, base: <CheckoutBase locked />, overlay: <VerifyOverlay />, dimmed: true },
    { name: "11 Order Placed", active: 3, base: <OrderBase />, overlay: <OrderPlacedOverlay />, dimmed: false },
    { name: "12 Track with Aarav", active: 3, base: <TrackingBase />, overlay: <TrackingOverlay />, dimmed: true },
  ];
  return (
    <PrototypeContext.Provider value={{ goTo }}>
      {frames.map((frame, index) => (
        <Frame
          key={frame.name}
          index={index}
          current={currentFrame === index}
          name={frame.name}
          active={frame.active}
          base={frame.base}
          overlay={frame.overlay}
          dimmed={frame.dimmed}
        />
      ))}
    </PrototypeContext.Provider>
  );
}
