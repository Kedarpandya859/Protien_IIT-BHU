import { useEffect, useRef, useState } from 'react'

// ─── Brand Tokens ────────────────────────────────────────────
const P  = '#9F2089'   // Meesho Purple
const PL = '#F5E8F3'   // Light purple bg
const PB = '#DDB8D5'   // Purple border
const G  = '#2E7D32'   // Green
const GS = '#F59E0B'   // Gold star
const DT = '#1A1A1A'   // Dark text
const ST = '#666666'   // Secondary text
const MT = '#999999'   // Muted text
const BG = '#F2F2F2'   // Page bg

// ─── Types ───────────────────────────────────────────────────
type Screen = 'listing' | 'compare' | 'detail' | 'reviews' | 'ai' | 'theme' | 'success'
type Lang   = 'en' | 'hi' | 'hinglish' | 'bn' | 'ta' | 'te' | 'mr'

interface Product { id: number; name: string; short: string; price: number; mrp: number; rating: number; reviews: number; img: string; verifiedPlus?: boolean }

// ─── Data ────────────────────────────────────────────────────
const PRODUCTS: Product[] = [
  { id:1, name:'HRX Unisex Cotton Baseball Cap',    short:'HRX Active',       price:399, mrp:999,  rating:4.1, reviews:12843, img:'https://images.unsplash.com/photo-1523380744952-b7e00e6e2ffa?w=400&h=400&fit=crop&auto=format' },
  { id:2, name:'Roadster Embroidered Casual Cap',   short:'Roadster Core',    price:299, mrp:899,  rating:4.0, reviews:8421,  img:'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&h=400&fit=crop&auto=format' },
  { id:3, name:'Puma Essentials Unisex Sports Cap', short:'Puma Essentials', price:599, mrp:1299, rating:4.2, reviews:6732,  img:'https://images.unsplash.com/photo-1691256676359-20e5c6d4bc92?w=400&h=400&fit=crop&auto=format', verifiedPlus:true },
  { id:4, name:'WROGN Colourblocked Trucker Cap',   short:'WROGN Trucker',    price:449, mrp:1099, rating:4.1, reviews:5219,  img:'https://images.unsplash.com/photo-1678721938524-1a3ee398de2a?w=400&h=400&fit=crop&auto=format' },
  { id:5, name:'Adidas Aeroready Running Cap',       short:'Adidas Aeroready', price:799, mrp:1599, rating:4.3, reviews:9876,  img:'https://images.unsplash.com/photo-1645266729222-17cd32e06fd0?w=400&h=400&fit=crop&auto=format' },
  { id:6, name:'Allen Solly Solid Adjustable Cap',   short:'Allen Solly',      price:349, mrp:999,  rating:3.9, reviews:4321,  img:'https://images.unsplash.com/photo-1653704841996-c2ed854aedd8?w=400&h=400&fit=crop&auto=format' },
  { id:7, name:'Wipro Garnet LED Study Lamp',         short:'Wipro Garnet',     price:699, mrp:1499, rating:4.4, reviews:3568,  img:'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop&auto=format', verifiedPlus:true },
]

const SPECS: Record<number, Record<string,string>> = {
  1: { price:'₹399', mrp:'₹999', discount:'60% OFF', rating:'4.1 ★', reviews:'12,843', warranty:'3 Months', returns:'7 Days', replacement:'7 Days', sellerRating:'4.3 ★', delivery:'Free', material:'Cotton twill', fit:'Regular', closure:'Adjustable strap', brim:'Curved', ventilation:'6 eyelets', washable:'Hand wash', uv:'UPF 30', weight:'82g', comfort:'4.1 ★', fitRating:'4.0 ★', breathability:'3.9 ★', style:'4.2 ★', colorQuality:'4.0 ★', durability:'4.0 ★', complaintRate:'11%', posReviews:'76%', complaint:'Runs slightly small', bestFor:'Daily wear' },
  2: { price:'₹299', mrp:'₹899', discount:'67% OFF', rating:'4.0 ★', reviews:'8,421', warranty:'3 Months', returns:'7 Days', replacement:'7 Days', sellerRating:'4.2 ★', delivery:'Free', material:'Cotton blend', fit:'Relaxed', closure:'Metal buckle', brim:'Curved', ventilation:'6 eyelets', washable:'Hand wash', uv:'UPF 25', weight:'78g', comfort:'4.2 ★', fitRating:'4.1 ★', breathability:'4.0 ★', style:'4.0 ★', colorQuality:'3.9 ★', durability:'3.9 ★', complaintRate:'12%', posReviews:'74%', complaint:'Colour fades', bestFor:'Budget buyers' },
  3: { price:'₹599', mrp:'₹1,299', discount:'54% OFF', rating:'4.2 ★', reviews:'6,732', warranty:'6 Months', returns:'7 Days', replacement:'7 Days', sellerRating:'4.4 ★', delivery:'Free', material:'Polyester', fit:'Sport', closure:'Hook & loop', brim:'Curved', ventilation:'Mesh panels', washable:'Machine wash', uv:'UPF 40', weight:'68g', comfort:'4.4 ★', fitRating:'4.3 ★', breathability:'4.5 ★', style:'4.2 ★', colorQuality:'4.3 ★', durability:'4.2 ★', complaintRate:'8%', posReviews:'82%', complaint:'Logo feels stiff', bestFor:'Sports & travel' },
  4: { price:'₹449', mrp:'₹1,099', discount:'59% OFF', rating:'4.1 ★', reviews:'5,219', warranty:'3 Months', returns:'7 Days', replacement:'7 Days', sellerRating:'4.1 ★', delivery:'Free', material:'Cotton + mesh', fit:'High crown', closure:'Snapback', brim:'Flat', ventilation:'Mesh back', washable:'Hand wash', uv:'UPF 25', weight:'91g', comfort:'3.9 ★', fitRating:'4.0 ★', breathability:'4.4 ★', style:'4.4 ★', colorQuality:'4.1 ★', durability:'3.8 ★', complaintRate:'13%', posReviews:'72%', complaint:'Crown feels tall', bestFor:'Street style' },
  5: { price:'₹799', mrp:'₹1,599', discount:'50% OFF', rating:'4.3 ★', reviews:'9,876', warranty:'6 Months', returns:'7 Days', replacement:'7 Days', sellerRating:'4.5 ★', delivery:'Free', material:'Recycled polyester', fit:'Performance', closure:'Hook & loop', brim:'Curved', ventilation:'Laser perforated', washable:'Machine wash', uv:'UPF 50', weight:'62g', comfort:'4.5 ★', fitRating:'4.4 ★', breathability:'4.6 ★', style:'4.3 ★', colorQuality:'4.4 ★', durability:'4.4 ★', complaintRate:'6%', posReviews:'86%', complaint:'Premium price', bestFor:'Running' },
  6: { price:'₹349', mrp:'₹999', discount:'65% OFF', rating:'3.9 ★', reviews:'4,321', warranty:'3 Months', returns:'7 Days', replacement:'7 Days', sellerRating:'3.9 ★', delivery:'Free', material:'Cotton blend', fit:'Regular', closure:'Adjustable strap', brim:'Curved', ventilation:'6 eyelets', washable:'Hand wash', uv:'UPF 20', weight:'85g', comfort:'3.9 ★', fitRating:'3.8 ★', breathability:'3.8 ★', style:'4.0 ★', colorQuality:'3.7 ★', durability:'3.7 ★', complaintRate:'17%', posReviews:'65%', complaint:'Loose stitching', bestFor:'Occasional wear' },
  7: { price:'₹699', mrp:'₹1,499', discount:'53% OFF', rating:'4.4 ★', reviews:'3,568', warranty:'1 Year', returns:'7 Days', replacement:'7 Days', sellerRating:'4.5 ★', delivery:'Free', material:'ABS plastic', fit:'Desk mount', closure:'Touch control', brim:'Flexible neck', ventilation:'Heat vents', washable:'Wipe clean', uv:'Flicker-free LED', weight:'620g', comfort:'4.4 ★', fitRating:'4.5 ★', breathability:'4.3 ★', style:'4.5 ★', colorQuality:'4.4 ★', durability:'4.3 ★', complaintRate:'6%', posReviews:'87%', complaint:'Short power cable', bestFor:'Study desks' },
}

const fmt = (n: number) => n.toLocaleString('en-IN')
const disc = (p: number, m: number) => Math.round((1 - p/m)*100)

type VoiceLanguage = 'en-IN' | 'hi-IN'

interface RecognitionResultLike {
  0: { transcript: string }
}

interface RecognitionEventLike {
  results: ArrayLike<RecognitionResultLike>
}

interface BrowserSpeechRecognition {
  lang: string
  interimResults: boolean
  maxAlternatives: number
  onresult: ((event: RecognitionEventLike) => void) | null
  onerror: ((event: { error: string }) => void) | null
  onend: (() => void) | null
  start: () => void
  stop: () => void
  abort: () => void
}

type SpeechWindow = Window & {
  SpeechRecognition?: new () => BrowserSpeechRecognition
  webkitSpeechRecognition?: new () => BrowserSpeechRecognition
}

// ─── SVG Icons ───────────────────────────────────────────────
function IcBack()   { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg> }
function IcSearch() { return <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg> }
function IcHeart()  { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> }
function IcCart()   { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> }
function IcFilter() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg> }
function IcChevD()  { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg> }
function IcX()      { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> }
function IcPlus()   { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> }
function IcShare()  { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg> }
function IcSave()   { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> }
function IcGlobe()  { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={P} strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> }
function IcInfo()   { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={MT} strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg> }
function IcCheck({ c = G }: { c?: string }) { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg> }
function IcStar()   { return <svg width="11" height="11" viewBox="0 0 24 24" fill={GS} stroke={GS} strokeWidth="0.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> }
function IcSparkle() { return <svg width="17" height="17" viewBox="0 0 24 24" fill={P} stroke="none"><path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"/><circle cx="19" cy="4" r="1.5" fill={P} opacity="0.5"/><circle cx="5" cy="18" r="1" fill={P} opacity="0.4"/></svg> }
function IcTruck()  { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> }
function IcShield() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={P} strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> }
function IcReturn() { return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4"/></svg> }
function IcThumb()  { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg> }
function IcVolume({ playing = false }: { playing?: boolean }) { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>{playing ? <><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18 5a9 9 0 0 1 0 14"/></> : <path d="M15 9a4 4 0 0 1 0 6"/>}</svg> }
function IcHome({ a }: { a: boolean }) { return <svg width="22" height="22" viewBox="0 0 24 24" fill={a ? P : 'none'} stroke={a ? P : ST} strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> }
function IcGrid({ a }: { a: boolean }) { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a ? P : ST} strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> }
function IcOrders({ a }: { a: boolean }) { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a ? P : ST} strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> }
function IcUser({ a }: { a: boolean }) { return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={a ? P : ST} strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> }

// ─── Shared Components ───────────────────────────────────────
function TopNav({ onBack, title, cartBadge = 2 }: { onBack?: () => void; title?: string; cartBadge?: number }) {
  return (
    <div className="sticky top-0 z-40 flex items-center gap-2 px-3 py-2.5" style={{ backgroundColor: P }}>
      {onBack
        ? <button onClick={onBack} className="text-white p-1 flex-shrink-0"><IcBack /></button>
        : <span className="text-white font-black text-xl tracking-tight flex-shrink-0" style={{ fontFamily: "'Nunito', sans-serif" }}>meesho</span>
      }
      {title
        ? <span className="text-white font-bold text-[15px] flex-1 truncate">{title}</span>
        : (
          <div className="flex-1 flex items-center bg-white rounded-lg px-3 py-1.5 gap-2">
            <span className="text-gray-400"><IcSearch /></span>
            <span className="text-sm text-gray-400">Search products, brands & more</span>
          </div>
        )
      }
      {!onBack && (
        <div className="flex items-center gap-1">
          <button className="text-white p-1.5"><IcHeart /></button>
          <div className="relative">
            <button className="text-white p-1.5"><IcCart /></button>
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] font-black text-white flex items-center justify-center" style={{ backgroundColor: '#FF4444' }}>{cartBadge}</span>
          </div>
        </div>
      )}
      {onBack && (
        <div className="flex gap-1">
          <button className="text-white p-1.5"><IcShare /></button>
          <button className="text-white p-1.5 relative"><IcCart /><span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] font-black text-white flex items-center justify-center" style={{ backgroundColor: '#FF4444' }}>{cartBadge}</span></button>
        </div>
      )}
    </div>
  )
}

function BottomNav({ active, onNav }: { active: string; onNav: (s: Screen) => void }) {
  const tabs = [
    { k: 'home',       label: 'Home',       icon: (a: boolean) => <IcHome a={a} />,   sc: 'listing' as Screen },
    { k: 'categories', label: 'Categories', icon: (a: boolean) => <IcGrid a={a} />,   sc: 'listing' as Screen },
    { k: 'orders',     label: 'Orders',     icon: (a: boolean) => <IcOrders a={a} />, sc: 'listing' as Screen },
    { k: 'account',    label: 'Account',    icon: (a: boolean) => <IcUser a={a} />,   sc: 'listing' as Screen },
  ]
  return (
    <div className="flex bg-white border-t" style={{ borderColor: '#E5E5E5' }}>
      {tabs.map(t => {
        const active2 = active === t.k
        return (
          <button key={t.k} onClick={() => onNav(t.sc)} className="flex-1 flex flex-col items-center py-2 gap-0.5">
            {t.icon(active2)}
            <span className="text-[10px] font-bold" style={{ color: active2 ? P : ST }}>{t.label}</span>
          </button>
        )
      })}
    </div>
  )
}

function StarRating({ rating, size = 11 }: { rating: number; size?: number }) {
  const full = Math.floor(rating), empty = 5 - full
  return (
    <span>
      {'★'.repeat(full).split('').map((_, i) => <span key={i} style={{ color: GS, fontSize: size }}>★</span>)}
      {'★'.repeat(empty).split('').map((_, i) => <span key={i} style={{ color: '#DDD', fontSize: size }}>★</span>)}
    </span>
  )
}

function RatingBadge({ val }: { val: number }) {
  const c = val >= 4 ? G : val >= 3.5 ? GS : '#EF4444'
  return (
    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-white font-bold text-xs" style={{ backgroundColor: c }}>
      {val} <IcStar />
    </span>
  )
}

// ─── Screen 1: Product Listing ───────────────────────────────
function ListingScreen({ compareIds, onToggle, onOpenProduct, onVoiceAgent }: {
  compareIds: number[]
  onToggle: (p: Product) => void
  onOpenProduct: (id: number) => void
  onVoiceAgent: () => void
}) {
  const [search] = useState('caps for men')

  return (
    <div style={{ backgroundColor: BG, minHeight: '100%' }}>
      <TopNav />
      {/* Search result header */}
      <div className="bg-white px-3 py-2 flex items-center gap-2" style={{ borderBottom: `1px solid #EEE` }}>
        <div className="flex-1 flex items-center bg-gray-100 rounded-lg px-3 py-1.5 gap-2">
          <span className="text-gray-400"><IcSearch /></span>
          <span className="text-sm font-semibold" style={{ color: DT }}>{search}</span>
        </div>
        <button className="flex items-center gap-1 border rounded-lg px-2.5 py-1.5 text-xs font-bold" style={{ borderColor: PB, color: P, backgroundColor: PL }}>
          <IcFilter /> Filter
        </button>
      </div>

      {/* Filter chips */}
      <div className="bg-white flex gap-2 px-3 py-2 overflow-x-auto scrollbar-hide" style={{ borderBottom: `1px solid #EEE` }}>
        {['Price ↕', 'Rating', '4★ & above', 'Brand', 'Material', 'Under ₹500'].map(f => (
          <button key={f} className="flex-shrink-0 flex items-center gap-0.5 border rounded-full px-3 py-1 text-xs font-semibold" style={{ borderColor: '#DDD', color: ST }}>
            {f} <IcChevD />
          </button>
        ))}
      </div>

      <div className="mx-3 mt-3 flex items-center gap-3 rounded-2xl px-3 py-2.5" style={{ background: `linear-gradient(110deg, ${PL}, #FFF)`, border: `1px solid ${PB}` }}>
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-white" style={{ backgroundColor: P }}>🎙</div>
        <div className="min-w-0 flex-1">
          <p className="m-0 text-xs font-black" style={{ color: DT }}>Shop by speaking</p>
          <p className="m-0 text-[10px]" style={{ color: ST }}>Ask for a product in English or Hindi</p>
        </div>
        <button onClick={onVoiceAgent} className="rounded-xl px-3 py-2 text-xs font-black text-white" style={{ backgroundColor: P }}>Talk now</button>
      </div>

      <section className="mx-3 mt-3 rounded-2xl bg-white p-3" style={{ border: '1px solid #EEE' }}>
        <p className="mb-2 text-xs font-black" style={{ color: DT }}>Explore the wireframes</p>
        <div className="grid grid-cols-2 gap-2">
          <a href="/prototypes/voice-shopping/index.html" className="rounded-xl p-2.5 text-[11px] font-bold no-underline" style={{ color: P, backgroundColor: PL }}>
            Agentic voice shopping <span className="block text-[9px] font-medium" style={{ color: ST }}>12-screen journey →</span>
          </a>
          <a href="/prototypes/onboarding/index.html" className="rounded-xl p-2.5 text-[11px] font-bold no-underline" style={{ color: P, backgroundColor: PL }}>
            Personalized onboarding <span className="block text-[9px] font-medium" style={{ color: ST }}>Setup + shopping home →</span>
          </a>
        </div>
      </section>

      {/* Title bar */}
      <div className="bg-white px-3 py-2" style={{ borderBottom: `1px solid #EEE` }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs" style={{ color: ST }}>Showing <span className="font-bold" style={{ color: DT }}>{PRODUCTS.length}</span> results for</p>
            <h2 className="font-black text-sm" style={{ color: DT }}>Caps & Hats</h2>
          </div>
          <div className="flex items-center gap-1.5 text-xs" style={{ color: P, fontWeight: 700 }}>
            <span>⊞</span> Sort
          </div>
        </div>
      </div>

      {/* Compare hint banner */}
      {compareIds.length === 0 && (
        <div className="mx-3 mt-3 rounded-xl px-3 py-2.5 flex items-center gap-2" style={{ background: `linear-gradient(135deg, ${PL} 0%, #FEF3FC 100%)`, border: `1px solid ${PB}` }}>
          <IcSparkle />
          <div className="flex-1">
            <p className="text-xs font-black" style={{ color: P }}>New: Meesho Compare</p>
            <p className="text-xs" style={{ color: ST }}>Tap "+ Compare" on products to compare side by side</p>
          </div>
        </div>
      )}

      {/* Product grid */}
      <div className="grid grid-cols-2 gap-3 p-3 pb-4">
        {PRODUCTS.map(p => <ProductCard key={p.id} p={p} compareIds={compareIds} onToggle={onToggle} onTap={() => onOpenProduct(p.id)} />)}
      </div>
    </div>
  )
}

function ProductCard({ p, compareIds, onToggle, onTap }: { p: Product; compareIds: number[]; onToggle: (p: Product) => void; onTap: () => void }) {
  const sel = compareIds.includes(p.id)
  const d   = disc(p.price, p.mrp)
  return (
    <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
      <div className="relative cursor-pointer" onClick={onTap}>
        <img src={p.img} alt={p.name} className="w-full object-cover bg-gray-100" style={{ height: 148 }} />
        <div className="absolute top-2 left-2 text-white text-[10px] font-black px-1.5 py-0.5 rounded-md" style={{ backgroundColor: '#22C55E' }}>{d}% OFF</div>
        {p.verifiedPlus && (
          <div className="absolute top-9 left-2 flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-black text-white" style={{ backgroundColor: P, boxShadow: '0 2px 6px rgba(0,0,0,0.18)' }}>
            <IcCheck c="white" /> Verified +
          </div>
        )}
        <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} onClick={e => e.stopPropagation()}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#CCC" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
      </div>
      <div className="px-2.5 pt-2 cursor-pointer" onClick={onTap}>
        <p className="text-xs font-semibold leading-tight line-clamp-2" style={{ color: DT }}>{p.name}</p>
        <div className="flex items-center gap-1.5 mt-1">
          <RatingBadge val={p.rating} />
          <span className="text-[10px]" style={{ color: ST }}>{fmt(p.reviews)}</span>
        </div>
        <div className="mt-1.5 flex items-baseline gap-1.5">
          <span className="font-black text-[17px]" style={{ color: DT }}>₹{fmt(p.price)}</span>
          <span className="text-xs line-through" style={{ color: MT }}>₹{fmt(p.mrp)}</span>
        </div>
        <div className="flex items-center gap-1 mt-0.5 mb-2">
          <IcTruck /><span className="text-[10px] font-bold" style={{ color: G }}>Free Delivery</span>
        </div>
      </div>
      <div className="px-2.5 pb-2.5">
        <button
          onClick={e => { e.stopPropagation(); onToggle(p) }}
          className="w-full py-1.5 rounded-lg flex items-center justify-center gap-1 text-[11px] font-black border transition-all"
          style={{ backgroundColor: sel ? PL : 'white', borderColor: sel ? P : '#DDDDDD', color: sel ? P : ST }}>
          {sel ? <><IcCheck c={P} /> Added to Compare</> : <><IcPlus /> Add to Compare</>}
        </button>
      </div>
    </div>
  )
}

// ─── Compare Tray (sticky) ────────────────────────────────────
function CompareTray({ compareIds, onRemove, onCompare, onClear }: {
  compareIds: number[]; onRemove: (id: number) => void; onCompare: () => void; onClear: () => void
}) {
  if (!compareIds.length) return null
  const sel = PRODUCTS.filter(p => compareIds.includes(p.id))
  return (
    <div className="absolute bottom-14 left-0 right-0 z-50 slide-up">
      <div className="bg-white mx-0 px-3 pt-3 pb-3" style={{ borderTop: `2px solid ${P}`, boxShadow: '0 -6px 24px rgba(159,32,137,0.18)' }}>
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5">
            <IcSparkle />
            <span className="text-sm font-black" style={{ color: P }}>Compare Products</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: PL, color: P }}>{compareIds.length}/4 selected</span>
            <button onClick={onClear} className="text-xs font-bold" style={{ color: ST }}>Clear</button>
          </div>
        </div>
        <div className="flex gap-2 mb-3">
          {[0,1,2,3].map(i => {
            const p = sel[i]
            return (
              <div key={i} className="flex-1 rounded-xl overflow-hidden border relative" style={{ height: 60, borderColor: p ? P : '#E5E5E5', backgroundColor: p ? PL : '#FAFAFA' }}>
                {p
                  ? <>
                      <img src={p.img} alt={p.short} className="w-full h-full object-cover" />
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%)' }} />
                      <p className="absolute bottom-0.5 left-1 right-4 text-[9px] font-black text-white truncate">{p.short}</p>
                      <button onClick={() => onRemove(p.id)} className="absolute top-0.5 right-0.5 bg-white rounded-full p-0.5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.25)' }}>
                        <IcX />
                      </button>
                    </>
                  : <div className="w-full h-full flex flex-col items-center justify-center gap-0.5">
                      <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center" style={{ borderColor: '#CCC', borderStyle: 'dashed' }}><IcPlus /></div>
                      <span className="text-[9px]" style={{ color: MT }}>Add</span>
                    </div>
                }
              </div>
            )
          })}
        </div>
        <button
          onClick={() => compareIds.length >= 2 && onCompare()}
          className="w-full py-3 rounded-xl font-black text-sm text-white"
          style={{ backgroundColor: compareIds.length >= 2 ? P : '#CCC' }}>
          {compareIds.length >= 2 ? `Compare Now →` : 'Select at least 2 products'}
        </button>
      </div>
    </div>
  )
}

// ─── Screen 3: Compare Page ───────────────────────────────────
const COMPARE_SECTIONS = [
  { id:'basic', label:'Basic', rows:[
    { label:'💰 Price', key:'price' }, { label:'🏷️ MRP', key:'mrp' }, { label:'🎁 Discount', key:'discount' },
    { label:'⭐ Rating', key:'rating' }, { label:'💬 Reviews', key:'reviews' },
  ]},
  { id:'trust', label:'Trust', rows:[
    { label:'🛡️ Warranty', key:'warranty' }, { label:'↩️ Returns', key:'returns' }, { label:'🔄 Replacement', key:'replacement' },
    { label:'⭐ Seller Rating', key:'sellerRating' }, { label:'🚚 Delivery', key:'delivery' },
  ]},
  { id:'performance', label:'Specs', rows:[
    { label:'🧵 Material', key:'material' }, { label:'📐 Fit', key:'fit' }, { label:'🔗 Closure', key:'closure' },
    { label:'🧢 Brim Style', key:'brim' }, { label:'💨 Ventilation', key:'ventilation' },
    { label:'🫧 Wash Care', key:'washable' }, { label:'☀️ UV Protection', key:'uv' }, { label:'⚖️ Weight', key:'weight' },
  ]},
  { id:'ux', label:'Experience', rows:[
    { label:'😌 Comfort', key:'comfort' }, { label:'📏 Fit Accuracy', key:'fitRating' }, { label:'💨 Breathability', key:'breathability' },
    { label:'✨ Style', key:'style' }, { label:'🎨 Colour Quality', key:'colorQuality' }, { label:'💪 Durability', key:'durability' },
  ]},
  { id:'decision', label:'Decision', rows:[
    { label:'⚠️ Complaint Rate', key:'complaintRate' }, { label:'👍 Positive %', key:'posReviews' },
    { label:'🚨 Top Complaint', key:'complaint' }, { label:'✅ Best Suited For', key:'bestFor' },
  ]},
]

const HIGHLIGHTS = [
  { icon:'💨', label:'MOST BREATHABLE', val:'Puma Essentials', sub:'4.5 ★', good: true },
  { icon:'💰', label:'LOWEST PRICE',    val:'Roadster Core', sub:'₹299', good: true },
  { icon:'⭐', label:'HIGHEST RATED',   val:'Puma Essentials', sub:'4.2 ★', good: true },
  { icon:'☀️', label:'BEST SUN COVER',  val:'Puma Essentials', sub:'UPF 40', good: true },
]

const BEST_FOR = [
  { icon:'🚌', label:'Daily commute', product:'HRX Active' },
  { icon:'🏃', label:'Sports & travel', product:'Puma Essentials' },
  { icon:'💰', label:'Budget buyers', product:'Roadster Core' },
  { icon:'✨', label:'Street style', product:'WROGN Trucker' },
  { icon:'☀️', label:'Sun protection', product:'Puma Essentials' },
  { icon:'🎁', label:'Gifting', product:'HRX Active' },
]

function CompareScreen({ compareIds, onBack, onNavigate }: { compareIds: number[]; onBack: () => void; onNavigate: (s: Screen) => void }) {
  const [tab, setTab] = useState('basic')
  const products = PRODUCTS.filter(p => compareIds.includes(p.id)).slice(0, 3)
  const COL = 108, LABEL = 118

  const GOOD_KEYS: Record<string, number[]> = {
    breathability: [3], price: [2], rating: [3], posReviews: [3], complaintRate: [3], uv: [3],
  }

  return (
    <div className="flex flex-col" style={{ minHeight: '100%', backgroundColor: BG }}>
      {/* Header */}
      <div className="sticky top-0 z-40" style={{ backgroundColor: P }}>
        <div className="flex items-center gap-2 px-3 py-3">
          <button onClick={onBack} className="text-white"><IcBack /></button>
          <div className="flex-1">
            <p className="text-white font-black text-[15px]">Compare Products</p>
            <p className="text-white text-[11px] opacity-75">See what's different before you decide</p>
          </div>
          <button className="text-white p-1"><IcShare /></button>
          <button className="text-white p-1"><IcSave /></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide pb-20">
        {/* Product sticky header */}
        <div className="bg-white sticky top-[52px] z-30" style={{ borderBottom: `1px solid #EEE` }}>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex" style={{ minWidth: LABEL + products.length * COL }}>
              <div style={{ width: LABEL, flexShrink: 0 }} className="px-2 py-2 flex items-end">
                <span className="text-[10px] font-bold uppercase" style={{ color: MT }}>Products</span>
              </div>
              {products.map(p => (
                <div key={p.id} style={{ width: COL, flexShrink: 0, borderLeft: `1px solid #EEE` }} className="py-2 px-1 text-center">
                  <div className="w-14 h-14 mx-auto rounded-xl overflow-hidden bg-gray-100 mb-1">
                    <img src={p.img} alt={p.short} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-[10px] font-bold leading-tight" style={{ color: DT }}>{p.short}</p>
                  <p className="font-black text-[13px]" style={{ color: P }}>₹{fmt(p.price)}</p>
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-bold" style={{ color: GS }}>★ {p.rating}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="px-3 py-3">
          <h3 className="font-black text-sm mb-2 flex items-center gap-1.5" style={{ color: DT }}>
            <IcSparkle /> What's Different?
          </h3>
          <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-1">
            {HIGHLIGHTS.map(h => (
              <div key={h.label} className="flex-shrink-0 bg-white rounded-2xl p-3" style={{ minWidth: 118, border: `1px solid ${PB}`, boxShadow: '0 2px 8px rgba(159,32,137,0.08)' }}>
                <div className="text-xl mb-1.5">{h.icon}</div>
                <p className="text-[9px] font-black uppercase tracking-wide mb-0.5" style={{ color: P }}>{h.label}</p>
                <p className="text-xs font-black" style={{ color: DT }}>{h.val}</p>
                <p className="text-xs font-bold" style={{ color: G }}>{h.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide px-3 pb-2">
          {COMPARE_SECTIONS.map(s => (
            <button key={s.id} onClick={() => setTab(s.id)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-black border"
              style={{ backgroundColor: tab === s.id ? P : 'white', color: tab === s.id ? 'white' : ST, borderColor: tab === s.id ? P : '#DDD' }}>
              {s.label}
            </button>
          ))}
        </div>

        {/* Table */}
        {COMPARE_SECTIONS.filter(s => s.id === tab).map(section => (
          <div key={section.id} className="bg-white mx-3 mb-3 rounded-2xl overflow-hidden" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div className="px-3 py-2" style={{ backgroundColor: PL, borderBottom: `1px solid ${PB}` }}>
              <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: P }}>{section.label}</span>
            </div>
            <div className="overflow-x-auto scrollbar-hide">
              <div style={{ minWidth: LABEL + products.length * COL }}>
                {section.rows.map((row, ri) => (
                  <div key={row.key} className="flex" style={{ backgroundColor: ri % 2 === 0 ? '#FAFAFA' : 'white' }}>
                    <div style={{ width: LABEL, flexShrink: 0, borderRight: `1px solid #EEE` }} className="px-2.5 py-2.5 flex items-center">
                      <span className="text-[11px] font-semibold leading-tight" style={{ color: DT }}>{row.label}</span>
                    </div>
                    {products.map(p => {
                      const val = SPECS[p.id]?.[row.key] ?? '—'
                      const isGood = GOOD_KEYS[row.key]?.includes(p.id)
                      return (
                        <div key={p.id} style={{ width: COL, flexShrink: 0, borderLeft: `1px solid #EEE`, backgroundColor: isGood ? '#F0FBF0' : undefined }}
                          className="px-1.5 py-2.5 flex items-center justify-center">
                          <span className="text-[11px] font-bold text-center leading-tight" style={{ color: isGood ? G : DT }}>
                            {isGood ? '✓ ' : ''}{val}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Best Suited For */}
        <div className="bg-white mx-3 mb-3 rounded-2xl overflow-hidden" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div className="px-3 py-2" style={{ backgroundColor: PL, borderBottom: `1px solid ${PB}` }}>
            <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: P }}>🎯 Best Suited For</span>
          </div>
          <div className="p-3 grid grid-cols-3 gap-2">
            {BEST_FOR.map(b => (
              <div key={b.label} className="rounded-xl p-2 text-center border" style={{ borderColor: '#EEE' }}>
                <div className="text-lg mb-1">{b.icon}</div>
                <p className="text-[9px] font-semibold" style={{ color: ST }}>{b.label}</p>
                <p className="text-[10px] font-black" style={{ color: P }}>{b.product}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky CTAs */}
      <div className="sticky bottom-0 bg-white px-3 py-3 flex gap-2" style={{ borderTop: `1px solid #EEE` }}>
        <button onClick={onBack} className="flex-1 py-3 rounded-xl font-bold text-sm border" style={{ borderColor: P, color: P }}>
          ← Compare Again
        </button>
        <button onClick={() => onNavigate('success')} className="flex-1 py-3 rounded-xl text-white font-black text-sm" style={{ backgroundColor: P }}>
          Add to Cart
        </button>
      </div>
    </div>
  )
}

// ─── Screen 4: Product Detail ─────────────────────────────────
function ProductDetailScreen({ productId, onBack, onNavigate }: { productId: number; onBack: () => void; onNavigate: (s: Screen) => void }) {
  const p = PRODUCTS.find(x => x.id === productId) ?? PRODUCTS[2]
  const d = disc(p.price, p.mrp)
  const [qty, setQty] = useState(1)

  return (
    <div style={{ backgroundColor: BG, minHeight: '100%' }}>
      <TopNav onBack={onBack} />
      <div className="pb-24 overflow-y-auto scrollbar-hide">
        {/* Product image */}
        <div className="bg-white">
          <img src={p.img} alt={p.name} className="w-full object-cover bg-gray-100" style={{ height: 280 }} />
          <div className="flex gap-2 px-3 py-2 overflow-x-auto scrollbar-hide">
            {[p.img, 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=80&h=80&fit=crop', 'https://images.unsplash.com/photo-1645266729222-17cd32e06fd0?w=80&h=80&fit=crop'].map((img, i) => (
              <div key={i} className="flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border" style={{ borderColor: i === 0 ? P : '#EEE' }}>
                <img src={img} alt="" className="w-full h-full object-cover bg-gray-100" />
              </div>
            ))}
          </div>
        </div>

        {/* Product info */}
        <div className="bg-white mt-2 px-4 py-4">
          <div className="flex items-start gap-2">
            <h1 className="text-[15px] font-bold flex-1 leading-snug" style={{ color: DT }}>{p.name}</h1>
            <button className="p-1.5"><IcHeart /></button>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <RatingBadge val={p.rating} />
            <span className="text-sm font-semibold" style={{ color: ST }}>{fmt(p.reviews)} ratings</span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: PL, color: P }}>Bestseller</span>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black" style={{ color: DT }}>₹{fmt(p.price)}</span>
              <span className="text-sm line-through" style={{ color: MT }}>₹{fmt(p.mrp)}</span>
              <span className="text-sm font-black" style={{ color: G }}>{d}% OFF</span>
            </div>
            <p className="text-xs mt-0.5" style={{ color: ST }}>Inclusive of all taxes</p>
          </div>
          {/* Qty */}
          <div className="flex items-center gap-3 mt-3">
            <span className="text-xs font-bold" style={{ color: DT }}>Qty:</span>
            <div className="flex items-center border rounded-lg overflow-hidden" style={{ borderColor: PB }}>
              <button onClick={() => setQty(q => Math.max(1, q-1))} className="px-3 py-1.5 font-bold text-lg" style={{ color: P }}>−</button>
              <span className="px-3 font-black" style={{ color: DT }}>{qty}</span>
              <button onClick={() => setQty(q => q+1)} className="px-3 py-1.5 font-bold text-lg" style={{ color: P }}>+</button>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="bg-white mt-2 px-4 py-3">
          <div className="flex justify-between">
            {[
              { icon: <IcTruck />, label: 'Free Delivery', sub: 'by Tomorrow', c: G },
              { icon: <IcReturn />, label: '7 Day Returns', sub: 'Easy process', c: '#F59E0B' },
              { icon: <IcShield />, label: '6 Mo Warranty', sub: 'Brand warranty', c: P },
            ].map(b => (
              <div key={b.label} className="flex items-center gap-1.5">
                {b.icon}
                <div>
                  <p className="text-[11px] font-black" style={{ color: b.c }}>{b.label}</p>
                  <p className="text-[9px]" style={{ color: MT }}>{b.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Color variants */}
        <div className="bg-white mt-2 px-4 py-3">
          <p className="text-xs font-black mb-2" style={{ color: DT }}>Color: <span style={{ color: P }}>Classic Black</span></p>
          <div className="flex gap-2">
            {['Classic Black', 'Cloud White', 'Navy Blue'].map((c, i) => (
              <button key={c} className="border rounded-xl px-2.5 py-1.5 text-xs font-bold" style={{ borderColor: i === 0 ? P : '#DDD', backgroundColor: i === 0 ? PL : 'white', color: i === 0 ? P : ST }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Seller */}
        <div className="bg-white mt-2 px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs" style={{ color: ST }}>Sold by <span className="font-black" style={{ color: DT }}>TechZone India</span></p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <RatingBadge val={4.4} />
                <span className="text-xs" style={{ color: ST }}>98% on-time delivery</span>
              </div>
            </div>
            <button className="text-xs font-bold px-3 py-1.5 rounded-lg border" style={{ borderColor: PB, color: P }}>View Store</button>
          </div>
        </div>

        {/* Key features */}
        <div className="bg-white mt-2 px-4 py-4">
          <p className="font-black text-sm mb-3" style={{ color: DT }}>Key Features</p>
          <div className="grid grid-cols-2 gap-2">
            {[['🧵', 'Light Polyester'], ['💨', 'Mesh Ventilation'], ['☀️', 'UPF 40 Protection'], ['🧢', 'Curved Brim'], ['🔗', 'Hook & Loop'], ['🫧', 'Machine Washable']].map(([icon, feat]) => (
              <div key={feat} className="flex items-center gap-2 rounded-xl px-2.5 py-2" style={{ backgroundColor: PL }}>
                <span className="text-base">{icon}</span>
                <span className="text-xs font-bold" style={{ color: DT }}>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Reviews + AI Card */}
        <div className="bg-white mt-2 px-4 py-4">
          <h2 className="font-black text-base mb-3" style={{ color: DT }}>Customer Reviews</h2>
          {/* Rating overview */}
          <div className="flex gap-4 items-center mb-4">
            <div className="text-center">
              <p className="text-4xl font-black" style={{ color: DT }}>4.2</p>
              <StarRating rating={4.2} size={14} />
              <p className="text-[10px] mt-1" style={{ color: ST }}>6,732 ratings</p>
            </div>
            <div className="flex-1">
              {[5,4,3,2,1].map((s, i) => {
                const pcts = [45,28,15,7,5]
                return (
                  <div key={s} className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] w-2 text-right font-bold" style={{ color: ST }}>{s}</span>
                    <IcStar />
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#EEE' }}>
                      <div className="h-full rounded-full" style={{ width: `${pcts[i]*2}%`, backgroundColor: GS }} />
                    </div>
                    <span className="text-[10px] w-6 text-right" style={{ color: MT }}>{pcts[i]}%</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* AI Summary Card */}
          <div className="rounded-2xl overflow-hidden" style={{ border: `1.5px solid ${PB}` }}>
            <div className="px-4 py-3.5" style={{ background: `linear-gradient(135deg, #F5E8F3 0%, #FEF6FD 100%)` }}>
              <div className="flex items-center gap-2 mb-2">
                <IcSparkle />
                <span className="font-black text-sm" style={{ color: P }}>AI Review Summary</span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: P }}>NEW</span>
              </div>
              <p className="text-sm font-semibold" style={{ color: DT }}>
                Don't have time to read <strong>6,732 reviews?</strong>
              </p>
              <p className="text-xs mt-0.5" style={{ color: ST }}>Get the key points in seconds — in your language.</p>
            </div>
            <div className="bg-white px-4 py-3">
              <button onClick={() => onNavigate('ai')} className="w-full py-3 rounded-xl text-white font-black text-sm flex items-center justify-center gap-2" style={{ backgroundColor: P }}>
                <IcSparkle /> Summarize Reviews
              </button>
              <button onClick={() => onNavigate('reviews')} className="w-full pt-2 text-xs font-bold text-center" style={{ color: P }}>
                Read all 6,732 reviews →
              </button>
            </div>
          </div>
        </div>

        {/* Sample reviews */}
        <div className="bg-white mt-2 px-4 py-4">
          <p className="font-bold text-sm mb-3" style={{ color: DT }}>Recent Reviews</p>
          {[
            { name:'Priya Sharma', stars:5, text:'Very comfortable and lightweight. The curved brim gives good sun coverage and the fit stays secure.', date:'2 days ago', helpful:24, verified:true },
            { name:'Rahul Verma', stars:4, text:'Good cap for the price. Fabric feels breathable and the adjustable strap works well.', date:'5 days ago', helpful:18, verified:true },
            { name:'Ananya Iyer', stars:3, text:'The style is nice but the logo feels a little stiff. Fit and colour are good though.', date:'1 week ago', helpful:11, verified:false },
          ].map(r => (
            <div key={r.name} className="pb-3 mb-3" style={{ borderBottom: `1px solid #F0F0F0` }}>
              <div className="flex items-start gap-2 mb-1.5">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0" style={{ backgroundColor: P }}>{r.name[0]}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-black" style={{ color: DT }}>{r.name}</p>
                    {r.verified && <span className="text-[9px] font-bold" style={{ color: G }}>✓ Verified</span>}
                    <span className="ml-auto text-[10px]" style={{ color: MT }}>{r.date}</span>
                  </div>
                  <StarRating rating={r.stars} size={11} />
                </div>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: ST }}>{r.text}</p>
              <div className="flex items-center gap-1 mt-2">
                <IcThumb /><span className="text-xs" style={{ color: ST }}>Helpful ({r.helpful})</span>
              </div>
            </div>
          ))}
          <button onClick={() => onNavigate('reviews')} className="w-full text-sm font-black text-center py-2" style={{ color: P }}>
            See all 6,732 reviews →
          </button>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center z-40">
        <div className="w-full max-w-[390px] bg-white px-3 py-3 flex gap-2" style={{ borderTop: `1px solid #EEE` }}>
          <button className="flex-1 py-3.5 rounded-xl font-black text-sm border flex items-center justify-center gap-1" style={{ borderColor: P, color: P }}>
            <IcHeart /> Wishlist
          </button>
          <button onClick={() => onNavigate('success')} className="flex-1 py-3.5 rounded-xl text-white font-black text-sm" style={{ backgroundColor: P }}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Screen 5: Customer Reviews ───────────────────────────────
function ReviewsScreen({ onBack, onNavigate }: { onBack: () => void; onNavigate: (s: Screen) => void }) {
  return (
    <div style={{ backgroundColor: BG, minHeight: '100%' }}>
      <TopNav onBack={onBack} title="Customer Reviews" />
      <div className="pb-4 overflow-y-auto scrollbar-hide">
        {/* AI card at top */}
        <div className="bg-white mx-3 mt-3 rounded-2xl overflow-hidden" style={{ border: `1.5px solid ${P}` }}>
          <div className="px-4 py-3" style={{ background: `linear-gradient(135deg, #F5E8F3, #FEF6FD)` }}>
            <div className="flex items-center gap-2 mb-1">
              <IcSparkle />
              <span className="font-black text-sm" style={{ color: P }}>AI Review Summary</span>
            </div>
            <p className="text-xs" style={{ color: ST }}>Understand 6,732 reviews in seconds — in your language</p>
          </div>
          <div className="px-4 py-2.5 bg-white">
            <button onClick={() => onNavigate('ai')} className="w-full py-2.5 rounded-xl text-white font-black text-sm" style={{ backgroundColor: P }}>
              ✨ Get AI Summary
            </button>
          </div>
        </div>

        {/* Rating card */}
        <div className="bg-white mx-3 mt-3 rounded-2xl p-4">
          <div className="flex gap-4 items-center">
            <div className="text-center">
              <p className="text-4xl font-black" style={{ color: DT }}>4.2</p>
              <StarRating rating={4.2} size={14} />
              <p className="text-[10px] mt-1" style={{ color: ST }}>6,732 ratings</p>
            </div>
            <div className="flex-1">
              {[5,4,3,2,1].map((s, i) => {
                const pcts = [45,28,15,7,5]
                return (
                  <div key={s} className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] w-2 font-bold" style={{ color: ST }}>{s}</span>
                    <IcStar />
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: '#EEE' }}>
                      <div className="h-full rounded-full" style={{ width: `${pcts[i]*2}%`, backgroundColor: GS }} />
                    </div>
                    <span className="text-[10px] w-6 text-right" style={{ color: MT }}>{pcts[i]}%</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Review filter */}
        <div className="flex gap-2 px-3 mt-3 overflow-x-auto scrollbar-hide">
          {['All', '5 ★', '4 ★', '3 ★', 'With Photos', 'Verified'].map((f, i) => (
            <button key={f} className="flex-shrink-0 border rounded-full px-3 py-1 text-xs font-bold" style={{ borderColor: i === 0 ? P : '#DDD', backgroundColor: i === 0 ? PL : 'white', color: i === 0 ? P : ST }}>
              {f}
            </button>
          ))}
        </div>

        {/* Reviews */}
        <div className="bg-white mx-3 mt-3 rounded-2xl overflow-hidden" style={{ border: '1px solid #F0F0F0' }}>
          {[
            { name:'Priya Sharma', city:'Mumbai', stars:5, text:'Very lightweight and comfortable. The curved brim gives good sun protection and the cap stays secure during walks.', date:'2 days ago', helpful:24, verified:true, img:false },
            { name:'Rahul Verma', city:'Delhi', stars:4, text:'Good cap for the price. The fabric is breathable and the adjustable strap gives a snug fit.', date:'5 days ago', helpful:18, verified:true, img:false },
            { name:'Ananya Iyer', city:'Bengaluru', stars:3, text:'The style and colour are nice, but the front logo feels a little stiff. Fit is accurate though.', date:'1 week ago', helpful:11, verified:false, img:false },
            { name:'Deepak Gupta', city:'Pune', stars:5, text:'One of the best sports caps under ₹700. It dries quickly and does not feel heavy after a run.', date:'2 weeks ago', helpful:32, verified:true, img:false },
            { name:'Surbhi Patel', city:'Ahmedabad', stars:4, text:'Comfortable fit and neat stitching. Breathability is good, though the white colour needs frequent washing.', date:'3 weeks ago', helpful:9, verified:true, img:false },
          ].map(r => (
            <div key={r.name} className="p-4">
              <div className="flex items-start gap-2 mb-2">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black flex-shrink-0" style={{ backgroundColor: P }}>{r.name[0]}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <p className="text-xs font-black" style={{ color: DT }}>{r.name}</p>
                    <span className="text-[9px]" style={{ color: MT }}>• {r.city}</span>
                    {r.verified && <span className="text-[9px] font-bold" style={{ color: G }}>✓ Verified Purchase</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <StarRating rating={r.stars} size={11} />
                    <span className="text-[10px]" style={{ color: MT }}>{r.date}</span>
                  </div>
                </div>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: ST }}>{r.text}</p>
              <div className="flex items-center gap-1 mt-2">
                <IcThumb /><span className="text-xs" style={{ color: ST }}>Helpful ({r.helpful})</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Screen 6/7: AI Summary ───────────────────────────────────
const LANGS: { code: Lang; label: string; native: string }[] = [
  { code:'en',       label:'English',   native:'English' },
  { code:'hi',       label:'Hindi',     native:'हिन्दी' },
  { code:'hinglish', label:'Hinglish',  native:'Hinglish' },
  { code:'bn',       label:'Bengali',   native:'বাংলা' },
  { code:'ta',       label:'Tamil',     native:'தமிழ்' },
  { code:'te',       label:'Telugu',    native:'తెలుగు' },
  { code:'mr',       label:'Marathi',   native:'मराठी' },
]

const AI_EN = {
  summary: 'Most buyers praise the lightweight, breathable fabric and secure adjustable fit. A few mention that the front logo feels stiff and lighter colours need frequent cleaning.',
  pros: ['Lightweight for all-day wear', 'Breathable fabric with mesh ventilation', 'Secure and easy-to-adjust fit', 'Curved brim provides good sun coverage'],
  cons: ['Front logo feels stiff to some buyers', 'Light colours show dust quickly', 'May feel snug on larger head sizes'],
  complaints: ['Logo panel is slightly rigid', 'White fabric needs frequent washing', 'Strap can loosen during intense activity'],
  praised: ['Comfortable fit', 'Breathability', 'Sun protection', 'Value for money'],
}

const AI_HI = {
  summary: 'ज़्यादातर खरीदारों को इसका हल्का, हवादार कपड़ा और आरामदायक एडजस्टेबल फिट पसंद आया। कुछ लोगों ने लोगो को थोड़ा सख्त और हल्के रंग को जल्दी गंदा होने वाला बताया।',
  pros: ['पूरे दिन पहनने के लिए हल्की', 'हवादार फैब्रिक और मेश वेंटिलेशन', 'आसानी से एडजस्ट होने वाला सुरक्षित फिट', 'मुड़ी हुई ब्रिम धूप से अच्छी सुरक्षा देती है'],
  cons: ['कुछ खरीदारों को आगे का लोगो सख्त लगा', 'हल्के रंग पर धूल जल्दी दिखती है', 'बड़े सिर पर थोड़ी टाइट लग सकती है'],
  complaints: ['लोगो पैनल थोड़ा कड़ा है', 'सफेद फैब्रिक को बार-बार धोना पड़ता है', 'तेज़ गतिविधि में स्ट्रैप ढीला हो सकता है'],
  praised: ['आरामदायक फिट', 'हवादार कपड़ा', 'धूप से सुरक्षा', 'पैसों की वैल्यू'],
}

const THEMES = [
  { id:'comfort',      icon:'😌', label:'Comfort',       rating:4.5, desc:'Most buyers find it lightweight for all-day wear.',           count:1248 },
  { id:'fit',          icon:'📏', label:'Fit',           rating:4.3, desc:'The adjustable closure works well for most head sizes.',       count:987  },
  { id:'breathability',icon:'💨', label:'Breathability', rating:4.4, desc:'Mesh panels help keep the cap cool during activity.',          count:743 },
  { id:'style',        icon:'✨', label:'Style',         rating:4.2, desc:'The clean sporty look pairs easily with casual outfits.',      count:634 },
  { id:'durability',   icon:'💪', label:'Durability',    rating:3.9, desc:'Stitching is good, though the logo panel can feel rigid.',     count:521 },
]

function AIReviewScreen({ onBack, onNavigate, onOpenTheme }: { onBack: () => void; onNavigate: (s: Screen) => void; onOpenTheme: (id: string) => void }) {
  const [lang, setLang] = useState<Lang>('en')
  const [showLangSheet, setShowLangSheet] = useState(false)
  const [expanded, setExpanded] = useState<Record<string,boolean>>({ pros:true, cons:true, complaints:false, praised:false })
  const [isSpeaking, setIsSpeaking] = useState(false)

  const isHi = lang === 'hi'
  const data = isHi ? AI_HI : AI_EN
  const currentLang = LANGS.find(l => l.code === lang)!

  useEffect(() => {
    return () => window.speechSynthesis?.cancel()
  }, [])

  function toggleVoiceSummary() {
    if (!('speechSynthesis' in window)) return
    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      return
    }

    window.speechSynthesis.cancel()
    const speech = new SpeechSynthesisUtterance(data.summary)
    speech.lang = isHi ? 'hi-IN' : 'en-IN'
    speech.rate = 0.92
    speech.onend = () => setIsSpeaking(false)
    speech.onerror = () => setIsSpeaking(false)
    setIsSpeaking(true)
    window.speechSynthesis.speak(speech)
  }

  function changeLanguage(nextLang: Lang) {
    window.speechSynthesis?.cancel()
    setIsSpeaking(false)
    setLang(nextLang)
  }

  return (
    <div style={{ backgroundColor: BG, minHeight: '100%' }}>
      {/* Header */}
      <div className="sticky top-0 z-40" style={{ backgroundColor: P }}>
        <div className="flex items-center gap-2 px-3 py-2.5">
          <button onClick={onBack} className="text-white"><IcBack /></button>
          <div className="flex-1">
            <p className="text-white font-black text-[15px]">AI Review Summary</p>
            <p className="text-white text-[11px] opacity-75">Puma Essentials Sports Cap</p>
          </div>
          <IcSparkle />
        </div>
      </div>

      <div className="pb-4 overflow-y-auto scrollbar-hide">
        {/* Based on X reviews */}
        <div className="px-3 pt-3 pb-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold" style={{ color: ST }}>
              {isHi ? '6,732 reviews का आसान सारांश' : 'Based on 6,732 customer reviews'}
            </p>
            {/* Language selector */}
            <button onClick={() => setShowLangSheet(true)} className="flex items-center gap-1.5 border rounded-xl px-2.5 py-1.5" style={{ borderColor: PB, backgroundColor: PL }}>
              <IcGlobe />
              <span className="text-xs font-black" style={{ color: P }}>{currentLang.native}</span>
              <IcChevD />
            </button>
          </div>
        </div>

        {/* Main AI summary card */}
        <div className="mx-3 rounded-2xl overflow-hidden mb-3" style={{ border: `1.5px solid ${PB}`, boxShadow: '0 4px 16px rgba(159,32,137,0.12)' }}>
          <div className="px-4 py-3" style={{ background: `linear-gradient(135deg, #F5E8F3 0%, #FEF0FD 100%)` }}>
            <div className="flex items-center gap-2 mb-2">
              <IcSparkle />
              <span className="font-black text-sm" style={{ color: P }}>AI Summary</span>
            </div>
            <p className="text-sm leading-relaxed font-semibold" style={{ color: DT }}>"{data.summary}"</p>
            <button
              onClick={toggleVoiceSummary}
              aria-label={isSpeaking ? 'Stop voice summary' : 'Play voice summary'}
              className="mt-3 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-black border"
              style={{ color: isSpeaking ? 'white' : P, backgroundColor: isSpeaking ? P : 'white', borderColor: P }}
            >
              <IcVolume playing={isSpeaking} />
              {isSpeaking
                ? (isHi ? 'ऑडियो रोकें' : 'Stop audio')
                : (isHi ? 'सारांश सुनें' : 'Listen to summary')}
              {isSpeaking && <span className="flex items-end gap-0.5 ml-1" aria-hidden="true"><span className="voice-bar" /><span className="voice-bar" /><span className="voice-bar" /></span>}
            </button>
          </div>

          {/* Pros */}
          <div className="bg-white px-4 py-3" style={{ borderTop: `1px solid ${PB}` }}>
            <button onClick={() => setExpanded(e => ({ ...e, pros: !e.pros }))} className="flex items-center justify-between w-full mb-2">
              <span className="text-xs font-black uppercase tracking-wide" style={{ color: G }}>✓ {isHi ? 'अच्छी बातें' : 'Pros'}</span>
              <span style={{ color: MT, fontSize: 12 }}>{expanded.pros ? '▲' : '▼'}</span>
            </button>
            {expanded.pros && (
              <div className="space-y-2">
                {data.pros.map(p => (
                  <div key={p} className="flex items-start gap-2">
                    <span className="flex-shrink-0 mt-0.5"><IcCheck /></span>
                    <span className="text-xs" style={{ color: DT }}>{p}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cons */}
          <div className="bg-white px-4 py-3" style={{ borderTop: `1px solid #EEE` }}>
            <button onClick={() => setExpanded(e => ({ ...e, cons: !e.cons }))} className="flex items-center justify-between w-full mb-2">
              <span className="text-xs font-black uppercase tracking-wide" style={{ color: '#EF4444' }}>✗ {isHi ? 'कमियाँ' : 'Cons'}</span>
              <span style={{ color: MT, fontSize: 12 }}>{expanded.cons ? '▲' : '▼'}</span>
            </button>
            {expanded.cons && (
              <div className="space-y-2">
                {data.cons.map(c => (
                  <div key={c} className="flex items-start gap-2">
                    <span className="text-xs flex-shrink-0 mt-0.5" style={{ color: '#EF4444' }}>✕</span>
                    <span className="text-xs" style={{ color: DT }}>{c}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Common complaints */}
          <div className="bg-white px-4 py-3" style={{ borderTop: `1px solid #EEE` }}>
            <button onClick={() => setExpanded(e => ({ ...e, complaints: !e.complaints }))} className="flex items-center justify-between w-full mb-2">
              <span className="text-xs font-black uppercase tracking-wide" style={{ color: '#F59E0B' }}>⚠ {isHi ? 'आम शिकायतें' : 'Common Complaints'}</span>
              <span style={{ color: MT, fontSize: 12 }}>{expanded.complaints ? '▲' : '▼'}</span>
            </button>
            {expanded.complaints && (
              <div className="space-y-1.5">
                {data.complaints.map(c => (
                  <div key={c} className="flex items-start gap-2">
                    <span className="text-xs" style={{ color: '#F59E0B' }}>⚠</span>
                    <span className="text-xs" style={{ color: DT }}>{c}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Most praised */}
          <div className="bg-white px-4 py-3" style={{ borderTop: `1px solid #EEE` }}>
            <button onClick={() => setExpanded(e => ({ ...e, praised: !e.praised }))} className="flex items-center justify-between w-full mb-2">
              <span className="text-xs font-black uppercase tracking-wide" style={{ color: P }}>★ {isHi ? 'सबसे तारीफ की गई' : 'Most Praised'}</span>
              <span style={{ color: MT, fontSize: 12 }}>{expanded.praised ? '▲' : '▼'}</span>
            </button>
            {expanded.praised && (
              <div className="flex flex-wrap gap-2">
                {data.praised.map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: PL, color: P }}>✓ {t}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sentiment breakdown */}
        <div className="bg-white mx-3 rounded-2xl p-4 mb-3" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <p className="font-black text-sm mb-3" style={{ color: DT }}>
            {isHi ? 'भावना विश्लेषण' : 'Review Sentiment'}
          </p>
          {[
            { label: isHi ? 'सकारात्मक' : 'Positive', pct: 78, color: G },
            { label: isHi ? 'तटस्थ' : 'Neutral',   pct: 15, color: '#F59E0B' },
            { label: isHi ? 'नकारात्मक' : 'Negative', pct: 7,  color: '#EF4444' },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-3 mb-2">
              <span className="text-xs font-semibold w-20 text-right" style={{ color: ST }}>{s.label}</span>
              <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: '#EEE' }}>
                <div className="h-full rounded-full" style={{ width: `${s.pct}%`, backgroundColor: s.color }} />
              </div>
              <span className="text-xs font-black w-8" style={{ color: s.color }}>{s.pct}%</span>
            </div>
          ))}
          <p className="text-xs mt-2 font-semibold" style={{ color: G }}>
            {isHi ? '78% रिव्यू सकारात्मक हैं' : '78% of analyzed reviews are positive'}
          </p>
        </div>

        {/* Review Themes */}
        <div className="px-3 mb-3">
          <p className="font-black text-sm mb-2.5" style={{ color: DT }}>
            {isHi ? 'विषय-अनुसार रिव्यू' : 'Review Themes'}
          </p>
          <div className="space-y-2">
            {THEMES.map(t => (
              <button key={t.id} onClick={() => onOpenTheme(t.id)}
                className="w-full bg-white rounded-2xl p-3 text-left flex items-center gap-3"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: `1px solid #EEE` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ backgroundColor: PL }}>
                  {t.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm" style={{ color: DT }}>{t.label}</span>
                    <RatingBadge val={t.rating} />
                  </div>
                  <p className="text-xs mt-0.5 leading-snug" style={{ color: ST }}>{t.desc}</p>
                </div>
                <span style={{ color: MT, fontSize: 18 }}>›</span>
              </button>
            ))}
          </div>
        </div>

        {/* Language toggle */}
        <div className="mx-3 mb-3 bg-white rounded-2xl p-4" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <p className="text-xs font-black mb-2" style={{ color: DT }}>
            {isHi ? 'भाषा बदलें' : 'Change Summary Language'}
          </p>
          <div className="flex gap-2">
            <button onClick={() => changeLanguage('hi')} className="flex-1 py-2 rounded-xl font-black text-sm border" style={{ backgroundColor: isHi ? P : 'white', color: isHi ? 'white' : P, borderColor: P }}>हिंदी</button>
            <button onClick={() => changeLanguage('en')} className="flex-1 py-2 rounded-xl font-black text-sm border" style={{ backgroundColor: !isHi ? P : 'white', color: !isHi ? 'white' : P, borderColor: P }}>English</button>
          </div>
        </div>

        {/* Transparency */}
        <div className="mx-3 mb-4 rounded-2xl p-4" style={{ backgroundColor: '#FFFBF0', border: `1px solid #FDE68A` }}>
          <p className="font-black text-xs mb-1.5" style={{ color: '#92400E' }}>
            {isHi ? 'यह सारांश कैसे बनाया गया?' : 'How is this summary created?'}
          </p>
          <p className="text-xs leading-relaxed" style={{ color: '#78350F' }}>
            {isHi
              ? 'AI ने 6,732 रिव्यू का विश्लेषण करके सामान्य अनुभवों को एक साथ रखा है।'
              : 'AI analyzed 6,732 customer reviews and grouped frequently mentioned experiences into common themes.'}
          </p>
          <div className="flex items-start gap-1.5 mt-2">
            <IcInfo />
            <p className="text-[10px]" style={{ color: '#92400E' }}>
              {isHi ? 'AI सारांश में त्रुटियां हो सकती हैं। विवरण के लिए अलग रिव्यू पढ़ें।' : 'AI summaries may contain errors. Check individual reviews for details.'}
            </p>
          </div>
        </div>
      </div>

      {/* Language bottom sheet */}
      {showLangSheet && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={() => setShowLangSheet(false)}>
          <div className="bg-white rounded-t-3xl p-5 fade-in" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 rounded-full mx-auto mb-4" style={{ backgroundColor: '#DDD' }} />
            <div className="flex items-center gap-2 mb-4">
              <IcGlobe />
              <p className="font-black text-base" style={{ color: DT }}>Summary Language</p>
            </div>
            <div className="space-y-2">
              {LANGS.map(l => (
                <button key={l.code} onClick={() => { changeLanguage(l.code); setShowLangSheet(false) }}
                  className="w-full flex items-center justify-between p-3 rounded-xl border"
                  style={{ borderColor: lang === l.code ? P : '#EEE', backgroundColor: lang === l.code ? PL : 'white' }}>
                  <div>
                    <span className="font-black text-sm" style={{ color: lang === l.code ? P : DT }}>{l.native}</span>
                    <span className="ml-2 text-xs" style={{ color: ST }}>{l.label}</span>
                  </div>
                  {lang === l.code && <IcCheck c={P} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Screen 8: Review Theme Detail ───────────────────────────
function ThemeDetailScreen({ themeId, onBack }: { themeId: string; onBack: () => void }) {
  const theme = THEMES.find(t => t.id === themeId) ?? THEMES[0]

  const SNIPPETS: Record<string, { stars: number; text: string; name: string }[]> = {
    comfort: [
      { stars:5, text:'Very lightweight. I wore it through a full day of sightseeing without any pressure or discomfort.', name:'Shruti V.' },
      { stars:4, text:'The inner sweatband is soft and does not leave marks on the forehead.', name:'Aakash G.' },
      { stars:4, text:'Comfortable for daily use and does not feel heavy even in warm weather.', name:'Lavanya P.' },
    ],
    fit: [
      { stars:5, text:'The hook-and-loop strap adjusts quickly and stays secure while running.', name:'Ravi P.' },
      { stars:4, text:'Fits my medium head perfectly with enough adjustment left on the strap.', name:'Neha J.' },
      { stars:3, text:'A little snug for a larger head, but the size is accurate for most people.', name:'Sanjay K.' },
    ],
    breathability: [
      { stars:5, text:'Mesh panels make a real difference during morning runs. It dries quickly too.', name:'Priya T.' },
      { stars:4, text:'Good airflow for a cap. My head stays cooler than with cotton caps.', name:'Suresh M.' },
      { stars:3, text:'Breathable for daily walks, though it still gets warm in peak afternoon heat.', name:'Pallavi A.' },
    ],
    style: [
      { stars:5, text:'Clean sporty design that looks good with both gym wear and casual outfits.', name:'Anand B.' },
      { stars:4, text:'The shape holds well and the curved brim looks premium.', name:'Meera K.' },
      { stars:3, text:'Looks good overall, but I wish the front logo were a little smaller.', name:'Rohit C.' },
    ],
    durability: [
      { stars:5, text:'Stitching is neat and the cap kept its shape after multiple washes.', name:'Deepak M.' },
      { stars:4, text:'Fabric feels strong for the price and the closure still works smoothly.', name:'Kritika S.' },
      { stars:3, text:'The cap is sturdy, but the front logo panel feels slightly rigid.', name:'Abhijit R.' },
    ],
  }

  const snippets = SNIPPETS[themeId] ?? SNIPPETS.comfort

  return (
    <div style={{ backgroundColor: BG, minHeight: '100%' }}>
      <div className="sticky top-0 z-40" style={{ backgroundColor: P }}>
        <div className="flex items-center gap-2 px-3 py-2.5">
          <button onClick={onBack} className="text-white"><IcBack /></button>
          <span className="text-xl">{theme.icon}</span>
          <div className="flex-1">
            <p className="text-white font-black text-[15px]">{theme.label} — What buyers said</p>
            <p className="text-white text-[11px] opacity-75">Based on {theme.count.toLocaleString()} reviews mentioning {theme.label.toLowerCase()}</p>
          </div>
        </div>
      </div>

      <div className="pb-4">
        {/* AI insight */}
        <div className="mx-3 mt-3 rounded-2xl overflow-hidden mb-3" style={{ border: `1.5px solid ${PB}` }}>
          <div className="px-4 py-3" style={{ background: `linear-gradient(135deg, #F5E8F3, #FEF6FD)` }}>
            <div className="flex items-center gap-1.5 mb-1.5">
              <IcSparkle />
              <span className="text-xs font-black" style={{ color: P }}>AI Insight on {theme.label}</span>
            </div>
            <p className="text-sm font-semibold leading-relaxed" style={{ color: DT }}>
              {themeId === 'comfort' && '"Most buyers find the cap light enough for all-day wear, with the soft inner sweatband receiving frequent praise."'}
              {themeId === 'fit' && '"The adjustable closure fits most buyers securely. A small number of reviewers with larger head sizes found it snug."'}
              {themeId === 'breathability' && '"Mesh ventilation and quick-dry fabric keep the cap noticeably cooler during walks, runs and travel."'}
              {themeId === 'style' && '"Buyers like the clean athletic shape and versatile curved brim, which pairs well with casual outfits."'}
              {themeId === 'durability' && '"Most reviewers report neat stitching and good shape retention. The rigid front logo panel is the main concern."'}
            </p>
          </div>
          <div className="px-4 py-2 bg-white flex items-center gap-1.5">
            <RatingBadge val={theme.rating} />
            <span className="text-xs font-bold" style={{ color: ST }}>{theme.label} rating by buyers</span>
          </div>
        </div>

        {/* Review snippets */}
        <div className="px-3 mb-2">
          <p className="text-xs font-black uppercase tracking-wide mb-2.5" style={{ color: ST }}>
            Review Snippets ({theme.count.toLocaleString()} reviews)
          </p>
          <div className="space-y-2.5">
            {snippets.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl p-4" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0" style={{ backgroundColor: P }}>{r.name[0]}</div>
                  <div>
                    <p className="text-xs font-black" style={{ color: DT }}>{r.name}</p>
                    <StarRating rating={r.stars} size={11} />
                  </div>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: ST }}>"{r.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Based on */}
        <div className="mx-3 rounded-xl px-4 py-3" style={{ backgroundColor: PL, border: `1px solid ${PB}` }}>
          <div className="flex items-center gap-1.5">
            <IcInfo />
            <p className="text-xs" style={{ color: P }}>
              <strong>Based on {theme.count.toLocaleString()} reviews</strong> mentioning "{theme.label.toLowerCase()}"
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Screen 9: Cart Success ───────────────────────────────────
function SuccessScreen({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const recommendations = [
    {
      id: 'tshirt',
      name: 'Roadster Cotton T-shirt',
      detail: 'Black • Size M',
      price: 449,
      img: 'https://images.unsplash.com/photo-1661080561444-a0139edfc4f7?w=240&h=240&fit=crop&auto=format',
    },
    {
      id: 'belt',
      name: 'Mast & Harbour Leather Belt',
      detail: 'Brown • Size 34',
      price: 299,
      img: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=240&h=240&fit=crop&auto=format',
    },
  ]
  const [selectedBundleIds, setSelectedBundleIds] = useState<string[]>(recommendations.map(item => item.id))
  const [bundleAdded, setBundleAdded] = useState(false)
  const selectedRecommendations = recommendations.filter(item => selectedBundleIds.includes(item.id))
  const qualifiesForBundle = selectedRecommendations.length === recommendations.length
  const savings = qualifiesForBundle ? 30 : 0
  const extrasTotal = selectedRecommendations.reduce((sum, item) => sum + item.price, 0)
  const extrasPrice = extrasTotal - savings

  function toggleBundleItem(id: string) {
    setBundleAdded(false)
    setSelectedBundleIds(ids => ids.includes(id) ? ids.filter(itemId => itemId !== id) : [...ids, id])
  }

  return (
    <div className="pb-4" style={{ minHeight: '100%', backgroundColor: BG }}>
      <div className="px-4 pt-5 pb-4 text-center bg-white">
        <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-2.5" style={{ backgroundColor: G }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h2 className="font-black text-xl" style={{ color: DT }}>Added to Cart!</h2>
        <p className="text-xs mt-1" style={{ color: ST }}>Puma Essentials Sports Cap • ₹599</p>
      </div>

      <div className="mx-3 mt-3 overflow-hidden rounded-2xl bg-white" style={{ border: `1.5px solid ${PB}`, boxShadow: '0 4px 16px rgba(159,32,137,0.1)' }}>
        <div className="px-4 py-3" style={{ background: `linear-gradient(135deg, ${PL}, #FEF6FD)` }}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5">
                <IcSparkle />
                <p className="font-black text-sm" style={{ color: P }}>Complete the Look</p>
              </div>
              <p className="text-xs mt-1" style={{ color: ST }}>Frequently bought together with your cap</p>
            </div>
            <span className="flex-shrink-0 rounded-full px-2 py-1 text-[10px] font-black text-white" style={{ backgroundColor: G }}>SAVE ₹30</span>
          </div>
        </div>

        <div className="p-3">
          <div className="flex items-center gap-2 rounded-xl p-2" style={{ backgroundColor: '#FAFAFA' }}>
            <img src={PRODUCTS[2].img} alt="Puma Essentials Sports Cap" className="h-14 w-14 rounded-lg object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-black" style={{ color: DT }}>Puma Essentials Sports Cap</p>
              <p className="text-[10px]" style={{ color: ST }}>Already in your cart</p>
              <p className="mt-0.5 text-xs font-black" style={{ color: P }}>₹599</p>
            </div>
            <div className="flex h-5 w-5 items-center justify-center rounded-full" style={{ backgroundColor: G }}>
              <IcCheck c="white" />
            </div>
          </div>

          <div className="my-1.5 flex items-center justify-center">
            <span className="flex h-5 w-5 items-center justify-center rounded-full text-sm font-black" style={{ backgroundColor: PL, color: P }}>+</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {recommendations.map(item => {
              const selected = selectedBundleIds.includes(item.id)
              return (
                <button
                  key={item.id}
                  onClick={() => toggleBundleItem(item.id)}
                  aria-pressed={selected}
                  className="relative overflow-hidden rounded-xl border bg-white p-2 text-left"
                  style={{ borderColor: selected ? P : '#E5E5E5', boxShadow: selected ? `0 2px 8px rgba(159,32,137,0.1)` : 'none' }}
                >
                  <div className="relative">
                    <img src={item.img} alt={item.name} className="h-20 w-full rounded-lg object-cover" />
                    <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full border bg-white" style={{ borderColor: selected ? P : '#CCC', color: P }}>
                      {selected && <IcCheck c={P} />}
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-1 text-[11px] font-black" style={{ color: DT }}>{item.name}</p>
                  <p className="text-[9px]" style={{ color: ST }}>{item.detail}</p>
                  <p className="mt-1 text-xs font-black" style={{ color: P }}>₹{item.price}</p>
                </button>
              )
            })}
          </div>

          <div className="mt-3 rounded-xl px-3 py-2.5" style={{ backgroundColor: '#F7F7F7' }}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold" style={{ color: ST }}>{qualifiesForBundle ? '3-item bundle total' : `${selectedRecommendations.length + 1} items total`}</span>
              <div className="text-right">
                {qualifiesForBundle && <span className="mr-1.5 text-[11px] line-through" style={{ color: MT }}>₹1,347</span>}
                <span className="text-base font-black" style={{ color: DT }}>₹{599 + extrasPrice}</span>
              </div>
            </div>
            {qualifiesForBundle && <p className="mt-0.5 text-[10px] font-bold text-right" style={{ color: G }}>You save ₹30 on this bundle</p>}
          </div>

          <button
            onClick={() => selectedRecommendations.length > 0 && setBundleAdded(true)}
            disabled={selectedRecommendations.length === 0 || bundleAdded}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-black text-white"
            style={{ backgroundColor: bundleAdded ? G : selectedRecommendations.length ? P : '#CCC' }}
          >
            {bundleAdded
              ? <><IcCheck c="white" /> Bundle added to cart</>
              : selectedRecommendations.length
                ? `Add ${selectedRecommendations.length} ${selectedRecommendations.length === 1 ? 'item' : 'items'} for ₹${extrasPrice}`
                : 'Select an item to add'}
          </button>
          <p className="mt-2 text-center text-[9px]" style={{ color: MT }}>You can change sizes or remove items in your cart</p>
        </div>
      </div>

      <div className="mx-3 mt-3 flex gap-2">
        <button onClick={() => onNavigate('listing')} className="flex-1 rounded-xl border py-3 text-sm font-black" style={{ borderColor: P, color: P }}>
          Continue Shopping
        </button>
        <button className="flex-1 rounded-xl py-3 text-sm font-black text-white" style={{ backgroundColor: P }}>
          Go to Cart ({bundleAdded ? 3 : 1})
        </button>
      </div>
    </div>
  )
}

function VoiceShoppingAgent({ onClose, onOpenProduct, onCompare }: {
  onClose: () => void
  onOpenProduct: (id: number) => void
  onCompare: () => void
}) {
  const [language, setLanguage] = useState<'English' | 'Hindi' | 'Hinglish'>('English')
  const [listening, setListening] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [reply, setReply] = useState('Namaste! Tell me what you are shopping for, and I’ll help you find it.')
  const [error, setError] = useState('')
  const [action, setAction] = useState<{ kind: 'product'; id: number } | { kind: 'compare' } | null>(null)
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null)

  useEffect(() => () => {
    recognitionRef.current?.abort()
    window.speechSynthesis?.cancel()
  }, [])

  function speak(text: string) {
    if (!('speechSynthesis' in window)) {
      setError('Spoken replies are not available in this browser. You can still read the response here.')
      return
    }
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = language === 'Hindi' ? 'hi-IN' : 'en-IN'
    utterance.rate = 0.94
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => {
      setSpeaking(false)
      setError('I could not play the spoken reply. Please try again.')
    }
    setSpeaking(true)
    window.speechSynthesis.speak(utterance)
  }

  function respondTo(text: string) {
    const normalized = text.toLowerCase()
    let nextReply: string
    let nextAction: typeof action = null

    if (/\b(compare|comparison|side by side)\b/.test(normalized) || /तुलना|कम्पेयर/.test(normalized)) {
      nextAction = { kind: 'compare' }
      nextReply = language === 'Hindi'
        ? 'ज़रूर! मैंने तुलना के लिए दो लोकप्रिय कैप चुने हैं। तुलना देखने के लिए नीचे टैप करें।'
        : language === 'Hinglish'
          ? 'Bilkul! Maine compare karne ke liye do popular caps choose kiye hain. Comparison dekhne ke liye neeche tap karein.'
          : 'Sure! I picked two popular caps to compare. Tap below to see them side by side.'
    } else {
      const product = /lamp|light|study|लैम्प|लाइट/.test(normalized)
        ? PRODUCTS.find(item => item.id === 7)!
        : /sport|run|gym|puma|स्पोर्ट|रन/.test(normalized)
          ? PRODUCTS.find(item => item.id === 3)!
          : /cheap|cheapest|budget|under 300|कम कीमत|सस्ता/.test(normalized)
            ? PRODUCTS.find(item => item.id === 2)!
            : PRODUCTS.find(item => item.id === 1)!
      nextAction = { kind: 'product', id: product.id }
      nextReply = language === 'Hindi'
        ? `मुझे आपके लिए ${product.short} मिला है, जिसकी कीमत ₹${product.price} है और रेटिंग ${product.rating} स्टार है। क्या आप इसकी जानकारी देखना चाहेंगे?`
        : language === 'Hinglish'
          ? `Aapke liye ${product.short} mila hai, ₹${product.price} mein, rating ${product.rating} stars. Kya aap details dekhna chahenge?`
          : `I found the ${product.short} for ₹${product.price}, rated ${product.rating} stars. Would you like to see its details?`
    }

    setTranscript(text)
    setReply(nextReply)
    setAction(nextAction)
    setError('')
    speak(nextReply)
  }

  function startListening() {
    if (listening) {
      recognitionRef.current?.stop()
      return
    }
    const speechWindow = window as SpeechWindow
    const Recognition = speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition
    if (!Recognition) {
      setError('Voice input is not supported in this browser. Try the sample requests below or use Chrome or Edge.')
      return
    }
    window.speechSynthesis?.cancel()
    setSpeaking(false)
    setError('')
    setTranscript('')
    const recognition = new Recognition()
    recognition.lang = language === 'English' ? 'en-IN' : 'hi-IN'
    recognition.interimResults = false
    recognition.maxAlternatives = 1
    recognition.onresult = event => {
      const text = event.results[0]?.[0]?.transcript?.trim()
      if (text) respondTo(text)
    }
    recognition.onerror = event => {
      setListening(false)
      const errors: Record<string, string> = {
        'not-allowed': 'Microphone access is blocked. Allow microphone access in your browser settings and try again.',
        'no-speech': 'I did not hear anything. Please try speaking again.',
        'audio-capture': 'No microphone was found. Connect a microphone and try again.',
        network: 'Voice recognition could not connect. Check your internet connection and try again.',
      }
      setError(errors[event.error] ?? `Voice recognition failed (${event.error}). Please try again.`)
    }
    recognition.onend = () => setListening(false)
    recognitionRef.current = recognition
    try {
      recognition.start()
      setListening(true)
    } catch {
      setListening(false)
      setError('Could not start the microphone. Check that it is available and try again.')
    }
  }

  function trySample(text: string) {
    window.speechSynthesis?.cancel()
    setSpeaking(false)
    respondTo(text)
  }

  return (
    <div className="absolute inset-0 z-[80] flex items-end" style={{ backgroundColor: 'rgba(20,12,20,0.62)' }} onClick={onClose}>
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="voice-agent-title"
        className="slide-up flex max-h-[94%] w-full flex-col overflow-hidden rounded-t-[28px] bg-white"
        onClick={event => event.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 pb-3 pt-5" style={{ borderBottom: '1px solid #F0E8EF' }}>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full text-xl text-white" style={{ backgroundColor: P }}>✦</div>
            <div>
              <h2 id="voice-agent-title" className="m-0 text-base font-black" style={{ color: DT }}>Meesho Voice Assistant</h2>
              <p className="m-0 text-xs" style={{ color: ST }}>Speak naturally · English, Hindi or Hinglish</p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close voice assistant" className="flex h-9 w-9 items-center justify-center rounded-full text-lg" style={{ backgroundColor: '#F6F3F5', color: DT }}>×</button>
        </div>

        <div className="scrollbar-hide flex-1 overflow-y-auto px-5 py-4">
          <label className="mb-2 block text-xs font-bold" style={{ color: ST }} htmlFor="voice-language">RESPONSE LANGUAGE</label>
          <select
            id="voice-language"
            value={language}
            onChange={event => setLanguage(event.target.value as typeof language)}
            className="mb-4 w-full rounded-xl border px-3 py-2.5 text-sm font-bold outline-none"
            style={{ borderColor: PB, color: DT, backgroundColor: 'white' }}
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Hinglish</option>
          </select>

          <div className="rounded-2xl p-4" style={{ backgroundColor: PL }}>
            <div className="mb-2 flex items-center gap-2 text-xs font-black" style={{ color: P }}>
              <IcSparkle /> {speaking ? 'SPEAKING' : 'ASSISTANT'}
              {speaking && <span className="flex items-end gap-1" aria-hidden="true"><span className="voice-bar" /><span className="voice-bar" /><span className="voice-bar" /></span>}
            </div>
            <p className="m-0 text-sm font-semibold leading-relaxed" style={{ color: DT }}>{reply}</p>
            {action && (
              <button
                className="mt-3 w-full rounded-xl py-2.5 text-sm font-black text-white"
                style={{ backgroundColor: P }}
                onClick={() => action.kind === 'compare' ? onCompare() : onOpenProduct(action.id)}
              >
                {action.kind === 'compare' ? 'Compare these products' : 'View product details'}
              </button>
            )}
          </div>

          {transcript && (
            <div className="mt-3 rounded-xl border px-3 py-2.5" style={{ borderColor: '#EEE', color: ST }}>
              <p className="m-0 text-[10px] font-black tracking-wide">I HEARD</p>
              <p className="mb-0 mt-1 text-sm font-semibold" style={{ color: DT }}>{transcript}</p>
            </div>
          )}

          {error && <p role="alert" className="mt-3 rounded-xl px-3 py-2.5 text-xs font-semibold" style={{ color: '#9B1C31', backgroundColor: '#FFF0F1' }}>{error}</p>}

          <p className="mb-2 mt-5 text-xs font-black" style={{ color: ST }}>TRY ASKING</p>
          <div className="flex flex-wrap gap-2">
            {['Find a sports cap', 'What is the cheapest cap?', 'Compare caps'].map(sample => (
              <button key={sample} onClick={() => trySample(sample)} className="rounded-full border px-3 py-2 text-xs font-bold" style={{ color: P, borderColor: PB, backgroundColor: 'white' }}>{sample}</button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 px-5 pb-5 pt-3" style={{ borderTop: '1px solid #F0E8EF' }}>
          {speaking && (
            <button onClick={() => { window.speechSynthesis.cancel(); setSpeaking(false) }} className="rounded-xl border px-3 py-3 text-xs font-bold" style={{ borderColor: PB, color: P }}>Stop reply</button>
          )}
          <button
            onClick={startListening}
            aria-label={listening ? 'Stop listening' : 'Start speaking'}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-black text-white"
            style={{ backgroundColor: listening ? '#C62828' : P }}
          >
            <span className="text-lg">{listening ? '■' : '🎙'}</span>
            {listening ? 'Listening… tap to stop' : 'Tap to speak'}
          </button>
        </div>
      </section>
    </div>
  )
}

// ─── Main App ─────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen]       = useState<Screen>('listing')
  const [history, setHistory]     = useState<Screen[]>([])
  const [compareIds, setCompareIds] = useState<number[]>([])
  const [selectedPid, setSelectedPid] = useState(3)
  const [themeId, setThemeId]     = useState('comfort')
  const [toast, setToast]         = useState('')
  const [activeNav, setActiveNav] = useState('home')
  const [voiceAgentOpen, setVoiceAgentOpen] = useState(false)

  function nav(s: Screen) {
    setHistory(h => [...h, screen])
    setScreen(s)
    window.scrollTo(0, 0)
  }

  function goBack() {
    const h = [...history]
    const prev = h.pop() ?? 'listing'
    setHistory(h)
    setScreen(prev)
  }

  function toggleCompare(p: Product) {
    if (compareIds.includes(p.id)) {
      setCompareIds(ids => ids.filter(i => i !== p.id))
    } else if (compareIds.length >= 4) {
      setToast('You can compare up to 4 products at a time.')
      setTimeout(() => setToast(''), 3000)
    } else {
      setCompareIds(ids => [...ids, p.id])
    }
  }

  function openProduct(id: number) {
    setSelectedPid(id)
    nav('detail')
  }

  function openTheme(id: string) {
    setThemeId(id)
    nav('theme')
  }

  const showBottomNav = screen === 'listing'
  const showCompareTray = screen === 'listing' && compareIds.length > 0

  return (
    <div className="app-stage flex items-start justify-center">
      {/* Phone shell */}
      <div className="phone-shell relative bg-black rounded-[44px] p-[10px] phone-shadow">
        {/* Screen */}
        <div className="phone-screen rounded-[36px] overflow-hidden bg-white">
          {/* Status bar */}
          <div className="flex justify-between px-6 py-1.5 text-white text-[11px] font-bold z-50" style={{ backgroundColor: P, flexShrink: 0 }}>
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <span>▌▌▌</span>
              <span>WiFi</span>
              <span>🔋</span>
            </div>
          </div>

          {/* Screen content */}
          <div className="flex-1 flex flex-col overflow-hidden" style={{ position: 'relative' }}>
            <div className="flex-1 overflow-y-auto scrollbar-hide" style={{ position: 'relative' }}>
              {screen === 'listing' && (
              <ListingScreen
                compareIds={compareIds}
                onToggle={toggleCompare}
                onOpenProduct={openProduct}
                onVoiceAgent={() => setVoiceAgentOpen(true)}
              />
            )}
              {screen === 'compare' && (
                <CompareScreen compareIds={compareIds} onBack={goBack} onNavigate={nav} />
              )}
              {screen === 'detail' && (
                <ProductDetailScreen productId={selectedPid} onBack={goBack} onNavigate={nav} />
              )}
              {screen === 'reviews' && (
                <ReviewsScreen onBack={goBack} onNavigate={nav} />
              )}
              {screen === 'ai' && (
                <AIReviewScreen onBack={goBack} onNavigate={nav} onOpenTheme={openTheme} />
              )}
              {screen === 'theme' && (
                <ThemeDetailScreen themeId={themeId} onBack={goBack} />
              )}
              {screen === 'success' && (
                <SuccessScreen onNavigate={(s) => { setHistory([]); setScreen(s) }} />
              )}
            </div>

            {/* Compare tray — above bottom nav */}
            {showCompareTray && (
              <CompareTray
                compareIds={compareIds}
                onRemove={id => setCompareIds(ids => ids.filter(i => i !== id))}
                onCompare={() => nav('compare')}
                onClear={() => setCompareIds([])}
              />
            )}

            {/* Bottom nav */}
            {showBottomNav && (
              <BottomNav active={activeNav} onNav={(s) => { setActiveNav('home'); nav(s) }} />
            )}
          </div>

          {voiceAgentOpen && (
            <VoiceShoppingAgent
              onClose={() => setVoiceAgentOpen(false)}
              onOpenProduct={id => {
                setVoiceAgentOpen(false)
                openProduct(id)
              }}
              onCompare={() => {
                setVoiceAgentOpen(false)
                setCompareIds([1, 3])
                nav('compare')
              }}
            />
          )}

          {/* Toast */}
          {toast && (
            <div className="absolute bottom-24 left-4 right-4 z-[100] fade-in">
              <div className="rounded-xl px-4 py-3 text-white text-xs font-bold text-center" style={{ backgroundColor: 'rgba(26,26,26,0.92)', backdropFilter: 'blur(8px)' }}>
                {toast}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Side flow guide */}
      <div className="ml-8 pt-4 hidden lg:block" style={{ maxWidth: 260 }}>
        <div className="text-white mb-4">
          <p className="font-black text-lg mb-1">Meesho Prototype</p>
          <p className="text-xs opacity-60">High-fidelity clickable prototype</p>
        </div>

        <div className="space-y-3">
          {[
            { label: 'Flow 1: Compare', steps: ['Product Listing', '→ Tap "+ Compare" on 2+ products', '→ Tap "Compare Now"', '→ Compare Table', '→ Add to Cart'] },
            { label: 'Flow 2: AI Reviews', steps: ['Tap any product card', '→ Product Detail Page', '→ Tap "Summarize Reviews"', '→ Read or listen to the AI summary', '→ Tap a theme (e.g. Comfort)'] },
            { label: 'Flow 3: Voice Shopping', steps: ['Tap "Talk now" on the listing', '→ Allow microphone access', '→ Ask for a product in English or Hindi', '→ Hear a spoken recommendation', '→ Open details or compare products'] },
          ].map(flow => (
            <div key={flow.label} className="rounded-2xl p-4" style={{ backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <p className="font-black text-sm text-white mb-2">{flow.label}</p>
              {flow.steps.map(s => <p key={s} className="text-xs opacity-70 text-white mb-0.5">{s}</p>)}
            </div>
          ))}
          <div className="rounded-2xl p-4" style={{ backgroundColor: `rgba(159,32,137,0.25)`, border: `1px solid rgba(159,32,137,0.4)` }}>
            <p className="font-black text-sm mb-2" style={{ color: PL }}>Features</p>
            <div className="space-y-1.5 text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>
              <p>✓ 10 screens</p>
              <p>✓ Product listing + compare tray</p>
              <p>✓ Side-by-side comparison table</p>
              <p>✓ AI review summary (EN + HI)</p>
              <p>✓ Spoken AI summary</p>
              <p>✓ Voice shopping demo (Web Speech API)</p>
              <p>✓ Language selector sheet</p>
              <p>✓ Review theme detail</p>
              <p>✓ Max 4 products toast</p>
              <p>✓ Meesho brand identity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
