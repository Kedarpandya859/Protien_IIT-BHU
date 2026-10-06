import { useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";

const A = "/assets";

const assets = {
  aarav: `${A}/5dc04.png`,
  uncle: `${A}/78ac6.png`,
  blackHero: `${A}/d097a.png`,
  aeroBlack: `${A}/b2fa6.png`,
  aeroBlackLarge: `${A}/dc2e2.png`,
  aeroNavy: `${A}/04bb5.png`,
  aeroNavySmall: `${A}/abf72.png`,
  compareBlack: `${A}/65a05.png`,
  compareNavy: `${A}/bccf2.png`,
  shorts: `${A}/5fe1f.png`,
  cartBlack: `${A}/2cc39.png`,
  cartNavy: `${A}/409ad.png`,
  cartShorts: `${A}/8a61c.png`,
  bag: `${A}/1ef6d.svg`,
  speech: `${A}/46128.svg`,
  home: `${A}/605bb.svg`,
  homeActive: `${A}/5f519.svg`,
  grid: `${A}/54176.svg`,
  sparkles: `${A}/9a492.svg`,
  sparklesInactive: `${A}/e1709.svg`,
  package: `${A}/4c8c2.svg`,
  user: `${A}/cccf5.svg`,
  pin: `${A}/a4f71.svg`,
  chevronDown: `${A}/5e0b8.svg`,
  search: `${A}/c2a06.svg`,
  mic: `${A}/7c4d5.svg`,
  micWhite: `${A}/7c43f.svg`,
  chevronRight: `${A}/cde25.svg`,
  shirt: `${A}/da9ec.svg`,
  categoryHome: `${A}/44136.svg`,
  categoryBeauty: `${A}/f94f1.svg`,
  dumbbell: `${A}/0cb50.svg`,
  scan: `${A}/674a1.svg`,
  nextSparkles: `${A}/8492a.svg`,
  check: `${A}/9d8a4.svg`,
  checkAlt: `${A}/f98f7.svg`,
  micPurple: `${A}/fa1e3.svg`,
  sliders: `${A}/76d06.svg`,
  messages: `${A}/5560b.svg`,
  chooseCheck: `${A}/3eae4.svg`,
  checkoutCheck: `${A}/35120.svg`,
  checkoutShield: `${A}/ba489.svg`,
  approvalBlack: `${A}/908a1.png`,
  approvalNavy: `${A}/a4d0a.png`,
  approvalShorts: `${A}/8d9d1.png`,
  approvalShield: `${A}/762dc.svg`,
  orderBlack: `${A}/188c2.png`,
  orderNavy: `${A}/bb5a0.png`,
  orderShorts: `${A}/afd2f.png`,
  milestoneActive: `${A}/7d6f4.svg`,
  milestone: `${A}/34278.svg`,
  returnIcon: `${A}/1e73c.svg`,
  reorderIcon: `${A}/4f7be.svg`,
  supportIcon: `${A}/a9d3f.svg`,
  ordersActive: `${A}/ed145.svg`,
  visionAccent: `${A}/762fb.svg`,
  visionSpeech: `${A}/e675f.svg`,
  visionCheck: `${A}/06afc.svg`,
  visionMic: `${A}/8d29f.svg`,
  visionSearch: `${A}/17237.svg`,
  visionCart: `${A}/1ec91.svg`,
  visionShield: `${A}/286bc.svg`,
  visionMicWhite: `${A}/d6d0f.svg`,
};

function Interactive({ className = "", onClick, children, label }: { className?: string; onClick: () => void; children: ReactNode; label?: string }) {
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };
  return <div className={className} role="button" tabIndex={0} aria-label={label} onClick={onClick} onKeyDown={onKeyDown}>{children}</div>;
}

function Header({ step }: { step: number }) {
  return (
    <div className="app-header">
      <div className="brand"><b>meesho</b><span>SHOPPING ASSISTANT · DEMO</span></div>
      <div className="journey-position"><span>{String(step).padStart(2, "0")} / 12</span><img src={assets.bag} alt="" /></div>
    </div>
  );
}

const navItems = [
  ["Home", assets.home],
  ["Categories", assets.grid],
  ["Agent", assets.sparkles],
  ["Orders", assets.package],
  ["Account", assets.user],
];

function BottomNav({ initial = "Agent" }: { initial?: string }) {
  const [active, setActive] = useState(initial);
  return (
    <div className="bottom-nav">
      {navItems.map(([name, source]) => (
        <Interactive className={`nav-item ${active === name ? "active" : ""}`} onClick={() => setActive(name)} label={name} key={name}>
          <img src={name === "Home" && active === "Home" ? assets.homeActive : name === "Agent" && active !== "Agent" ? assets.sparklesInactive : name === "Orders" && active === "Orders" ? assets.ordersActive : source} alt="" />
          <span>{name}</span>
        </Interactive>
      ))}
    </div>
  );
}

function Companion({ mode, copy, stopped, onStop }: { mode: string; copy: string; stopped: boolean; onStop: () => void }) {
  return (
    <div className="companion">
      <img className="companion-photo" src={assets.aarav} alt="Aarav" />
      <img className="speech-tail" src={assets.speech} alt="" />
      <div className="speech-card">
        <div><b>{stopped ? "PAUSED" : mode}</b><Interactive className="stop-chip" onClick={onStop}>{stopped ? "Resume" : "× Stop"}</Interactive></div>
        <p>{stopped ? "Aarav is paused. Tap Resume when you are ready." : copy}</p>
      </div>
      <span className="aarav-id">Aarav · AI</span>
    </div>
  );
}

function Frame({ name, step, nav = "Agent", children }: { name: string; step: number; nav?: string; children: ReactNode }) {
  return (
    <section className="mobile-frame" data-frame-name={name}>
      <Header step={step} />
      <div className="screen-content">{children}</div>
      <BottomNav initial={nav} />
    </section>
  );
}

function HomeFrame() {
  const [listening, setListening] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [buddy, setBuddy] = useState("Aarav");
  return (
    <Frame name="01 Home · Meet your shopping companion" step={1} nav="Home">
      <div className="location"><img src={assets.pin} alt="" /><b>Deliver to Rahul · Bengaluru 560102</b><img src={assets.chevronDown} alt="" /></div>
      <Interactive className="search-bar" onClick={() => setListening(true)} label="Search"><img src={assets.search} alt="" /><span>Try T-shirts, kurtis, shoes...</span><img src={assets.mic} alt="" /></Interactive>
      <Companion mode={listening ? "LISTENING" : "READY TO HELP"} copy={listening ? "Haan bro, sun raha hoon. Gym ke liye tees?" : "Namaste! Bataiye, kya dhoondh rahe hain?"} stopped={stopped} onStop={() => setStopped(!stopped)} />
      <Interactive className={`voice-entry ${listening ? "listening" : ""}`} onClick={() => setListening(!listening)}>
        <img src={assets.micWhite} alt="" /><b>{listening ? "Listening… tap to finish" : "Bolo. Main dhoondh leta hoon."}</b>
      </Interactive>
      <Interactive className="personalisation" onClick={() => setBuddy(buddy === "Aarav" ? "Uncle" : "Aarav")}>
        <img src={assets.uncle} alt="" />
        <div><b>Your shopping buddy, your style</b><span>{buddy === "Aarav" ? "Aarav, your bro  ✓  ·  Prefer a friendly uncle?" : "Friendly uncle  ✓  ·  Switch back to Aarav?"}</span></div>
        <img src={assets.chevronRight} alt="" />
      </Interactive>
      <div className="category-row">
        {[["Fashion", assets.shirt], ["Home", assets.categoryHome], ["Beauty", assets.categoryBeauty], ["Fitness", assets.dumbbell]].map(([name, source]) => <Interactive className="category" onClick={() => undefined} key={name}><span><img src={source} alt="" /></span><b>{name}</b></Interactive>)}
      </div>
      <div className="fitness-offer">
        <div><b>BIG VALUE, EVERY DAY</b><strong>Gym-ready.<br />Budget-friendly.</strong><span>Dry-fit tees from ₹249 →</span></div>
        <img src={assets.blackHero} alt="Black dry-fit T-shirt" />
      </div>
    </Frame>
  );
}

function ListeningFrame() {
  const [running, setRunning] = useState(true);
  const bars = [7,12,21,15,27,18,9,23,28,14,20,11,25,17,7,19,26,12,20,8];
  return (
    <Frame name="02 Voice request · Listening" step={2}>
      <div className="heading"><b>Say it your way.</b><span>Hindi, English, or a little of both.</span></div>
      <Companion mode="LISTENING" copy="Haan bro, sun raha hoon. Gym ke liye tees?" stopped={!running} onStop={() => setRunning(!running)} />
      <Interactive className={`voice-capture ${running ? "is-live" : ""}`} onClick={() => setRunning(!running)}>
        <div className="capture-state"><b>● LIVE TRANSCRIPT</b><span>{running ? "00:06" : "PAUSED"}</span></div>
        <strong>Gym ke liye ₹700 ke andar 2 dry-fit T-shirts chahiye.</strong>
        <div className="waveform">{bars.map((height, index) => <i key={index} style={{ height }} />)}</div>
      </Interactive>
      <div className="intent-card">
        <div className="intent-title"><img src={assets.scan} alt="" /><b>Here’s what I heard</b></div>
        <div className="chips"><span>2 T-SHIRTS</span><span>DRY-FIT</span><span>GYM</span></div>
        <div className="budget"><span>Total budget for both tees</span><b>≤ ₹700</b></div>
        <p>No colour or size assumed. You stay in control.</p>
      </div>
      <Interactive className="next-action" onClick={() => setRunning(false)}><img src={assets.nextSparkles} alt="" /><b>Next: search products, check reviews, find value.</b></Interactive>
      <p className="disclaimer">Illustrative demo · no real purchase or payment</p>
    </Frame>
  );
}

function ProductCard({ selected, onClick, image, name, price, rating, meta, footer }: { selected: boolean; onClick: () => void; image: string; name: string; price: string; rating: string; meta: string; footer: string }) {
  return (
    <Interactive className={`product-card ${selected ? "selected" : ""}`} onClick={onClick}>
      <img src={image} alt={name} />
      <b>{name}</b>
      <div><strong>{price}</strong><span>★ {rating}</span></div>
      <small>{meta}</small><em>{footer}</em>
    </Interactive>
  );
}

function SearchFrame() {
  const [selected, setSelected] = useState("AeroFlex");
  const [stopped, setStopped] = useState(false);
  return (
    <Frame name="03 Execution · Understand search filter" step={3}>
      <div className="heading"><b>Less browsing. More doing.</b><span>Your request is now a shopping plan.</span></div>
      <Companion mode="THINKING → SEARCHING" copy="2 dry-fit tees, ₹700 ke andar. Main options filter kar raha hoon." stopped={stopped} onStop={() => setStopped(!stopped)} />
      <div className="execution-card">
        {[["UNDERSTANDS", "2 gym tees · dry-fit · total ≤ ₹700"], ["SEARCHES", "1,248 products found in men’s activewear"], ["FILTERS", "Price, fabric & rating → 24 eligible"], ["SHORTLISTS", "2 strongest options for review checks"]].map(([label, copy]) => <div key={label}><img src={assets.checkAlt} alt="" /><span><b>{label}</b><small>{copy}</small></span></div>)}
      </div>
      <div className="results-heading"><b>Shortlisted for you</b><span>BOTH WITHIN BUDGET</span></div>
      <div className="product-grid">
        <ProductCard selected={selected === "AeroFlex"} onClick={() => setSelected("AeroFlex")} image={assets.aeroBlack} name="AeroFlex Dry-fit Tee" price="₹249" rating="4.3" meta="1,480 reviews · ₹498 / 2" footer="Best value · 2 colours" />
        <ProductCard selected={selected === "FlexGo"} onClick={() => setSelected("FlexGo")} image={assets.aeroNavy} name="FlexGo Training Tee" price="₹279" rating="4.1" meta="950 reviews · ₹558 / 2" footer="Quick delivery" />
      </div>
    </Frame>
  );
}

function ReviewsFrame() {
  const [expanded, setExpanded] = useState(true);
  const [stopped, setStopped] = useState(false);
  return (
    <Frame name="04 Review intelligence · Evidence and tradeoffs" step={4}>
      <div className="heading"><b>Reviews, decoded.</b><span>Realistic demo evidence. Not just star ratings.</span></div>
      <Companion mode="ANALYSING" copy="AeroFlex value mein better hai. Fabric light hai, par fit thoda snug hai." stopped={stopped} onStop={() => setStopped(!stopped)} />
      <Interactive className="review-count" onClick={() => setExpanded(!expanded)}><img src={assets.messages} alt="" /><div><b>2,430 reviews analysed</b><span>AeroFlex 1,480 + FlexGo 950 · theme extraction</span></div></Interactive>
      <div className={`review-card ${expanded ? "" : "collapsed"}`}>
        <div><b>AeroFlex · voice summary</b><span>★ 4.3 / 5</span></div>
        <section><b>PROS</b><p>Lightweight &amp; quick-drying · 624 mentions<br />Good value for daily gym use · 412 mentions</p></section>
        <section><b>CONS</b><p>Snug around shoulders · 173 mentions<br />Thin fabric, not a premium cotton feel · 96</p></section>
        <section className="complaint"><b>COMMON COMPLAINT · FIT</b><p>“Usually M, L fit better for workouts.”</p><small>Size up if you prefer a relaxed fit. Returns: 7 days.</small></section>
      </div>
      <p className="tradeoff">Tradeoff: FlexGo feels thicker, but costs ₹60 more for two tees and has more slow-drying complaints.</p>
    </Frame>
  );
}

const comparisonRows = [
  ["Price", "₹249", "₹279"],
  ["Rating", "★ 4.3", "★ 4.1"],
  ["Reviews", "1,480", "950"],
  ["Delivery", "Tue, 06 Oct", "Mon, 05 Oct"],
  ["Returns", "7 days · free", "7 days · free"],
];

function CompareFrame() {
  const [chosen, setChosen] = useState(false);
  const [stopped, setStopped] = useState(false);
  return (
    <Frame name="05 Comparison · Recommended value" step={5}>
      <div className="heading"><b>The better buy, explained.</b><span>Compare the things that actually matter.</span></div>
      <Companion mode="ANALYSING" copy="AeroFlex ke 2 tees ₹498 mein. Better rating, easy returns, ₹202 spare." stopped={stopped} onStop={() => setStopped(!stopped)} />
      <div className="comparison">
        <div className="compare-head"><div><b>At a glance</b><span>Price per tee</span></div><div><img src={assets.compareBlack} alt="" /><b>AeroFlex ✓</b><small>BEST VALUE</small></div><div><img src={assets.compareNavy} alt="" /><b>FlexGo</b><small>THICKER FABRIC</small></div></div>
        {comparisonRows.map(([label, first, second]) => <div className="compare-row" key={label}><span>{label}</span><b>{first}</b><span>{second}</span></div>)}
      </div>
      <div className="recommendation"><b>Recommended: AeroFlex</b><span>₹60 less for two · stronger review evidence. Choose L for a more relaxed gym fit.</span></div>
      <Interactive className={`primary-action ${chosen ? "success" : ""}`} onClick={() => setChosen(!chosen)}><img src={assets.chooseCheck} alt="" /><b>{chosen ? "AeroFlex selected ✓" : "Choose AeroFlex · ₹498 for 2"}</b></Interactive>
    </Frame>
  );
}

function AddFrame() {
  const [size, setSize] = useState("L");
  const [added, setAdded] = useState(true);
  const [stopped, setStopped] = useState(false);
  return (
    <Frame name="06 Add to cart · Select black and large" step={6}>
      <div className="heading"><b>Said it. Added it.</b><span>Attributes selected before the cart action.</span></div>
      <Companion mode="ACTING" copy={`Black, size ${size} select kar diya. Navy L ke saath aapke 2 tees ready.`} stopped={stopped} onStop={() => setStopped(!stopped)} />
      <div className="user-request"><img src={assets.micPurple} alt="" /><b>Black wala L mein cart mein daal do.</b></div>
      <div className="selected-product">
        <div className="main-product"><img src={assets.aeroBlackLarge} alt="" /><div><b>AeroFlex Dry-fit Tee</b><strong>₹249</strong><span>● BLACK ✓ <small>Qty 1</small></span><div className="sizes">{["M","L","XL"].map(item => <Interactive className={size === item ? "active" : ""} onClick={() => setSize(item)} key={item}>{item}</Interactive>)}</div></div></div>
        <div className="second-product"><img src={assets.aeroNavySmall} alt="" /><span>Also in your set: Navy · L · Qty 1 · ₹249</span><b>Edit</b></div>
      </div>
      <Interactive className={`receipt ${added ? "" : "muted"}`} onClick={() => setAdded(!added)}><img src={assets.check} alt="" /><div><b>{added ? "Added to cart · 2 dry-fit T-shirts" : "Tap to add both T-shirts"}</b><span>Selected Black / {size} / 1 · Navy / L / 1</span></div></Interactive>
      <div className="subtotal"><b>T-shirt subtotal</b><strong>₹498</strong></div>
      <p className="note">No order placed. Colour, size and quantity stay editable.</p>
    </Frame>
  );
}

function ShortsFrame() {
  const [added, setAdded] = useState(true);
  const [stopped, setStopped] = useState(false);
  return (
    <Frame name="07 Matching shorts · Search and add" step={7}>
      <div className="heading"><b>A gym set, sorted.</b><span>Matching style. No random upsell.</span></div>
      <Companion mode="SEARCHING → ACTING" copy="Black shorts ₹249 mein mil gaye. Pockets bhi hain. Size L add kiya." stopped={stopped} onStop={() => setStopped(!stopped)} />
      <div className="user-request"><img src={assets.micPurple} alt="" /><b>Matching shorts bhi add kar do.</b></div>
      <div className="shorts-card">
        <div className="search-summary"><span>86 searched → 8 matched → 1 selected</span><img src={assets.sliders} alt="" /></div>
        <div className="shorts-product"><img src={assets.shorts} alt="" /><div><b>AeroFlex Gym Shorts</b><span>Black · L · Qty 1 · ★ 4.2 (620)</span><strong>₹249 <small>BEST VALUE</small></strong></div></div>
        <p>Same black shade · breathable · 2 pockets. ₹50 less than the next matching option.</p>
      </div>
      <Interactive className={`receipt ${added ? "" : "muted"}`} onClick={() => setAdded(!added)}><img src={assets.check} alt="" /><div><b>{added ? "Matching shorts added" : "Matching shorts removed"}</b><span>Black / L / Qty 1 · free 7-day returns</span></div></Interactive>
      <div className="budget-card"><div><span>2 tees + matching shorts</span><b>₹747</b></div><div><span>Found coupon: FIT49</span><b>−₹49</b></div><strong>₹698 after coupon · full set under ₹700</strong></div>
    </Frame>
  );
}

type CartItem = { id: string; name: string; detail: string; image: string; qty: number };

function CartFrame() {
  const [stopped, setStopped] = useState(false);
  const [reviewed, setReviewed] = useState(false);
  const [items, setItems] = useState<CartItem[]>([
    { id: "black", name: "AeroFlex Tee", detail: "Black · Dry-fit", image: assets.cartBlack, qty: 1 },
    { id: "navy", name: "AeroFlex Tee", detail: "Navy · Dry-fit", image: assets.cartNavy, qty: 1 },
    { id: "shorts", name: "AeroFlex Shorts", detail: "Black · Dry-fit", image: assets.cartShorts, qty: 1 },
  ]);
  const changeQty = (id: string, amount: number) => setItems(current => current.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + amount) } : item));
  return (
    <Frame name="08 Cart management · Editable action receipt" step={8}>
      <div className="heading"><b>Your cart. Your call.</b></div>
      <Companion mode="ACTING" copy="Extra navy quantity hata di. Ab 2 tees aur 1 shorts. Aap edit kar sakte ho." stopped={stopped} onStop={() => setStopped(!stopped)} />
      <div className="editable-cart">
        <div className="cart-heading"><b>{items.length} items in your gym set</b><span>+ Add item</span></div>
        {items.map(item => <div className="cart-item" key={item.id}><img src={item.image} alt="" /><div><div><b>{item.name}</b><strong>₹249</strong></div><span>{item.detail} · Qty {item.qty}</span><div className="item-actions"><span>Size L ⌄</span><div><Interactive onClick={() => changeQty(item.id, -1)}>−</Interactive><b>{item.qty}</b><Interactive onClick={() => changeQty(item.id, 1)}>+</Interactive></div><Interactive onClick={() => setItems(current => current.filter(currentItem => currentItem.id !== item.id))}>Remove</Interactive></div></div></div>)}
      </div>
      <div className="receipt"><img src={assets.check} alt="" /><div><b>Change executed: Navy quantity 2 → 1</b><span>Duplicate removed · subtotal ₹996 → ₹747</span></div></div>
      <Interactive className={`primary-action review-button ${reviewed ? "success" : ""}`} onClick={() => setReviewed(!reviewed)}><b>{reviewed ? "Checkout reviewed ✓" : "Review checkout · ₹698"}</b></Interactive>
      <p className="disclaimer">₹747 − FIT49 coupon ₹49 · delivery free</p>
    </Frame>
  );
}

function CheckoutFrame() {
  const [ready, setReady] = useState(false);
  const [stopped, setStopped] = useState(false);
  const checks = [
    ["Address verified · Rahul Sharma", "21, 2nd Cross, HSR Layout, Bengaluru 560102"],
    ["Price checked · 3 items × ₹249", "Black tee L + Navy tee L + Black shorts L"],
    ["Coupon applied · FIT49", "₹49 off ₹747 · eligible cart above ₹699"],
    ["Delivery checked · Tue, 06 Oct", "Free delivery · all 3 items together"],
    ["Payment ready · UPI ••••42", "No debit yet. Waiting for your approval."],
  ];
  return (
    <Frame name="09 Checkout · Address price coupon delivery payment" step={9}>
      <div className="heading"><b>Every detail, checked.</b></div>
      <Companion mode="ACTING" copy="Address, coupon aur delivery check ho gaye. Payment aapke YES ke baad hi." stopped={stopped} onStop={() => setStopped(!stopped)} />
      <div className="checkout-checks">
        {checks.map(([title, detail]) => <div key={title}><img src={assets.checkoutCheck} alt="" /><span><b>{title}</b><small>{detail}</small></span></div>)}
      </div>
      <div className="price-breakdown">
        <div><span>Product total (3 items)</span><b>₹747</b></div>
        <div><span>Coupon · FIT49</span><b>−₹49</b></div>
        <div><span>Delivery fee</span><b>FREE</b></div>
        <div><strong>Total to pay</strong><strong>₹698</strong></div>
      </div>
      <Interactive className={`primary-action ${ready ? "success" : ""}`} onClick={() => setReady(!ready)}><img src={assets.checkoutShield} alt="" /><b>{ready ? "Approval is ready ✓" : "Continue to your approval"}</b></Interactive>
      <p className="disclaimer">Illustrative demo · no real purchase or payment</p>
    </Frame>
  );
}

function ProductPreview() {
  return (
    <div className="product-preview">
      <img src={assets.approvalBlack} alt="Black tee" />
      <img src={assets.approvalNavy} alt="Navy tee" />
      <img src={assets.approvalShorts} alt="Black shorts" />
      <div><b>2 tees + 1 shorts</b><span>All size L · Qty 1 each</span></div>
    </div>
  );
}

function ApprovalFrame() {
  const [decision, setDecision] = useState<"none" | "yes" | "later">("none");
  const [stopped, setStopped] = useState(false);
  return (
    <Frame name="10 Human control · Explicit order approval" step={10}>
      <div className="heading"><b>The last word is yours.</b></div>
      <Companion mode="CONFIRMING" copy="Sab ready hai, bro. Aap YES bologe tabhi order place hoga." stopped={stopped} onStop={() => setStopped(!stopped)} />
      <div className={`approval-gate ${decision === "yes" ? "approved" : ""}`}>
        <div><img src={assets.approvalShield} alt="" /><b>YOUR APPROVAL REQUIRED</b></div>
        <strong>₹698. Place order?</strong>
        <span>3 items · UPI ••••42 · delivery Tue, 06 Oct</span>
        <div className="approval-choices">
          <Interactive className="yes" onClick={() => setDecision("yes")}>YES</Interactive>
          <Interactive onClick={() => setDecision("later")}>NOT YET</Interactive>
        </div>
        <small>{decision === "yes" ? "YES received. Demo order approved." : decision === "later" ? "Order paused. You stay in control." : "No order placed. No payment taken."}</small>
      </div>
      <div className="final-preview"><ProductPreview /><p>Rahul Sharma · 21, 2nd Cross, HSR Layout, Bengaluru 560102</p><span>₹747 − ₹49 FIT49 · free delivery · 7-day returns</span></div>
      <p className="disclaimer">Illustrative demo · no real purchase or payment</p>
    </Frame>
  );
}

function SuccessFrame() {
  const [action, setAction] = useState("");
  const [stopped, setStopped] = useState(false);
  return (
    <Frame name="11 Order tracking · Approved and done" step={11} nav="Orders">
      <div className="heading"><b>You said YES. It’s done.</b></div>
      <Companion mode="DONE" copy="Order place ho gaya! Tuesday tak gym set aa jayega. Tracking yahin hai." stopped={stopped} onStop={() => setStopped(!stopped)} />
      <div className="order-summary">
        <div className="approval-receipt"><b>✓ YES received → Order placed (demo)</b><span>9:42 AM</span></div>
        <small>Demo order #MS-DEMO-1042</small>
        <div className="ordered-products"><img src={assets.orderBlack} alt="" /><img src={assets.orderNavy} alt="" /><img src={assets.orderShorts} alt="" /><span>AeroFlex: Black tee, Navy tee, Black shorts. L · Qty 1 each.</span></div>
        <div className="paid-row"><b>Paid · UPI ••••42</b><strong>₹698</strong></div>
        <small>₹747 − ₹49 FIT49 · delivery free</small>
        <p>Rahul Sharma · 21, 2nd Cross, HSR Layout, Bengaluru 560102</p>
      </div>
      <div className="tracking-card">
        <b>Arriving Tue, 06 Oct</b>
        {[["Order placed", "03 Oct · 9:42 AM", assets.milestoneActive], ["Packing → Shipping", "Expected 03–04 Oct", assets.milestone], ["Out for delivery → Delivered", "Expected Tue, 06 Oct", assets.milestone]].map(([title, date, icon], index) => <div key={title}><img src={icon} alt="" /><span className={index === 0 ? "active" : ""}>{title}</span><small>{date}</small></div>)}
      </div>
      <div className="order-actions">
        {[["Return", assets.returnIcon], ["Reorder", assets.reorderIcon], ["Support", assets.supportIcon]].map(([label, icon]) => <Interactive className={action === label ? "active" : ""} onClick={() => setAction(label)} key={label}><img src={icon} alt="" /><b>{label}</b></Interactive>)}
      </div>
      <p className="disclaimer">{action ? `${action} selected · illustrative order only` : "7-day returns after delivery · illustrative order only"}</p>
    </Frame>
  );
}

function VisionFrame() {
  const [speaking, setSpeaking] = useState(false);
  return (
    <Frame name="12 Vision · You speak Meesho acts" step={12}>
      <div className="vision-card">
        <img className="vision-accent" src={assets.visionAccent} alt="" />
        <b className="vision-kicker">YOUR PERSONAL DIGITAL SHOPKEEPER</b>
        <strong>YOU SPEAK.<br />MEESHO ACTS.</strong>
        <p>From “chahiye” to checkout.<br />A little help. A lot done.</p>
        <img className="vision-aarav" src={assets.aarav} alt="Aarav" />
        <img className="vision-tail" src={assets.visionSpeech} alt="" />
        <div className="vision-speech"><b>{speaking ? "Sun raha hoon. Aap bolo." : "Aap bolo. Main kaam karta hoon."}</b><Interactive onClick={() => setSpeaking(!speaking)}>{speaking ? "Listening…" : "× Stop"}</Interactive></div>
        <div className="vision-receipt"><div><img src={assets.visionCheck} alt="" /><b>Gym set sorted</b></div><span>2 tees + shorts · ₹698<br />Only after your YES.</span></div>
      </div>
      <div className="agentic-journey">
        <b>Not a chatbot. A do-it-for-you buddy.</b>
        <div>{[["You speak", assets.visionMic], ["I find", assets.visionSearch], ["I prepare", assets.visionCart], ["You approve", assets.visionShield]].map(([label, icon]) => <span key={label}><img src={icon} alt="" /><b>{label}</b></span>)}</div>
      </div>
      <Interactive className="primary-action" onClick={() => setSpeaking(!speaking)}><img src={assets.visionMicWhite} alt="" /><b>Shopping ka naya tareeka</b></Interactive>
      <p className="disclaimer">Illustrative demo · no real purchase or payment</p>
    </Frame>
  );
}

export default function App() {
  return (
    <div className="frames-canvas">
      <HomeFrame />
      <ListeningFrame />
      <SearchFrame />
      <ReviewsFrame />
      <CompareFrame />
      <AddFrame />
      <ShortsFrame />
      <CartFrame />
      <CheckoutFrame />
      <ApprovalFrame />
      <SuccessFrame />
      <VisionFrame />
    </div>
  );
}
